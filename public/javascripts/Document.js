import { SvgDrawer } from "./SvgDrawer";
var Document = /** @class */ (function () {
    function Document(url, docNum, frags) {
        this.url = url;
        this.docNum = docNum;
        this.fragments = frags;
        this.setFragLine();
        this.calcSvgY();
    }
    Document.prototype.setFragLine = function () {
        this.fragments.forEach(function (frag) {
            frag.setLine();
        });
    };
    Document.prototype.getSvgHeight = function () {
        var ret = 0;
        this.fragments.forEach(function (frag) {
            ret += frag.lines.length + SvgDrawer.FRAG_MARGIN;
        });
        return ret * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING * 2;
    };
    Document.prototype.calcSvgY = function () {
        var i = 0;
        this.fragments.forEach(function (frag) {
            frag.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
            frag.lines.forEach(function (line) {
                line.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
                i++;
            });
            i += SvgDrawer.FRAG_MARGIN;
        });
    };
    Document.prototype.getMatomeTextSvgData = function () {
        var ret = [];
        this.fragments.forEach(function (frag) {
            frag.lines.forEach(function (line) {
                ret.push([line.text, line.svgY]);
            });
        });
        return ret;
    };
    Document.prototype.getMatomeBoxSvgData = function () {
        var ret = [];
        this.fragments.forEach(function (frag) {
            ret.push([(frag.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN) * SvgDrawer.CHAR_SIZE, frag.svgY - SvgDrawer.PADDING]);
        });
        return ret;
    };
    Document.prototype.getDetailBoxSvgData = function () {
        var ret = [];
        var i = 0;
        this.fragments.forEach(function (frag) {
            frag.lines.forEach(function (link) {
                ret.push([2 * SvgDrawer.CHAR_SIZE, i * SvgDrawer.CHAR_SIZE * 3]);
                i++;
            });
        });
        return ret;
    };
    return Document;
}());
export { Document };
