package util

import data.{CurationMap, Document, Fragment, Morpheme}
import org.chasen.mecab.{Node, Tagger}

import scala.collection.mutable

case class DataInputer(sourceList : List[String]){

  val docSet = mutable.HashSet.empty[Document]

  sourceList.foreach {
    source =>
      //-Djava.library.path=/usr/lib/jni
      System.loadLibrary("MeCab")
      val tagger = new Tagger()
      val str: String = GetterFromWeb(source).getInput
      tagger.parse(str)
      var node: Node = tagger.parseToNode(str)
      val doc = Document(mutable.MutableList.empty[Fragment], sourceList.indexOf(source))
      val queue: mutable.MutableList[Morpheme] = mutable.MutableList.empty[Morpheme]
      while (Option[Node](node).isDefined) {
        //println(node.getSurface + "\t" + node.getFeature)
        val m = Morpheme(node.getSurface, node.getFeature)
        if (m.getPartsOfSpeech() != "BOS/EOS") {
          queue += m
          if (queue.last.getSubPartsOfSpeech() == "句点") {
            doc.fragList += Fragment(queue.toList)
           // println(doc.fragList.last)
            queue.clear()
          }
        }
        node = node.getNext
      }
      //println(doc.getText())
      docSet += doc
  }

  def getDidntCalcCurationMap : CurationMap={
    CurationMap(docSet.toSet)
  }
}
