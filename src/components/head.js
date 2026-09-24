import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '@config';
import ogImage from '@images/og.png';

const { siteUrl, name, fullName, email, location, socialMedia } = config;
const absoluteOgImage = `${siteUrl.replace(/\/$/, '')}${ogImage}`;
const profileUrls = socialMedia.map(({ url }) => url);

/**
 * schema.org graph. A single Person node is the anchor — every other node
 * points back at it by @id — which is what search engines use to tie the site,
 * the name, the affiliations and the social profiles together as one entity.
 */
const personId = `${siteUrl}#person`;
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name,
      alternateName: fullName,
      givenName: 'Jade',
      familyName: 'Ducharme',
      url: siteUrl,
      image: absoluteOgImage,
      email: `mailto:${email}`,
      jobTitle: 'Ph.D. Candidate in Physics',
      description: config.siteDescription,
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: 'Brown University',
        url: 'https://www.brown.edu/academics/physics/',
      },
      worksFor: {
        '@type': 'CollegeOrUniversity',
        name: 'Brown University',
        url: 'https://www.brown.edu/',
      },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Brown University', url: 'https://www.brown.edu/' },
        {
          '@type': 'CollegeOrUniversity',
          name: 'McGill University',
          url: 'https://www.mcgill.ca/',
        },
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'Murchison Widefield Array Collaboration',
          url: 'https://www.mwatelescope.org/',
        },
        {
          '@type': 'Organization',
          name: 'American Astronomical Society',
          url: 'https://aas.org/',
        },
        {
          '@type': 'Organization',
          name: 'Canadian Astronomical Society',
          alternateName: 'Société Canadienne d’Astronomie',
          url: 'https://www.casca.ca/',
        },
      ],
      knowsAbout: [
        'Radio astronomy',
        'Radio interferometry',
        '21-cm cosmology',
        'Epoch of Reionization',
        'Radio frequency interference mitigation',
        'Bayesian modeling',
        'Machine learning for astronomy',
        'Murchison Widefield Array',
      ],
      knowsLanguage: ['English', 'French'],
      workLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Providence',
          addressRegion: 'RI',
          addressCountry: 'US',
        },
      },
      sameAs: profileUrls,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name,
      description: config.siteDescription,
      inLanguage: config.siteLanguage.replace('_', '-'),
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': siteUrl,
      url: siteUrl,
      name: `${name} — ${config.siteRole}`,
      isPartOf: { '@id': `${siteUrl}#website` },
      about: { '@id': personId },
      mainEntity: { '@id': personId },
      primaryImageOfPage: absoluteOgImage,
      inLanguage: config.siteLanguage.replace('_', '-'),
    },
  ],
};

const Head = ({ metadata }) => (
  <Helmet>
    <html lang="en" prefix="og: http://ogp.me/ns#" />
    <title itemProp="name" lang="en">
      {metadata.title}
    </title>
    <link rel="canonical" href={config.siteUrl} />
    {/* PNG icons come from gatsby-plugin-manifest; this covers /favicon.ico requests */}
    <link rel="icon" href="/favicon.ico" sizes="any" />

    <meta name="description" content={metadata.description} />
    <meta name="keywords" content={config.siteKeywords} />
    <meta name="author" content={config.fullName} />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
    <meta name="geo.placename" content={location} />

    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content="profile" />
    <meta property="profile:first_name" content="Jade" />
    <meta property="profile:last_name" content="Ducharme" />
    <meta property="og:url" content={metadata.siteUrl} />
    <meta property="og:site_name" content={metadata.title} />
    <meta property="og:image" content={absoluteOgImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content={`${config.fullName} — ${config.siteRole}`} />
    <meta property="og:locale" content={config.siteLanguage} />
    <meta itemProp="name" content={metadata.title} />
    <meta itemProp="description" content={metadata.description} />
    <meta itemProp="image" content={absoluteOgImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={metadata.siteUrl} />
    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:description" content={metadata.description} />
    <meta name="twitter:image" content={absoluteOgImage} />
    <meta name="twitter:image:alt" content={`${config.fullName} — ${config.siteRole}`} />
    <meta name="msapplication-TileColor" content={config.colors.navy} />
    <meta name="theme-color" content={config.colors.navy} />

    {/* identity links: ties these profiles to this site for search engines */}
    {profileUrls.map(url => (
      <link key={url} rel="me" href={url} />
    ))}

    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  </Helmet>
);

export default Head;

Head.propTypes = {
  metadata: PropTypes.object.isRequired,
};
