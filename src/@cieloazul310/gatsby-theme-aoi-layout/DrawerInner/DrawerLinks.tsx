import * as React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItemAppLink, withoutPrefix } from "@cieloazul310/gatsby-theme-aoi";
import { useLocation } from "@reach/router";
import type { Club } from "types";
import useClubsByCategory from "@/utils/graphql-hooks/useClubsByCategory";
import useAllYears from "@/utils/graphql-hooks/useAllYears";

type CategoryLinksProps = {
  title: string;
  clubs: Pick<Club, "href" | "short_name" | "name">[];
};

export function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const storaged =
      typeof window === "object"
        ? sessionStorage.getItem(`${title}Open`)
        : null;
    const initialOpen = storaged ? JSON.parse(storaged) : false;
    if (typeof initialOpen === "boolean" && initialOpen) {
      setOpen(true);
    }
  }, []);
  React.useEffect(() => {
    sessionStorage.setItem(`${title}Open`, JSON.stringify(open));
  }, [title, open]);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleOpen}>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {clubs.map(({ name, short_name, href }) => (
            <ListItemAppLink
              key={short_name}
              href={href}
              selected={href === withoutPrefix(pathname)}
            >
              <ListItemText primary={name} />
            </ListItemAppLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export function YearsLinks() {
  const { pathname } = useLocation();
  const years = useAllYears();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const storaged =
      typeof window === "object" ? sessionStorage.getItem("yearsOpen") : null;
    const initialOpen = storaged ? JSON.parse(storaged) : false;
    if (typeof initialOpen === "boolean" && initialOpen) {
      setOpen(true);
    }
  }, []);
  React.useEffect(() => {
    sessionStorage.setItem("yearsOpen", JSON.stringify(open));
  }, [open]);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleOpen}>
          <ListItemText primary="年度別" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {years.map((node) => (
            <ListItemAppLink
              key={node.id}
              href={node.href}
              selected={node.href === withoutPrefix(pathname)}
            >
              <ListItemText primary={node.year} />
            </ListItemAppLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function DrawerLinks() {
  const { j1, j2, j3 } = useClubsByCategory();
  return (
    <List subheader={<ListSubheader>経営情報</ListSubheader>}>
      <CategoryLinks title="J1" clubs={j1.nodes} />
      <CategoryLinks title="J2" clubs={j2.nodes} />
      <CategoryLinks title="J3" clubs={j3.nodes} />
      <YearsLinks />
    </List>
  );
}

export default DrawerLinks;
