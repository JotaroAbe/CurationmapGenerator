import {Fragment} from "./Fragment";
import {SvgDrawer} from "./SvgDrawer";

export class TreeData{
    url : string;
    fragments : Fragment[];

    constructor(url :string, frags : Fragment[]){
        this.url = url;
        this.fragments = frags;
        this.setFragLine();
        this.calcSvgY();
    }

    setFragLine(): void{
        this.fragments.forEach(frag => {
            frag.setLine()
        })
    }

    getSvgHeight(): number{
        let ret = 0;
        this.fragments.forEach(frag => {
            ret += frag.lines.length + SvgDrawer.FRAG_MARGIN ;
        });
        return ret * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING * 2;
    }

    calcSvgY(): void{
        let i = 0;
        this.fragments.forEach(frag => {
            frag.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
            frag.lines.forEach(line => {
                line.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
                i++;
            });
            i += SvgDrawer.FRAG_MARGIN;
        });
    }

    getMatomeTextSvgData(): [string, number][] {//text,y座標の配列
        const ret: [string,number][] = [];
        this.fragments.forEach(frag => {
            frag.lines.forEach(line => {
                    ret.push([line.text, line.svgY]);
            })
        });
        return ret;
    }

    getBoxSvgData(): [number, number][]{//height,yの配列
        const ret: [number,number][] = [];
        this.fragments.forEach(frag => {
            ret.push([(frag.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN)* SvgDrawer.CHAR_SIZE, frag.svgY - SvgDrawer.PADDING]);
        });
        return ret;
    }
}