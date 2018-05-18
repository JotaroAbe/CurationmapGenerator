package util

import java.nio.charset.StandardCharsets

import data.{CurationMap, Document, Fragment, Morpheme}

import scala.collection.mutable
import us.feliscat.text.analyzer._
import us.feliscat.text.analyzer.mor.mecab.IpadicMecab

import java.nio.charset.{CodingErrorAction, StandardCharsets}

import us.feliscat.text.{StringNone, StringOption}
import us.feliscat.util.LibrariesConfig
import us.feliscat.util.process._

case class DataInputer(sourceList : List[String]){

  val docSet = mutable.HashSet.empty[Document]







  sourceList.foreach {
    source =>
      val doc = Document(mutable.MutableList.empty[Fragment], sourceList.indexOf(source))
      //要変更
//      System.loadLibrary("MeCab")
//      val tagger = new Tagger()
//      val str: String = GetterFromWeb(source).getInput
//      tagger.parse(str)
//      var node: Node = tagger.parseToNode(str)
//      val doc = Document(mutable.MutableList.empty[Fragment], sourceList.indexOf(source))
//      val queue: mutable.MutableList[Morpheme] = mutable.MutableList.empty[Morpheme]
//      while (Option[Node](node).isDefined) {
//        //println(node.getSurface + "\t" + node.getFeature)
//        val m = Morpheme(node.getSurface, node.getFeature)
//        if (m.getPartsOfSpeech() != "BOS/EOS") {
//          queue += m
//          if (queue.last.getSubPartsOfSpeech() == "句点") {
//            doc.fragList += Fragment(queue.toList)
//           // println(doc.fragList.last)
//            queue.clear()
//          }
//        }
//        node = node.getNext
//      }
      //println(doc.getText())
      docSet += doc
  }

  def getDidntCalcCurationMap : CurationMap={
    CurationMap(docSet.toSet)
  }
}
