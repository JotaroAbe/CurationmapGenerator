import scala.collection.immutable.List
import scala.collection.mutable

case class Fragment (morphList: List[Morpheme]){

  def getText(): String ={
    var ret :String = ""
    morphList.foreach{
      morph =>
        ret += morph.word
    }
    ret
  }

  def getnounList(): List[String]={
    val nounList = mutable.MutableList.empty[String]

    morphList.foreach{
      morphme=>
        if(morphme.getPartsOfSpeech() == "名詞"){
          nounList += morphme.word
        }
    }

    nounList.toList
  }
}
