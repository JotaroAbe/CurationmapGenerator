package controllers
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import util.DataInputer

import us.feliscat.text.analyzer.mor.mecab.UnidicMecab

class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
//    val l = List("http://icserv01.forest.eis.ynu.ac.jp/?p=50","https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html")
//    val cuMap = DataInputer(l).getDidntCalcCurationMap
//
//    cuMap.genLink()
//    Ok(cuMap.documents.last.getText())
    Ok("kfjsojfjsdofjsiodf")
  }
}
