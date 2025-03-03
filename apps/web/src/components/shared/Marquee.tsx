"use client";

import { useWindowSize } from "@react-hook/window-size";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useEffect, useRef } from "react";
import { useRafLoop } from "react-use";

const _ = {
  content: "Around the world, around the world.",
  speed: 1,
  threshold: 0.014,
  wheelFactor: 0.5,
  dragFactor: 1.2,
};

interface MarqueeItemProps {
  content: string;
  speed: MotionValue<number>;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({ content, speed }) => {
  const item = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const x = useRef(0);

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;
    const xPercentage = (x.current / rect.current.width) * 100;
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;
    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (item.current) {
      rect.current = item.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = () => {
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div className="whitespace-nowrap" ref={item}>
      {content}
    </div>
  );
};

const Marquee: React.FC = () => {
  const marquee = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const constraintsRef = useRef(null);

  const x = useRef(0);
  const w = useRef(window.innerWidth).current;
  const speed = useSpring(_.speed, {
    damping: 40,
    stiffness: 50,
    mass: 2,
  });
  const opacity = useTransform(speed, [-w * 0.25, 0, w * 0.25], [1, 0, 1]);
  const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25]);

  const onWheel = (event: any) => {
    const normalized = normalizeWheel(event);
    x.current = normalized.pixelY * _.wheelFactor;

    if (isScrolling.current) clearTimeout(isScrolling.current);
    isScrolling.current = setTimeout(() => {
      speed.set(_.speed);
    }, 30);
  };

  const onDragStart = () => {
    slowDown.current = true;
    marquee.current?.classList.add("drag");
    speed.set(0);
  };

  const onDrag = (e: any, info: { delta: { x: number } }) => {
    speed.set(_.dragFactor * -info.delta.x);
  };

  const onDragEnd = () => {
    slowDown.current = false;
    marquee.current?.classList.remove("drag");
    x.current = _.speed;
  };

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < _.threshold) return;
    x.current *= 0.66;
    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }
    speed.set(_.speed + x.current);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div
        className="flex items-center text-4xl"
        ref={marquee}
        style={{ skewX }}
        onWheel={onWheel}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        dragElastic={0.000001}
      >
        <MarqueeItem content={_.content} speed={speed} />
        <MarqueeItem content={_.content} speed={speed} />
      </motion.div>
    </>
  );
};

export default Marquee;
