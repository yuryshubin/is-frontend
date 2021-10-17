import * as React from 'react';

import logo from '../assets/icons/logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ContentContainer from '../features/dashboard/components/ContentContainer/ContentContainer.lazy';

function App() {
   return (
      <div className='App'>
         <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />

            <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
               IntelliStyle Test
            </a>
         </header>
         <ContentContainer />
      </div>
   );
}

export default App;
