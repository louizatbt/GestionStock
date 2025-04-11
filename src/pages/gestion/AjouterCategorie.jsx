"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"
import useAuth from "../../hooks/useAuth"
import { categoriesService } from "../../services/categoriesService"

function AjoutCategorie() {
  const navigate = useNavigate()
  const {user} = useAuth()

  const [categorie, setCategorie] = useState({
    nom: "",
    fournisseur_id: user.id,
  })



  const handleChange = (e) => {
    const { name, value } = e.target
    setCategorie((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCategorie = {
        ...categorie
      }
      await categoriesService.createCategorie(newCategorie)
      alert("Catégorie ajoutée avec succès.")
      navigate("/ajout-produit")
    } catch (error) {
      console.error(error)
      alert("Erreur lors de l'ajout.")
    }
  }

  return (
    <>
      <Header title="Ajouter une Catégorie" />

      <div className="body">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Nom de la catégorie</label>
            <input
              type="text"
              name="nom"
              value={categorie.nom}
              onChange={handleChange}
              required
            />
          </div>

         

          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">✅ Ajouter</button>
            <button type="button" className="btn cancel-btn" onClick={() => navigate(-1)}>❌ Annuler</button>
          </div>
        </form>
      </div>

      <BarNavigation />
    </>
  )
}

export default AjoutCategorie
