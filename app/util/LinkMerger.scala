package util

import model._

import scala.collection.mutable

case class LinkMerger(curationMap: CurationMap, preFrag: Fragment, rearFrag: Fragment) {
  val mergedLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergePreLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergeRearLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  var mergedFrag : Fragment = FragNone
  val isMerge :Boolean = hasDuplicateLinks() //条件

  if(isMerge){

    genDuplicateLinkAndFrag()


    curationMap.links = LinkListUpdater(curationMap.links, mergePreLinks.toVector, mergeRearLinks.toVector, mergedLinks.toVector).getNewList
    val fragList = curationMap.getFragList(preFrag)
    curationMap.setFragList(FragListUpdater(fragList, preFrag, mergedFrag).getNewList, preFrag.docNum)
    //tukareta
    // val fragList: mutable.Seq[Fragment] = curationMap.getFragList(frag1)
    //fragList.update(fragList.indexOf(frag1),mergedFrag)
    //fragList.
  }

  def hasDuplicateLinks() : Boolean={
    var isMerge : Boolean = false

    curationMap.getDestLinkDocNums(preFrag).foreach{
      destDocNum=>
        if(curationMap.getDestLinkDocNums(rearFrag).contains(destDocNum)){//重複

          isMerge = true
        }
    }
    isMerge
  }

  private def genDuplicateLinkAndFrag():Unit={
    curationMap.getLink(preFrag).foreach{
      preFragLink=>
        curationMap.getLink(rearFrag).foreach{
          rearFragLink=>
            if(preFragLink.getDestDocNum == rearFragLink.getDestDocNum ){

              mergePreLinks += preFragLink
              mergeRearLinks += rearFragLink
            }
        }

    }
    for(i <- mergePreLinks.indices) {

      val pl = mergePreLinks.get(i) match {
        case Some(l) => l
        case _ => LinkNone
      }
      val rl = mergeRearLinks.get(i) match {
        case Some(l) => l
        case _ => LinkNone
      }

      mergedLinks += pl + rl
    }

    mergedFrag = mergedLinks.head.init.asInstanceOf[Fragment]
  }
}
