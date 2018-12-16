import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';

import { updatePost } from 'src/api/post';

class Editor extends React.Component {
  constructor(props) {
    const { title, text } = props;
    super();
    this.state = {
      title,
      text,
    };
  }

  handleInputChange = event => {
    const {
      target: {
        name, type, checked, value,
      },
    } = event;
    const val = type === 'checkbox' ? checked : value;

    this.setState({
      [name]: val,
    });
  }

  handleSubmit = (e, mutate) => {
    const { id } = this.props;
    e.preventDefault();
    mutate({ variables: { post: { id, ...this.state } } });
  }

  render() {
    const { title, text } = this.state;
    return (
      <Mutation mutation={updatePost().mutation}>
        {mutate => (
          <form onSubmit={e => this.handleSubmit(e, mutate)}>
            <SC.Title name="title" type="text" value={title} onChange={this.handleInputChange} />
            <SC.Body name="text" rows="4" value={text} onChange={this.handleInputChange} />
            <button type="submit">Save</button>
          </form>
        )}
      </Mutation>
    );
  }
}

const SC = {};
SC.Title = styled.input`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 40px;
  margin-bottom: 16px;
`;
SC.Body = styled.textarea`
  color: #333;
  max-width: 600px;
`;

Editor.queryProps = {
  skeleton: {
    height: 300,
    width: 600,
    shapes: [
      <rect x="0" y="10" rx="0" ry="0" width="300" height="30" />,
      <rect x="0" y="65" rx="0" ry="0" width="150" height="15" />,
      <rect x="0" y="125" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="150" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="175" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="200" rx="0" ry="0" width="350" height="12" />,
    ],
  },
};

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Editor;
