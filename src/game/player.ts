import { enumColor } from "./enum/enumColor";

export default class Player{
    color:enumColor | undefined
    name:string | undefined
    constructor(color:enumColor|undefined, name:string|undefined){
        this.color = color
        this.name = name
    }

}