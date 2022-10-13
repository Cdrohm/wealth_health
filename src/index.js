import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faChevronUp, faChevronDown, faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import App from './components/App';
import reportWebVitals from './reportWebVitals';

//import fontawesome icons
library.add(faChevronUp, faChevronDown, faSort, faSortUp, faSortDown)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='container'>
    <App />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
