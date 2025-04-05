"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
import "./App.css"

function ListeProduits() {
  const [searchTerm, setSearchTerm] = useState("")

  const produits = [
    { id: 1, nom: "Yaourt", quantite: 100, prix: "2.50€" },
    { id: 2, nom: "Bananes", quantite: 30, prix: "1.20€" },
    { id: 3, nom: "Pommes de Terre", quantite: 150, prix: "0.90€" },
    { id: 4, nom: "Carottes", quantite: 200, prix: "1.10€" },
    { id: 5, nom: "Camembert", quantite: 50, prix: "3.20€" },
    { id: 6, nom: "Patate", quantite: 80, prix: "0.85€" },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredProduits = produits.filter((produit) => produit.nom.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
        </a>
        <h1>Liste des produits</h1>
      </div>

      <div className="body">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input with-icon"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="produits-list">
          <div className="produits-header">
            <div className="produit-cell">Nom</div>
            <div className="produit-cell">Quantité</div>
            <div className="produit-cell">Prix</div>
          </div>

          {filteredProduits.map((produit) => (
            <div key={produit.id} className="produit-row">
              <div className="produit-cell">{produit.nom}</div>
              <div className="produit-cell">{produit.quantite}</div>
              <div className="produit-cell">{produit.prix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/ajout-produit" className="btn">
          Créer un produit
        </Link>
        <button className="btn">Liste Cartons</button>
        <button className="btn">Créer un Carton</button>
        <Link to="/historique-stock" className="btn">
          Historique
        </Link>
        <button className="btn">Rapport (PDF)</button>
        <Link to="/accueil-gestion" className="btn">
          Retour
        </Link>
      </div>

      <BarNavig />
    </>
  )
}

export default ListeProduits

