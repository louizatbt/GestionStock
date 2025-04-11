"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"
import axios from "axios"
import '../../assets/css/AjoutProduit.css'
import useAuth from "../../hooks/useAuth"
import useCategories from "../../hooks/useCategories"
import { produitsService } from "../../services/produitsService"

function AjoutProduit() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { categories } = useCategories({ fournisseurId: user.id })

  console.log("categories", categories)

  // État local pour gérer le produit à ajouter
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: 0,
    categorie: categories[0]?.id || "", // Utilisation de la première catégorie comme valeur par défaut
  })

  // Fonction pour mettre à jour l'état du produit
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }))
  
  }


  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validation des champs avant soumission
    if (!produit.categorie || produit.categorie === "Autre") {
      alert("Veuillez sélectionner une catégorie valide.")
      return
    }

    if (produit.prix <= 0) {
      alert("Le prix doit être supérieur à 0.")
      return
    }

    try {
      console.log(produit)

      const newProduit = {
        ...produit,
        categorie_id: produit.categorie,
        quantite_stock: produit.quantite,
        fournisseur_id: user.id,
      }

      // Envoi des données au service API
      await produitsService.createProduit(newProduit)

      alert("Produit ajouté avec succès.")
      redirectToStock()
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error)
      alert(error?.response?.data?.message || "Une erreur est survenue.")
    }
  }

  // Fonction pour annuler et revenir à la page de stock
  const handleCancel = () => {
    redirectToStock()
  }

  // Fonction de redirection vers la page stock
  const redirectToStock = () => navigate("/stock")



  return (
    <>
      <Header title="Ajouter un Produit" />

      <div className="body">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du produit</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={produit.nom}
              onChange={handleChange}
              required
            />
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
              <option value="Autre">Autre</option>
            </select>

            <button
              type="button"
              className="btn secondary-btn"
              onClick={() => navigate("/ajout-categorie")}
            >
              ➕ Ajouter une nouvelle catégorie
            </button>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">
              ✅ Ajouter
            </button>
            <button type="button" className="btn cancel-btn" onClick={handleCancel}>
              ❌ Annuler
            </button>
          </div>
        </form>
      </div>

      <BarNavigation />
    </>
  )
}

export default AjoutProduit
