import * as d3 from "d3";
import {Document} from "./Document";
import {CurationMap} from "./CurationMap";

export class SvgDrawer{

    static CHAR_SIZE = 16;
    static PADDING = 20;
    static FRAG_MARGIN = 2;//行
    static BOX_MARGIN = 1;//行
    static ONE_LINE_CHAR = Math.round((window.innerWidth - SvgDrawer.PADDING) / 2.5 / SvgDrawer.CHAR_SIZE) ;

    drawSvg(cMap: CurationMap): void{

        const svgWidth = window.innerWidth;

        const treeData: Document = cMap.documents[0];
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

        const links = svg.selectAll("link")
            .data(treeData.getLinkSvgData())
            .enter()
            .append("line")
            .attr("class", "links")
            .attr("x1", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING )
            .attr("y1", d => d[0])
            .attr("x2", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y2", d => d[1]);


    }
}