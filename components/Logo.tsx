import React from 'react';

export const OzerLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 
      Concept: The Hebrew word "Ozer" (עֵזֶר) forming a shopping cart.
      Right to Left reading in Hebrew matches the Right-Handle structure of a cart.
      
      Letter 1 (Right): Ayin (ע) - Acts as the Handle and Back support.
      Letter 2 (Middle): Zayin (ז) - Acts as the Middle rib.
      Letter 3 (Left): Resh (ר) - Acts as the Front wall.
      Vowels (..): Act as wheels.
    */}

    {/* Connecting Base Line (Uniting the letters) */}
    <path
      d="M 25 70 L 80 70"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Letter: Ayin (ע) - The Handle & Back */}
    {/* Right arm of Ayin extends up to be the cart handle */}
    <path
      d="M 80 70 L 80 40 L 95 20"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left arm of Ayin connecting to Zayin area */}
    <path
      d="M 80 40 Q 65 40 65 25"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Letter: Zayin (ז) - The Middle Support */}
    {/* Vertical stroke */}
    <path
      d="M 52 70 L 52 25"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top serif/hat of Zayin */}
    <path
      d="M 45 25 L 60 25"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Letter: Resh (ר) - The Front */}
    {/* Vertical and Top bar */}
    <path
      d="M 25 70 L 25 25 L 10 25"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Wheels (Based on Hebrew Vowels/Nikud - Tzeire '..') */}
    <circle cx="35" cy="85" r="7" fill="currentColor" />
    <circle cx="70" cy="85" r="7" fill="currentColor" />
  </svg>
);