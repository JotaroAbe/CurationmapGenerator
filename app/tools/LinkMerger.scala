package tools

import models._

import scala.collection.mutable

case class LinkMerger(preFrag: Fragment, rearFrag: Fragment, currentFragList : Vector[Fragment], currentLinkList : Vector[InclusiveLink]) {
  val mergedLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergePreLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  val mergeRearLinks : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
  var mergedFrag : Fragment = FragNone
  val isMerge :Boolean = hasDuplicateLinks //条件

  if(isMerge){

    genDuplicateLinkAndFrag()


    //tukareta
    // val fragList: mutable.Seq[Fragment] = curationMap.getFragList(frag1)
    //fragList.update(fragList.indexOf(frag1),mergedFrag)
    //fragList.
  }

  def getNewLinkList: Vector[InclusiveLink]={
    if(isMerge){
      LinkListUpdater(currentLinkList, mergePreLinks.toVector, mergeRearLinks.toVector, mergedLinks.toVector).getNewList
    }else{
      currentLinkList
    }

  }

  def getNewFragList: Vector[Fragment]={
    if(isMerge){
      FragListUpdater(currentFragList, preFrag, rearFrag , mergedFrag).getNewList
    }else{
      currentFragList
    }

  }

  def hasDuplicateLinks : Boolean={
    var isMerge : Boolean = false

    getDestLinkDocNums(preFrag).foreach{
      destDocNum=>
        if(getDestLinkDocNums(rearFrag).contains(destDocNum)){//重複

          isMerge = true
        }
    }
    isMerge
  }

  private def genDuplicateLinkAndFrag():Unit={
    getLink(preFrag).foreach{
      preFragLink=>
        getLink(rearFrag).foreach{
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
  def getDestLinkDocNums(frag :Fragment) : Set[Int]={
    val ret = mutable.Set.empty[Int]
    currentLinkList.foreach{
      link=>
        if(link.init.ID == frag.ID && link.getDestDocNum != Document.docNumNone){
          ret += link.getDestDocNum
        }
    }
    ret.toSet
  }


  def getLink(frag :Fragment): List[InclusiveLink] ={
    val ret : mutable.MutableList[InclusiveLink] = mutable.MutableList.empty[InclusiveLink]
    currentLinkList.foreach{
      link=>
        if(link.init == frag){
          ret += link
        }
    }
    ret.toList
  }

}
