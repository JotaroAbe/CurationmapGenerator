import {Fragment} from "./Fragment";

export class TreeData{
    url : string;
    fragments : Fragment[];

    static CHAR_SIZE = 15;
    static PADDING = 20;

    constructor(url :string, frags : Fragment[]){
        this.url = url;
        this.fragments = frags;
        this.setFragLine();
        this.calcSvgY();
    }

    setFragLine():void{
        this.fragments.forEach(function (frag) {
            frag.setLine()
        })
    }

    getLineSum(): number{
        let ret = 0;
        this.fragments.forEach(function (frag) {
            ret += frag.lineNumber;
        });
        return ret;
    }

    calcSvgY():void{
        let i = 0;
        this.fragments.forEach(function (frag) {
            frag.svgY = i * TreeData.CHAR_SIZE + TreeData.PADDING;
            frag.lines.forEach(function (line) {
                line.svgY = i * TreeData.CHAR_SIZE + TreeData.PADDING;
                i++;
            });
        });
    }

    getTextSvgData(): [string, number][] {//text,y座標の配列
        const ret: [string,number][] = [];
        this.fragments.forEach(function (frag) {
            frag.lines.forEach(function (line) {
                ret.push([line.text, line.svgY]);

            })
        });
        return ret;
    }

    getBoxSvgData():[number, number][]{
        const ret: [number,number][] = [];
        this.fragments.forEach(function (frag) {
            ret.push([frag.lineNumber * TreeData.CHAR_SIZE, frag.svgY - TreeData.PADDING]);
        });
        return ret;
    }
}