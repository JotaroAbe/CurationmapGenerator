import * as d3 from "d3";
import {Document} from "./Document";
import {CurationMap} from "./CurationMap";

export class SvgDrawer{

    static CHAR_SIZE = 16;
    static PADDING = 20;
    static FRAG_MARGIN = 2;//行
    static BOX_MARGIN = 1;//行
    static ONE_LINE_CHAR = Math.round((window.innerWidth - SvgDrawer.PADDING) / 2.5 / SvgDrawer.CHAR_SIZE) ;

    drawSvg(cMap: CurationMap, hubNum: number): void{

        const treeData: Document = cMap.documents[hubNum];

        const svgWidth = window.innerWidth;
        const svgHeight = treeData.getSvgHeight();

        d3.select("svg").remove();

        const svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const boxes =  svg.selectAll("matomebox")
            .data(treeData.getMatomeBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", SvgDrawer.PADDING / 2)
            .attr("y", d => d[1] )//svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", d => d[0] )//boxHeight
            .attr("stroke", "black")
            .attr("fill", "none");


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
            .attr("height", d => d[0] )//boxHeight
            .attr("stroke", d => d3.interpolateRainbow(d[1] / svgHeight))
            .attr("fill", d => d3.interpolateRainbow(d[1] / svgHeight));

        const detailTexts = svg.selectAll("detailtext")
            .data(treeData.getDetailTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(d => d[0])//text
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", d => d[1])//svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE+"px");


        const lineFunction = d3.line()
            .x(d => d[0])
            .y(d => d[1])
            .curve(d3.curveBasis);

        const linkSvgData = treeData.getLinkSvgData();
        let i = 0;
        linkSvgData.forEach(link =>{
        svg.append("path")
            .datum(link.getObject(i))
            .attr("class", "links")
            .attr("d", lineFunction)
            .attr("stroke", d3.interpolateRainbow(link.linkAxises[link.linkAxises.length - 1].y / svgHeight));
            //.attr("class", "links");

            i++;
        });

    }
}