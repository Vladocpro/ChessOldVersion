import {Colors} from "./Colors";

export class Player {
   color: Colors;
   name: string;
   isCurrentPlayer: boolean;

    constructor(color: Colors, name: string, isCurrentPlayer: boolean) {
        this.color = color;
        this.name = name;
        this.isCurrentPlayer = isCurrentPlayer;
    }
}