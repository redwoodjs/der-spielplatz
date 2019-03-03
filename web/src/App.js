import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { GraphQLProvider } from 'hammer';

import { RichTextEditor } from 'src/components';

import './global.css';

const App = () => (
  <GraphQLProvider>
    <RichTextEditor />
  </GraphQLProvider>
);

ReactDOM.render(<App />, document.getElementById('hammer-app'));
