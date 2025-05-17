import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';


function App() {

  

  const image = "/assets/oip.jpeg";
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState('');
 


  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (includeNumbers) chars += '0123456789';
    if (includeSpecialChars) chars += '!@#$%^&*(){}~';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, includeNumbers, includeSpecialChars]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeSpecialChars, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 '>
        <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
        
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex items-center gap-4 mb-4'>
          <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-4 mb-4'>
          <input
            type='checkbox'
            checked={includeNumbers}
            id='numberInput'
            onChange={() => setIncludeNumbers((prev) => !prev)}
          />
          <label htmlFor='numberInput'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-4 mb-4'>
          <input
            type='checkbox'
            checked={includeSpecialChars}
            id='characterInput'
            onChange={() => setIncludeSpecialChars((prev) => !prev)}
          />
          <label htmlFor='characterInput'>Include Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
