import { Line } from "./Fragment";
import { SvgDrawer } from "./SvgDrawer";
var UuidTextPair = /** @class */ (function () {
    function UuidTextPair(uuid, text) {
        this.svgY = 0;
        this.lines = [];
        this.uuid = uuid;
        this.text = text;
        this.setLine();
    }
    UuidTextPair.prototype.setLine = function () {
        this.lines = [];
        for (var i = 0; i * SvgDrawer.ONE_LINE_CHAR < this.text.length; i++) {
            this.lines.push(new Line(this.text.substr(i * SvgDrawer.ONE_LINE_CHAR, SvgDrawer.ONE_LINE_CHAR)));
        }
    };
    return UuidTextPair;
}());
export { UuidTextPair };
