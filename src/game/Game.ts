import Board from "./board"
import { enumColor } from "./enum/enumColor"
import { enumPieces } from "./enum/enumPieces"
import { Move } from "./move"
import { Piece } from "./piece"
import Player from "./player"
import { Position } from "./position"
import pieces from '../../public/pieces/pieces'

export default class Game{
    board:Board
    player1:Player
    player2:Player
    blackKing:Piece = new Piece(enumColor.black,enumPieces.king,pieces.kingB)
    whiteKing:Piece = new Piece(enumColor.white,enumPieces.king,pieces.kingW)

    constructor(){
        this.board= new Board()
        this.initBoard()
        this.player1 = new Player(undefined, undefined)
        this.player2 = new Player(undefined, undefined)

    }

    initBoard():void{
        this.board.squares[0][0].piece =new Piece(enumColor.black,enumPieces.hook, pieces.rookB.src)
        this.board.squares[0][1].piece =new Piece(enumColor.black,enumPieces.horse, pieces.knightB.src)
        this.board.squares[0][2].piece =new Piece(enumColor.black,enumPieces.bishop, pieces.bishopB.src)
        this.board.squares[0][3].piece =new Piece(enumColor.black,enumPieces.queen, pieces.queenB.src)
        this.board.squares[0][4].piece =new Piece(enumColor.black,enumPieces.king, pieces.kingB.src)
        this.board.squares[0][5].piece =new Piece(enumColor.black,enumPieces.bishop, pieces.bishopB.src)
        this.board.squares[0][6].piece =new Piece(enumColor.black,enumPieces.horse, pieces.knightB.src)
        this.board.squares[0][7].piece =new Piece(enumColor.black,enumPieces.hook, pieces.rookB.src)
        this.board.squares[1][0].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][1].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][2].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][3].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][4].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][5].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][6].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        this.board.squares[1][7].piece =new Piece(enumColor.black,enumPieces.pawn, pieces.pawnB.src)
        
        this.board.squares[7][0].piece =new Piece(enumColor.white,enumPieces.hook, pieces.rookW.src)
        this.board.squares[7][1].piece =new Piece(enumColor.white,enumPieces.horse, pieces.knightW.src)
        this.board.squares[7][2].piece =new Piece(enumColor.white,enumPieces.bishop, pieces.bishopW.src)
        this.board.squares[7][3].piece =new Piece(enumColor.white,enumPieces.queen, pieces.queenW.src)
        this.board.squares[7][4].piece =new Piece(enumColor.white,enumPieces.king, pieces.kingW.src)
        this.board.squares[7][5].piece =new Piece(enumColor.white,enumPieces.bishop, pieces.bishopW.src)
        this.board.squares[7][6].piece =new Piece(enumColor.white,enumPieces.horse, pieces.knightW.src)
        this.board.squares[7][7].piece =new Piece(enumColor.white,enumPieces.hook, pieces.rookW.src)
        this.board.squares[6][0].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][1].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][2].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][3].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][4].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][5].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][6].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        this.board.squares[6][7].piece =new Piece(enumColor.white,enumPieces.pawn,pieces.pawnW.src)
        
    }

    drawChessBoard(): void {
        console.log('0 1 2 3 4 5 6 7')
        for (let row = 0; row < 8; row++) {
            let rowString = row.toString() + '';
            for (let col = 0; col < 8; col++) {
                const square = this.board.squares[row][col];
                if (square.piece) {
                    const pieceInitial = square.piece.type?.charAt(0);
                    rowString += pieceInitial + ' ';
                } else {
                    rowString += '  ';
                }
            }
            console.log(rowString);
        }
    }

    getPiece(position:Position):Piece | undefined{
        return this.board.squares[position.x][position.y].piece
    }

    private move(position:Position,move:Move):void{
        const piece = this.board.squares[position.x][position.y].piece
        const newPositionX = position.x + move.x
        const newPositionY = position.y + move.y
        
            if(piece){
                piece.numMoves++        
                this.board.squares[newPositionX][newPositionY].piece = piece
                this.board.squares[position.x][position.y].piece = undefined
                if(piece.type === enumPieces.king){
                    if(piece.color === enumColor.black){
                        this.blackKing.position = new Position(newPositionX,newPositionY)
                    }else if(piece.color === enumColor.white){
                        this.whiteKing.position = new Position(newPositionX,newPositionY)
                    }
                }
                
            }
    }

    movePiece(position:Position, move:Move):void{
        const piece:Piece | undefined = this.getPiece(position)
        
        if(this.isMoveOnTable(position,move) && (this.isSquareEmpty(position,move)|| this.isSquareOtherColor(position,move))){
            if(piece?.type === enumPieces.hook && this.hookMoveRule(position,move)){
                this.move(position,move)
            }
            if(piece?.type === enumPieces.bishop && this.bishopMoveRule(position,move)){
                this.move(position,move)
            }
            if(piece?.type === enumPieces.queen && this.queenMoveRule(position,move)){
                this.move(position,move)
            }
            if(piece?.type === enumPieces.king && this.kingMoveRule(move) && !this.isKingOnAttack(position)){
                this.move(position,move)
            }
            if(piece?.type === enumPieces.horse && this.horseMoveRule(move)){
                this.move(position,move)
            }
            
            if(piece?.type === enumPieces.pawn && (piece?.type === enumPieces.pawn && (this.pawnMoveRule(position,move)=== true|| this.pawnAttackRule(position,move)===true))){
                this.move(position,move)
            }
        }
    }

    isMoveOnTable(position:Position,move:Move):boolean{
        const newPositionX = position.x + move.x
        const newPositionY = position.y + move.y
        return (newPositionX >= 0 && newPositionX <= 8 && newPositionY >= 0 && newPositionY<=8)
    }

    isSquareEmpty(position:Position,move:Move):boolean{
        const newPositionX = position.x + move.x
        const newPositionY = position.y + move.y
        if(this.board.squares[newPositionX][newPositionY].piece === undefined){
            return true
        }
        return false
    }

    isSquareOtherColor(position:Position, move:Move):boolean{
        const piece:Piece | undefined = this.board.squares[position.x][position.y].piece
        const newPositionX = position.x + move.x
        const newPositionY = position.y + move.y
        if(piece !== undefined){
            if(piece.color !== this.board.squares[newPositionX][newPositionY].piece?.color){
                return true
            }
        }
            return false
        
    }

    hookMoveRule(position:Position, move:Move):boolean{
        const newPositionX = position.x + move.x
        const newPositionY = position.y + move.y
        if(move.x === 0){
            for(let y = 0; y< newPositionY; y++){
                if(this.board.squares[position.x][y].piece != undefined){
                    return false
                }
            }
        }
        if(move.y === 0){
            for(let x = 0; x< newPositionX; x++){
                if(this.board.squares[x][newPositionX].piece != undefined){
                    return false
                }
            }
        }
        if(move.y!=0&&move.x!=0){
            return false
        }
        return true
    }

    bishopMoveRule(position:Position,move:Move):boolean{
        const deltaX = Math.abs(move.x);
        const deltaY = Math.abs(move.y);
    
        if (deltaX === deltaY) {
            const directionX = move.x > 0 ? 1 : -1;
            const directionY = move.y > 0 ? 1 : -1;
            let x = position.x + directionX;
            let y = position.y + directionY;
    
            while (x !== position.x + move.x && y !== position.y + move.y) {
                if (this.board.squares[x][y].piece !== undefined) {
                    return false;
                }
                x += directionX;
                y += directionY;
            }
            return true;
        }
        return false;
    }

    isKingOnAttack(squarePosition:Position):boolean{
        const king:Piece | undefined = this.getPiece(squarePosition)
        let isKingInCheck:boolean = false
        for(let x = 0; x<9; x++){
            for(let y = 0; y < 9; y++){
                const piece:Piece | undefined = this.board.squares[x][y].piece
                if(piece?.color!== king?.color){
                    const piecePosition = new Position(x,y)
                    const targetMove = new Move(squarePosition.x - x, squarePosition.y - y)
                    
                    if(piece?.type === enumPieces.hook){
                        if(this.hookMoveRule(piecePosition,targetMove)){
                            isKingInCheck = true
                        }
                    }
                    if(piece?.type === enumPieces.horse){
                        if(this.horseMoveRule(targetMove)){
                            isKingInCheck = true
                        }
                    }
                    if(piece?.type === enumPieces.bishop){
                        if(this.bishopMoveRule(piecePosition,targetMove)){
                            isKingInCheck = true
                        }
                    }
                    if(piece?.type === enumPieces.king){
                        if(this.kingMoveRule(targetMove)){
                            isKingInCheck = true
                        }
                    }
                    if(piece?.type === enumPieces.queen){
                        if(this.kingMoveRule(targetMove)){
                            isKingInCheck = true
                        }
                    }
                    if(piece?.type === enumPieces.pawn){
                        if(this.pawnAttackRule(piecePosition,targetMove)){
                            isKingInCheck = true
                        }
                    }
                }
            }
        }
        return isKingInCheck
    }

    kingMoveRule(move:Move):boolean{
              
        if(move.x > 1 || move.x<-1 || move.y>1 || move.y <-1 ){
            return false
        }
        return true
    }

    queenMoveRule(position:Position, move:Move):boolean{

        if(!this.bishopMoveRule(position,move) || !this.hookMoveRule(position,move)){
            return false
        }
        return true
    }
    
    horseMoveRule(move:Move):boolean{
        const deltaX = Math.abs(move.x);
        const deltaY = Math.abs(move.y);
        if ((deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2)) {
            return true
        }
        return false
    }
    
    pawnMoveRule(position: Position, move: Move): boolean {
        const piece: Piece | undefined = this.getPiece(position);
        
        if (piece?.color === enumColor.black) {
            if (move.x === 1 && move.y === 0) {
                return true;
            }
            if (move.x === 2 && move.y === 0 && piece.numMoves === 0) {
                return true;
            }
           
        } else {
            if (move.x === -1 && move.y === 0) {
                return true;
            }
            if (move.x === -2 && move.y === 0 && piece?.numMoves === 0) {
                return true;
            }
           
        }
    
        return false;
    }

    pawnAttackRule(position:Position, move:Move):boolean{
        const piece: Piece | undefined = this.getPiece(position);
        if (piece?.color === enumColor.black) {
            if (Math.abs(move.y) === 1 && move.x === 1) {
                const newPosition: Position = new Position(position.x + move.x, position.y + move.y);
                const targetSquare = this.board.squares[newPosition.x][newPosition.y];
                if (targetSquare.piece && targetSquare.piece.color !== piece.color) {
                    return true;
                }
            }
        }else{
            if (Math.abs(move.y) === 1 && move.x === -1) {
                const newPosition: Position = new Position(position.x + move.x, position.y + move.y);
                const targetSquare = this.board.squares[newPosition.x][newPosition.y];
                if (targetSquare.piece && targetSquare.piece.color !== piece?.color) {
                    return true;
                }
            }

        }
        return false

    }
}
    
    
    
    
    
    
