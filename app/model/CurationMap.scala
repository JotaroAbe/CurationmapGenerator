package model

import util.LinkMerger

import scala.collection.mutable

object CurationMap{
  final val ALPHA : Double = 0.4
}

case class CurationMap(documents : Set[Document]) {

  var links : Vector[InclusiveLink] = Vector.empty[InclusiveLink]


  def genLink(): Unit ={
    val links: mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
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
                val l = frag.genLink(destDoc)
                if(!l.isLinkNone()){
                  links += l
                }

            }
        }
    }
    this.links = links.toVector
  }

  def mergeLink(): Unit ={
    println("リンク併合中...")
    var loop : Boolean = false

    do{
      loop = false
      var currentLinkList: Vector[InclusiveLink] = links
      documents.foreach {
        doc =>
          var preFrag: Fragment = FragNone
          var currentFragList = doc.fragList
          doc.fragList.foreach {
            frag =>
              val lm = LinkMerger(preFrag, frag, currentFragList, currentLinkList)
              preFrag = frag
              currentFragList = lm.getNewFragList()
              currentLinkList = lm.getNewLinkList()
              if (lm.isMerge) {
                loop = true
              }
          }
          doc.fragList = currentFragList
      }
      links = currentLinkList
    }while(loop)
  }

  def getText() : String={
    var ret = ""
    documents.foreach{
      doc=>
        ret = s"${doc.docNum}:\n"
        doc.fragList.foreach{
          frag=>
            ret += s"${frag.getText()}\n"
        }
    }
    ret
  }

  def getLink(frag :Fragment): List[InclusiveLink] ={
    val ret : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
    links.foreach{
      link=>
        if(link.init == frag){
          ret += link
        }
    }
    ret.toList
  }



}
