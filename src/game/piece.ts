import { enumPieces } from './enum/enumPieces'
import { Position } from './position'
export class Piece {
  constructor (color: string, type:enumPieces, src:string) {
    this.color = color
    this.numMoves = 0
    this.type = type
    this.src = src

   
  }
  color: string
  numMoves:number
  type: enumPieces|undefined
  position:Position|undefined
  src:string
  
}
