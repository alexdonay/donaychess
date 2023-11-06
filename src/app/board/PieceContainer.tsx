"use client"
import Game from '@/game/Game';
import React, { useState } from 'react';
import Piece from './square/piece/Piece';

export default function PieceContainer() {
const initGame = new Game()
const initTable = initGame.board.squares
const [table,setTable] = useState([initTable])


const handlePieceMove = (id: number, newX: any, newY: any) => {
    
   
  };

   return (
    <div style={{ position: 'relative' }}>
     
    <Piece piece={initTable[0][0].piece} id={0} x={0} y={0} onMove={function (id: number, newX: any, newY: any): void {
               throw new Error('Function not implemented.');
           } }/>
    
     
    </div>
  );
}
