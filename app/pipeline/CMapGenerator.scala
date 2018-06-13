package pipeline

import models.CurationMap
import tools.{DataInputer, GoogleSearcher}

case class CMapGenerator(query :String) {

  val list: List[String] = GoogleSearcher(query).getInput
  private val cMap = DataInputer(list).gethasntLinkCurationMap
  cMap.genLink()
  cMap.genSplitLink()
  cMap.mergeLink()
  cMap.calcHits()
  def getCMap: CurationMap ={
    cMap
  }
}
