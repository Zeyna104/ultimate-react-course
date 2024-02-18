import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)
  // const [test, setTest] = useState({ name: 'Zeynal' })

  function handlePrevious() {
    step > 1 && setStep((s) => s - 1)
  }
  function handleNext() {
    if (step < messages.length) {
      setStep((s) => s + 1)
      // setStep((s) => s + 1)
    }
    // setTest({ name: 'emil' })
  }
  function handleClose() {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  return (
    <>
      <button className='close' onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <p className='message'>
            Step {step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>
          <div className='buttons'>
            <Button
              onClick={handlePrevious}
              bgColor={'#79 50f2'}
              textColor={'#fff'}
            >
              <span>👈</span> Previous
            </Button>
            <Button onClick={handleNext} bgColor={'#7950f2'} textColor={'#fff'}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
