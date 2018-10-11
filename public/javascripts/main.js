import * as d3 from "d3";
import { Link } from "./Link";
import { Fragment } from "./Fragment";
import { TreeData } from "./TreeData";
var svgWidth = window.innerWidth;
var padding = TreeData.PADDING;
var charaSize = TreeData.CHAR_SIZE;
var ONE_LINE_CHAR = Fragment.ONE_LINE_CHAR;
//JSONパース
var jsonDoc = document.getElementById("jsontext");
var jsonText;
if (jsonDoc != null) {
    jsonText = jsonDoc.textContent;
}
else {
    jsonText = "{}";
}
var map = JSON.parse(jsonText);
//並べ替え
map.documents.sort(function (a, b) {
    return (a.hub > b.hub) ? -1 : 1;
});
//まとめ文書特定
var topDoc = map.documents[2];
//TreeData作成
var frags = [];
for (var _i = 0, _a = topDoc.fragments; _i < _a.length; _i++) {
    var frag = _a[_i];
    var links = [];
    for (var _b = 0, _c = frag.links; _b < _c.length; _b++) {
        var link = _c[_b];
        links.push(new Link(link.destText));
    }
    frags.push(new Fragment(frag.text, links));
}
var treeData = new TreeData(topDoc.url, frags);
//SVG描画
var textSvgData = treeData.getTextSvgData();
var boxSvgData = treeData.getBoxSvgData();
var svgHeight = (treeData.getLineSum() + treeData.fragments.length) * charaSize + (padding * 2);
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
var boxes = svg.selectAll("rect")
    .data(boxSvgData)
    .enter()
    .append("rect")
    .attr("x", padding / 2)
    .attr("y", function (d) {
    return d[1]; //svgY
})
    .attr("width", ONE_LINE_CHAR * charaSize + padding / 2)
    .attr("height", function (d) {
    return d[0]; //boxHeight
})
    .attr("fill", "none")
    .attr("stroke", "blue");
var texts = svg.selectAll("text")
    .data(textSvgData)
    .enter()
    .append("text")
    .text(function (d) {
    return d[0]; //text
})
    .attr("x", padding)
    .attr("y", function (d) {
    return d[1]; //svgY
})
    .attr("font-family", "sans-serif")
    .attr("font-size", charaSize + "px");
