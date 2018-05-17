package Data

import scala.collection.immutable.List
import scala.collection.mutable

case class Fragment (morphList: List[Morpheme]) extends MapNode {

  override def getText(): String ={
    var ret :String = ""
    morphList.foreach{
      morph =>
        ret += morph.word
    }
    ret
  }

  override def getNounList(): List[String]={
    val nounList = mutable.MutableList.empty[String]

    morphList.foreach{
      morphme=>
        if(morphme.getPartsOfSpeech() == "名詞"){
          nounList += morphme.word
        }
    }

    nounList.toList
  }

  def toNode(): MapNode={
    this.asInstanceOf[MapNode]
  }

  def calcInclusive(destNode :MapNode) : Double={
    val nounNum :Int= getNounList().length
    var inclusiveNum : Int= 0

    getNounList().foreach{
      initNoun=>
        if(destNode.getNounList().contains(initNoun)){
          inclusiveNum += 1
        }
    }

    nounNum.toDouble / inclusiveNum.toDouble
  }
}
