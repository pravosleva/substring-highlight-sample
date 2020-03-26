import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HighlightedText as HighlightedTextV1 } from './components/0-HighlightedText';
import { HighlightedText as HighlightedTextV2 } from './components/1-HighlightedText';

const list = ['Москва', 'Мо', 'Можайск', 'Санкт-Петербург', 'Уфа', 'Казань', 'Тверь', 'Владимир', 'Нижний Новгород'];

function App() {
  // WAY 1:
  const [inputValue, setInputValue] = useState('');
  // WAY 2:
  const [inputValueRegExp, setInputValueRegExp] = useState(new RegExp(null));

  const handleChange = (e: any): void => {
    setInputValue(e.target.value);
    setInputValueRegExp(new RegExp(`^(.*?)(${e.target.value})(.*)$`, 'i'));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input value={inputValue} onChange={handleChange} />
        </p>
        <div className='samples-container'>
          <div className='sample-list'>
            {
              list.map((name, i, a) => (
                <div key={i}>
                  <HighlightedTextV1
                    inputValue={inputValue}
                    comparedValue={name}
                  />
                </div>
              ))
            }
          </div>
          <div className='sample-list'>
            {
              list.map((name, i, a) => (
                <div key={i}>
                  <HighlightedTextV2
                    inputValueRegExp={inputValueRegExp}
                    comparedValue={name}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
