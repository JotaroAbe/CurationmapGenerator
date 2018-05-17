name := "CurationmapGenerator"

version := "0.1"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.6"

//libraryDependencies += "org.jsoup" % "jsoup" % "1.11.3"

libraryDependencies += guice
libraryDependencies += "us.feliscat" % "feliscatuszerolibraries_2.12" % "0.0.1"