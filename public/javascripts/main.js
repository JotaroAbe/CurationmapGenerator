import { Link } from "./Link";
import { Fragment } from "./Fragment";
import { Document } from "./Document";
import { SvgDrawer } from "./SvgDrawer";
import { CurationMap } from "./CurationMap";
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
//CMap作成
var docs = [];
for (var _i = 0, _a = map.documents; _i < _a.length; _i++) {
    var doc = _a[_i];
    var frags = [];
    for (var _b = 0, _c = doc.fragments; _b < _c.length; _b++) {
        var frag = _c[_b];
        var links = [];
        for (var _d = 0, _e = frag.links; _d < _e.length; _d++) {
            var link = _e[_d];
            links.push(new Link(link.destDocNum, link.uuid));
        }
        frags.push(new Fragment(frag.text, links, frag.uuid));
    }
    docs.push(new Document(doc.url, doc.docNum, frags, doc.uuid));
}
var cMap = new CurationMap(docs);
console.log(cMap);
//SVG描画
var svgDrawer = new SvgDrawer();
svgDrawer.drawSvg(cMap);
