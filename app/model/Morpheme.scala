package model



case class Morpheme(word: String, morph : String) {

  private val pos =  morph.split(",").head
  private val spos = morph match {
    case "EOS" => "EOS"
    case _ => morph.split(",")(1)
  }


  def getPartsOfSpeech():String ={
    //println(s"$word +++ ${morph.split(",").head}")
    pos
  }
  def getSubPartsOfSpeech():String ={
    //println(s"$word +++ ${morph.split(",").head}")
    spos
  }

}
