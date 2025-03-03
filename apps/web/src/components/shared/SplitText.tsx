"use client";

import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  className?: string;
}

export function SplitText({ children, className, ...rest }: Props) {
  let words = children.split(" ");
  return (
    <div className={twMerge("-mb-fluid-sm", className)}>
      {words.map((word, i) => {
        return (
          <div
            key={children + i}
            style={{ display: "inline-block", overflow: "hidden" }}
            className="!-m-fluid-xs p-fluid-xs"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileInView="visible"
              variants={{
                visible: (i) => ({
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    type: "easeInOut",
                    delay: i * 0.1,
                  },
                }),
              }}
              style={{ display: "inline-block", willChange: "transform" }}
              custom={i}
            >
              {word + (i !== words.length - 1 ? "\u00A0" : "")}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
