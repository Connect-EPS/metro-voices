"use client";
import MetroLine from "./components/metro-line";
import DashedGradientLine from "./components/dashed-gradient-line";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MetroLineTestPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // --- SYMMETRICAL CONFIGURATION ---
  const iconX = 0.12;
  const buttonGap = 0.175;
  const lineColors = ["#71B432", "#0091D1", "#CCB502"];

  const actions = [
    {
      label: "Send Message",
      icon: "./send.svg",
      borderColor: "#755D95",
      route: "/send",
      y: 0.53,
    },
    {
      label: "Read Message",
      icon: "./read.svg",
      borderColor: "#CE2626",
      route: "/read",
      y: 0.72,
    },
  ];

  // --- EQUAL HEIGHTS CONFIGURATION ---
  const itemHeight = dimensions.height * 0.06;
  const iconImgSize = `${itemHeight * 0.55}px`;

  const sharedDashedProps = {
    colors: lineColors,
    minDashWidth: dimensions.width * 0.008,
    maxDashWidth: dimensions.width * 0.012,
    dashHeight: dimensions.height * 0.008,
    gap: dimensions.width * 0.01,
    sigma: 0.05,
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
  };

  return (
    <div style={{
      width: dimensions.width,
      height: dimensions.height,
      position: "fixed", // Changed to fixed to ignore body margins
      top: 0,            // Pinned to the very top edge
      left: 0,           // Pinned to the very left edge
      background: "#f0f0f0",
      overflow: "hidden",
      margin: 0,
      padding: 0
    }}>
      {/* 1. Metro Line */}
      <MetroLine
        start={{ x: 0.0, y: 0.43 }}
        end={{ x: 1.0, y: 0.82 }}
        colors={lineColors}
        cornerRadius={40}
        midRatio={iconX}
        screenWidth={dimensions.width}
        screenHeight={dimensions.height}
      />

      {/* 2. Symmetrical Dashed Lines Logic */}
      {actions.map((action) => (
        <div key={`dashed-group-${action.label}`}>
          {/* Segment A: Left edge to Icon Center */}
          <DashedGradientLine
            start={{ x: 0, y: action.y }}
            end={{ x: iconX, y: 0 }}
            {...sharedDashedProps}
          />
          {/* Segment B: Icon Center to Button Start */}
          <DashedGradientLine
            start={{ x: iconX, y: action.y }}
            end={{ x: iconX + buttonGap + 0.025, y: 0 }}
            {...sharedDashedProps}
          />
        </div>
      ))}

      {/* 3. Interactive Layer */}
      {actions.map((action) => (
        <div key={action.label}>
          {/* Icon */}
          <div
            style={{
              position: "absolute",
              top: `${action.y * 100}%`,
              left: `${iconX * 100}%`,
              transform: "translate(-50%, -50%)",
              width: `${itemHeight}px`,
              height: `${itemHeight}px`,
              borderRadius: "50%",
              background: action.borderColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <img src={action.icon} alt="" style={{ width: iconImgSize, height: iconImgSize }} />
          </div>

          {/* Button */}
          <button
            onClick={() => router.push(action.route)}
            style={{
              position: "absolute",
              top: `${action.y * 100}%`,
              left: `${(iconX + buttonGap) * 100}%`,
              transform: "translateY(-50%)",
              height: `${itemHeight}px`,
              background: "#050756",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0 1.2rem",
              fontSize: `${dimensions.width * 0.045}px`,
              fontWeight: 600,
              cursor: "pointer",
              zIndex: 20,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {action.label}
          </button>
        </div>
      ))}

      {/* Logo */}
      <img
        src="./logo.png"
        alt="Logo"
        style={{
          position: "absolute",
          top: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
        }}
      />
    </div>
  );
}