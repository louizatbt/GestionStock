import { Link } from "react-router-dom"
import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
import "./App.css"

function AccueilGestion() {
  const menuItems = [
    { title: "Gestion des stocks", path: "/stock" },
    { title: "Gestion des produits", path: "/liste-produits" },
    { title: "Gestion des commandes", path: "/commandes-fournisseur" },
    { title: "Historique", path: "/historique-stock" },
  ]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
        </a>
        <h1>Accueil Gestion</h1>
      </div>

      <div className="body">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-card">
              <h3>{item.title}</h3>
              <Link to={item.path} className="card-btn">
                Accéder
              </Link>
            </div>
          ))}
        </div>
      </div>

      <BarNavig />
    </>
  )
}

export default AccueilGestion

