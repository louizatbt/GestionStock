import { useEffect, useState } from 'react'
import { categoriesService } from '../services/categoriesService'

export default function useCategories({ fournisseurId, clientId }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        setLoading(true)
        setError(null)
        try {
            let allCategories = await categoriesService.getAllCategories()

            // Filtrage local basé sur fournisseurId ou clientId
            let filtered = allCategories

            if (fournisseurId) {
                filtered = filtered.filter(cat => cat.fournisseur_id === fournisseurId)
            }

            if (clientId) {
                filtered = filtered.filter(cat => cat.clientId === clientId)
            }

            setCategories(filtered)
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement des catégories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [clientId, fournisseurId])

    return {
        categories,
        loading,
        error,
        reload: getCategories
    }
}
