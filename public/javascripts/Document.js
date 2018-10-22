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
        var matomeHeight = 0;
        this.fragments.forEach(function (frag) {
            matomeHeight += frag.lines.length + SvgDrawer.FRAG_MARGIN;
        });
        var detailHeight = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            detailHeight += uuidText.lines.length + SvgDrawer.FRAG_MARGIN;
        });
        var ret = 0;
        if (matomeHeight > detailHeight) {
            ret = matomeHeight;
        }
        else {
            ret = detailHeight;
        }
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
        var matomeLineNum = 0;
        this.fragments.forEach(function (frag) {
            matomeLineNum += frag.lines.length + SvgDrawer.FRAG_MARGIN;
        });
        var detailLineNum = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            detailLineNum += uuidText.lines.length;
        });
        var detailMargin;
        if (matomeLineNum > detailLineNum) {
            detailMargin = Math.floor((matomeLineNum - detailLineNum) / this.linkUuidTexts.length);
        }
        else {
            detailMargin = SvgDrawer.FRAG_MARGIN;
        }
        var i = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            uuidText.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
            uuidText.lines.forEach(function (line) {
                line.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
                i++;
            });
            i += detailMargin;
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
                //ret.push([frag.svgY + frag.lines.length * SvgDrawer.CHAR_SIZE / 2, this.getDestLinkBoxSvgY(link.uuid)]);
                var axises = [];
                var x1 = SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
                var y1 = frag.svgY + frag.lines.length * SvgDrawer.CHAR_SIZE / 2 - SvgDrawer.CHAR_SIZE / 2;
                var x2 = window.innerWidth - SvgDrawer.ONE_LINE_CHAR * SvgDrawer.CHAR_SIZE - SvgDrawer.PADDING * 2;
                var y2 = _this.getDestLinkBoxSvgY(link.uuid);
                axises.push(new Axis(x1, y1));
                axises.push(new Axis((x1 * 1.5 + x2 * 0.5) / 2, y1));
                axises.push(new Axis((x1 * 0.5 + x2 * 1.5) / 2, y2));
                axises.push(new Axis(x2, y2));
                ret.push(new LinkSvgData(axises));
            });
        });
        return ret;
    };
    Document.prototype.getDestLinkBoxSvgY = function (uuid) {
        var ret = 0;
        this.linkUuidTexts.forEach(function (uuidText) {
            if (uuidText.uuid == uuid) {
                ret = uuidText.svgY + uuidText.lines.length * SvgDrawer.CHAR_SIZE / 2 - SvgDrawer.CHAR_SIZE / 2;
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
var LinkSvgData = /** @class */ (function () {
    function LinkSvgData(linkAxis) {
        this.linkAxises = linkAxis;
    }
    LinkSvgData.prototype.getObject = function (i) {
        var ret = [];
        this.linkAxises.forEach(function (axis) {
            ret.push([axis.x, axis.y]);
        });
        return ret;
    };
    return LinkSvgData;
}());
export { LinkSvgData };
var Axis = /** @class */ (function () {
    function Axis(x, y) {
        this.x = x;
        this.y = y;
    }
    return Axis;
}());
export { Axis };
