import {Link} from "./Link";

export class Fragment {
    text : string;
    links : Link[];
    lineNumber : number = 0;

    svgY: number = 0;
    lines: Line[] = [];

    static ONE_LINE_CHAR = 50;
    static FRAG_MARGIN = 2;

    constructor(text : string, links : Link[]){
        this.text = text;
        this.links = links;
        this.lineNumber = Math.floor( this.text.length / Fragment.ONE_LINE_CHAR ) + Fragment.FRAG_MARGIN;//切り捨て
    }

    setLine():void{
        this.lines = [];
        for(let i = 0 ; i * Fragment.ONE_LINE_CHAR < this.text.length ; i++){
            this.lines.push(new Line(this.text.substr(i * Fragment.ONE_LINE_CHAR ,Fragment.ONE_LINE_CHAR)));
        }
        for(let i = 0 ; i < Fragment.FRAG_MARGIN ; i++){
            this.lines.push(new Line(""));//\n
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