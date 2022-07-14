/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import Widget from "./Widget";

const urlParams = new URLSearchParams(window.location.search);
const isWidget = urlParams.has('widget')

render(() => isWidget ? <Widget /> : <App />, document.getElementById('root') as HTMLElement);
