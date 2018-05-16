import Data.InclusiveLink
import org.chasen.mecab.MeCab

object Main {
  def main(args: Array[String]): Unit = {

    val l = List("http://icserv01.forest.eis.ynu.ac.jp/?p=50","https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html")

    println(InclusiveLink(DataInputer(l).getDidntCalcCurationMap.documents.last.fragList.last, DataInputer(l).getDidntCalcCurationMap.documents.last))

    //println(DataInputer("http://icserv01.forest.eis.ynu.ac.jp/?p=50").getInput)
  }






}
