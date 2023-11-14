import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
]

// Properties
function Pizza({ pizzaObj }) {
  // if (props.pizzaObj.soldOut) return null
  return (
    <li className={`pizza ${pizzaObj.soldOut && 'sold-out'}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div className="content">
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : +pizzaObj.price + 3 + '$'}</span>
      </div>
    </li>
  )
}

function Header() {
  // NOTE: Bad idea
  const style = {
    // color: 'red',
    // fontSize: '3rem',
    // textTransform: 'uppercase',
  }

  return (
    <header className="header">
      {new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())}
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  )
}

function Main() {
  const numPizzas = pizzaData.length

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        // Fragment - for 2 or more elements
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        'We are still working on our menu.'
      )}

      {/* NOTE: Very unefficient way */}
      {/* <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        price="6"
        photoName="pizzas/focaccia.jpg"
      />
      <Pizza
        name="Pizza Margherita"
        photoName="pizzas/margherita.jpg"
        price="10"
        ingredients="Tomato and mozarella"
      /> */}
    </main>
  )
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p
        style={{
          textAlign: 'center',
        }}
      >
        We're currently open until {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order now</button>
    </div>
  )
}

function Footer() {
  // return React.createElement('footer', null, "We're currently open!")
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  // NOTE: not a good use case
  // if (!isOpen)
  //   return (
  //     <p>
  //       We're happy to welcome you between{openHour}:00 and {closeHour}:00.{' '}
  //     </p>
  //   )

  return (
    <footer className="footer">
      {isOpen && <Order closeHour={closeHour} />}
    </footer>
  )
}

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

// NOTE: React v18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// NOTE: React before v18
// React.render(<App />)
