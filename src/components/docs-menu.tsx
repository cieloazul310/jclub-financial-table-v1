import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { ListItemAppLink, withoutPrefix } from "@cieloazul310/gatsby-theme-aoi";
import { useLocation } from "@reach/router";

type DocsMenuDataAllMdx = {
  nodes: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  }[];
};

type DrawerMenuItemProps = {
  title: string;
  baseUrl: string;
  data: DocsMenuDataAllMdx;
};

export function DrawerMenuItem({ title, data, baseUrl }: DrawerMenuItemProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const regex = new RegExp(baseUrl);
    if (regex.test(pathname)) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleOpen}>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {data.nodes.map(({ frontmatter, fields }) => (
            <ListItemAppLink
              key={fields.slug}
              href={fields.slug}
              selected={fields.slug === withoutPrefix(pathname)}
            >
              <ListItemText primary={frontmatter.title} />
            </ListItemAppLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

type DocsMenuData = {
  pl: DocsMenuDataAllMdx;
  bs: DocsMenuDataAllMdx;
  revenue: DocsMenuDataAllMdx;
  expense: DocsMenuDataAllMdx;
  attd: DocsMenuDataAllMdx;
  license: DocsMenuDataAllMdx;
};

function DocsMenu() {
  const { pl, bs, revenue, expense, attd, license } =
    useStaticQuery<DocsMenuData>(graphql`
      query {
        pl: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/pl/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        bs: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/bs/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        revenue: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/revenue/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        expense: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/expense/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        attd: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/attd/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        license: allMdx(
          sort: { frontmatter: { order: ASC } }
          filter: { fields: { slug: { regex: "/docs/license/" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    `);

  return (
    <List subheader={<ListSubheader>経営情報の見方</ListSubheader>}>
      <DrawerMenuItem title="損益計算書" data={pl} baseUrl="/docs/pl/" />
      <DrawerMenuItem title="貸借対照表" data={bs} baseUrl="/docs/bs/" />
      <DrawerMenuItem
        title="営業収入"
        data={revenue}
        baseUrl="/docs/revenue/"
      />
      <DrawerMenuItem
        title="営業費用"
        data={expense}
        baseUrl="/docs/expense/"
      />
      <DrawerMenuItem title="入場者数" data={attd} baseUrl="/docs/attd/" />
      <DrawerMenuItem
        title="クラブライセンス関連"
        data={license}
        baseUrl="/docs/license/"
      />
    </List>
  );
}

export default DocsMenu;
