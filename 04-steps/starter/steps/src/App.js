import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen, setisOpen] = useState(false)

  function handleNext() {
    if (step < 3) setStep((s) => s + 1)
  }

  function handlePrev() {
    if (step > 1) setStep((s) => s - 1)
  }

  return (
    <>
      <button className='close' onClick={() => setisOpen(!isOpen)}>
        {isOpen ? (
          <i className='bi bi-x-circle-fill'></i>
        ) : (
          <i className='bi bi-plus-circle-fill'></i>
        )}
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className='buttons'>
            <Button onClick={handlePrev}>
              <span>👈</span> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className='message'>
      <h3>Step {step}:</h3>
      {children}
    </div>
  )
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
