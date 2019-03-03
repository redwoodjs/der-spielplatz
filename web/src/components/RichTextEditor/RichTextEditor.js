/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Quill from 'quill';
import throttle from 'lodash.throttle';

import 'quill/dist/quill.bubble.css';

const Delta = Quill.import('delta');
let changeDeltas = new Delta();

const RichTextEditor = ({ children, handleChanges }) => {
  const editorEl = useRef(null);

  const throttledAutosave = useRef(
    throttle(async () => {
      try {
        await handleChanges(changeDeltas);
        changeDeltas = new Delta();
      } catch (e) {
        // do nothing
      }
    }, 1000)
  );

  useEffect(() => {
    const quill = new Quill(editorEl.current, {
      modules: {
        toolbar: [
          ['bold', 'strike', { background: [] }, 'link'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'bullet' }, { list: 'check' }],
        ],
      },
      theme: 'bubble', // or 'snow'
    });
    quill.focus();

    if (handleChanges) {
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source !== 'user') {
          return;
        }
        changeDeltas = changeDeltas.compose(delta);
        if (changeDeltas.length() > 0) {
          throttledAutosave.current(changeDeltas);
        }
      });
    }
  }, [editorEl]);

  return <SC.Container ref={editorEl}>{children}</SC.Container>;
};

const SC = {};
SC.Container = styled.div`
  background: #eee;

  .ql-editor {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
  }
`;

RichTextEditor.propTypes = {
  handleChanges: PropTypes.func,
};

export default RichTextEditor;
