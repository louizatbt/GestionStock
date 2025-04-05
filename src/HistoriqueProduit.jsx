"use client"

import { useState } from "react"
import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
import "./App.css"

function HistoriqueProduit() {
  const [selectedProduit, setSelectedProduit] = useState("Yaourt")

  const produits = ["Yaourt", "Bananes", "Pommes de Terre", "Carottes"]

  const historique = [
    { date: "25/02/2025", action: "Ajout stock", quantite: "+50", utilisateur: "Admin" },
    { date: "20/02/2025", action: "Modification prix", ancien: "2.50€", nouveau: "2.75€", utilisateur: "Gestionnaire" },
    { date: "15/02/2025", action: "Retrait stock", quantite: "-30", utilisateur: "Vendeur" },
    { date: "10/02/2025", action: "Ajout stock", quantite: "+100", utilisateur: "Admin" },
  ]

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
        </a>
        <h1>Historique Produit</h1>
      </div>

      <div className="body">
        <div className="produit-selector">
          <label>Sélectionner un produit:</label>
          <select
            className="produit-select"
            value={selectedProduit}
            onChange={(e) => setSelectedProduit(e.target.value)}
          >
            {produits.map((produit, index) => (
              <option key={index} value={produit}>
                {produit}
              </option>
            ))}
          </select>
        </div>

        <div className="produit-info">
          <h3>{selectedProduit}</h3>
          <div className="info-row">
            <span>Stock actuel:</span>
            <span>100 unités</span>
          </div>
          <div className="info-row">
            <span>Prix actuel:</span>
            <span>2.75€</span>
          </div>
        </div>

        <div className="historique-container">
          <div className="historique-header">
            <div className="historique-cell">Date</div>
            <div className="historique-cell">Action</div>
            <div className="historique-cell">Détails</div>
            <div className="historique-cell">Utilisateur</div>
          </div>

          {historique.map((item, index) => (
            <div key={index} className="historique-row">
              <div className="historique-cell">{item.date}</div>
              <div className="historique-cell">{item.action}</div>
              <div className="historique-cell">
                {item.quantite ? (
                  <span className={item.quantite.startsWith("+") ? "positive" : "negative"}>{item.quantite}</span>
                ) : (
                  <span>
                    {item.ancien} → {item.nouveau}
                  </span>
                )}
              </div>
              <div className="historique-cell">{item.utilisateur}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn">Exporter (PDF)</button>
      <button className="btn">Retour</button>

      <BarNavig />
    </>
  )
}

export default HistoriqueProduit

