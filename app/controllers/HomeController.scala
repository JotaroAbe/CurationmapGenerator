package controllers
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import tools.DataInputer


class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    var ret = ""

    val cMap = DataInputer(List("https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html","http://taku910.github.io/mecab/", "https://ja.wikipedia.org/wiki/HH")).getDidntCalcCurationMap
    cMap.genLink()
    cMap.mergeLink()

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
