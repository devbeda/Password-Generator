import { useState,useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState("")

  const passwordRef = useRef("null");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*|:?;',."

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char);

    }
    setPassword(pass)


  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasstoClipBoard = useCallback( () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  }, [password])
  
  useEffect(() => {
    passwordGenerator()
  },[numberAllowed,charAllowed,length,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-500 bg-gray-800 '>
        <h1 className='text-white text-center text-xl pt-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden  items-center'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 my-4 rounded-l-lg'
          placeholder='Your Password'
          readOnly
          ref={passwordRef}
          />
          <button
          className='outline-none  bg-sky-400 p-3 py-[0.290rem] shrink-0 rounded-r-lg text-gray-700'
          onClick={copyPasstoClipBoard}
          >Copy</button>
        </div>
        <div className='flex flex-col items-center text-sm gap-y-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer w-56 blue-400'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className=' flex items-center flex-col gap-y-2 mb-3'>
            <div className=' flex items-center gap-x-0.5'>
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className=' flex items-center gap-x-0.5'>
              <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
