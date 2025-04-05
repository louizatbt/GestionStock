import { Link } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function Stock() {
  const produits = ["Yaourt", "Bananes", "Pommes de Terre", "Carottes"]
  const quantites = ["100", "30", "150", "200"]
  const statuts = ["En stock", "En stock", "Faible stock", "En stock"]

  return (
    <>
      <Header title="Stock" />

      <div className="body">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Rechercher un produit..." />
          <button className="search-btn">Rechercher</button>
        </div>

        <div className="stock-container">
          <div className="stock-header">
            <div className="stock-cell">Produit</div>
            <div className="stock-cell">Quantité</div>
            <div className="stock-cell">Statut</div>
          </div>

          {produits.map((produit, index) => (
            <div key={index} className="stock-row">
              <div className="stock-cell">{produit}</div>
              <div className="stock-cell">{quantites[index]}</div>
              <div className="stock-cell">
                <span className={`status-badge ${statuts[index] === "Faible stock" ? "low" : ""}`}>
                  {statuts[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/ajout-produit" className="btn">
          Ajouter un produit
        </Link>
        <Link to="/accueil-gestion" className="btn">
          Retour
        </Link>
      </div>

      <BarNavigation />
    </>
  )
}

export default Stock

