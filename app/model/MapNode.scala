package model

import scala.collection.immutable.List

trait MapNode {

  var docNum :Int

  def getText(): String
  def getNounList(): List[String]
}
