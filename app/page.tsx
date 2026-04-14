"use client";
import MetroLine from './components/metro-line';
import DashedGradientLine from './components/dashed-gradient-line';
import { useState, useEffect } from 'react';

export default function MetroLineTestPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const lineColors = ["#71B432", "#0091D1", "#CCB502"];

  return (
    <div style={{ width: dimensions.width, height: dimensions.height, position: 'relative', background: '#f0f0f0' }}>

      <DashedGradientLine
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.2, y: 0.5 }}
        colors={['#71B432', '#0091D1', '#CCB502']}
        dashWidth={6}
        minDashHeight={4}
        maxDashHeight={24}
        gap={6}
        sigma={0.15}
        screenWidth={400}
        screenHeight={40}
      />

      <MetroLine
        start={{ x: 0.0, y: 0.45 }}
        end={{ x: 1.0, y: 0.85 }}
        colors={lineColors}
        cornerRadius={48}
        midRatio={0.20}
        screenWidth={dimensions.width}
        screenHeight={dimensions.height}
      />
    </div>

  );
}