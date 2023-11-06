import Game from "./Game";
import { Move } from "./move";
import { Position } from "./position";

const game:Game = new Game()
game.movePiece(new Position(6,2),new Move(-2,0))
game.movePiece(new Position(1,3),new Move(2,0))
game.movePiece(new Position(4,2),new Move(-1,1))
game.drawChessBoard()