import * as d3 from "d3";
import {Document} from "./Document";
import {CurationMap} from "./CurationMap";

export class SvgDrawer{

    static CHAR_SIZE = 16;
    static PADDING = 20;
    static FRAG_MARGIN = 2;//行
    static BOX_MARGIN = 1;//行
    static ONE_LINE_CHAR = 40;

    drawSvg(svgWidth: number, cMap: CurationMap): void{

        const treeData: Document = cMap.documents[1];
        const svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", treeData.getSvgHeight());

        const boxes =  svg.selectAll("matomebox")
            .data(treeData.getMatomeBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", SvgDrawer.PADDING / 2)
            .attr("y", d => d[1] )//svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", d => d[0] );///boxHeight


        const texts = svg.selectAll("matometext")
            .data(treeData.getMatomeTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(d => d[0])//text
            .attr("x", SvgDrawer.PADDING)
            .attr("y", d => d[1])//svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE+"px");

        const detailBoxes =  svg.selectAll("detailbox")
            .data(treeData.getDetailBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", d => d[1] )//svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", d => d[0] );///boxHeight

        const detailTexts = svg.selectAll("detailtext")
            .data(treeData.getDetailTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(d => d[0])//text
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", d => d[1])//svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE+"px");

    }
}