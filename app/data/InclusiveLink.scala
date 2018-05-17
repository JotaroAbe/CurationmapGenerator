package data

case class InclusiveLink(init : MapNode, dest : MapNode){

  def this(init : Fragment, dest : Fragment) ={
    this(init.toNode(), dest.toNode())
  }
  def this(init : Fragment, dest : Document) ={
    this(init.toNode(), dest.toNode())
  }

  override def toString: String = {
    s"${init.getText()} -> ${dest.getText()}"
  }

}
