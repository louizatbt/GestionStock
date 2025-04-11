import { useEffect, useState } from 'react'
import { produitsService } from '../services/produitsService'

export default function useProduits({ fournisseurId, clientId }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [produits, setProduits] = useState([])

    const getProduits = async () => {
        setLoading(true)
        setError(null)
        try {
            let allProduits = await produitsService.getAllProduits()

            // Filtrage local basé sur fournisseurId ou clientId
            let filtered = allProduits

            if (fournisseurId) {
                filtered = filtered.filter(produit => produit.fournisseur_id === fournisseurId)
            }

          

            setProduits(filtered)
        } catch (err) {
            console.error(err)
            setError(err.message || 'Erreur lors du chargement des catégories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduits()
    }, [clientId, fournisseurId])

    return {
        produits,
        loading,
        error,
        reload: getProduits
    }
}
