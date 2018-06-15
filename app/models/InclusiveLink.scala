package models

import java.util.UUID

case class InclusiveLink(dest : MapNode){

  val ID: UUID = UUID.randomUUID

  def this( dest : Fragment) ={
    this( dest.toNode)
  }
  def this( dest : Document) ={
    this( dest.toNode)
  }

  override def toString: String = {
    s"-> Doc${dest.docNum}"
  }


  def getDestDocNum : Int ={
    dest.docNum
  }

  def getDestText : String={
    dest.getText
  }

  def +(rearLink : InclusiveLink) :InclusiveLink={
    InclusiveLink(dest)
  }
  def isLinkNone :Boolean={
    false
  }
}

class LinkNone(initDocNum : Int) extends InclusiveLink(dest = NodeNone){


  override def toString: String = {
    s"Doc${initDocNum}Frag None Link"
  }


  override def getDestDocNum: Int = Document.docNumNone

  override def isLinkNone: Boolean = true


}
object LinkNone extends InclusiveLink(dest = NodeNone){
  def apply(initDocNum: Int): LinkNone = new LinkNone(initDocNum)
}


