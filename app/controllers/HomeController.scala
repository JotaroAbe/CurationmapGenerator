package controllers
import com.mongodb.{MongoClient, MongoClientOptions, MongoCredential, ServerAddress}
import com.typesafe.config.ConfigFactory
import javax.inject.Inject
import morphias.CurationMapMorphia
import org.mongodb.morphia.{Datastore, Morphia}
import pipeline.CMapGenerator
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.collection.JavaConverters._


class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {

    val cMap = CMapGenerator("桜木町")

    Ok(views.html.index(cMap.getCMapJson))

  }
}
