import React from 'react'
import { useState } from 'react'
import Button from '../components/Button'
import './Calculator.css'
import Display from './Display'

const Calculator = () => {
  const buttons = ['AC', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']
  const initialStates = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  }

  const [ displayValue , setDisplayValue ] = useState(initialStates.displayValue)
  const [ clearDisplay , setClearDisplay ] = useState(initialStates.clearDisplay)
  const [ operation , setStateOperation ] = useState(initialStates.operation)
  const [ values , setValues ] = useState(initialStates.values)
  const [ current , setCurrent ] = useState(initialStates.current)

  function clearMemory() {
    setDisplayValue(initialStates.displayValue)
    setClearDisplay(initialStates.clearDisplay)
    setStateOperation(initialStates.operation)
    setValues(initialStates.values)
    setCurrent(initialStates.current)
  }

  function setOperation(oprt) {
    if (current === 0) {
      setCurrent(1)
      setStateOperation(oprt)
      setClearDisplay(true)
    } else {
      const equals = oprt === '=' 
      const currentOperation = operation

      const valuesToCal = values
      try {
        valuesToCal[0] = eval(`${valuesToCal[0]} ${currentOperation} ${valuesToCal[1]}`)

      } catch(e) {
        valuesToCal[0] = values[0]
      }
      valuesToCal[1] = 0

      setDisplayValue(valuesToCal[0])
      setStateOperation( equals ? null : oprt)
      setCurrent(equals? 0 : 1 )
      setClearDisplay(!equals)
      setValues(valuesToCal)
    }
  }

  function addDigit(n) {
    if (n === '.' && displayValue.includes('.')){
      return
    } 

    const shouldClearDisplay = displayValue === '0' || clearDisplay
    const addCurrentValue = shouldClearDisplay? '' : displayValue
    const addDisplayValue = addCurrentValue + n

    setDisplayValue(addDisplayValue)
    setClearDisplay(false)

    if (n !== '.'){
      const i = current
      const newValue = parseFloat(addDisplayValue)
      const newValues = values
      newValues[i] = newValue
      setValues(newValues)
    }
  }

  return (
    <div className='calculator'>
      <Display value={displayValue}/>
      {buttons.map( button => {
        if (button === '*' || button === '/' || button === '-' || button === '+' || button === '='){
          return <Button key={button} click={() => setOperation(button)} className={'button button-operation'} label={button}/>
        } else if (button === 'AC'){
          return <Button key={button} click={() => clearMemory()} className={'button button-' + button} label={button}/>
        } else{
          return <Button key={button} click={() => addDigit(button)} className={'button button-' + button} label={button}/>
        }
      })}
    </div>
  )
}

export default Calculator