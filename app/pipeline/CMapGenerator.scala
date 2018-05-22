package pipeline

import models.CurationMap
import tools.DataInputer

case class CMapGenerator(list: List[String]) {

  private val cMap = DataInputer(list).gethasntLinkCurationMap
  cMap.genLink()
  cMap.genSplitLink()
  cMap.mergeLink()

  def getCMap: CurationMap ={
    cMap
  }
}
