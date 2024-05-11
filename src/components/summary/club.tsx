import * as React from "react";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import {
  Section,
  Article,
  H2,
  Ul,
  Li,
  Table,
  TBody,
  Tr,
  Td,
  AppLinkButton,
} from "@cieloazul310/gatsby-theme-aoi";
import { AllDataFieldsFragment, Club } from "types";
import Chart from "../chart";

type ClubSummaryProps = {
  nodes: AllDataFieldsFragment[];
  club: Pick<
    Club,
    | "name"
    | "fullname"
    | "company"
    | "category"
    | "hometown"
    | "website"
    | "period"
    | "settlement"
    | "relatedCompanies"
    | "annotation"
  >;
};

function ClubSummary({ nodes, club }: ClubSummaryProps) {
  const {
    name,
    fullname,
    company,
    period,
    category,
    hometown,
    relatedCompanies,
    annotation,
    website,
    settlement,
  } = club;

  return (
    <Section component="section">
      <Article maxWidth="md">
        <H2>{name}</H2>
        {nodes.length > 2 && <Chart nodes={nodes} />}
        <Table>
          <TBody>
            <Tr>
              <TableCell component="th" scope="row">
                正式名称
              </TableCell>
              <Td>{fullname}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                法人名
              </TableCell>
              <Td>{company}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                決算期
              </TableCell>
              <Td>{period}月期</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                所属カテゴリ
              </TableCell>
              <Td>{category}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                ホームタウン
              </TableCell>
              <Td>{hometown}</Td>
            </Tr>
            {relatedCompanies && (
              <Tr>
                <TableCell component="th" scope="row">
                  関連する法人
                </TableCell>
                <Td>{relatedCompanies.join("、")}</Td>
              </Tr>
            )}
          </TBody>
          <caption>
            <Ul>
              <Li>
                2021年以前の「チーム人件費」はアカデミー指導者報酬、レディースチーム選手・指導者報酬を含む。2022年度以降はトップチームに限定した「トップチーム人件費」。
              </Li>
              {annotation?.map((str) => <Li key={str}>{str}</Li>)}
            </Ul>
          </caption>
        </Table>
        <Stack direction="row" gap={1}>
          {website && (
            <AppLinkButton href={website} color="inherit">
              公式サイト
            </AppLinkButton>
          )}
          {settlement && (
            <AppLinkButton href={settlement} color="inherit">
              経営情報
            </AppLinkButton>
          )}
        </Stack>
      </Article>
    </Section>
  );
}

export default ClubSummary;
