import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { CTAProps } from "@/lib/sanity/queries/sections";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { useEffect } from "react";

const CONTAINER_OPTIONS = {
  isStatic: true,
  render: {
    fillStyle: "transparent",
    strokeStyle: "transparent",
  },
};

export function CTABlock({ richText, title, buttons, _type, _key }: CTAProps) {
  useEffect(() => {
    const THICCNESS = 60;

    const container = document.getElementById(`${_type}-${_key}`);

    if (container) {
      const engine = Engine.create();
      const render = Render.create({
        element: container,
        engine: engine,
        options: {
          width: container.clientWidth,
          height: container.clientHeight,
          background: "transparent",
          wireframes: false,
          showAngleIndicator: false,
        },
      });

      // create two boxes and a ground
      var boxA = Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight / 2,
        container.clientWidth / 10,
        container.clientWidth / 10,
        {
          render: {
            fillStyle: "#12BF65",
          },
        },
      );
      var boxB = Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight / 2,
        container.clientWidth / 5,
        container.clientWidth / 5,
        {
          render: {
            fillStyle: "#008EDA",
          },
        },
      );
      var ball = Bodies.circle(600, 200, (container.clientWidth / 25) * 2, {
        restitution: 0.9,
        render: {
          fillStyle: "#ED3E61",
        },
      });
      var triangle = Bodies.polygon(
        400,
        200,
        3,
        (container.clientWidth / 25) * 2,
        {
          restitution: 0.6,
          render: {
            fillStyle: "#F2BD06",
          },
        },
      );
      var ground = Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight + THICCNESS / 2,
        container.clientWidth,
        THICCNESS,
        CONTAINER_OPTIONS,
      );
      var wallLeft = Bodies.rectangle(
        -(THICCNESS / 2),
        container.clientHeight / 2,
        THICCNESS,
        container.clientHeight,
        CONTAINER_OPTIONS,
      );
      var wallRight = Bodies.rectangle(
        container.clientWidth + THICCNESS / 2,
        container.clientHeight / 2,
        THICCNESS,
        container.clientHeight,
        CONTAINER_OPTIONS,
      );

      var wallTop = Bodies.rectangle(
        container.clientWidth / 2,
        -(THICCNESS / 2) - 1,
        container.clientWidth,
        THICCNESS,
        CONTAINER_OPTIONS,
      );

      // add all of the bodies to the world
      Composite.add(engine.world, [
        boxA,
        boxB,
        ball,
        triangle,
        ground,
        wallLeft,
        wallRight,
        wallTop,
      ]);

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1.5,
          render: {
            visible: true,
          },
        },
      });

      Composite.add(engine.world, [mouseConstraint]);

      // run the renderer
      Render.run(render);

      // create runner
      var runner = Runner.create();

      // run the engine
      Runner.run(runner, engine);

      // Cleanup function
      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
      };
    }
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <>
      {/* <div className="wrapper grid lg:grid-cols-2 gap-fluid-sm prose py-fluid-sm">
        <h2 className="max-w-p">{title}</h2>
        <div className="text-lg text-muted-foreground">
          <RichText
            richText={richText}
            className="text-balance max-w-p-lg mb-fluid-lg"
          />
          <SanityButtons
            buttons={buttons}
            buttonClassName="w-full sm:w-auto"
            className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start mb-8"
          />
        </div>
      </div> */}
    </>
  );
}
