import React, { ReactNode, useRef, useState } from 'react'
import { Piece as gamePiece } from '@/game/piece'
import Piece from './piece/Piece'

interface SquareProps {
  color: string;
  children?: ReactNode
}

export default function Square ({color, children}: SquareProps) {
  
  return (
    <div style={{background:color, width:'64px',height:'64px', position:'relative', zIndex:1}}>
      {children}
    </div>
  )
}
