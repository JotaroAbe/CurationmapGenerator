name := "CurationmapGenerator"

version := "0.1"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.6"

//libraryDependencies += "org.jsoup" % "jsoup" % "1.11.3"

libraryDependencies += guice
libraryDependencies += "us.feliscat" % "feliscatuszerolibraries_2.12" % "0.0.1"
libraryDependencies ++= Seq(
  jdbc,
  "org.webjars" %% "webjars-play" % "2.6.3",
  "org.webjars" % "d3js" % "5.4.0",
  "org.webjars" % "requirejs" % "2.2.0",
  "org.mongodb.morphia" % "morphia" % "1.3.2",
  "org.mongodb" % "mongo-java-driver" % "3.7.1"

)
import play.sbt.routes.RoutesKeys
RoutesKeys.routesImport := Seq.empty
