import * as React from "react";
import type { Category } from "types";
import useClubsByCategory from "@/utils/graphql-hooks/useClubsByCategory";
import LinksCore from "./links-core";

export function J1Link() {
  const { j1 } = useClubsByCategory();
  const items = j1.nodes.map(({ id, href, name, short_name }) => ({
    id,
    href,
    label: name,
    label_short: short_name,
  }));
  return <LinksCore title="J1クラブ経営情報" items={items} />;
}

export function J2Link() {
  const { j2 } = useClubsByCategory();
  const items = j2.nodes.map(({ id, href, name, short_name }) => ({
    id,
    href,
    label: name,
    label_short: short_name,
  }));
  return <LinksCore title="J2クラブ経営情報" items={items} />;
}

export function J3Link() {
  const { j3 } = useClubsByCategory();
  const items = j3.nodes.map(({ id, href, name, short_name }) => ({
    id,
    href,
    label: name,
    label_short: short_name,
  }));
  return <LinksCore title="J3クラブ経営情報" items={items} />;
}

export function CategoryLink({ category }: { category: Category }) {
  if (category === "J1") return <J1Link />;
  if (category === "J2") return <J2Link />;
  if (category === "J3") return <J3Link />;
  return null;
}
