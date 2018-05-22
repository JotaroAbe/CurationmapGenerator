package tools

import models.{CurationMap, Document, Fragment, Morpheme}

import scala.collection.mutable

import us.feliscat.text.analyzer.mor.mecab.IpadicMecab



import us.feliscat.text.StringOption

case class DataInputer(sourceList : List[String]){

  val docSet = mutable.HashSet.empty[Document]
  println("形態素解析中...")


  sourceList.foreach {
    source =>

      val fragList = mutable.MutableList.empty[Fragment]
      val str: String = GetterFromWeb(source).getInput
      val queue: mutable.MutableList[Morpheme] = mutable.MutableList.empty[Morpheme]

      IpadicMecab.analyze(StringOption(str)).foreach{
        mor =>
          //println(mor)
          val m = Morpheme(mor.split("\t").head, mor.split("\t").last)
          if (m.morph != "EOS") {
            queue += m
            if (queue.last.getSubPartsOfSpeech == "句点") {
              fragList += Fragment(queue.toVector)
              //println(doc.fragList.last.getText())
              queue.clear()
            }
          }
      }
      val doc: Document = Document(fragList.toVector, sourceList.indexOf(source))
      doc.setDocNumToFrag()

      docSet += doc
  }



  def getDidntCalcCurationMap : CurationMap={
    CurationMap(docSet.toSet)
  }
}
