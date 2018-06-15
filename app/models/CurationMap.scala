package models

import jsons.{CurationMapJson, DocumentJson, FragmentJson, LinkJson}
import play.api.libs.json._
import tools.{DuplicateLinkChecker, LinkMerger}

import scala.collection.mutable

object CurationMap{
  final val ALPHA : Double = 0.6
  final val EPSILON : Double = 0.0001
}

case class CurationMap(query : String, documents : Vector[Document]) {

  def genLink(): Unit ={

    var i : Int = 0
    println("リンク生成中...")
    documents.foreach {
      doc =>
        i += 1
        println(s"$i / ${documents.size}")
        doc.fragList.foreach {
          frag =>
            documents.foreach {
              destDoc =>
                if(frag.docNum != destDoc.docNum) {
                  frag.genLink(destDoc)
                }
            }
        }
    }
  }

  def genSplitLink(): Unit={

    println("リンク補間中...")
    documents.foreach {
      doc =>
        if(doc.fragList.size >= 3){
          val newFragList = mutable.MutableList.empty[Fragment]
          var preFrag: Fragment = FragNone
          var centerFrag: Fragment = FragNone
          doc.fragList.foreach {
            rearFrag =>
              if (!preFrag.isFragNone && !centerFrag.isFragNone) {
                if(centerFrag.links.isEmpty) {
                  val d = DuplicateLinkChecker(preFrag, rearFrag)
                  d.getDupDocNumSet.foreach {
                    docNum =>
                      centerFrag.genLink(getDocument(docNum))
                  }
                }
                newFragList += preFrag
              }
              preFrag = centerFrag
              centerFrag = rearFrag
          }
          newFragList += preFrag
          newFragList += centerFrag
          doc.fragList = newFragList.toVector
        }

    }
  }

  def mergeLink(): Unit ={
    println("リンク併合中...")
    var loop : Boolean = false

    do{
      loop = false

      documents.foreach {
        doc =>
          var preFrag: Fragment = FragNone
          var currentFragList = doc.fragList
          doc.fragList.foreach {
            frag =>
              val lm = LinkMerger(preFrag, frag, currentFragList)
              preFrag = frag
              currentFragList = lm.getNewFragList

              if (lm.isMerge) {
                loop = true
              }
          }
          doc.fragList = currentFragList
      }

    }while(loop)
  }

  def calcHits(): Unit= {
    println("HITS計算中...")
    documents.foreach{
      doc=>
        doc.initHitsCalc()
    }
    do {
      documents.foreach {
        doc =>
          doc.updatePreValue()
      }
      documents.foreach {
        doc =>
          doc.calcHitsOnce(documents)
      }
      documents.foreach {
        doc =>
          doc.hitsNormalize(getHubSum, getAuthSum)
      }
    }while(!isEndCalc)
  }

  private def getHubSum : Double={
    var ret :Double = 0.0
    documents.foreach{
      doc =>
        ret += doc.currentHub
    }
    ret
  }

  private def getAuthSum : Double={
    var ret :Double = 0.0
    documents.foreach{
      doc =>
        ret += doc.currentAuth
    }
    ret
  }

  private def isEndCalc :Boolean={
    var sum :Double = 0.0

    documents.foreach{
      doc =>
        sum += Math.sqrt((doc.currentHub - doc.preHub) * (doc.currentHub - doc.preHub)
          + (doc.currentAuth - doc.preAuth) *  (doc.currentAuth - doc.preAuth))
    }
    sum < CurationMap.EPSILON
  }

  def getJson : JsValue={
    val documentJsons = mutable.MutableList.empty[DocumentJson]
    val fragmentJsons = mutable.MutableList.empty[FragmentJson]
    val linkJsons = mutable.MutableList.empty[LinkJson]

    documents.foreach{
      doc =>
        fragmentJsons.clear
        doc.fragList.foreach{
          frag =>
            linkJsons.clear
            frag.links.foreach{
              link =>
               linkJsons += LinkJson(link.getDestText, link.getDestDocNum)
            }
            fragmentJsons += FragmentJson(frag.getText, linkJsons.toList)
        }
        documentJsons += DocumentJson(doc.url, doc.docNum, doc.currentHub, doc.currentAuth, fragmentJsons.toList)
    }
    Json.toJson(CurationMapJson(query, documentJsons.toList))
  }

  def getText : String={
    var ret = ""
    documents.foreach{
      doc=>
        ret += s"${doc.docNum}:\n"
        doc.fragList.foreach{
          frag=>
            ret += s"${frag.getText}\n"
        }
    }
    ret
  }

  def getDocument(docNum :Int): Document ={
    var ret : Document= DocumentNone
    documents.foreach{
      doc=>
        if(doc.docNum == docNum){
          ret = doc
        }
    }
    ret
  }
}
