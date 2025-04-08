// controllers/categorieController.js
import Categorie from '../models/Categorie.js';

// Créer une nouvelle catégorie
export const createCategorie = async (req, res) => {
  try {
    const nouvelleCategorie = await Categorie.create(req.body);
    res.status(201).json(nouvelleCategorie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error });
  }
};

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [
        {
          model: Categorie,
          as: 'ParentCategorie',
          attributes: ['id', 'nom'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error });
  }
};

// Récupérer une catégorie par ID
export const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: [
        {
          model: Categorie,
          as: 'ParentCategorie',
          attributes: ['id', 'nom'],
        },
      ],
    });
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error });
  }
};

// Mettre à jour une catégorie
export const updateCategorie = async (req, res) => {
  try {
    const [updated] = await Categorie.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json({ message: 'Catégorie mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Supprimer une catégorie
export const deleteCategorie = async (req, res) => {
  try {
    const deleted = await Categorie.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};
