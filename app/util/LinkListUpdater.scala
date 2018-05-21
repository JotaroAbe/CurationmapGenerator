package util

import model.{Fragment, InclusiveLink}

import scala.collection.mutable

case class LinkListUpdater(list : Vector[InclusiveLink], oldPreLinks : Vector[InclusiveLink],oldRearLinks : Vector[InclusiveLink], newLinks : Vector[InclusiveLink]){
  var isChagnged = false
  private val newListbuff = mutable.MutableList.empty[InclusiveLink]

  var changeLinksIndex = 0

  oldPreLinks.foreach {
    oldPreLink =>

      val index: Int = list.indexOf(oldPreLink)

      if(index != -1 && list.length > index + 1){
        var i = 0
        isChagnged = true
        list.foreach {
          link =>
            if (index == i) {
              newListbuff += newLinks.apply(changeLinksIndex)
            }else if(link == oldRearLinks.apply(changeLinksIndex)){
              //Nothing else
            }else{
              newListbuff += link
            }
            i += 1
        }
      }
      changeLinksIndex += 1
  }


  def getNewList : Vector[InclusiveLink]={
    newListbuff.toVector
  }

}

