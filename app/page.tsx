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

  const lineColors = ["#71B432", "#0091D1", "#CCB502"];

  const fans = [
    { startX: 0, endX: 0.17 },
    { startX: 0.27, endX: 0.44 },
  ];
  const startYs = [0.55, 0.7];
  const iconSize = `${dimensions.height * 0.03}px`;
  const sharedDashedProps = {
    colors: ["#71B432", "#0091D1", "#CCB502"],
    minDashWidth: 4,
    maxDashWidth: 8,
    dashHeight: 8,
    gap: 6,
    sigma: 0.15,
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
  };
  const actions = [
    {
      icon: (
        <img
          src="./send.svg"
          alt="Send Icon"
          style={{ width: iconSize, height: iconSize }}
        />
      ),
      label: "Send Message",
      borderColor: "#755D95",
      route: "/send",
    },
    {
      icon: (
        <img
          src="./read.svg"
          alt="Read Icon"
          style={{ width: iconSize, height: iconSize }}
        />
      ),
      label: "Read Message",
      borderColor: "#CE2626",
      route: "/read",
    },
  ];

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        position: "relative",
        background: "#f0f0f0",
        //overflow: 'hidden'
      }}
    >
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

      <div
        style={{
          position: "absolute",
          top: `${dimensions.height * 0.625}px`,
          left: `${dimensions.width * 0.44}px`,
          transform: "translate(-50%, -50%)",
          display: "flex",
          zIndex: 10,
          flexDirection: "column",
          gap: `${dimensions.height * 0.1}px`,
        }}
      >
        {actions.map(({ icon, label, borderColor, route }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: `${dimensions.height * 0.075}px`,
            }}
          >
            <div
              style={{
                width: `${dimensions.height * 0.05}px`,
                height: `${dimensions.height * 0.05}px`,
                aspectRatio: "1/1",
                borderRadius: "50%",
                border: `3px solid ${borderColor}`,
                background: borderColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <button
              onClick={() => router.push(route)}
              style={{
                background: "#050756",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                padding: `${dimensions.height * 0.01}px ${dimensions.height * 0.01}px`,
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                gap: `${dimensions.height * 0.085}px`,
              }}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      {fans.flatMap(({ startX, endX }) =>
        startYs.map((startY) => (
          <DashedGradientLine
            key={`${startX}-${startY}`}
            start={{ x: startX, y: startY }}
            end={{ x: endX, y: 0.0 }}
            {...sharedDashedProps}
          />
        )),
      )}

      <MetroLine
        start={{ x: 0.0, y: 0.4 }}
        end={{ x: 1.0, y: 0.85 }}
        colors={lineColors}
        cornerRadius={48}
        midRatio={0.2}
        screenWidth={dimensions.width}
        screenHeight={dimensions.height}
      />
    </div>
  );
}
