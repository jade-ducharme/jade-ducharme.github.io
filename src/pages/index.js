import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import config from '@config';
import { yearOf } from '@utils';
import { Layout, Hero, About, Jobs, Projects, Collaborations, Talks, Contact } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

/**
 * Publication structured data, generated from the same markdown the page
 * renders. Only papers with a DOI are included — a submitted manuscript is not
 * a published ScholarlyArticle, and claiming otherwise is exactly the kind of
 * thing structured-data validators (and reviewers) catch.
 */
const publicationSchema = data => {
  const entries = [...data.projects.edges, ...data.collaborations.edges]
    .map(({ node }) => node)
    .filter(node => node.frontmatter.external);

  if (entries.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': entries.map(({ frontmatter }) => ({
      '@type': 'ScholarlyArticle',
      headline: frontmatter.title,
      name: frontmatter.title,
      author: { '@id': `${config.siteUrl}#person` },
      datePublished: yearOf(frontmatter.date),
      sameAs: frontmatter.external,
      url: frontmatter.external,
      ...(frontmatter.company && {
        isPartOf: { '@type': 'Periodical', name: frontmatter.company },
      }),
    })),
  };
};

const IndexPage = ({ location, data }) => (
  <Layout location={location}>
    {publicationSchema(data) && (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(publicationSchema(data))}</script>
      </Helmet>
    )}
    <StyledMainContainer className="fillHeight">
      <Hero data={data.hero.edges} />
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
      <Projects data={data.projects.edges} />
      <Collaborations data={data.collaborations.edges} />
      <Talks
        data={data.talks.edges}
        photos={{
          casca: data.cascaPhoto,
          award: data.awardPhoto,
          outreach: data.outreachPhoto,
        }}
      />
      <Contact data={data.contact.edges} />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
            buttonText
            avatar {
              childImageSharp {
                gatsbyImageData(width: 520, quality: 90, placeholder: BLURRED)
              }
            }
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            interests
            skills
          }
          html
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/jobs/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            tabLabel
            location
            range
            url
          }
          html
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false }, authorship: { ne: "collaboration" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            github
            external
            company
          }
          html
        }
      }
    }
    collaborations: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false }, authorship: { eq: "collaboration" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            external
            company
          }
          html
        }
      }
    }
    cascaPhoto: file(relativePath: { eq: "photos/casca-poster.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 700, quality: 85, placeholder: BLURRED, aspectRatio: 1.33)
      }
    }
    # already cropped 4:3 at source (the portrait original lost either the face
    # or the award to every automatic crop)
    awardPhoto: file(relativePath: { eq: "photos/mwa-best-talk.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 700, quality: 85, placeholder: BLURRED)
      }
    }
    outreachPhoto: file(relativePath: { eq: "photos/aot-organizers.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 700, quality: 85, placeholder: BLURRED, aspectRatio: 1.33)
      }
    }
    talks: allMarkdownRemark(
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
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
            buttonText
          }
          html
        }
      }
    }
  }
`;
