import { SvgDrawer } from "./SvgDrawer";
var TreeData = /** @class */ (function () {
    function TreeData(url, frags) {
        this.url = url;
        this.fragments = frags;
        this.setFragLine();
        this.calcSvgY();
    }
    TreeData.prototype.setFragLine = function () {
        this.fragments.forEach(function (frag) {
            frag.setLine();
        });
    };
    TreeData.prototype.getSvgHeight = function () {
        var ret = 0;
        this.fragments.forEach(function (frag) {
            ret += frag.lines.length + SvgDrawer.FRAG_MARGIN;
        });
        return ret * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING * 2;
    };
    TreeData.prototype.calcSvgY = function () {
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
    TreeData.prototype.getMatomeTextSvgData = function () {
        var ret = [];
        this.fragments.forEach(function (frag) {
            frag.lines.forEach(function (line) {
                ret.push([line.text, line.svgY]);
            });
        });
        return ret;
    };
    TreeData.prototype.getBoxSvgData = function () {
        var ret = [];
        this.fragments.forEach(function (frag) {
            ret.push([(frag.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN) * SvgDrawer.CHAR_SIZE, frag.svgY - SvgDrawer.PADDING]);
        });
        return ret;
    };
    return TreeData;
}());
export { TreeData };
