package controllers
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import us.feliscat.text.StringOption
import util.DataInputer
import us.feliscat.text.analyzer.mor.mecab.{IpadicMecab, UnidicMecab}

class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
//    val l = List("http://icserv01.forest.eis.ynu.ac.jp/?p=50","https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html")
//    val cuMap = DataInputer(l).getDidntCalcCurationMap
//
//    cuMap.genLink()
//    Ok(cuMap.documents.last.getText())

    println(IpadicMecab.analyze(StringOption("Linux（我が家の環境ではUbuntu12.04）でファイルをサクっと検索したい場合に何を使うか\n長らく自分はfindを使っていたが、どうもlocateの方が高速だし手軽らしいという話を聞きつけた。")).next())
    Ok( "dd")
  }
}
