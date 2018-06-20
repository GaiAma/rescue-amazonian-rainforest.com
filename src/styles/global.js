/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'emotion'
import 'normalize.css'

injectGlobal`
  *, *:before, *:after {
    box-sizing: inherit;
    margin-top: 0;
    margin-bottom: 0;
  }

  html {
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system,'BlinkMacSystemFont','Segoe UI','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
    /* line-height: 1.25; */
  }

  a {
    text-decoration: none;
  }
`
