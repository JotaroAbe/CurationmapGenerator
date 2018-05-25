package controllers
import javax.inject.Inject
import pipeline.CMapGenerator
import play.api.mvc.{AbstractController, ControllerComponents}




class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    var ret = ""


    val cMap = CMapGenerator("尾瀬").getCMap

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
