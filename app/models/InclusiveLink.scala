package models

import java.util.UUID

case class InclusiveLink(var destText : String, destDocNum : Int){

  val ID: UUID = UUID.randomUUID

  override def toString: String = {
    s"-> Doc$destDocNum"
  }


  def getDestDocNum : Int ={
    destDocNum
  }

  def getDestText : String={
    destText
  }

  def +(rearLink : InclusiveLink) :InclusiveLink={
    InclusiveLink(destText, destDocNum)
  }
  def isLinkNone :Boolean={
    false
  }
}

class LinkNone(initDocNum : Int) extends InclusiveLink("", Document.docNumNone){


  override def toString: String = {
    s"Doc${initDocNum}Frag None Link"
  }


  override def getDestDocNum: Int = Document.docNumNone

  override def isLinkNone: Boolean = true


}
object LinkNone extends InclusiveLink("", Document.docNumNone){
  def apply(initDocNum: Int): LinkNone = new LinkNone(initDocNum)
}


