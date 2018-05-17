package controllers

import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

class HomeController  @Inject()(cc: ControllerComponents) (implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index = Action {
    Ok("usagisan")
  }
}
