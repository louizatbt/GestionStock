// controllers/avisProduitController.js
import AvisProduit from '../models/AvisProduit.js';
import Produit from '../models/Produit.js';
import Utilisateur from '../models/Utilisateur.js';

// Créer un avis
export const createAvisProduit = async (req, res) => {
  try {
    const avis = await AvisProduit.create(req.body);
    res.status(201).json(avis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'avis", error });
  }
};

// Obtenir tous les avis
export const getAllAvisProduits = async (req, res) => {
  try {
    const avis = await AvisProduit.findAll({
      include: [
        { model: Produit, attributes: ['nom'] },
        { model: Utilisateur, attributes: ['nom', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des avis", error });
  }
};

// Obtenir un avis par ID
export const getAvisProduitById = async (req, res) => {
  try {
    const avis = await AvisProduit.findByPk(req.params.id, {
      include: [
        { model: Produit, attributes: ['nom'] },
        { model: Utilisateur, attributes: ['nom', 'email'] }
      ]
    });
    if (!avis) return res.status(404).json({ message: "Avis non trouvé" });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'avis", error });
  }
};

// Mettre à jour un avis
export const updateAvisProduit = async (req, res) => {
  try {
    const [updated] = await AvisProduit.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: "Avis non trouvé" });
    res.json({ message: "Avis mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'avis", error });
  }
};

// Supprimer un avis
export const deleteAvisProduit = async (req, res) => {
  try {
    const deleted = await AvisProduit.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: "Avis non trouvé" });
    res.json({ message: "Avis supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'avis", error });
  }
};
