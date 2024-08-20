import React from 'react';
import './App.scss';
import PasswordGenerator from './components/PasswordGenerator/PassworGenerator';

function App() {
  return (
    <div className="app">
      <div className='container'>
      <PasswordGenerator />
      </div>
    </div>
  );
}

export default App;
