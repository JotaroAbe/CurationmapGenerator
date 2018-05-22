package models

import java.util.UUID

import scala.collection.immutable.List

trait MapNode {

  var docNum :Int
  val ID: UUID = UUID.randomUUID

  def getText: String
  def getNounList: List[String]

}

object NodeNone extends MapNode{
  override var docNum: Int = Document.docNumNone

  override def getText: String = ""

  override def getNounList: List[String] = Nil

}