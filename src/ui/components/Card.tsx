import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
