
import * as d3 from "d3";
import {Link} from "./Link";
import {Fragment} from "./Fragment";
import {TreeData} from "./TreeData";


const svgWidth = window.innerWidth;
const padding = TreeData.PADDING;
const charaSize = TreeData.CHAR_SIZE;
const ONE_LINE_CHAR = Fragment.ONE_LINE_CHAR;

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

const textSvgData: [string, number][] = treeData.getTextSvgData();
const boxSvgData: [number, number][] = treeData.getBoxSvgData();

const svgHeight = (treeData.getLineSum() + treeData.fragments.length ) * charaSize + (padding * 2);


const svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const boxes =  svg.selectAll("rect")
    .data(boxSvgData)
    .enter()
    .append("rect")
    .attr("x", padding / 2)
    .attr("y", function(d) {

        return d[1];//svgY
    })
    .attr("width", ONE_LINE_CHAR * charaSize + padding / 2)
    .attr("height", function (d) {
        return d[0];//boxHeight
    })
    .attr("fill", "none")
    .attr("stroke", "blue");


const texts = svg.selectAll("text")
    .data(textSvgData)
    .enter()
    .append("text")
    .text(function(d) {
        return d[0];//text
    })
    .attr("x", padding)
    .attr("y", function(d) {
        return d[1];//svgY
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", charaSize+"px");
