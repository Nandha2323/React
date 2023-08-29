import React, { useRef } from 'react'
import { useReducer, useState } from 'react'

const ACTION = {
    INCREMENT: "Increment",
    DECREMENT: "Decrement",
    ADDNAME: "AddName"
}
const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.INCREMENT:
            return { ...state, count: state.count + 1 };
        case ACTION.DECREMENT:
            return { ...state, count: state.count - 1 };
        case ACTION.ADDNAME:
            return { ...state, ADDNAME: action.payload };
        default:
            return state;
    }
}

function FuseReducer() {
    // For UseReducer
    const [Nam, setNam] = useState("");
    const [state, dispatch] = useReducer(reducer, { count: 0, ADDNAME: "" })


    function handleSubmit(ev) {
        ev.preventDefault();
        dispatch({
            type: ACTION.ADDNAME,
            payload: Nam
        })
    }

    // For UseImperatveHandle
    const [list, setList] = useState([]);
    const [email, setEmail] = useState('');
    const inputref = useRef();
    function handleSubmit2(ev) {
        ev.preventDefault();
        setList((ls) => [...ls, email])
        setEmail("");
        inputref.current.focus()
    }
    return (
        <div className='text-center'>
            <h1>Advanced Hooks</h1>
            {/* UseReducer */}
            <div className=" border border-primary border-3">
                <h2>UseReducer</h2>
                <div>
                    <input type='text' value={Nam}
                        placeholder='Enter Your Name'
                        onChange={(ev) => setNam(ev.target.value)} />
                    <button onClick={handleSubmit} >Submit</button>
                    <h3>Name: {state.ADDNAME}</h3>
                </div>
                <div className='box'>
                    <button onClick={() => dispatch({ type: "Increment" })}>Add</button>
                    <h2> {state.count}</h2>
                    <button onClick={() => dispatch({ type: "Decrement" })}>Sub</button>
                </div>
            </div><br /><br />

            {/* UseImperativeHandle */}
            <div className=" border border-primary border-3">
                <h2>UseImperativeHandle</h2>
                <ul>
                    {list.map((l) => {
                       return <li key={l}>{l}</li>
                    })}
                </ul>
                <div>
                    <input type='email'
                        ref={inputref}
                        value={email}
                        placeholder='Enter Your Name'
                        onChange={(ev) => setEmail(ev.target.value)} />
                    <button onClick={handleSubmit2} >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default FuseReducer;