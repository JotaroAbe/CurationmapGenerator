package Data

import scala.collection.mutable

case class CurationMap(documents : Set[Document]) {

  val links = mutable.MutableList.empty[InclusiveLink]

  val ALPHA : Double = 0.6

  def genLink(): Unit ={

    documents.foreach{
      doc=>
        doc.fragList.foreach{
          frag=>
            documents.foreach{
              destDoc=>
                val inclusiveScore : Double= frag.calcInclusive(destDoc)
                if(inclusiveScore > ALPHA){
                  links += InclusiveLink(frag, destDoc)
                }
            }
        }
    }

  }


}
