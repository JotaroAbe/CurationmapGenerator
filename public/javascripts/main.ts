import {Link} from "./Link";
import {Fragment} from "./Fragment";
import {Document} from "./Document";
import {SvgDrawer} from "./SvgDrawer";
import {CurationMap} from "./CurationMap";


//JSONパース
const jsonDoc: any = document.getElementById("jsontext");
let jsonText :string;
if(jsonDoc != null){
    jsonText = jsonDoc.textContent;
}else{
    jsonText = "{}";
}

const map: any = JSON.parse(jsonText);

//並べ替え
map.documents.sort(function (a: any, b: any) {
        return (a.hub > b.hub) ? -1 : 1;
    }

);

//まとめ文書特定

//CMap作成
const docs: Document[] = [];
for(const doc of map.documents) {
    const frags: Fragment[] = [];
    for (const frag of doc.fragments) {
        const links: Link[] = [];
        for (const link of frag.links) {
            links.push(new Link(link.destDocNum, link.uuid));
        }
        frags.push(new Fragment(frag.text, links, frag.uuid));
    }
    docs.push(new Document(doc.url, doc.docNum, frags, doc.uuid));
}

const cMap: CurationMap = new CurationMap(docs);

console.log(cMap);
//SVG描画

const svgWidth = window.innerWidth;

const svgDrawer = new SvgDrawer();
svgDrawer.drawSvg(svgWidth, cMap);

