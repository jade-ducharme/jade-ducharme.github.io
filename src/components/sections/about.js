import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  gap: 60px;
  ${media.tablet`
    display: block;
  `};
`;
const StyledContent = styled.div`
  width: 50%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledSide = styled.div`
  width: 45%;
  max-width: 460px;
  ${media.tablet`
    width: 100%;
    max-width: 100%;
    margin-top: 50px;
  `};
`;
const StyledSubheading = styled.h3`
  margin: 30px 0 0;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 600;

  /* the first block of the side column lines up with the top of the prose */
  &:first-child {
    margin-top: 0;
  }
`;
const InterestsContainer = styled.ul`
  padding: 0;
  margin: 12px 0 0 0;
  list-style: none;
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0 20px;
  overflow: hidden;
  padding: 0;
  margin: 12px 0 0 0;
  list-style: none;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 24px;
  font-family: ${fonts.SFMono};
  /* mono glyphs are wide: 16px here sits beside the 22px prose without
     dominating the column */
  font-size: ${fontSizes.md};
  color: ${colors.green};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${colors.green};
    font-size: ${fontSizes.lg};
    line-height: 1.4;
  }
`;
const Interest = styled(Skill)`
  color: ${colors.lightSlate};
  font-family: ${fonts.Calibre};
  font-size: ${fontSizes.xxl};
  line-height: 1.3;
`;

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, skills, interests } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledFlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledContent>

        <StyledSide>
          {interests && interests.length > 0 && (
            <>
              <StyledSubheading>Research interests</StyledSubheading>
              <InterestsContainer>
                {interests.map((interest, i) => (
                  <Interest key={i}>{interest}</Interest>
                ))}
              </InterestsContainer>
            </>
          )}

          {skills && skills.length > 0 && (
            <>
              <StyledSubheading>Tools I work with</StyledSubheading>
              <SkillsContainer>
                {skills.map((skill, i) => (
                  <Skill key={i}>{skill}</Skill>
                ))}
              </SkillsContainer>
            </>
          )}
        </StyledSide>
      </StyledFlexContainer>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
};

export default About;
