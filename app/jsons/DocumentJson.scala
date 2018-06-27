package jsons

import play.api.libs.json.Json
import java.util.{List => JList}
import scala.collection.JavaConverters._

case class DocumentJson(url : String,
                        docNum : Int,
                        hub : Double,
                        auth : Double,
                        fragments : Seq[FragmentJson]){
  def this(url : String,
           docNum : Int,
           hub : Double,
           auth : Double,
           fragments : JList[FragmentJson]) = {
    this(url,docNum,hub,auth, fragments.asScala)
  }
}
object DocumentJson{
  implicit val jsonWrites = Json.writes[DocumentJson]
  implicit val jsonreads = Json.reads[DocumentJson]
}



