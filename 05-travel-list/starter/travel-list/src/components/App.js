import { useState } from 'react'
import Logo from './components/Logo'
import PackingList from './components/PackingList'
import Stats from './components/Stats'
import Form from './components/Form'

const App = () => {
  const [items, setItems] = useState([])

  const handleAddItems = (item) => {
    setItems((items) => [...items, item])
  }
  const handleDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    )
  }

  const handleClearList = () => {
    if (window.confirm('Are you sure you want to clear the list?')) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onChangeItem={handleToggleItem}
        onClearItems={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

export default App
