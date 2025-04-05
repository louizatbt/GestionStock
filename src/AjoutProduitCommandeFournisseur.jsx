import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
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
        <h1>Ajout Produit Commande</h1>
      </div>

      <div className="body">
        <div>
          <input type="text" className="input" placeholder="Produit" />
        </div>
        <div>
          <input type="text" className="input" placeholder="Quantite" />
        </div>
      </div>

      <button className="btn">Valider</button>
      <button className="btn">Retour</button>

      <BarNavig />
    </>
  )
}

export default App

