export default function Stats({ items }) {
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const itemPerc = (numPacked / numItems) * 100

  if (!numItems)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    )

  return (
    <footer className="stats">
      <em>
        {itemPerc < 100
          ? `📦 You have ${numItems} items on your list, and
        ${
          numPacked
            ? ` you already packed ${numPacked} (${itemPerc}%)`
            : ' nothing is packed yet.'
        }`
          : 'You got everything! Ready to go! 🚢'}
      </em>
    </footer>
  )
}
