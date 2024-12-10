// MODULE
import { useState } from 'react'

// CSS
import './css/App.css'
import './css/accessGate.css'

const elements = {
    H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10,
    Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18,
    K: 19, Ca: 20, Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26,
    Co: 27, Ni: 28, Cu: 29, Zn: 30, Ga: 31, Ge: 32, As: 33, Se: 34,
    Br: 35, Kr: 36, Rb: 37, Sr: 38, Y: 39, Zr: 40, Nb: 41, Mo: 42,
    Tc: 43, Ru: 44, Rh: 45, Pd: 46, Ag: 47, Cd: 48, In: 49, Sn: 50,
    Sb: 51, Te: 52, I: 53, Xe: 54, Cs: 55, Ba: 56, La: 57, Ce: 58,
    Pr: 59, Nd: 60, Pm: 61, Sm: 62, Eu: 63, Gd: 64, Tb: 65, Dy: 66,
    Ho: 67, Er: 68, Tm: 69, Yb: 70, Lu: 71, Hf: 72, Ta: 73, W: 74,
    Re: 75, Os: 76, Ir: 77, Pt: 78, Au: 79, Hg: 80, Tl: 81, Pb: 82,
    Bi: 83, Po: 84, At: 85, Rn: 86, Fr: 87, Ra: 88, Ac: 89, Th: 90,
    Pa: 91, U: 92, Np: 93, Pu: 94, Am: 95, Cm: 96, Bk: 97, Cf: 98,
    Es: 99, Fm: 100, Md: 101, No: 102, Lr: 103, Rf: 104, Db: 105,
    Sg: 106, Bh: 107, Hs: 108, Mt: 109, Ds: 110, Rg: 111, Cn: 112,
    Nh: 113, Fl: 114, Mc: 115, Lv: 116, Ts: 117, Og: 118
};


function toProperCase(string){
    return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

function checkAccess(accessInput, setAccessInput, setAccess){
    if (accessInput == import.meta.env.VITE_ACCESS_KEY){
        setAccess(true)
        setAccessInput('')
    }
}

function checkTwoChar(i, passwordInput){
    if (passwordInput.slice(i).length > 1){
        if (elements[toProperCase(passwordInput.slice(i, i+2))]){
            return true
        }
    }
    return false
}

function encrypt(passwordInput, encryptFirstLetter, acknowledgeSpace, dontUpper, setEncrypted, setCopied){ 
    let result = ""
    
    if(!acknowledgeSpace){
        passwordInput = passwordInput.split(" ").join('')
    }
    if(!dontUpper){
        passwordInput = passwordInput.toUpperCase()
    }
    if(!encryptFirstLetter){
        result += passwordInput.slice(0, 1)
        passwordInput = passwordInput.slice(1)
    }

    let i = 0
    while (i < passwordInput.length){
        if (checkTwoChar(i, passwordInput)){
            result += elements[toProperCase(passwordInput.slice(i, i+2))]
            i+=1
        } else if(elements[toProperCase(passwordInput.slice(i,i+1))]){
            result += elements[toProperCase(passwordInput.slice(i,i+1))]
        } else{
            result += passwordInput.slice(i, i+1)
        }
        i+=1
    }

    if(acknowledgeSpace){
        result = result.split(" ").join('')
    }
    setCopied(false)
    setEncrypted(result)
}

function App() {
  const [access, setAccess] = useState(false)
  const [accessInput, setAccessInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [encryptFirstLetter, setEncryptFirstLetter] = useState(false)
  const [acknowledgeSpace, setAcknowledgeSpace] = useState(false)
  const [dontUpper, setDontUpper] = useState(false)
  const [encrypted, setEncrypted] = useState("")
  const [copied, setCopied] = useState(false)

    return (
        access ? 
            (
                <div id="container">
                    <input 
                        type="text"
                        id="passwordInput"
                        value={passwordInput}
                        autoComplete='off'
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={e => e.key == "Enter" ? passwordInput.length > 0 ? encrypt(passwordInput, encryptFirstLetter, acknowledgeSpace, dontUpper, setEncrypted, setCopied) : null : null}
                    />
                    {
                        passwordInput.length > 0 ?
                            (<button
                                id='clearInput'
                                onClick={() => setPasswordInput('')}
                                title='clear input'
                            >
                                &#x2715;
                            </button>)
                        : null
                    }
                    <h1>Input Password</h1>
                    <div id="options">
                        <label className='optionButton'>
                            <input 
                                type="checkbox" 
                                name="encryptFirstLetter" 
                                id="encryptFirstLetter" 
                                onClick={() => encryptFirstLetter ? setEncryptFirstLetter(false) : setEncryptFirstLetter(true)}
                            />
                            <span></span>
                            <h1 className='optionLabel'>Encrypt First Letter</h1>
                        </label>
                        <label className='optionButton'>
                            <input 
                                type="checkbox" 
                                name="acknowledgeSpace" 
                                id="acknowledgeSpace" 
                                onClick={() => acknowledgeSpace ? setAcknowledgeSpace(false) : setAcknowledgeSpace(true)}
                            />
                            <span></span>
                            <h1 className='optionLabel'>Acknowledge Space</h1>
                        </label>
                        <label className='optionButton'>
                            <input 
                                type="checkbox" 
                                name="dontUpper" 
                                id="dontUpper" 
                                onClick={() => dontUpper ? setDontUpper(false) : setDontUpper(true)}
                            />
                            <span></span>
                            <h1 className='optionLabel'>Keep Original Letter Case</h1>
                        </label>
                    </div>
                    <button
                        id="passwordSubmit"
                        onClick={() => passwordInput.length > 0 ? encrypt(passwordInput, encryptFirstLetter, acknowledgeSpace, dontUpper, setEncrypted, setCopied) : null}
                    >
                        <h1>Submit</h1>
                        <div className="bg1"></div>
                        <div className="bg2"></div>
                    </button>
                    <div id="output">
                        {encrypted ? (<h1>{encrypted}</h1>) : null}
                    </div>
                    {
                        encrypted ?
                            (<>
                                <div   
                                    id="copyButton"
                                    style={copied ? null : {cursor: "pointer"}}
                                    onClick={() =>{
                                        if(!copied){
                                            navigator.clipboard.writeText(encrypted)
                                            setCopied(true)
                                        } 
                                    }}
                                >
                                    {
                                        copied ?
                                            (<i className='bx bx-check'></i>)
                                        :
                                            (<i className='bx bx-copy'></i>)
                                    }
                                </div>
                                <div
                                    id='refreshButton'
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        setPasswordInput("")
                                        setEncrypted("")
                                        setCopied(false)
                                    }}
                                >
                                    <i className='bx bx-refresh'></i>
                                </div>
                            </>)
                        : null
                    }
                </div>
            )
        :
            (
                <div id="accessGate">
                    <input 
                        type="password" 
                        id="accessInput" 
                        value={accessInput} 
                        autoComplete="off"
                        onChange={e => setAccessInput(e.target.value)}
                        onKeyDown={e => e.key == "Enter" ? checkAccess(accessInput, setAccessInput, setAccess) : null}
                    />
                    <h1>Enter Access Key</h1>
                    <button
                        id="accessSubmit"
                        onClick={() => checkAccess(accessInput, setAccessInput, setAccess)}
                    >
                        <h1>Submit</h1>
                        <div className="bg1"></div>
                        <div className="bg2"></div>
                    </button>
                </div>
            )
    )
}

export default App
