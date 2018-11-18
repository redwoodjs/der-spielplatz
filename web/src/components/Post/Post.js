import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

const Post = ({
  title, text, createdAt, category,
}) => {
  return (
    <>
      <SC.Title>{title}</SC.Title>
      <SC.ByLine>
        {createdAt && (
          <>
            {'Posted on '}
            {Intl.DateTimeFormat('en-US').format(Date.parse(createdAt))}
            <br />{' '}
          </>
        )}
        {'in '}
        <em>{category.name}</em>
      </SC.ByLine>
      <SC.Body>{text.split('\n').join(<br />)}</SC.Body>
    </>
  );
};

const SC = {};
SC.Title = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 40px;
  margin-bottom: 16px;
`;
SC.ByLine = styled.div`
  color: #666;
  margin-bottom: 24px;
`;
SC.Body = styled.div`
  color: #333;
  max-width: 600px;
`;

// TODO: This could also be a data structure
export const Skeleton = () => (
  <ContentLoader height={300} width={600} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="0" y="10" rx="0" ry="0" width="300" height="30" />
    <rect x="0" y="65" rx="0" ry="0" width="150" height="15" />
    <rect x="0" y="93.83" rx="0" ry="0" width="170" height="15" />

    <rect x="0" y="125" rx="0" ry="0" width="350" height="12" />
    <rect x="0" y="150" rx="0" ry="0" width="350" height="12" />
    <rect x="0" y="175" rx="0" ry="0" width="350" height="12" />
    <rect x="0" y="200" rx="0" ry="0" width="350" height="12" />
  </ContentLoader>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default Post;
