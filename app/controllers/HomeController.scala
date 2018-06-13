package controllers
import javax.inject.Inject
import pipeline.CMapGenerator
import play.api.mvc.{AbstractController, ControllerComponents}




class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    var ret = ""
    
    val cMap = CMapGenerator("桜木町").getCMap

    cMap.documents.foreach{
      doc=>
        ret += s"Doc${doc.docNum}  HUB : ${doc.currentHub} AUTH : ${doc.currentAuth}\n"
    }

    Ok(ret)

  }
}
