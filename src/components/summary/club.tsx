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
  return (
    <Section component="section">
      <Article maxWidth="md">
        <H2>{club.name}</H2>
        {nodes.length > 2 ? <Chart nodes={nodes} /> : null}
        <Table>
          <TBody>
            <Tr>
              <TableCell component="th" scope="row">
                正式名称
              </TableCell>
              <Td>{club.fullname}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                法人名
              </TableCell>
              <Td>{club.company}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                決算期
              </TableCell>
              <Td>{club.period}月期</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                所属カテゴリ
              </TableCell>
              <Td>{club.category}</Td>
            </Tr>
            <Tr>
              <TableCell component="th" scope="row">
                ホームタウン
              </TableCell>
              <Td>{club.hometown}</Td>
            </Tr>
            {club.relatedCompanies && (
              <Tr>
                <TableCell component="th" scope="row">
                  関連する法人
                </TableCell>
                <Td>{club.relatedCompanies.join("、")}</Td>
              </Tr>
            )}
          </TBody>
          <caption>
            <Ul>
              <Li>
                2021年以前の「チーム人件費」はアカデミー指導者報酬、レディースチーム選手・指導者報酬を含む。2022年度以降はトップチームに限定した「トップチーム人件費」。
              </Li>
              {club.annotation?.map((str) => <Li key={str}>{str}</Li>)}
            </Ul>
          </caption>
        </Table>
        <Stack direction="row" gap={1}>
          {club.website && (
            <AppLinkButton href={club.website} color="inherit">
              公式サイト
            </AppLinkButton>
          )}
          {club.settlement && (
            <AppLinkButton href={club.settlement} color="inherit">
              経営情報
            </AppLinkButton>
          )}
        </Stack>
      </Article>
    </Section>
  );
}

export default ClubSummary;
