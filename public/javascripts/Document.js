import { SvgDrawer } from "./SvgDrawer";
var Document = /** @class */ (function () {
    function Document(url, docNum, frags, uuid) {
        this.linkUuidTexts = [];
        this.url = url;
        this.docNum = docNum;
        this.fragments = frags;
        this.uuid = uuid;
        this.setFragLine();
        this.calcMatomeSvgY();
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
    Document.prototype.calcMatomeSvgY = function () {
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
    Document.prototype.calcDetailSvgY = function () {
        var i = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            uuidText.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
            uuidText.lines.forEach(function (line) {
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
    Document.prototype.getDetailTextSvgData = function () {
        var ret = [];
        this.linkUuidTexts.forEach(function (uuidText) {
            uuidText.lines.forEach(function (line) {
                ret.push([line.text, line.svgY]);
            });
        });
        return ret;
    };
    Document.prototype.getDetailBoxSvgData = function () {
        var ret = [];
        this.linkUuidTexts.forEach(function (uuidText) {
            ret.push([(uuidText.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN) * SvgDrawer.CHAR_SIZE, uuidText.svgY - SvgDrawer.PADDING]);
        });
        return ret;
    };
    Document.prototype.getLinkSvgData = function () {
        var _this = this;
        var ret = [];
        this.fragments.forEach(function (frag) {
            frag.links.forEach(function (link) {
                ret.push([frag.svgY + frag.lines.length * SvgDrawer.CHAR_SIZE / 2, _this.getDestLinkBoxSvgY(link.uuid)]);
            });
        });
        return ret;
    };
    Document.prototype.getDestLinkBoxSvgY = function (uuid) {
        var ret = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            if (uuidText.uuid == uuid) {
                ret = uuidText.svgY + uuidText.lines.length * SvgDrawer.CHAR_SIZE / 2;
            }
        });
        return ret;
    };
    Document.prototype.getDocText = function () {
        var ret = "";
        this.fragments.forEach(function (frag) {
            ret += frag.text;
        });
        return ret;
    };
    Document.prototype.hasFragTextInLinkUuidTexts = function (uuid) {
        var ret = false;
        this.linkUuidTexts.forEach(function (uuidText) {
            if (uuidText.uuid == uuid) {
                ret = true;
            }
        });
        return ret;
    };
    return Document;
}());
export { Document };
