import profileLogo from "./assets/icon.png"
import MenuListe from "./component/MenuListe"
import "./App.css"

function App() {
  const menu1Items = ["25/02/2025", "26/02/2025", "27/02/2025", "28/02/2025"]

  const menu2Items = ["Valide", "En Attente", "Livre", "En Attente"]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo} className="logo" alt="Profile Logo" />
        </a>
        <h1>Historique Commandes</h1>
      </div>

      <div className="body">
        <div className="menu">
          <div className="menu1">
            <p>Commande</p>
            <MenuListe items={menu1Items} />
          </div>
          <div className="menu2">
            <p>Statut</p>
            <MenuListe items={menu2Items} />
          </div>
        </div>
      </div>

      <button className="btn">Retour</button>
    </>
  )
}

export default App

