

case class Morpheme(word: String, morph : String) {


  def getPartsOfSpeech():String ={
    //println(s"$word +++ ${morph.split(",").head}")
    morph.split(",").head
  }

}
