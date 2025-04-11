import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import useProduits from "../../hooks/useProduits";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function Stock() {
  const { user } = useAuth();
  const { produits, error } = useProduits({ fournisseurId: user.id });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fonction pour filtrer les produits
  const filteredProduits = produits.filter(produit =>
    produit.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculer le statut en fonction de la quantité de stock
  const getStatus = (quantite) => {
    if (quantite <= 5) return "Faible";
    return "En stock";
  };

  // Gestion de l'événement de recherche
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <div>Une erreur est survenue lors du chargement des produits.</div>;
  }

  return (
    <>
      <Header title="Stock" />
      <div className="body">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-btn">Rechercher</button>
        </div>

        <div className="stock-container">
          <div className="stock-header">
            <div className="stock-cell">Produit</div>
            <div className="stock-cell">Quantité</div>
            <div className="stock-cell">Statut</div>
          </div>

          {filteredProduits.length > 0 ? (
            filteredProduits.map((produit) => (
              <div key={produit.id} className="stock-row">
                <div className="stock-cell">{produit.nom}</div>
                <div className="stock-cell">{produit.quantite_stock}</div>
                <div className="stock-cell">
                  <span className={`status-badge ${getStatus(produit.quantite_stock) === "Faible" ? "low" : ""}`}>
                    {getStatus(produit.quantite_stock)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>Aucun produit trouvé.</div>
          )}
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
  );
}

export default Stock;
