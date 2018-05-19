package model

case class InclusiveLink(init : MapNode, dest : MapNode){


  def this(init : Fragment, dest : Fragment) ={
    this(init.toNode(), dest.toNode())
  }
  def this(init : Fragment, dest : Document) ={
    this(init.toNode(), dest.toNode())
  }

  override def toString: String = {
    s"${init.getText()} -> Doc${dest.docNum}"
  }

  def getInitDocNum : Int ={
    init.docNum
  }
  def getDestDocNum : Int ={
    dest.docNum
  }

}

class NoneLink(initDocNum : Int) extends InclusiveLink(init = NoneNode ,dest = NoneNode){


  override def toString: String = {
    s"Doc${initDocNum}Frag None Link"
  }

  override def getInitDocNum: Int = initDocNum

}
object NoneLink{
  def apply(initDocNum: Int): NoneLink = new NoneLink(initDocNum)
}
