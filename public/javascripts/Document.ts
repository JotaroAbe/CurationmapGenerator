import {Fragment} from "./Fragment";
import {SvgDrawer} from "./SvgDrawer";

export class Document{
    url : string;
    fragments : Fragment[];
    docNum: number;

    constructor(url :string, docNum: number, frags : Fragment[]){
        this.url = url;
        this.docNum = docNum;
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

    getMatomeBoxSvgData(): [number, number][]{//height,yの配列
        const ret: [number,number][] = [];
        this.fragments.forEach(frag => {
            ret.push([(frag.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN)* SvgDrawer.CHAR_SIZE, frag.svgY - SvgDrawer.PADDING]);
        });
        return ret;
    }
    getDetailBoxSvgData(): [number, number][]{
        const ret: [number,number][] = [];
        let i = 0;
        this.fragments.forEach(frag => {
            frag.lines.forEach(link =>{
                ret.push([2 * SvgDrawer.CHAR_SIZE, i * SvgDrawer.CHAR_SIZE * 3]);
                i++;
            })
        });
        return ret;
    }
}