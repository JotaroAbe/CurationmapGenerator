package controllers
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import util.DataInputer


class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    var ret = ""

    val cMap = DataInputer(List("https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html","http://taku910.github.io/mecab/", "https://ja.wikipedia.org/wiki/HH")).getDidntCalcCurationMap
    cMap.genLink()
    cMap.mergeLink()

    cMap.links.foreach{

              link=>
                ret += link.toString +"\n"
                //println(s"${link.getInitDocNum} ${link.getDestDocNum}")



    }

    Ok(ret)
  }
}
