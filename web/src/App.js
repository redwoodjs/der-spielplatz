import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router } from '@reach/router';

import { RichTextEditor } from 'src/components';
import { client } from 'src/lib/graphql';

import './global.css';

const App = () => <RichTextEditor>I am a sausage</RichTextEditor>;

ReactDOM.render(<App />, document.getElementById('hammer-app'));
