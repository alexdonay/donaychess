import { Position } from "./position";
import Square from "./square";

export default class Board {
    squares: Square[][] = [];

    constructor() {
        this.squares = []
        this.boardInit();
    }

    boardInit() {
        for (let i = 0; i < 8; i++) {
            const squareRow: Square[] = []
            for (let y = 0; y < 8; y++) {
                const square = new Square(undefined);
                squareRow.push(square)
            }
            this.squares.push(squareRow)
        }
    }
    isEmptyPosition(position:Position):boolean{
        return (this.squares[position.x][position.y].piece === undefined)
    }

}
