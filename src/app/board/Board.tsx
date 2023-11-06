"use client";

import Square from "./square/Square";

export default function Board() {
  return (
    <div style={{display:'grid',  gridTemplateColumns: "repeat(8, 1fr)"}}>
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div key={rowIndex}>
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              color={(rowIndex + colIndex) % 2 === 0 ? "white" : "green"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
