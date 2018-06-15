package jsons

import play.api.libs.json.Json

case class DocumentJson(url : String,
                        docNum : Int,
                        hub : Double,
                        auth : Double,
                        fragments : List[FragmentJson])
object DocumentJson{
  implicit val jsonWrites = Json.writes[DocumentJson]
  implicit val jsonreads = Json.reads[DocumentJson]
}



