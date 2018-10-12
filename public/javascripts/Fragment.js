import { SvgDrawer } from "./SvgDrawer";
var Fragment = /** @class */ (function () {
    function Fragment(text, links, uuid) {
        this.svgY = 0;
        this.lines = [];
        this.text = text;
        this.links = links;
        this.uuid = uuid;
    }
    Fragment.prototype.setLine = function () {
        this.lines = [];
        for (var i = 0; i * SvgDrawer.ONE_LINE_CHAR < this.text.length; i++) {
            this.lines.push(new Line(this.text.substr(i * SvgDrawer.ONE_LINE_CHAR, SvgDrawer.ONE_LINE_CHAR)));
        }
    };
    return Fragment;
}());
export { Fragment };
var Line = /** @class */ (function () {
    function Line(text) {
        this.svgY = 0;
        this.text = text;
    }
    return Line;
}());
