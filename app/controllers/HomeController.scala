package controllers
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import util.DataInputer


class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {

    val cMap = DataInputer(List("https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html","http://taku910.github.io/mecab/")).getDidntCalcCurationMap
    cMap.genLink()

    Ok(cMap.links.toString())
  }
}
