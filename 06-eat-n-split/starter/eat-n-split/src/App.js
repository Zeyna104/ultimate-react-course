import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show)
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend((show) => !show)
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  )
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  )
}

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !image) return
    const id = crypto.randomUUID() // generates random id from browser
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    }
    onAddFriend(newFriend)
    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label htmlFor='name'>👬 Friend name</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor='image'>🌆 Image URL</label>
      <input
        type='text'
        id='image'
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill() {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>

      <label htmlFor='bill'>💰 Bill value</label>
      <input type='number' id='bill' />

      <label htmlFor='expense'>🤵 Your exxpense</label>
      <input type='number' id='expense' />

      <label htmlFor='friend'>👬 {'X'}'s expense</label>
      <input type='number' id='friend' disabled />

      <label htmlFor='paying'>🤑 Who is paying the bill?</label>
      <select id='paying'>
        <option value=''>You</option>
        <option value=''>X</option>
      </select>

      <Button>Split</Button>
    </form>
  )
}
