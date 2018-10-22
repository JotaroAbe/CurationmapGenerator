import * as d3 from "d3";
var SvgDrawer = /** @class */ (function () {
    function SvgDrawer() {
    }
    SvgDrawer.prototype.drawSvg = function (cMap, hubNum) {
        var treeData = cMap.documents[hubNum];
        var svgWidth = window.innerWidth;
        var svgHeight = treeData.getSvgHeight();
        d3.select("svg").remove();
        var svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        var boxes = svg.selectAll("matomebox")
            .data(treeData.getMatomeBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", SvgDrawer.PADDING / 2)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", function (d) { return d[0]; }) //boxHeight
            .attr("stroke", "black")
            .attr("fill", "none");
        var texts = svg.selectAll("matometext")
            .data(treeData.getMatomeTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(function (d) { return d[0]; }) //text
            .attr("x", SvgDrawer.PADDING)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE + "px");
        var detailBoxes = svg.selectAll("detailbox")
            .data(treeData.getDetailBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", function (d) { return d[0]; }) //boxHeight
            .attr("stroke", function (d) { return d3.interpolateRainbow(d[1] / svgHeight); })
            .attr("fill", function (d) { return d3.interpolateRainbow(d[1] / svgHeight); });
        var detailTexts = svg.selectAll("detailtext")
            .data(treeData.getDetailTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(function (d) { return d[0]; }) //text
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE + "px");
        var lineFunction = d3.line()
            .x(function (d) { return d[0]; })
            .y(function (d) { return d[1]; })
            .curve(d3.curveBasis);
        var linkSvgData = treeData.getLinkSvgData();
        var i = 0;
        linkSvgData.forEach(function (link) {
            svg.append("path")
                .datum(link.getObject(i))
                .attr("class", "links")
                .attr("d", lineFunction)
                .attr("stroke", d3.interpolateRainbow(link.linkAxises[link.linkAxises.length - 1].y / svgHeight));
            //.attr("class", "links");
            i++;
        });
    };
    SvgDrawer.CHAR_SIZE = 16;
    SvgDrawer.PADDING = 20;
    SvgDrawer.FRAG_MARGIN = 2; //行
    SvgDrawer.BOX_MARGIN = 1; //行
    SvgDrawer.ONE_LINE_CHAR = Math.round((window.innerWidth - SvgDrawer.PADDING) / 2.5 / SvgDrawer.CHAR_SIZE);
    return SvgDrawer;
}());
export { SvgDrawer };
