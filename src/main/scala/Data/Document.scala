package Data

import scala.collection.mutable

case class Document (fragList : mutable.MutableList[Fragment], docNum : Int) extends MapNode {
  val initHub : Double = 1
  val initAuth : Double = 1
  var preHub : Double = initHub
  var preAuth: Double = initAuth
  var currentHub: Double = initHub
  var currentAuth : Double = initAuth
  var linkedFrag : Int = 0
  var totalFrag : Int = 0

  override def getText(): String ={
    var ret :String = ""
    fragList.foreach{
      frag =>
        ret += frag.getText() +"\n"
    }
    ret
  }
  def toNode(): MapNode={
    this.asInstanceOf[MapNode]
  }

  override def getNounList(): List[String] = {
    var nounList = List.empty[String]

    fragList.foreach{
      frag=>
        nounList =  nounList ++ frag.getNounList()
    }
    nounList
  }
}
