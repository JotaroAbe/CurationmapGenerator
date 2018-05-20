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

  def +(rearLink : InclusiveLink) :InclusiveLink={
    InclusiveLink(init.asInstanceOf[Fragment]+rearLink.init.asInstanceOf[Fragment], dest)
  }
  def isLinkNone() :Boolean={
    false
  }
}

class LinkNone(initDocNum : Int) extends InclusiveLink(init = NodeNone ,dest = NodeNone){


  override def toString: String = {
    s"Doc${initDocNum}Frag None Link"
  }

  override def getInitDocNum: Int = initDocNum
  override def getDestDocNum: Int = Document.docNumNone

  override def isLinkNone(): Boolean = true


}
object LinkNone extends InclusiveLink(init = NodeNone ,dest = NodeNone){
  def apply(initDocNum: Int): LinkNone = new LinkNone(initDocNum)
}


