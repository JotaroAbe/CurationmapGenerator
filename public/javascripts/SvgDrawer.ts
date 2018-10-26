import * as d3 from "d3";
import {Document} from "./Document";
import {CurationMap} from "./CurationMap";
import $ from "jquery";

export class SvgDrawer{

    static CHAR_SIZE = 16;
    static PADDING = 20;
    static FRAG_MARGIN = 2;//行
    static BOX_MARGIN = 1;//行
    static SVG_WIDTH = window.innerWidth;
    static ONE_LINE_CHAR = Math.round((SvgDrawer.SVG_WIDTH - SvgDrawer.PADDING) / 2.5 / SvgDrawer.CHAR_SIZE);

    drawMainSvg(cMap: CurationMap, hubNum: number): void{

        const treeData: Document = cMap.documents[hubNum];

        const svgWidth = SvgDrawer.SVG_WIDTH;
        const svgHeight = treeData.getSvgHeight();

        d3.select("svg").remove();

        const svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const matomeBoxSvgData = treeData.getMatomeBoxSvgData();
        const matomeTextSvgData = treeData.getMatomeTextSvgData();
        const detailBoxSvgData = treeData.getDetailBoxSvgData();
        const detailTextSvgData = treeData.getDetailTextSvgData();

        const matomeFragsSvgG = svg.append('g')
            .attr("class", "matomeFrags");
        const detailFragsSvgG = svg.append('g')
            .attr("class", "detailFrags");
        const linksSvgG = svg.append('g')
            .attr("class", "fragLinks");


        matomeBoxSvgData.forEach(matomeBox =>{

            const simpleMatomeFragSvgG = matomeFragsSvgG.append("g")
                .attr("id", matomeBox[2]);

            const fragMatomeBox: [number, number, string][] = [];
            fragMatomeBox.push(matomeBox);

            simpleMatomeFragSvgG.selectAll("matomebox")
                .data(fragMatomeBox)
                .enter()
                .append("rect")
                .attr("class", d => "matomeBoxes")
                .attr("x", SvgDrawer.PADDING / 2)
                .attr("y", d => d[1] )//svgY
                .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
                .attr("height", d => d[0] );//boxHeight

            const fragMatomeText: [string, number, string][] = [];
            matomeTextSvgData.forEach(matomeText => {
                if (matomeText[2] == matomeBox[2]) {
                    fragMatomeText.push(matomeText)
                }
            });
            simpleMatomeFragSvgG.selectAll("matometext")
                .data(fragMatomeText)
                .enter()
                .append("text")
                .attr("class", d => "matomeTexts " + d[2])//uuid
                .text(d => d[0])//text
                .attr("x", SvgDrawer.PADDING)
                .attr("y", d => d[1])//svgY
                .attr("font-size", SvgDrawer.CHAR_SIZE + "px");

        });

        detailBoxSvgData.forEach(detailBox => {

            const simpleDetailFragSvgG = detailFragsSvgG.append("g")
                .attr("id", detailBox[2]);

            const fragDetailBox: [number, number, string][] = [];
            fragDetailBox.push(detailBox);

            simpleDetailFragSvgG.selectAll("detailbox")
                .data(fragDetailBox)
                .enter()
                .append("rect")
                .attr("class", "detailBoxes")
                .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
                .attr("y", d => d[1] )//svgY
                .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
                .attr("height", d => d[0] )//boxHeight
                .attr("stroke", d => d3.interpolateRainbow(( d[1] * 2 + d[0] ) / 2 / svgHeight))
                .attr("fill", d => d3.interpolateRainbow(( d[1] * 2 + d[0] ) / 2 / svgHeight));

            const fragDetailText: [string, number, string][] = [];
            detailTextSvgData.forEach(detailText => {
                if (detailText[2] == detailBox[2]) {
                    fragDetailText.push(detailText)
                }
            });
            simpleDetailFragSvgG.selectAll("detailtext")
                .data(fragDetailText)
                .enter()
                .append("text")
                .attr("class", "detailTexts")
                .text(d => d[0])//text
                .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
                .attr("y", d => d[1])//svgY
                .attr("font-size", SvgDrawer.CHAR_SIZE+"px");
        });


        const lineFunction = d3.line()
            .x(d => d[0])
            .y(d => d[1])
            .curve(d3.curveBasis);

        const linkSvgData = treeData.getLinkSvgData();
        let i = 0;
        linkSvgData.forEach(link =>{
            linksSvgG.append("path")
                .datum(link.getObject(i))
                .attr("class", "links")
                .attr("d", lineFunction)
                .attr("stroke", d3.interpolateRainbow(link.linkAxises[link.linkAxises.length - 1].y / svgHeight));

            i++;
        });

        const me: SvgDrawer = this;
        $(".matomeFrags").children().on({
            "click" :function () {
                const cl : string = $(this).attr("id") as string;
                me.drawMatomeClickSvg(cl);
            },
            "mouseenter" :function () {
                $(this).children(".matomeBoxes").css("fill", "darkgray");

            },
            "mouseleave" :function () {
                $(this).children(".matomeBoxes").css("fill", "white");
            }
        });

    }

    drawMatomeClickSvg(uuid: string): void{
        alert($(window).scrollTop()+" " +uuid);
    }
}