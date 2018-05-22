package models

import tools.LinkMerger

import scala.collection.mutable

object CurationMap{
  final val ALPHA : Double = 0.4
}

case class CurationMap(documents : Set[Document]) {



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
                frag.genLink(destDoc)


            }
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


}
