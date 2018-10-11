import * as d3 from "d3";

export class SvgDrawer{

    static CHAR_SIZE = 16;
    static PADDING = 20;
    static FRAG_MARGIN = 2;//行
    static BOX_MARGIN = 1;//行
    static ONE_LINE_CHAR = 40;

    drawSvg(svgWidth: number, svgHeight: number, boxSvgData: [number, number][], matomeTextSvgData: [string, number][]): void{
        const svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const boxes =  svg.selectAll("rect")
            .data(boxSvgData)
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", SvgDrawer.PADDING / 2)
            .attr("y", d => d[1] )//svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", d => d[0] );///boxHeight


        const texts = svg.selectAll("text")
            .data(matomeTextSvgData)
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(d => d[0])//text
            .attr("x", SvgDrawer.PADDING)
            .attr("y", d => d[1])//svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE+"px");
    }
}