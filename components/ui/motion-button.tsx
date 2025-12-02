"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Create a motion version of the button directly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionButtonBase = motion(Button as any);

type MotionButtonProps = ButtonProps & React.ComponentProps<typeof motion.button> & {
  hoverScale?: number;
  tapScale?: number;
};

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, hoverScale = 1.05, tapScale = 0.95, ...props }, ref) => {
    return (
      <MotionButtonBase
        ref={ref}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        className={cn("transition-transform", className)}
        {...props}
      />
    );
  }
);
MotionButton.displayName = "MotionButton";
