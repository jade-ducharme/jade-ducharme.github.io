import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { email } from '@config';
import styled, { css, keyframes } from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

/**
 * The hero used to be gated behind `isMounted` + CSSTransition, which meant the
 * <h1>, the tagline and the intro copy were absent from the server-rendered
 * HTML — the most important text on the site, invisible to anything that
 * doesn't execute JS. The reveal is now a pure CSS animation, so the markup
 * ships in the HTML and still fades in.
 */
const fadeUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;
const reveal = css`
  opacity: 0;
  animation: ${fadeUpIn} 600ms ${theme.easing} forwards;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
`;
/**
 * One grid holding the copy *and* the photo, rather than a text column beside a
 * photo column — on narrow screens the photo has to sit between the tagline and
 * the intro paragraph, which it can only do as a sibling of those items.
 */
const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  column-gap: 50px;
  grid-template-columns: minmax(0, 1fr) 300px;
  grid-template-areas:
    'overline pic'
    'name     pic'
    'tagline  pic'
    'desc     pic'
    'button   pic';
  ${media.tablet`
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'overline'
      'name'
      'tagline'
      'pic'
      'desc'
      'button';
  `};
`;
const StyledPic = styled.div`
  ${mixins.boxShadow};
  ${reveal};
  animation-delay: 600ms;
  grid-area: pic;
  position: relative;
  width: 300px;
  border-radius: ${theme.borderRadius};
  ${media.tablet`
    width: 280px;
    margin: 40px 0 10px;
  `};
  ${media.phablet`width: 75%;`};
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 12px;
    left: 12px;
    z-index: -1;
    border: 2px solid ${colors.green};
    border-radius: ${theme.borderRadius};
  }
`;
const StyledAvatar = styled(GatsbyImage)`
  display: block;
  border-radius: ${theme.borderRadius};
`;
const StyledOverline = styled.p`
  ${reveal};
  animation-delay: 100ms;
  grid-area: overline;
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h1`
  ${reveal};
  animation-delay: 200ms;
  grid-area: name;
  font-size: 72px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 64px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.p`
  ${reveal};
  animation-delay: 300ms;
  grid-area: tagline;
  margin: 0;
  /* 54px keeps the tagline on one line beside the photo at full width;
     at 60px "Universe." wrapped onto a line of its own */
  font-size: 54px;
  line-height: 1.1;
  color: ${colors.slate};
  ${media.desktop`font-size: 48px;`};
  ${media.tablet`font-size: 44px;`};
  ${media.phablet`font-size: 38px;`};
  ${media.phone`font-size: 30px;`};
`;
const StyledDescription = styled.div`
  ${reveal};
  animation-delay: 400ms;
  grid-area: desc;
  margin-top: 25px;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledButtonWrapper = styled.div`
  ${reveal};
  animation-delay: 500ms;
  grid-area: button;
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
`;

const Hero = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const heroImage = getImage(frontmatter.avatar?.childImageSharp);

  return (
    <StyledContainer>
      <StyledGrid>
        <StyledOverline>{frontmatter.title}</StyledOverline>
        <StyledTitle>{frontmatter.name}.</StyledTitle>
        <StyledSubtitle>{frontmatter.subtitle}</StyledSubtitle>
        <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
        <StyledButtonWrapper>
          <StyledEmailLink href={`mailto:${email}`}>Get In Touch</StyledEmailLink>
        </StyledButtonWrapper>

        {heroImage && (
          <StyledPic>
            <StyledAvatar image={heroImage} alt="Jade Ducharme" loading="eager" />
          </StyledPic>
        )}
      </StyledGrid>
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;
