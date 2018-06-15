package controllers
import javax.inject.Inject
import pipeline.CMapGenerator
import play.api.mvc.{AbstractController, ControllerComponents}




class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {

    val cMapJson = CMapGenerator("桜木町").getCMap.getJson

    Ok(cMapJson.toString())

  }
}
