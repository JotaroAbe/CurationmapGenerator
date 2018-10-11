import { Link } from "./Link";
import { Fragment } from "./Fragment";
import { TreeData } from "./TreeData";
import { SvgDrawer } from "./SvgDrawer";
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
var matomeTextSvgData = treeData.getMatomeTextSvgData();
var boxSvgData = treeData.getBoxSvgData();
var svgHeight = treeData.getSvgHeight();
var svgWidth = window.innerWidth;
var svgDrawer = new SvgDrawer();
svgDrawer.drawSvg(svgWidth, svgHeight, boxSvgData, matomeTextSvgData);
