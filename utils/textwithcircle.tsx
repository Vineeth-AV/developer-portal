import React, { useEffect, useRef, useState } from 'react';

interface TextWithDashedRectProps {
  text: string;
  padding?: number; // Padding around the text
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  onMouseLeave?: () => void;
}

const TextWithDashedRect: React.FC<TextWithDashedRectProps> = ({
  text,
  padding = 5,
  onMouseEnter,
  onMouseLeave,
}) => {
  const textRef = useRef<SVGTextElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      // Get the bounding box of the text to determine its width and height
      const bbox = textRef.current.getBBox();
      setDimensions({
        width: bbox.width + padding * 2, // Add padding to both sides
        height: bbox.height + padding * 2, // Add padding to top and bottom
      });
    }
  }, [text, padding]);

  return (
    <svg width={dimensions.width} height={dimensions.height} style={{ overflow: 'visible' }}>
      {/* Draw the rectangle with dashed border */}
      <rect
        height={dimensions.height}
        width={dimensions.width}
        x={0}
        y={0}
        rx={10}
        fill="#ffffff"
        stroke="black"
        strokeWidth={1.5}
        strokeDasharray="4,3" // Adjust for smaller dashes
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Draw the text */}
      <text
        ref={textRef}
        x={dimensions.width / 2}
        y={dimensions.height / 2}
        dy=".33em"
        fontSize={12}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ pointerEvents: 'none' }}
      >
        {text}
      </text>
    </svg>
  );
};

export default TextWithDashedRect;
