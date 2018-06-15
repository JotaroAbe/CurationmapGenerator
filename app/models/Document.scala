package models

import tools.LinkMerger

import scala.collection.mutable

case class Document (url : String,var fragList : Vector[Fragment],var docNum : Int) extends MapNode {
  val initHub : Double = 1
  val initAuth : Double = 1
  var preHub : Double = initHub
  var preAuth: Double = initAuth
  var currentHub: Double = initHub
  var currentAuth : Double = initAuth
  var linkedFrag : Int = 0
  var totalFrag : Int = 0



  def setDocNumToFrag(): Unit ={
    fragList.foreach{
      frag=>
        frag.docNum = docNum
    }
  }

  def hasLink(docNum : Int): Boolean ={
    var ret = false
    fragList.foreach{
      frag =>
        if(frag.hasLink(docNum)){
          ret = true
        }
    }
    ret
  }

  def initHitsCalc():Unit={
    preHub  = initHub
    preAuth = initAuth
    currentHub = initHub
    currentAuth = initAuth

    totalFrag = fragList.size
    linkedFrag = 0
    fragList.foreach{
      frag =>
        if(frag.links.nonEmpty){
          linkedFrag += 1
        }
    }
  }

  def updatePreValue():Unit ={
    preHub = currentHub
    preAuth = currentAuth
  }

  def calcHitsOnce(documents : Vector[Document]):Unit={
    var maxAuth : Double = 0.0
    currentHub = 0.0

    fragList.foreach{
      frag =>
        maxAuth = 0.0
        frag.links.foreach{
          link =>
            documents.foreach{
              doc =>
                if(doc.docNum == link.getDestDocNum && maxAuth < doc.preAuth){
                  maxAuth = doc.preAuth
                }
            }
        }
        currentHub += maxAuth
    }
    currentHub /=  1 + Math.log(totalFrag)

    currentAuth = 0.0
    documents.foreach{
      doc =>
        if(doc.hasLink(docNum)){
          currentAuth += doc.preHub
        }
    }
    currentAuth /= 1 + Math.log(linkedFrag)


  }

  def hitsNormalize(hubSum : Double, authSum : Double): Unit ={
    currentHub /= hubSum
    currentAuth /= authSum

  }

  override def getText: String ={
    var ret :String = ""
    fragList.foreach{
      frag =>
        ret += frag.getText +"\n"
    }
    ret
  }
  def toNode: MapNode={
    this.asInstanceOf[MapNode]
  }

  override def getNounList: List[String] = {
    val nounList = mutable.MutableList.empty[String]

    fragList.foreach{
      frag=>
        nounList ++= frag.getNounList
    }
    nounList.toList
  }


}
object Document{
  final val docNumNone : Int= -1
}
object DocumentNone extends Document("",Vector.empty,Document.docNumNone) {

}
