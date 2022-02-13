import React,{useReducer, useEffect} from 'react';

import './Input.css';
import{validate} from '../util/validators';

const inputReducer= (State, action)=>{
    switch (action.type) {
        case 'CHANGE':
            
            return{
                ...State,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return{
                ...State,
                isTouched: true
            };    
    
        default:
            return State;
    }

}

const Input = props => {
   const [inputState, dispatch]= useReducer(inputReducer,{
   value:props.initialvalue || '',
   isTouched: false,
   isValid : props.initialvalid || false});

   const { id, onInput} = props;
   const {value, isValid} = inputState;

   
   useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

    const changeHandler = event =>{
        dispatch({
            type:'CHANGE',
            val : event.target.value,
            validators:props.validators
    });
    };

const TouchHandler = () =>{
    dispatch({
        type :'TOUCH'
    });

}    
  const element =
    props.element === 'input' ? (
      <input id={props.id} 
      type={props.type} 
      placeholder={props.placeholder}
       onChange={changeHandler} 
       onBlur={TouchHandler}
       value={inputState.value}/>
    ) : (
      <textarea id={props.id} 
      rows={props.rows || 3} 
      onChange={changeHandler}
      onBlur={TouchHandler} 
      value={inputState.value}/>
    );
    

  return ( 
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      { !inputState.isValid &&inputState.isTouched &&<p>{props.errorText}</p>}
    </div>
  );
};

export default Input;