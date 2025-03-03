import { TypeFromSelection } from "groqd";
import { twMerge } from "tailwind-merge";

import { VALUES_SECTION_FRAGMENT } from "@/sanity/lib/queries/sections";

import SanityImage from "../SanityImage";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof VALUES_SECTION_FRAGMENT>;

export default function Values({ settings, values }: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <ul className="wrapper grid lg:grid-cols-3 prose">
        {values.map(({ image, heading, text, _key }, i: number) => {
          return (
            <li
              key={_key || i}
              className={twMerge(
                "flex flex-col lg:flex-row relative",
                i === 0
                  ? "lg:pr-8 pb-12 lg:pb-0"
                  : i === values.length - 1
                    ? "lg:pl-8 pt-fluid-sm lg:pt-0"
                    : "lg:px-8 py-fluid lg:py-0",
              )}
            >
              <div>
                <SanityImage className="not-prose" src={image} />
                <h3 className="text-lg">{heading}</h3>
                <p>{text}</p>
              </div>

              {i !== values.length - 1 && (
                <>
                  <svg
                    viewBox="0 0 6 213"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden lg:block stroke-current text-accent absolute top-0 right-0 h-full"
                  >
                    <path
                      d="M1.00001 -1.74845e-07C1.00001 27.8479 3.72047 54.3006 4 82.146C4.2245 104.51 2.91567 128.221 3.65432 150.568C4.0952 163.906 4.77777 177.178 4.77777 190.536C4.77777 198.028 4.99999 205.509 4.99999 213"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <svg
                    className="lg:hidden block w-full text-accent absolute bottom-0 left-0"
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
                </>
              )}
            </li>
          );
        })}
      </ul>
    </ModuleWrapper>
  );
}
