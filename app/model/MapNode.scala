package model

import scala.collection.immutable.List

trait MapNode {

  var docNum :Int

  def getText(): String
  def getNounList(): List[String]
}

object NoneNode extends MapNode{
  override var docNum: Int = 65535

  override def getText(): String = ""

  override def getNounList(): List[String] = Nil
}