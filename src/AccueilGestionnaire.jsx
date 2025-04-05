import { Link } from "react-router-dom"
import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
import "./App.css"

function AccueilGestionnaire() {
  const alertes = [
    {
      id: 1,
      titre: "Entrepôt rempli à",
      valeur: "85%",
      icon: "📦",
      couleur: "orange",
    },
    {
      id: 2,
      titre: "Rupture de stock sur",
      valeur: "5 produits",
      icon: "⚠️",
      couleur: "red",
    },
    {
      id: 3,
      titre: "Stock bientôt épuisé",
      valeur: "(>10 pcs)",
      icon: "⚠️",
      couleur: "yellow",
      sousTitre: "3 produits",
    },
  ]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
        </a>
        <h1>Accueil Gestionnaire</h1>
      </div>

      <div className="body">
        <div className="alertes-container">
          {alertes.map((alerte) => (
            <div key={alerte.id} className={`alerte-card alerte-${alerte.couleur}`}>
              <div className="alerte-icon">{alerte.icon}</div>
              <div className="alerte-content">
                <h3>
                  {alerte.titre} <strong>{alerte.valeur}</strong>
                </h3>
                {alerte.sousTitre && <p>{alerte.sousTitre}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/stock" className="btn">
          Gérer le stock
        </Link>
        <Link to="/historique-stock" className="btn">
          Voir l'historique
        </Link>
      </div>

      <BarNavig />
    </>
  )
}

export default AccueilGestionnaire

