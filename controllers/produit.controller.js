import Produit from '../models/produit.model.js';
import Categorie from '../models/categorie.model.js'; // à créer si pas encore fait

// ➕ Créer un produit
export const createProduit = async (req, res) => {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit", error });
  }
};

// 📥 Lister tous les produits
export const getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: {
        model: Categorie,
        attributes: ['id', 'nom'],
      },
      order: [['created_at', 'DESC']],
    });
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
};

// 🔎 Récupérer un produit par ID
export const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
      include: {
        model: Categorie,
        attributes: ['id', 'nom'],
      },
    });
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
  }
};

// ✏️ Mettre à jour un produit
export const updateProduit = async (req, res) => {
  try {
    const [updated] = await Produit.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error });
  }
};

// 🗑️ Supprimer un produit
export const deleteProduit = async (req, res) => {
  try {
    const deleted = await Produit.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error });
  }
};
