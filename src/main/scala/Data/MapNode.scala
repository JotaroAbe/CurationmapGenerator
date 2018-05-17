package Data

import scala.collection.immutable.List

trait MapNode {

  def getText(): String
  def getNounList(): List[String]
}
