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
    TreeData.prototype.getLineSum = function () {
        var ret = 0;
        this.fragments.forEach(function (frag) {
            ret += frag.lineNumber;
        });
        return ret;
    };
    TreeData.prototype.calcSvgY = function () {
        var i = 0;
        this.fragments.forEach(function (frag) {
            frag.svgY = i * TreeData.CHAR_SIZE + TreeData.PADDING;
            frag.lines.forEach(function (line) {
                line.svgY = i * TreeData.CHAR_SIZE + TreeData.PADDING;
                i++;
            });
        });
    };
    TreeData.prototype.getTextSvgData = function () {
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
            ret.push([frag.lineNumber * TreeData.CHAR_SIZE, frag.svgY - TreeData.PADDING]);
        });
        return ret;
    };
    TreeData.CHAR_SIZE = 15;
    TreeData.PADDING = 20;
    return TreeData;
}());
export { TreeData };
