import org.jsoup._
import scala.io.{BufferedSource, Source}

case class GetterFromWeb(url : String){

  val source: nodes.Document = Jsoup.connect(url).get
  val (head, body) = (source.head, source.body)
  val line: String = body.text()

  def getInput : String ={
    line
  }


}
