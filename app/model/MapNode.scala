package model

import scala.collection.immutable.List

trait MapNode {

  var docNum :Int

  def getText(): String
  def getNounList(): List[String]

}

object NodeNone extends MapNode{
  override var docNum: Int = Document.docNumNone

  override def getText(): String = ""

  override def getNounList(): List[String] = Nil


}