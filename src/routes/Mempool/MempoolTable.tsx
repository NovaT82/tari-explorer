//  Copyright 2022. The Tari Project
//
//  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
//  following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
//  disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
//  following disclaimer in the documentation and/or other materials provided with the distribution.
//
//  3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
//  products derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
//  INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
//  USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { useAllBlocks } from '../../api/hooks/useBlocks';
import { DataTableCell, InnerHeading } from '../../components/StyledComponents';
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';

function MempoolTable() {
  const { data } = useAllBlocks();
  console.log('mempool', data?.mempool);

  return (
    <>
      <InnerHeading>Mempool</InnerHeading>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Excess</TableCell>
              <TableCell>Total Fees</TableCell>
              <TableCell>Outputs</TableCell>
              <TableCell>Kernels</TableCell>
              <TableCell>Inputs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {mempool.map((block: any) => ( */}
            <TableRow>
              <DataTableCell>Excess</DataTableCell>
              <DataTableCell>Total Fees</DataTableCell>
              <DataTableCell>Outputs</DataTableCell>
              <DataTableCell>Kernels</DataTableCell>
              <DataTableCell>Inputs</DataTableCell>
            </TableRow>
            <TableRow>
              <DataTableCell>Excess</DataTableCell>
              <DataTableCell>Total Fees</DataTableCell>
              <DataTableCell>Outputs</DataTableCell>
              <DataTableCell>Kernels</DataTableCell>
              <DataTableCell>Inputs</DataTableCell>
            </TableRow>
            <TableRow>
              <DataTableCell>Excess</DataTableCell>
              <DataTableCell>Total Fees</DataTableCell>
              <DataTableCell>Outputs</DataTableCell>
              <DataTableCell>Kernels</DataTableCell>
              <DataTableCell>Inputs</DataTableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MempoolTable;
