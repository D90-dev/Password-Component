import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { passwordCharacters } from '../../utils/characters';
import { MESSAGES } from '../../utils/messages';
import './PasswordGenerator.scss';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [error, setError] = useState('');

  const [checkBoxes, setCheckBoxes] = useState([
    { name: 'lowercase', label: 'Include Lowercase', checked: true },
    { name: 'uppercase', label: 'Include Uppercase', checked: false },
    { name: 'numbers', label: 'Include Numbers', checked: false },
    { name: 'symbols', label: 'Include Symbols', checked: false },
  ]);


  const validateOptions = () => {
    const isAnyOptionSelected = checkBoxes.some(checkBox => checkBox.checked);
    if (!isAnyOptionSelected) {
      setError(MESSAGES.NO_OPTIONS_SELECTED);
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
  };

  const onClickGenerate = useCallback(() => {
    if (!validateOptions()) return; 

    const chars = checkBoxes.reduce((acc, { checked, name }) => checked ? acc + passwordCharacters[name] : acc, '');

    if (chars.length === 0) return;

    const password = Array.from({ length }, () => 
      chars[getRandomIndex(chars.length)]
    ).reduce((password, char) => password + char, '');


    setPassword(password);
  }, [length, checkBoxes]);
  

  const onClickCopy = useCallback(() => {
    if (password.trim() === '') {
      alert((MESSAGES.EMPTY_PASSWORD));
      return;
    }

    navigator.clipboard.writeText(password).then(() => {
      alert(MESSAGES.PASSWORD_COPIED);
    });
  }, [password]);

  const onChangeLength = useCallback(({ target }) => {
    setLength(parseInt(target.value, 10));
  }, []);

  const onChangeCheckBox = useCallback(({target: { name, checked }}) => {
    setCheckBoxes(prevItems =>
      prevItems.map(checkBox =>
        checkBox.name === name ? { ...checkBox, checked } : checkBox
      )
    );
  }, []);

  return (
    <div className="password-generator">
      <div className="input-container">
        <input type="text" value={password} readOnly />
        <button className="copy-btn" onClick={onClickCopy}>
          <FontAwesomeIcon icon={faCopy} className="icon-with-stroke" />
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="settings">
           Character length {length}
          <input
            type="range"
            max="20"
            value={length}
            onChange={onChangeLength}
          />
        
        {checkBoxes.map(option => (
          <label key={option.name}>
            <input
              type="checkbox"
              name={option.name}
              checked={option.checked}
              onChange={onChangeCheckBox}
            />
            {option.label}
          </label>
        ))}
        <button onClick={onClickGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
