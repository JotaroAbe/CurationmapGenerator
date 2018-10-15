import {Line} from "./Fragment";
import {SvgDrawer} from "./SvgDrawer";

export class UuidTextPair {

    uuid: string;
    text: string;
    svgY: number = 0;

    lines: Line[] = [];
    constructor(uuid: string, text: string){
        this.uuid = uuid;
        this.text = text;
        this.setLine();
    }

    setLine(): void{
        this.lines = [];
        for(let i = 0 ; i * SvgDrawer.ONE_LINE_CHAR < this.text.length ; i++){
            this.lines.push(new Line(this.text.substr(i * SvgDrawer.ONE_LINE_CHAR ,SvgDrawer.ONE_LINE_CHAR)));
        }
    }
}