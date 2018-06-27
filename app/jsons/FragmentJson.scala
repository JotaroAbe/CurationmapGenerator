package jsons

import play.api.libs.json.Json
import java.util.{List => JList}
import scala.collection.JavaConverters._

case class FragmentJson(text : String,
                        links :Seq[LinkJson]) {
  def this(text: String,
           links: JList[LinkJson]) = {
    this(text, links.asScala)
  }
}
object FragmentJson{
  implicit val jsonWrites = Json.writes[FragmentJson]
  implicit val jsonreads = Json.reads[FragmentJson]
}
