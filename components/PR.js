import React from 'react';
import styled, { css } from 'styled-components';

const Title = styled.h3`
`;

const Content = styled.p`
  line-height: 20px;
`;

const Card = styled.section`
border-bottom: 1px solid gray;
padding: 20px 0px;
`

const Date = styled.p``;

export default ({ pr, showRepo }) => (
  <Card>
    <a href={pr.url}>
      <Content>{pr.title}</Content>
    </a>     
    <Title>Body:</Title>
    <Content>{pr.body}</Content>
    <Title>Created At:</Title>
    <Date>{pr.createdAt}</Date>
    <Title>Merged At:</Title>
    <Date>{pr.mergedAt}</Date>
    {showRepo && (
      <>
        <Title>Name with owner</Title>
        <Content>{pr.repository.nameWithOwner}</Content>
      </>
    )}
  </Card>
);
