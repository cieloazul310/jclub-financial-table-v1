import * as React from "react";
import { navigate } from "gatsby";
import NativeSelect from "@mui/material/NativeSelect";
import NoSsr from "@mui/material/NoSsr";
import Skeleton from "@mui/material/Skeleton";
import { AppLinkButton, useIsMobile } from "@cieloazul310/gatsby-theme-aoi";

type LinksCoreProps = {
  title: string;
  items: {
    id: string;
    label: string;
    label_short?: string;
    href: string;
  }[];
};

function LinksCore({ title, items }: LinksCoreProps) {
  const isMobile = useIsMobile();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };
  const core = React.useMemo(() => {
    if (isMobile) {
      return (
        <NativeSelect value="" onChange={onChange}>
          <option disabled value="">
            {title}
          </option>
          {items.map(({ id, href, label }) => (
            <option key={id} value={href}>
              {label}
            </option>
          ))}
        </NativeSelect>
      );
    }

    return (
      <>
        {items.map(({ id, label_short, label, href }) => (
          <AppLinkButton key={id} href={href} color="inherit">
            {label_short ?? label}
          </AppLinkButton>
        ))}
      </>
    );
  }, [isMobile, items]);

  return (
    <NoSsr fallback={<Skeleton variant="rounded" width={160} />}>{core}</NoSsr>
  );
}

export default LinksCore;
