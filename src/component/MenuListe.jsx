const MenuListe = ({ items }) => {
  return (
    <div className="menu-container">
      {items.map((item, index) => (
        <button key={index} className="menu-button">
          {item}
        </button>
      ))}
    </div>
  )
}

export default MenuListe

