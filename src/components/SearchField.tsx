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

// import React, { useEffect, useState } from 'react';
// import './SearchKernel.scss';
// import { useParams, Link, Redirect } from 'react-router-dom';
// import { ReactComponent as LoadingBars } from '../assets/bars.svg';

// interface Status {
//     status: string;
//     message: string;
//     hash?: string;
// }
// export async function searchKernel(publicNonce: string, signature: string): Promise<Blocks> {
//     return await fetchApi(`/kernel/${publicNonce}/${signature}`);
// }

// const renderStatus = (status: Status) => {
//     switch (status.status) {
//         case 'redirect':
//             return <Redirect push to={`/block/${status.hash}`} />;
//         case 'complete':
//             return (
//                 <div>
//                     <LoadingBars className="fill-color-lowlight" />
//                     <h1>{status.message}</h1>
//                     <h2>Redirecting...</h2>
//                 </div>
//             );
//         case 'loading':
//             return (
//                 <div>
//                     <LoadingBars className="fill-color-lowlight" />
//                     <h1>{status.message}</h1>
//                 </div>
//             );
//         default:
//             return (
//                 <h1 className="noBlockFound">
//                     {status.message} <Link to={'/'}>Go Back</Link>
//                 </h1>
//             );
//     }
// };

// const SearchKernel = () => {
//     const { nonce, signature } = useParams();
//     const [status, setStatus] = useState({ status: 'loading', message: '', hash: '' } as Status);
//     useEffect(() => {
//         let timer;

//         if (!nonce || !signature) {
//             setStatus({
//                 status: 'error',
//                 message: 'Invalid nonce or signature'
//             });
//             return;
//         }
//         setStatus({
//             status: 'loading',
//             message: 'Searching for transaction...'
//         });
//         searchKernel(nonce, signature)
//             .then((response) => {
//                 if (response.blocks.length > 0) {
//                     const block = response.blocks[0];
//                     const height = block.block.header.height;
//                     const hash = block.block.header.hash;
//                     const message = `Found in block #${height}.`;
//                     setStatus({
//                         status: 'complete',
//                         message,
//                         hash
//                     });
//                     timer = setTimeout(() => setStatus({ status: 'redirect', message, hash }), 2000);
//                 } else {
//                     setStatus({
//                         status: 'error',
//                         message: 'There was an error finding that transaction.'
//                     });
//                 }
//             })
//             .catch((e) => {
//                 console.error(e);
//                 setStatus({
//                     status: 'error',
//                     message: 'Transaction not found'
//                 });
//             });
//         if (timer) return window.clearTimeout(timer);
//     }, [nonce, signature]);

//     return <div className="SearchKernel">{renderStatus(status)}</div>;
// };

// export default SearchKernel;

import React, { useState } from 'react';
import { TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAllBlocks } from '../api/hooks/useBlocks';
import { IoSearch } from 'react-icons/io5';

const SearchField = () => {
  const { data: tipInfo } = useAllBlocks();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const tip = tipInfo?.tipInfo.metadata.height_of_longest_chain;

  const handleSearch = () => {
    if (query === '') {
      return;
    }
    // if (parseInt(query) > tip) {
    //   setQuery('');
    //   return;
    // }
    navigate(`/blocks/${query}`);
    setQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        gap: 8,
      }}
    >
      <TextField
        label="Search"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                style={{
                  borderRadius: 8,
                }}
              >
                <IoSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchField;
