// controllers/cartonsController.js
import Cartons from '../models/Cartons.js';
import Commande from '../models/Commandes.js'; // à adapter selon ton fichier modèle
import Produit from '../models/Produits.js';   // à adapter selon ton fichier modèle

// Créer un carton
export const createCarton = async (req, res) => {
  try {
    const carton = await Cartons.create(req.body);
    res.status(201).json(carton);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du carton", error });
  }
};

// Obtenir tous les cartons
export const getAllCartons = async (req, res) => {
  try {
    const cartons = await Cartons.findAll({
      include: [
        { model: Commande, attributes: ['id', 'date_commande'] },
        { model: Produit, attributes: ['nom', 'prix'] }
      ],
      order: [['date_emballage', 'DESC']]
    });
    res.json(cartons);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des cartons", error });
  }
};

// Obtenir un carton par ID
export const getCartonById = async (req, res) => {
  try {
    const carton = await Cartons.findByPk(req.params.id, {
      include: [
        { model: Commande, attributes: ['id', 'date_commande'] },
        { model: Produit, attributes: ['nom', 'prix'] }
      ]
    });
    if (!carton) return res.status(404).json({ message: "Carton non trouvé" });
    res.json(carton);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du carton", error });
  }
};

// Mettre à jour un carton
export const updateCarton = async (req, res) => {
  try {
    const [updated] = await Cartons.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: "Carton non trouvé" });
    res.json({ message: "Carton mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du carton", error });
  }
};

// Supprimer un carton
export const deleteCarton = async (req, res) => {
  try {
    const deleted = await Cartons.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: "Carton non trouvé" });
    res.json({ message: "Carton supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du carton", error });
  }
};
