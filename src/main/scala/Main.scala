import org.chasen.mecab.MeCab

object Main {
  def main(args: Array[String]): Unit = {

    val l = List("http://icserv01.forest.eis.ynu.ac.jp/?p=50","https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html")

    println(DataInputer(l).getDidntCalcCurationMap.documents.last.getText())

    //println(DataInputer("http://icserv01.forest.eis.ynu.ac.jp/?p=50").getInput)
  }






}
