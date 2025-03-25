import { SocialMediaProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";

function SocialMedia({ sectionHeader }: SocialMediaProps) {
  return (
    <div className="wrapper">
      <SectionHeader {...sectionHeader} />
      {/* TODO: Integrate social media */}
    </div>
  );
}
export default SocialMedia;
