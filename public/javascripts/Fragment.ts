import {Link} from "./Link";
import {SvgDrawer} from "./SvgDrawer";

export class Fragment {
    text : string;
    links : Link[];

    svgY: number = 0;
    lines: Line[] = [];

    constructor(text : string, links : Link[]){
        this.text = text;
        this.links = links;
    }

    setLine(): void{
        this.lines = [];
        for(let i = 0 ; i * SvgDrawer.ONE_LINE_CHAR < this.text.length ; i++){
            this.lines.push(new Line(this.text.substr(i * SvgDrawer.ONE_LINE_CHAR ,SvgDrawer.ONE_LINE_CHAR)));
        }
    }

}

class Line{
    text: string;
    svgY: number = 0;

    constructor(text: string){
        this.text = text;

    }
}