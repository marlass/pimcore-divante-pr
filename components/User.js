import React from 'react';
import PR from './PR';
import styled from 'styled-components';

const Title = styled.h1`
    margin-bottom: 60px;
`

export default ({
  user,
  mergedPimcorePR,
  openPimcorePR,
  mergedOtherPR,
  openOtherPR,
}) => (
  <>
    <main>
      <Title>
        {user.name} / {user.login}
      </Title>
      {mergedPimcorePR.length > 0 && <h2>Merged Pimcore PR</h2>}
      {mergedPimcorePR.map(pr => <PR key={pr.id} pr={pr} />)}
      {openPimcorePR.length > 0 && <h2>Open Pimcore PR</h2>}
      {openPimcorePR.map(pr => <PR key={pr.id} pr={pr} />)}
      {mergedOtherPR.length > 0 && <h2>Other merged PR</h2>}
      {mergedOtherPR.map(pr => <PR key={pr.id} pr={pr} showRepo />)}
      {openOtherPR.length > 0 && <h2>Other open PR</h2>}
      {openOtherPR.map(pr => <PR key={pr.id} pr={pr} showRepo />)}
    </main>
  </>
);
