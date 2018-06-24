/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'emotion'
import { colors } from '../theme'
import 'normalize.css'
import 'typeface-caveat'
import 'typeface-quicksand'

injectGlobal`
  /* reset all top and bottom margins */
  *, *:before, *:after {
    box-sizing: inherit;
    margin-top: 0;
    margin-bottom: 0;
  }

  /* redefine margins */
  /* paragraph following any other element */
  * + p { margin-top: 1rem; }
  * + h1, * + h2, * + h3, * + h4, * + h5, * + h6 { margin-top: 1.5rem; }

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
    /* font-family: -apple-system,'BlinkMacSystemFont','Segoe UI','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'; */
    /* font-family: 'Julius Sans One', sans-serif; */
    font-family: 'Quicksand', sans-serif;
    /* font-family: 'Tenor Sans', sans-serif; */
    line-height: 1.4;
  }

  a {
    text-decoration: none;
    color: ${colors.black}
  }
`
