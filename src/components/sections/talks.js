import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import sr from '@utils/sr';
import { yearOf } from '@utils';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fonts, fontSizes } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0;
  counter-increment: section;
`;
const StyledTitle = styled.h2`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: ${fontSizes.h3};
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
`;
const StyledSubtitle = styled.p`
  width: 100%;
  margin: 10px auto 0;
  text-align: center;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  color: ${colors.slate};
`;
const StyledTableContainer = styled.div`
  width: 100%;
  margin: 50px -20px 0;
  ${media.tablet`
    margin: 50px -10px 0;
  `};
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* auto layout gave the long titles the narrowest column; fixed makes the
     percentage widths below actually hold */
  table-layout: fixed;

  .hide-on-mobile {
    ${media.tablet`
      display: none;
    `};
  }

  /* Mobile drops Venue and Location, so the remaining percentages no longer add
     up to 100 and the nowrap "Invited Talk" overran the Link column. Re-balance
     the four surviving columns (nth-child still counts the hidden ones) and give
     the title less room, since it is the column that can afford to wrap. */
  ${media.tablet`
    th:nth-child(1) { width: 14%; }
    th:nth-child(2) { width: 44%; }
    th:nth-child(4) { width: 28%; }
    th:nth-child(6) { width: 14%; }
  `};

  tbody tr {
    transition: ${theme.transition};

    &:hover,
    &:focus {
      background-color: ${colors.lightNavy};
    }
  }
  th,
  td {
    cursor: default;
    line-height: 1.5;
    padding: 10px 20px;
    ${media.tablet`
      padding: 10px;
    `};
  }
  th {
    text-align: left;

    /* table-layout: fixed takes its column widths from this first row */
    &:nth-child(1) {
      width: 8%;
    }
    &:nth-child(2) {
      width: 42%;
    }
    &:nth-child(3) {
      width: 17%;
    }
    &:nth-child(4) {
      width: 12%;
    }
    &:nth-child(5) {
      width: 15%;
    }
    &:nth-child(6) {
      width: 6%;
    }
  }
  td {
    &.year {
      font-size: ${fontSizes.sm};
    }
    &.title {
      padding-top: 15px;
      color: ${colors.lightestSlate};
      font-size: ${fontSizes.xxl};
      font-weight: 700;
      ${media.tablet`font-size: ${fontSizes.lg};`};
      ${media.phablet`font-size: ${fontSizes.md};`};
    }
    &.venue {
      padding-top: 15px;
      font-size: ${fontSizes.md};
    }
    &.type {
      font-size: ${fontSizes.sm};
      font-family: ${fonts.SFMono};
      color: ${colors.green};
      white-space: nowrap;
      /* "Invited Talk" does not fit one line in a phone-width column */
      ${media.tablet`white-space: normal;`};
    }
    &.location {
      font-size: ${fontSizes.md};
    }
    &.links {
      span {
        display: flex;
        align-items: center;
        a {
          ${mixins.flexCenter};
        }
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
const StyledPhotos = styled.div`
  display: grid;
  width: 100%;
  margin-top: 60px;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;
const StyledFigure = styled.figure`
  margin: 0;
  .gatsby-image-wrapper {
    ${mixins.boxShadow};
    border-radius: ${theme.borderRadius};
  }
  figcaption {
    margin-top: 12px;
    font-size: ${fontSizes.md};
    font-family: ${fonts.SFMono};
    color: ${colors.slate};
    line-height: 1.5;
  }
`;
const StyledSectionHeading = styled.h3`
  margin: 80px 0 20px;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.h4};
`;
const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    font-size: ${fontSizes.xxl};
    color: ${colors.lightSlate};

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
    }
    a {
      ${mixins.inlineLink};
      color: ${colors.lightSlate};
    }
    .meta {
      display: block;
      font-family: ${fonts.SFMono};
      font-size: ${fontSizes.sm};
      color: ${colors.slate};
    }
    .year {
      color: ${colors.green};
      font-family: ${fonts.SFMono};
      font-size: ${fontSizes.sm};
      margin-right: 10px;
    }
  }
`;

const awards = [
  {
    year: '2026',
    title: 'Physics Merit Fellowship',
    meta: 'Brown University — full funding for one academic semester',
  },
  {
    year: '2025',
    title: 'Forrest Award for Excellent Work Related to Experimental Apparatus',
    meta: 'Brown University',
  },
  {
    year: '2024',
    title: 'Best Talk at MWA Project Meeting',
    meta: 'MWA Collaboration',
  },
  {
    year: '2023–2025',
    title: 'Collaborative Research: 21 cm Reionization Science with the MWA',
    meta: 'National Science Foundation — Award #2106510',
  },
  {
    year: '2021',
    title: 'Summer Research Showcase Prize Winner',
    meta: 'McGill Space Institute',
  },
  {
    year: '2021',
    title: 'Undergraduate Student Research Award',
    meta: 'Natural Sciences and Engineering Research Council of Canada',
  },
];

const development = [
  {
    year: '2026',
    title: 'INTERSECT Research Software Engineering Bootcamp',
    meta: 'Princeton University, NJ',
    url: 'https://intersect-training.org/bootcamp26/',
  },
  {
    year: '2026',
    title: 'Code/Astro Workshop',
    meta: 'UC Santa Cruz, CA',
    url: 'https://semaphorep.github.io/codeastro/',
  },
  {
    year: '2024, 2025',
    title: 'AI Winter School',
    meta: 'Brown University, Providence, RI',
    url: 'https://indico.physics.brown.edu/event/34/',
  },
  {
    year: '2024',
    title: 'Precision Calibration Workshop',
    meta: 'McGill University, Montréal, QC',
    url: 'https://www.21cmwg.org/calibration-workshop',
  },
];

const Talks = ({ data, photos }) => {
  const talks = data;
  const cascaPhoto = getImage(photos?.casca?.childImageSharp);
  const awardPhoto = getImage(photos?.award?.childImageSharp);
  const outreachPhoto = getImage(photos?.outreach?.childImageSharp);

  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealPhotos = useRef(null);
  const revealTalks = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig());
    if (revealPhotos.current) {
      sr.reveal(revealPhotos.current, srConfig());
    }
    revealTalks.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <StyledContainer id="talks">
      <div ref={revealTitle} style={{ width: '100%' }}>
        <StyledTitle>Talks &amp; Outreach</StyledTitle>
        <StyledSubtitle>Conferences, seminars, awards, and public engagement</StyledSubtitle>
      </div>

      <StyledTableContainer ref={revealTable}>
        <StyledTable>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th className="hide-on-mobile">Venue</th>
              <th>Type</th>
              <th className="hide-on-mobile">Location</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {talks.length > 0 &&
              talks.map(({ node }, i) => {
                const { date, title, venue, type, location: place, url } = node.frontmatter;
                return (
                  <tr key={i} ref={el => (revealTalks.current[i] = el)}>
                    <td className="overline year">{yearOf(date)}</td>

                    <td className="title">{title}</td>

                    <td className="venue hide-on-mobile">
                      {venue ? <span>{venue}</span> : <span>&mdash;</span>}
                    </td>

                    <td className="type">{type}</td>

                    <td className="location hide-on-mobile">{place}</td>

                    <td className="links">
                      <span>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="External Link">
                            <FormattedIcon name="External" />
                          </a>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
      </StyledTableContainer>

      {(cascaPhoto || awardPhoto || outreachPhoto) && (
        <StyledPhotos ref={revealPhotos}>
          {cascaPhoto && (
            <StyledFigure>
              <GatsbyImage
                image={cascaPhoto}
                alt="Jade Ducharme presenting her poster on modeling moving sources of radio frequency interference at the 2026 CASCA meeting in Montréal"
              />
              <figcaption>
                Presenting at the Canadian Astronomical Society&apos;s 2026 meeting, Université de
                Montréal.
              </figcaption>
            </StyledFigure>
          )}
          {awardPhoto && (
            <StyledFigure>
              <GatsbyImage
                image={awardPhoto}
                alt="Jade Ducharme holding the Best Talk award at the 2024 MWA Project Meeting at EPFL in Lausanne, Switzerland"
              />
              <figcaption>
                Accepting the Best Talk award at the 2024 MWA Project Meeting, EPFL, Lausanne.
              </figcaption>
            </StyledFigure>
          )}
          {outreachPhoto && (
            <StyledFigure>
              <GatsbyImage
                image={outreachPhoto}
                alt="Jade Ducharme with the other Astronomy on Tap Rhode Island organizers at a Providence brewery"
              />
              <figcaption>
                With the Astronomy on Tap Rhode Island organizing team in Providence.
              </figcaption>
            </StyledFigure>
          )}
        </StyledPhotos>
      )}

      <StyledSectionHeading>Honors &amp; Awards</StyledSectionHeading>
      <StyledList>
        {awards.map((item, i) => (
          <li key={i}>
            <span className="year">{item.year}</span>
            {item.title}
            <span className="meta">{item.meta}</span>
          </li>
        ))}
      </StyledList>

      <StyledSectionHeading>Professional Development</StyledSectionHeading>
      <StyledList>
        {development.map((item, i) => (
          <li key={i}>
            <span className="year">{item.year}</span>
            {item.url ? (
              <a href={item.url} target="_blank" rel="nofollow noopener noreferrer">
                {item.title}
              </a>
            ) : (
              item.title
            )}
            <span className="meta">{item.meta}</span>
          </li>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

Talks.propTypes = {
  data: PropTypes.array.isRequired,
  photos: PropTypes.object,
};

export default Talks;
