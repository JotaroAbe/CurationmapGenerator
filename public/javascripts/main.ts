import {Link} from "./Link";
import {Fragment} from "./Fragment";
import {TreeData} from "./TreeData";
import {SvgDrawer} from "./SvgDrawer";


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
const topDoc = map.documents[2];

//TreeData作成
const frags: Fragment[] = [];

for(const frag of topDoc.fragments){
    const links: Link[] = [];
    for(const link of frag.links){
        links.push(new Link(link.destText));
    }
    frags.push(new Fragment(frag.text, links));
}
const treeData = new TreeData(topDoc.url, frags);

//SVG描画

const matomeTextSvgData: [string, number][] = treeData.getMatomeTextSvgData();
const boxSvgData: [number, number][] = treeData.getBoxSvgData();

const svgHeight = treeData.getSvgHeight();
const svgWidth = window.innerWidth;

const svgDrawer = new SvgDrawer();
svgDrawer.drawSvg(svgWidth, svgHeight, boxSvgData, matomeTextSvgData);

