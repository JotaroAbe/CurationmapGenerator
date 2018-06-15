package jsons

import play.api.libs.json._

case class CurationMapJson(query : String,
                           documents : List[DocumentJson])

object CurationMapJson{
  implicit val jsonWrites = Json.writes[CurationMapJson]
  implicit val jsonreads = Json.reads[CurationMapJson]
}
