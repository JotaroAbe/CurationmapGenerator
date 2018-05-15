import scala.collection.mutable

case class Document (fragList : mutable.MutableList[Fragment], docNum : Int){
  val initHub : Double = 1
  val initAuth : Double = 1
  var preHub : Double = initHub
  var preAuth: Double = initAuth
  var currentHub: Double = initHub
  var currentAuth : Double = initAuth
  var linkedFrag : Int = 0
  var totalFrag : Int = 0

  def getText(): String ={
    var ret :String = ""
    fragList.foreach{
      frag =>
        ret += frag.getText() +"\n"
    }
    ret
  }
}
