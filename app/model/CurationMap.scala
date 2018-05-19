package model


case class CurationMap(documents : Set[Document]) {


  val ALPHA : Double = 0.4

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

                    if (frag.docNum != destDoc.docNum) {
                      val inclusiveScore: Double = frag.calcInclusive(destDoc)
                      //println(s"$inclusiveScore")
                      if (inclusiveScore > ALPHA) {
                        //println(s"${frag.docNum} ${destDoc.docNum}")
                        frag.links += InclusiveLink(frag, destDoc)
                      } else {
                        frag.links += NoneLink(doc.docNum)
                      }
                    }else{
                      frag.links += NoneLink(doc.docNum)
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
