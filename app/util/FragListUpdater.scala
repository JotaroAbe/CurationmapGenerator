package util

import model.Fragment

import scala.collection.mutable

case class FragListUpdater(list : Vector[Fragment], oldPreFrag : Fragment, newFrag : Fragment) {
  var isChagnged = false
  private val index: Int =  list.indexOf(oldPreFrag)
  private val newListbuff = mutable.MutableList.empty[Fragment]

  if(index != -1 && list.length > index + 1){
    var i = 0
    isChagnged = true
    list.foreach{
      frag=>
        if(index == i){
          newListbuff += newFrag
        }else if(index == i + 1){
          //Nothing else
        }else{
          newListbuff += frag
        }
        i += 1
    }
  }

  def getNewList: Vector[Fragment]={
    newListbuff.toVector
  }

}

