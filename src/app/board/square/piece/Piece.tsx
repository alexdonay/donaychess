import { useState, useRef, useEffect } from 'react';
import { Piece as gamePiece } from '@/game/piece';

interface PieceProps {
  piece: gamePiece;
  id: number
  x: number
  y: number
  onMove: (id: number, newX: any, newY: any) => void
}

export default function Piece({ piece }: PieceProps) {
  const pieceRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initPosition, setInitPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      console.log(pieceRef)
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setInitPosition({ x: position.x, y: position.y });
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        ref={pieceRef}
        style={{
          width: '64px',
          height: '64px',
          display: 'flex',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {piece?.src !== undefined ? (
          <img width={'64px'} src={piece?.src} alt='Piece' />
        ) : (
          <div
            style={{
              width: '25px',
              height: '25px',
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
