import {useState} from 'react'

const Item = ({item, onDeleteItem, onChangeItem}) => {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onChangeItem(item.id)}
            />
            <span
                style={
                    item.packed
                        ? {
                            textDecoration: 'line-through',
                        }
                        : {}
                }
            >
        {item.quantity} {item.description}
      </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    )
}

const Logo = () => {
    return <h1>🌴 Far Away 💼</h1>
}

const Form = ({onAddItems}) => {
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description) return

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        }

        setDescription('')
        setQuantity(1)
        onAddItems(newItem)
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                    <option>{num}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    )
}

const PackingList = ({items, onDeleteItem, onChangeItem}) => {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onChangeItem={onChangeItem}
                    />
                ))}
            </ul>
        </div>
    )
}

const Stats = () => {
    return (
        <footer className="stats">
            <em>You have X items on your list, and you already packed X%</em>
        </footer>
    )
}

const App = () => {
    const [items, setItems] = useState([])
    const numItems = items.length

    const handleAddItems = (item) => {
        setItems((items) => [...items, item])
    }
    const handleDeleteItems = (id) => {
        setItems((items) => items.filter((item) => item.id !== id))
    }

    const handleToggleItem = (id) => {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? {...item, packed: !item.packed} : item,
            ),
        )
    }
    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItems}
                onChangeItem={handleToggleItem}
            />
            <Stats/>
        </div>
    )
}

export default App
