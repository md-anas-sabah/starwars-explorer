import React, { useEffect, useState } from "react";

const YodaGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => setIsVisible(true), 1000);
    setTimeout(() => setShowText(true), 3000);
  }, []);

  return (
    <div className="fixed left-0 top-1/4 w-48 h-64">
      {/* Yoda Silhouette */}
      <div
        className={`transform transition-transform duration-1000 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <svg viewBox="0 0 100 120" className="w-32 h-32">
          {/* Yoda silhouette in yellow */}
          <path
            d="M50 0c-5 0-9 2-12 5-2 2-3 4-4 6-1 3-1 5 0 8 0 2 1 4 3 6-4 2-7 5-9 8-2 4-3 8-2 12 0 4 2 8 5 11 2 2 4 4 7 5-3 2-5 5-6 8-1 4-1 7 1 11 1 3 3 5 6 7 2 1 5 2 8 2 4 0 8-1 11-4 2-2 4-4 5-7 1-3 1-6 0-9 3 1 6 1 9 0 3-1 5-3 7-5 2-3 3-6 3-9 0-4-2-7-4-10-2-2-4-4-7-5 2-2 4-4 5-7 1-3 1-6 0-9-1-3-3-5-6-7-2-1-5-2-8-2-4 0-7 1-10 4-2-3-5-5-9-6z"
            fill="var(--sw-yellow)"
            className="opacity-60"
          />
        </svg>

        {/* Torch Light Effect */}
        <div className="absolute top-12 right-0 transform rotate-45">
          <div className="w-64 h-96 bg-gradient-to-r from-yellow-300/10 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Quote Text */}
      {showText && (
        <div className="absolute left-40 top-16 text-yellow-300 opacity-70 w-48 text-sm font-semibold transition-opacity duration-1000">
          "Hmm... Details of this one, I shall reveal..."
        </div>
      )}
    </div>
  );
};

export default YodaGuide;
