package tools

import models.{Fragment, InclusiveLink}

import scala.collection.mutable

case class LinkListUpdater(var list : Vector[InclusiveLink], oldPreLinks : Vector[InclusiveLink],oldRearLinks : Vector[InclusiveLink], newLinks : Vector[InclusiveLink]){

  private val newListbuff = mutable.MutableList.empty[InclusiveLink]

  var changeLinksIndex = 0

  oldPreLinks.foreach {
    oldPreLink =>
      newListbuff.clear()

      list.foreach {
        link =>
          if (link.ID == oldPreLinks.apply(changeLinksIndex).ID) {
            newListbuff += newLinks.apply(changeLinksIndex)
          }else if(link.ID == oldRearLinks.apply(changeLinksIndex).ID){
            //Nothing else
          }else{
            newListbuff += link
          }

      }

      changeLinksIndex += 1
      list = newListbuff.toVector
  }


  def getNewList : Vector[InclusiveLink]={
    newListbuff.toVector
  }

}

