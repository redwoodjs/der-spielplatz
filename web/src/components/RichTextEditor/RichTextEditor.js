import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import styled from 'styled-components';

import 'quill/dist/quill.bubble.css';

const RichTextEditor = ({ children }) => {
  const editorEl = useRef(null);
  useEffect(() => {
    /* eslint-disable no-new */
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

export default RichTextEditor;
