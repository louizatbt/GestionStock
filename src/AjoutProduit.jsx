"use client"

import { useState } from "react"
import profileLogo from "./assets/icon.png"
import BarNavig from "./component/bar"
import "./App.css"

function AjoutProduit() {
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    categorie: "Alimentaire",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Produit ajouté:", produit)
    // Ici vous ajouteriez la logique pour envoyer les données au serveur
  }

  return (
    <>
      <div className="header">
        <a href="./profile" target="_blank" rel="noreferrer">
          <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
        </a>
        <h1>Ajouter un Produit</h1>
      </div>

      <div className="body">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du produit</label>
            <input type="text" id="nom" name="nom" value={produit.nom} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={produit.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prix">Prix (€)</label>
              <input
                type="number"
                id="prix"
                name="prix"
                value={produit.prix}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantite">Quantité initiale</label>
              <input
                type="number"
                id="quantite"
                name="quantite"
                value={produit.quantite}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select id="categorie" name="categorie" value={produit.categorie} onChange={handleChange}>
              <option value="Alimentaire">Alimentaire</option>
              <option value="Boisson">Boisson</option>
              <option value="Produit frais">Produit frais</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">
              Ajouter
            </button>
            <button type="button" className="btn cancel-btn">
              Annuler
            </button>
          </div>
        </form>
      </div>

      <BarNavig />
    </>
  )
}

export default AjoutProduit

