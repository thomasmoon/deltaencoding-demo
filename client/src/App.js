import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import logo from './logo-aito.ai.svg';
import logoTm from './logo-thomas_moon.svg';
import './App.css';

// This works well with strings
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || '',
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

// A bit redundant, but it will do
const useStateWithLocalStorageBool = localStorageKey => {
  const [value, setValue] = React.useState(
    // This is scary looking, but the first condition casts as boolean
    localStorage.getItem(localStorageKey) === 'true'? true : false || false,
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};



function App() {

  // State using hooks: inputText
  const [inputText, setInputText] = useStateWithLocalStorage(
    'inputTextInLocalStorage',
  );

  // Event for variable
  const onInputTextChange = event => setInputText(event.target.value);

  // Decompression mode?
  const [decompression, setDecompression] = useStateWithLocalStorageBool(
    'decompressionInLocalStorage',
  );

  const toggleDecompression = () => {
    setDecompression(prev => !prev);
  };

  const placeholderText = () => {
    return decompression ? textCompressed : textNormal;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted, making POST request...');

    console.log(event);

    const xhr = new XMLHttpRequest()
    const route = decompression ? 'decompress' : 'compress';

    // Callback
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      setInputText(xhr.responseText)
      toggleDecompression()
    })

    xhr.open('POST', 'http://localhost:3000/' + route);
    xhr.send(inputText);
  }

  // Examples of uncompressed and compressed strings
  const textNormal =
`myxa
myxophyta
myxopod
...`;

const textCompressed =
`0 myxa
3 ophyta
5 od
...`;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Compressor</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Compress text using the delta encoding algorithm.<br />
            <textarea name="input" placeholder={placeholderText()} value={inputText} onChange={onInputTextChange}></textarea>
          </label>
          <br />
          <FormControlLabel
            control={<Switch size="small" checked={decompression} value="true" onChange={toggleDecompression} inputProps={{ 'aria-label': 'Decompress?' }} color="secondary" />}
            label="Decompress?"
            labelPlacement="start"
          /><br />
          <input type="submit" value="Convert text"/><br />
        </form>
        <a href="https://aito.ai/" className="App-logo">
          demo for<br />
          <img src={logo} className="App-logo-img" alt="logo" />
        </a>
        <a href="https://github.com/thomasmoon" className="App-tm">
          by Thomas Moon<br />
          <img src={logoTm} className="App-tm-img" alt="Thomas Moon" />
        </a>
      </header>
    </div>
  );
}

export default App;
