package Data

case class InclusiveLink(init : MapNode, dest : MapNode){

  def this(init : Fragment, dest : Fragment) ={
    this(init.toNode(), dest.toNode())
  }
  def this(init : Fragment, dest : Document) ={
    this(init.toNode(), dest.toNode())
  }

}
