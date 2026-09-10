import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import config, { srConfig } from '@config';
import { Layout } from '@components';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';
const { colors, fonts, fontSizes } = theme;

const StyledMainContainer = styled(Main)``;
const StyledTableContainer = styled.div`
  margin: 80px -20px 100px;
  ${media.tablet`
    margin: 80px -10px 100px;
  `};
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  .hide-on-mobile {
    ${media.tablet`
      display: none;
    `};
  }

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
  }
  td {
    &.year {
      width: 10%;
      ${media.tablet`
        font-size: ${fontSizes.sm};
      `};
    }
    &.title {
      padding-top: 15px;
      color: ${colors.lightestSlate};
      font-size: ${fontSizes.xl};
      font-weight: 700;
    }
    &.venue {
      width: 20%;
      padding-top: 15px;
      font-size: ${fontSizes.lg};
    }
    &.type {
      font-size: ${fontSizes.xs};
      font-family: ${fonts.SFMono};
      color: ${colors.green};
      white-space: nowrap;
    }
    &.location {
      font-size: ${fontSizes.sm};
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
const StyledSectionHeading = styled.h2`
  margin: 80px 0 20px;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
`;
const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    font-size: ${fontSizes.lg};
    color: ${colors.lightSlate};

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
    }
    .meta {
      display: block;
      font-family: ${fonts.SFMono};
      font-size: ${fontSizes.smish};
      color: ${colors.slate};
    }
    .year {
      color: ${colors.green};
      font-family: ${fonts.SFMono};
      font-size: ${fontSizes.smish};
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
  },
  { year: '2026', title: 'Code/Astro Workshop', meta: 'UC Santa Cruz, CA' },
  { year: '2024, 2025', title: 'AI Winter School', meta: 'Brown University, Providence, RI' },
  {
    year: '2024',
    title: 'Precision Calibration Workshop',
    meta: 'McGill University, Montréal, QC',
  },
];

const ArchivePage = ({ location, data }) => {
  const talks = data.allMarkdownRemark.edges;

  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealTalks = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig());
    revealTalks.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet>
        <title>Talks &amp; Outreach | {config.name}</title>
        <link rel="canonical" href={`${config.siteUrl}archive`} />
      </Helmet>

      <StyledMainContainer>
        <header ref={revealTitle}>
          <h1 className="big-title">Talks &amp; Outreach</h1>
          <p className="subtitle">Conferences, seminars, awards, and public engagement</p>
        </header>

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
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="venue hide-on-mobile">
                        {venue ? <span>{venue}</span> : <span>—</span>}
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
              {item.title}
              <span className="meta">{item.meta}</span>
            </li>
          ))}
        </StyledList>
      </StyledMainContainer>
    </Layout>
  );
};
ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/talks/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            venue
            type
            location
            url
          }
          html
        }
      }
    }
  }
`;
