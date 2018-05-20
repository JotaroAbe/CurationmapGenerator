package util

import model._

import scala.collection.mutable

case class LinkMerger(curationMap: CurationMap, frag1: Fragment, frag2: Fragment) {
  val mergedLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergePreLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergeRearLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  var mergedFrag : Fragment = FragNone
  val isMerge :Boolean = hasDuplicateLinks()

  if(isMerge){

    mergeDuplicateLinkAndFrag()

    mergedLinks.foreach{
      link=>
        println(link.toString)
    }
    println(frag1.getText())
    println(frag2.getText())
    println(mergedFrag.getText()+"\n")
    //tukareta
    // val fragList: mutable.Seq[Fragment] = curationMap.getFragList(frag1)
    //fragList.update(fragList.indexOf(frag1),mergedFrag)
    //fragList.
  }

  def hasDuplicateLinks() : Boolean={
    var isMerge : Boolean = false

    curationMap.getDestLinkDocNums(frag1).foreach{
      destDocNum=>
        if(curationMap.getDestLinkDocNums(frag2).contains(destDocNum)){//重複

          isMerge = true
        }
    }
    isMerge
  }

  private def mergeDuplicateLinkAndFrag():Unit={
    curationMap.getLink(frag1).foreach{
      preFragLink=>
        curationMap.getLink(frag2).foreach{
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
