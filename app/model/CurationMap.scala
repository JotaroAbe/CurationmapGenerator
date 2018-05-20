package model

import util.LinkMerger

import scala.collection.mutable

object CurationMap{
  final val ALPHA : Double = 0.4
}

case class CurationMap(documents : Set[Document]) {
  val links: mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]


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
                val l = frag.genLink(destDoc)
                if(!l.isLinkNone()){
                  links += l
                }

            }
        }
    }
  }

  def mergeLink(): Unit ={
    documents.foreach{
      doc=>
        var preFrag :Fragment = FragNone
        doc.fragList.foreach{
          frag=>
            LinkMerger(this,preFrag,frag)
            preFrag = frag
        }
    }
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

  def getDestLinkDocNums(frag :Fragment) : Set[Int]={
    val ret = mutable.Set.empty[Int]
    links.foreach{
      link=>
        if(link.init == frag && link.getDestDocNum != Document.docNumNone){
          ret += link.getDestDocNum
        }
    }
    ret.toSet
  }

  def getFragList(fragment: Fragment) : mutable.MutableList[Fragment]={
    var ret : mutable.MutableList[Fragment] =  mutable.MutableList.empty[Fragment]
    documents.foreach{
      doc=>
        if(doc.docNum == fragment.docNum){
          ret = doc.fragList
        }
    }
    ret
  }
}
