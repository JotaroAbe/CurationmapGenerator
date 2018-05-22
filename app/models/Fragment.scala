package models

import scala.collection.immutable.List
import scala.collection.mutable

case class Fragment (morphList: Vector[Morpheme]) extends MapNode {

  var docNum : Int = Document.docNumNone

  var links: mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]

  override def getText: String ={
    var ret :String = ""
    morphList.foreach{
      morph =>
        ret += morph.word
    }
    ret
  }

  override def getNounList: List[String]={
    val nounList = mutable.MutableList.empty[String]

    morphList.foreach{
      morphme=>
        if(morphme.getPartsOfSpeech == "名詞"){
          nounList += morphme.word
        }
    }

    nounList.toList
  }

  def toNode: MapNode={
    this.asInstanceOf[MapNode]
  }

  def genLink(destDoc : MapNode): Unit ={
    var link : InclusiveLink = LinkNone.apply(Document.docNumNone)
    if (docNum != destDoc.docNum) {
      val inclusiveScore: Double = calcInclusive(destDoc)
      //println(s"$inclusiveScore")
      if (inclusiveScore > CurationMap.ALPHA) {
        //println(s"${frag.docNum} ${destDoc.docNum}")
        link = InclusiveLink(destDoc)
      } else {
        //frag.links += NoneLink(doc.docNum)
      }
    }else{
      //frag.links += NoneLink(doc.docNum)
    }
    if(!link.isLinkNone){
      links += link
    }

  }


  def +(rearFrag : Fragment) :Fragment ={
    val mergedFrag = Fragment(Vector.concat(morphList, rearFrag.morphList))

    mergedFrag.docNum = docNum
    this.links.foreach{
      preLink =>
        rearFrag.links.foreach{
          rearLink=>
          if(preLink.dest.docNum == rearLink.dest.docNum){
            mergedFrag.links += InclusiveLink(preLink.dest)
          }
        }
    }
    mergedFrag
  }

  def calcInclusive(destNode :MapNode) : Double={
    val nounNum :Int= getNounList.length
    var inclusiveNum : Int= 0

    getNounList.foreach{
      initNoun=>
        if(destNode.getNounList.contains(initNoun)){
          inclusiveNum += 1
        }
    }

    if(!(inclusiveNum.toDouble / nounNum.toDouble).isNaN ){
      inclusiveNum.toDouble / nounNum.toDouble
    }else{
      0.0
    }
  }

  def isFragNone :Boolean={
    false
  }

}
object FragNone extends Fragment(Vector.empty) {
  override def isFragNone :Boolean={
    true
  }
}
