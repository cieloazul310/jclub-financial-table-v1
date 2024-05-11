import * as React from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Ul, Li, SubParagraph } from "@cieloazul310/gatsby-theme-aoi";

export function LicenseTokureiOlder() {
  return (
    <Box sx={{ py: 2 }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: 1200,
            borderTop: 1,
            borderLeft: 1,
            borderColor: "divider",
            "& th": {
              borderRight: 1,
              borderColor: "divider",
            },
            "& td": {
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="column" align="center">
                2020年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2021年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2022年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2023年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2024年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2025年度決算
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow selected>
              <TableCell colSpan={2} align="center">
                特例措置
              </TableCell>
              <TableCell colSpan={2} align="center">
                猶予期間
              </TableCell>
              <TableCell colSpan={2} align="center">
                特例措置なし
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Ul>
                  <Li>
                    債務超過、3期連続赤字をライセンス交付の判定対象としない
                  </Li>
                  <Li>対象年度に新たに債務超過に陥っても判定対象としない</Li>
                </Ul>
              </TableCell>
              <TableCell colSpan={2}>
                <Ul>
                  <Li>
                    債務超過が解消されていなくてもよいが、前年度より債務超過額が増加してはいけない
                  </Li>
                  <Li>新たに債務超過に陥ってはいけない</Li>
                  <Li>3期連続赤字のカウントをスタートする</Li>
                </Ul>
              </TableCell>
              <TableCell colSpan={2}>
                <Ul>
                  <Li>債務超過が解消されていなければならない</Li>
                  <Li>
                    赤字が継続しているクラブは、3期連続赤字に抵触する可能性がある
                  </Li>
                </Ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <SubParagraph>2021年1月1日改正</SubParagraph>
    </Box>
  );
}

export function LicenseTokureiNewer() {
  return (
    <Box sx={{ py: 2 }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: 1400,
            borderTop: 1,
            borderLeft: 1,
            borderColor: "divider",
            "& th": {
              borderRight: 1,
              borderColor: "divider",
            },
            "& td": {
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="column" align="center">
                2020年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2021年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2022年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2023年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2024年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2025年度決算
              </TableCell>
              <TableCell component="th" scope="column" align="center">
                2026年度決算
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow selected>
              <TableCell colSpan={2} align="center">
                特例措置
              </TableCell>
              <TableCell align="center">猶予期間(*)</TableCell>
              <TableCell align="center">
                <strong>特例措置</strong>
              </TableCell>
              <TableCell align="center">
                <strong>猶予期間</strong>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                特例措置なし
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Ul>
                  <Li>
                    債務超過、3期連続赤字をライセンス交付の判定対象としない
                  </Li>
                  <Li>対象年度に新たに債務超過に陥っても判定対象としない</Li>
                </Ul>
              </TableCell>
              <TableCell>
                <Ul>
                  <Li>
                    債務超過が解消されていなくてもよいが、前年度より債務超過額が増加してはいけない
                  </Li>
                  <Li>新たに債務超過に陥ってはいけない</Li>
                  <Li>
                    <s>3期連続赤字のカウントをスタートする</s>
                  </Li>
                </Ul>
              </TableCell>
              <TableCell>
                <Ul>
                  <Li>
                    債務超過、3期連続赤字をライセンス交付の判定対象としない
                  </Li>
                  <Li>対象年度に新たに債務超過に陥っても判定対象としない</Li>
                </Ul>
              </TableCell>
              <TableCell>
                <Ul>
                  <Li>
                    債務超過が解消されていなくてもよいが、前年度より債務超過額が増加してはいけない
                  </Li>
                  <Li>新たに債務超過に陥ってはいけない</Li>
                  <Li>3期連続赤字のカウントをスタートする</Li>
                </Ul>
              </TableCell>
              <TableCell>
                <Ul>
                  <Li>債務超過が解消されていなければならない</Li>
                </Ul>
              </TableCell>
              <TableCell>
                <Ul>
                  <Li>債務超過が解消されていなければならない</Li>
                  <Li>
                    赤字が継続しているクラブは、3期連続赤字に抵触する可能性がある
                  </Li>
                </Ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <SubParagraph>2023年1月1日改正</SubParagraph>
    </Box>
  );
}
