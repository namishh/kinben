import React, { useState, useEffect } from 'react';
export function Grid({ children }) {
  const [screenSize, setScreenSize] = useState(4);
  useEffect(() => {
    const updateDimension = () => {
      const w = window.innerWidth
      if (w > 1200) {
        setScreenSize(4)

      } else if (w > 100) {
        setScreenSize(2)
      }
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${screenSize}, 1fr)`,
        gridGap: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}

