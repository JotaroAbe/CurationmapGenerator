import {Fragment} from "./Fragment";
import {SvgDrawer} from "./SvgDrawer";
import {UuidTextPair} from "./UuidTextPair";

export class Document{
    url : string;
    fragments : Fragment[];
    docNum: number;
    uuid: string;

    linkUuidTexts: UuidTextPair[] = [];

    constructor(url :string, docNum: number, frags : Fragment[], uuid: string){
        this.url = url;
        this.docNum = docNum;
        this.fragments = frags;
        this.uuid = uuid;
        this.setFragLine();
        this.calcMatomeSvgY();
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

    calcMatomeSvgY(): void{
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

    calcDetailSvgY(): void{
        let i = 0;
        this.linkUuidTexts.forEach( uuidText =>{
            uuidText.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
            uuidText.lines.forEach(line => {
                line.svgY = i * SvgDrawer.CHAR_SIZE + SvgDrawer.PADDING;
                i++;
            });
            i += SvgDrawer.FRAG_MARGIN;

        })
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

    getDetailTextSvgData(): [string, number][] {//text,y座標の配列
        const ret: [string,number][] = [];
        this.linkUuidTexts.forEach(uuidText => {
            uuidText.lines.forEach(line => {
                ret.push([line.text, line.svgY]);
            })
        });
        return ret;
    }

    getDetailBoxSvgData(): [number, number][]{
        const ret: [number,number][] = [];
        this.linkUuidTexts.forEach( uuidText => {
            ret.push([(uuidText.lines.length + SvgDrawer.FRAG_MARGIN - SvgDrawer.BOX_MARGIN)* SvgDrawer.CHAR_SIZE, uuidText.svgY - SvgDrawer.PADDING]);
        });

        return ret;
    }

    getLinkSvgData(): [number, number][]{
        const ret: [number, number][] = [];
        this.fragments.forEach(frag =>{
            frag.links.forEach(link =>{
                ret.push([frag.svgY + frag.lines.length * SvgDrawer.CHAR_SIZE / 2, this.getDestLinkBoxSvgY(link.uuid)]);
            })
        });
        return ret;
    }

    getDestLinkBoxSvgY(uuid: string): number{
        let ret: number = 0;
        this.linkUuidTexts.forEach(uuidText =>{
            if(uuidText.uuid == uuid){
                ret = uuidText.svgY + uuidText.lines.length * SvgDrawer.CHAR_SIZE / 2;
            }
        });
        return ret;
    }

    getDocText():string{
        let ret = "";
        this.fragments.forEach(frag =>{
            ret += frag.text;
        });
        return ret;
    }

    hasFragTextInLinkUuidTexts(uuid: string): boolean{
        let ret = false;
        this.linkUuidTexts.forEach(uuidText=> {
            if(uuidText.uuid == uuid){
                ret = true;
            }
        });
        return ret;
    }
}