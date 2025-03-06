import { q } from "groqd";
import { SECTIONS_FRAGMENT } from "./sections";

export const homePageQuery: any = q("*")
  .filterByType("homePage")
  .slice(0)
  .grab({
    _id: q.string(),
    title: q.string(),
    pageBuilder: SECTIONS_FRAGMENT,
  });
