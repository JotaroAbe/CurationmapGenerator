package util

import model.{CurationMap, Document, Fragment, Morpheme}

import scala.collection.mutable

import us.feliscat.text.analyzer.mor.mecab.IpadicMecab



import us.feliscat.text.StringOption


case class DataInputer(sourceList : List[String]){

  val docSet = mutable.HashSet.empty[Document]
  println("形態素解析中...")


  sourceList.foreach {
    source =>
      val doc: Document = Document(mutable.MutableList.empty[Fragment], sourceList.indexOf(source))
      val str: String = GetterFromWeb(source).getInput
      val queue: mutable.MutableList[Morpheme] = mutable.MutableList.empty[Morpheme]

      IpadicMecab.analyze(StringOption(str)).foreach{
        mor =>
          //println(mor)
          val m = Morpheme(mor.split("\t").head, mor.split("\t").last)
          if (m.morph != "EOS") {
            queue += m
            if (queue.last.getSubPartsOfSpeech() == "句点") {
              doc.fragList += Fragment(queue.toList)
              //println(doc.fragList.last.getText())
              queue.clear()
            }
          }
      }
      doc.setDocNumToFrag()

      docSet += doc
  }



  def getDidntCalcCurationMap : CurationMap={
    CurationMap(docSet.toSet)
  }
}
