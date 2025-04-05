import profileLogo from "./assets/icon.png"
import MenuListe from "./component/MenuListe"
import BarNavig from "./component/bar"
import "./App.css"

function App() {
  const menu1Items = ["Yaourt", "Bananes", "Pommes de Terre", "Carottes", "+"]

  const menu2Items = ["10", "30", "15", "100"]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo} className="logo" alt="Profile Logo" />
        </a>
        <h1>Nouvelle Commande Fournisseur</h1>
      </div>

      <div className="body">
        <div className="menu">
          <div className="menu1">
            <p>Produit</p>
            <MenuListe items={menu1Items} />
          </div>
          <div className="menu2">
            <p>Quantite</p>
            <MenuListe items={menu2Items} />
          </div>
        </div>
      </div>

      <button className="btn">Enregistrer</button>
      <button className="btn">Valider</button>

      <BarNavig />
    </>
  )
}

export default App

