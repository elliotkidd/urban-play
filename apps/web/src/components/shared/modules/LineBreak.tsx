import { TypeFromSelection } from "groqd";

import { LINEBREAK_FRAGMENT } from "@/sanity/lib/queries/sections";

import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof LINEBREAK_FRAGMENT>;

export default function LineBreak({ settings }: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper">
        <svg
          className="w-full text-accent"
          viewBox="0 0 1360 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 9C177.809 9 346.708 3.55907 524.5 3C667.292 2.55099 818.689 5.16866 961.37 3.69136C1046.53 2.80958 1131.28 1.44444 1216.57 1.44444C1264.4 1.44444 1312.17 1 1360 1"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </ModuleWrapper>
  );
}
