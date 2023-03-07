import {Colors} from "./Colors";

export class Player {
   color:Colors;
   name: string;

    constructor(color: Colors, name: string) {
        this.color = color;
        this.name = name;
    }
}