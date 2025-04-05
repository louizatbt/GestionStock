import profileLogo from "./assets/icon.png"
import MenuListe from "./component/MenuListe"
import BarNavig from "./component/bar"
import "./App.css"

function App() {
  const menuItems = ["25/02/2025", "26/02/2025", "27/02/2025", "28/02/2025"]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo} className="logo" alt="Profile Logo" />
        </a>
        <h1>Commandes</h1>
      </div>

      <div className="body">
        <p>Commandes en attente de validation</p>
        <div className="menu">
          <MenuListe items={menuItems} />
        </div>
      </div>

      <button className="btn">Nouvelle Commande</button>
      <button className="btn">Historique Commandes</button>

      <BarNavig />
    </>
  )
}

export default App

