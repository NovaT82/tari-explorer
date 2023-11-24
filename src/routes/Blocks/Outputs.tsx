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

import { useState, Fragment } from 'react';
import {
  InnerHeading,
  StyledAccordion,
  TypographyData,
} from '../../components/StyledComponents';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetBlockByHeight } from '../../api/hooks/useBlocks';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { toHexString, shortenString } from '../../utils/helpers';
import CopyToClipboard from '../../components/CopyToClipboard';

function Outputs({ blockHeight }: { blockHeight: string }) {
  const { data } = useGetBlockByHeight(blockHeight);
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();

  console.log('Outputs: ', data?.block.body.outputs);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderItems = data?.block.body.outputs.map(
    (content: any, index: number) => {
      const expandedPanel = `panel${index}`;
      const items = [
        // {
        //   label: 'Features:',
        //   copy: false,
        //   children: [
        //     {
        //       label: 'Version',
        //       value: content.features.version,
        //       copy: false,
        //     },
        //     {
        //       label: 'Output Type',
        //       value: content.features.output_type,
        //       copy: false,
        //     },
        //     {
        //       label: 'Maturity',
        //       value: content.features.maturity,
        //       copy: false,
        //     },
        //   ],
        // },
        {
          label: 'Commitment:',
          value: toHexString(content.commitment.data),
          copy: true,
        },
        {
          label: 'Hash:',
          value: toHexString(content.hash.data),
          copy: true,
        },
        // {
        //   label: 'Script:',
        //   value: replace,
        //   copy: false,
        // },
        // {
        //   label: 'Sender Offset Public Key:',
        //   value: replace,
        //   copy: true,
        // },
        // {
        //   label: 'Metadata Signature:',
        //   copy: false,
        //   children: [
        //     {
        //       label: 'Ephemeral commitment',
        //       value: replace,
        //       copy: false,
        //     },
        //     {
        //       label: 'Ephemeral pubkey',
        //       value: replace,
        //       copy: false,
        //     },
        //     {
        //       label: 'u_a',
        //       value: replace,
        //       copy: false,
        //     },
        //     {
        //       label: 'u_x',
        //       value: replace,
        //       copy: false,
        //     },
        //     {
        //       label: 'u_y',
        //       value: replace,
        //       copy: false,
        //     },
        //   ],
        // },
      ];

      return (
        <StyledAccordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          elevation={0}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={expandedPanel + '-content'}
            id={expandedPanel + '-header'}
          >
            <Typography variant="h6">Output {index}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {items.map((item, subIndex) => (
                <Fragment key={subIndex}>
                  <Grid item xs={12}>
                    <Divider color={theme.palette.background.paper} />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <Typography variant="body2">{item.label}</Typography>
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <TypographyData>
                      {item.copy ? (
                        <>
                          {shortenString(item.value)}
                          <CopyToClipboard
                            copy={item.value}
                            key={`${index}-${subIndex}-copy`}
                          />
                        </>
                      ) : (
                        item.value
                      )}
                    </TypographyData>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </AccordionDetails>
        </StyledAccordion>
      );
    }
  );

  return (
    <>
      <InnerHeading>
        Outputs ({data?.block.body.outputs.length || 0})
      </InnerHeading>
      {renderItems}
    </>
  );
}

export default Outputs;
