
import org.chasen.mecab.Tagger
import org.chasen.mecab.MeCab

import scala.collection.mutable

object Main {
  def main(args: Array[String]): Unit = {

    //-Djava.library.path=/usr/lib/jni
    System.loadLibrary("MeCab")
    val tagger = new Tagger()
    val str = "太郎は二郎にこの本を渡した。"
    tagger.parse(str)
    var node = tagger.parseToNode(str)
    val doc = Document(mutable.MutableList.empty[Fragment], 1)
    while(node != null){
      println(node.getSurface + "\t" + node.getFeature)

      node = node.getNext
    }
    println(doc.getText())
  }






}
