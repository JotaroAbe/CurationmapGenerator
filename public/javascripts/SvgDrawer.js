import * as d3 from "d3";
var SvgDrawer = /** @class */ (function () {
    function SvgDrawer() {
    }
    SvgDrawer.prototype.drawSvg = function (svgWidth, cMap) {
        var treeData = cMap.documents[1];
        var svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", treeData.getSvgHeight());
        var boxes = svg.selectAll("matomebox")
            .data(treeData.getMatomeBoxSvgData())
            .enter()
            .append("rect")
            .attr("class", "boxes")
            .attr("x", SvgDrawer.PADDING / 2)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("width", SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING / 2)
            .attr("height", function (d) { return d[0]; }); ///boxHeight
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
            .attr("height", function (d) { return d[0]; }); ///boxHeight
        var detailTexts = svg.selectAll("detailtext")
            .data(treeData.getDetailTextSvgData())
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(function (d) { return d[0]; }) //text
            .attr("x", svgWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2)
            .attr("y", function (d) { return d[1]; }) //svgY
            .attr("font-size", SvgDrawer.CHAR_SIZE + "px");
    };
    SvgDrawer.CHAR_SIZE = 16;
    SvgDrawer.PADDING = 20;
    SvgDrawer.FRAG_MARGIN = 2; //行
    SvgDrawer.BOX_MARGIN = 1; //行
    SvgDrawer.ONE_LINE_CHAR = 40;
    return SvgDrawer;
}());
export { SvgDrawer };
