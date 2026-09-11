import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0;
`;
const StyledTitle = styled.h2`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: ${fontSizes.h3};
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 20px;`};
`;
const StyledSubtitle = styled.p`
  width: 100%;
  margin: 10px auto 0;
  text-align: center;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  color: ${colors.slate};
`;
const StyledList = styled.ul`
  width: 100%;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
`;
const StyledFolder = styled.div`
  flex-shrink: 0;
  color: ${colors.green};
  line-height: 0;
  svg {
    width: 22px;
    height: 22px;
  }
`;
const StyledPaperName = styled.h3`
  margin: 0;
  font-size: ${fontSizes.xl};
  font-weight: 600;
  color: ${colors.lightSlate};
  transition: ${theme.transition};
`;
const StyledPaperDescription = styled.div`
  margin-top: 6px;
  font-size: ${fontSizes.xl};
  color: ${colors.slate};
  p {
    margin: 0 0 4px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 10px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    color: ${colors.green};
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const StyledIconLink = styled.a`
  flex-shrink: 0;
  padding: 5px;
  margin: -5px -5px 0 0;
  color: ${colors.lightSlate};
  line-height: 0;
  transition: ${theme.transition};
  &:hover,
  &:focus {
    color: ${colors.green};
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;
const StyledPaper = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 0;
  border-top: 1px solid ${colors.lightestNavy};
  transition: ${theme.transition};

  &:last-of-type {
    border-bottom: 1px solid ${colors.lightestNavy};
  }
  &:hover,
  &:focus-within {
    ${StyledPaperName} {
      color: ${colors.lightestSlate};
    }
  }
  ${media.phablet`
    gap: 14px;
    padding: 16px 0;
  `};
`;
const StyledPaperBody = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const Collaborations = ({ data }) => {
  const revealTitle = useRef(null);
  const revealPapers = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealPapers.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const papers = data.filter(({ node }) => node);

  if (papers.length === 0) {
    return null;
  }

  return (
    <StyledContainer id="collaborations">
      <div ref={revealTitle} style={{ width: '100%' }}>
        <StyledTitle>Collaboration Publications</StyledTitle>
        <StyledSubtitle>
          Papers where my authorship comes from participation in a collaboration
        </StyledSubtitle>
      </div>

      <StyledList>
        {papers.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, tech } = frontmatter;
          return (
            <StyledPaper key={i} ref={el => (revealPapers.current[i] = el)}>
              <StyledFolder>
                <FormattedIcon name="Folder" />
              </StyledFolder>

              <StyledPaperBody>
                <StyledPaperName>{title}</StyledPaperName>
                <StyledPaperDescription dangerouslySetInnerHTML={{ __html: html }} />
                {tech && (
                  <StyledTechList>
                    {tech.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </StyledTechList>
                )}
              </StyledPaperBody>

              {external && (
                <StyledIconLink
                  href={external}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="External Link">
                  <FormattedIcon name="External" />
                </StyledIconLink>
              )}
            </StyledPaper>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

Collaborations.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Collaborations;
