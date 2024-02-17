const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
]

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>
}
function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
    </form>
  )
}

function Item({ item }) {
  return <li>{item.description}</li>
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  )
}
function Stats() {
  return (
    <footer className="stats">
      <em>
        You got everything! Ready to go ✈️ 💼 You have items on your list, and
        you already packed
      </em>
    </footer>
  )
}
