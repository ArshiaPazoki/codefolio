import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left"; // Tooltip direction
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, position = "top", children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`
          absolute whitespace-nowrap z-20 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${position === "top" && "bottom-full left-1/2 transform -translate-x-1/2 mb-1"}
          ${position === "right" && "left-full top-1/2 transform -translate-y-1/2 ml-1"}
          ${position === "bottom" && "top-full left-1/2 transform -translate-x-1/2 mt-1"}
          ${position === "left" && "right-full top-1/2 transform -translate-y-1/2 mr-1"}
        `}
      >
        {content}
      </div>
    </div>
  );
};
