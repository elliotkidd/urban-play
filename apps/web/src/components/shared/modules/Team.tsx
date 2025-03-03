import { TypeFromSelection } from "groqd";

import { TEAM_FRAGMENT } from "@/sanity/lib/queries/sections";

import TeamCard from "../cards/TeamCard";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof TEAM_FRAGMENT>;

export default function Team({ index, title, team, settings }: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper space-y-fluid-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
          <span className="text-lg">
            {"(" + (index < 9 ? "0" : null)}
            {index + 1 + ")"}
          </span>
          <h2 className="text-lg md:col-span-2 lg:col-span-5">{title}</h2>
        </div>
      </div>
    </ModuleWrapper>
  );
}
