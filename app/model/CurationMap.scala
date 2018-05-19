package model

import scala.collection.mutable

case class CurationMap(documents : Set[Document]) {

  val links: mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]

  val ALPHA : Double = 0.6

  def genLink(): Unit ={

    documents.foreach{
      doc=>
        doc.fragList.foreach{
          frag=>
            documents.foreach{
              destDoc=>
                val inclusiveScore : Double= frag.calcInclusive(destDoc)
                if(inclusiveScore > ALPHA && frag.docNum != destDoc.docNum ){
                  //println(s"${frag.docNum} ${destDoc.docNum}")
                  links += InclusiveLink(frag, destDoc)
                }
            }
        }
    }

  }

  def margeLink(): Unit ={
    
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



}
