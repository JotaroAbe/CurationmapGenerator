package jsons

import play.api.libs.json.Json

case class FragmentJson(text : String,
                        links : List[LinkJson])
object FragmentJson{
  implicit val jsonWrites = Json.writes[FragmentJson]
  implicit val jsonreads = Json.reads[FragmentJson]
}
