var Fragment = /** @class */ (function () {
    function Fragment(text, links) {
        this.lineNumber = 0;
        this.svgY = 0;
        this.lines = [];
        this.text = text;
        this.links = links;
        this.lineNumber = Math.floor(this.text.length / Fragment.ONE_LINE_CHAR) + Fragment.FRAG_MARGIN; //切り捨て
    }
    Fragment.prototype.setLine = function () {
        this.lines = [];
        for (var i = 0; i * Fragment.ONE_LINE_CHAR < this.text.length; i++) {
            this.lines.push(new Line(this.text.substr(i * Fragment.ONE_LINE_CHAR, Fragment.ONE_LINE_CHAR)));
        }
        for (var i = 0; i < Fragment.FRAG_MARGIN; i++) {
            this.lines.push(new Line("")); //\n
        }
    };
    Fragment.ONE_LINE_CHAR = 50;
    Fragment.FRAG_MARGIN = 2;
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
