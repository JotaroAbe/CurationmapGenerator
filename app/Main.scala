import util.DataInputer

object Main {
  def main(args: Array[String]): Unit = {

    val l = List("http://icserv01.forest.eis.ynu.ac.jp/?p=50","https://docs.oracle.com/javase/jp/7/api/java/util/HashSet.html")
    val cuMap = DataInputer(l).getDidntCalcCurationMap

    cuMap.genLink()

    cuMap.links.foreach{
      link=>
        println(link)
    }


  }

}
