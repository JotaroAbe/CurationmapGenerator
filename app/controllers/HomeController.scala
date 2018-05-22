package controllers
import javax.inject.Inject
import pipeline.CMapGenerator
import play.api.mvc.{AbstractController, ControllerComponents}



class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    var ret = ""
    val l = List("https://ja.wikipedia.org/wiki/%E8%B1%86%E8%8B%97",
      "https://cookpad.com/search/%E8%B1%86%E8%8B%97",
      "https://www.asahi.com/articles/ASKDC6G0YKDCUEHF01G.html")

    val cMap = CMapGenerator(l).getCMap

    cMap.documents.foreach{
      doc=>
        doc.fragList.foreach{
          frag=>
            frag.links.foreach{
              link=>
                ret += frag.getText + link.toString +"\n"
            }

        }
    }

    Ok(cMap.getText +"\n"+ ret)
  }
}
