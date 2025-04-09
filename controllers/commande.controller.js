import Commande from '../models/commande.model.js';
import Utilisateur from '../models/utilisateur.model.js'; // si besoin d'inclure le client

// ➕ Créer une commande
export const createCommande = async (req, res) => {
  try {
    const commande = await Commande.create(req.body);
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
  }
};

// 📥 Récupérer toutes les commandes
export const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      include: {
        model: Utilisateur,
        attributes: ['id', 'nom', 'email'], // Adapter si d'autres champs sont nécessaires
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
  }
};

// 🔎 Récupérer une commande par ID
export const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id, {
      include: {
        model: Utilisateur,
        attributes: ['id', 'nom', 'email'],
      },
    });
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
  }
};

// ✏️ Mettre à jour une commande
export const updateCommande = async (req, res) => {
  try {
    const [updated] = await Commande.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json({ message: 'Commande mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
  }
};

// 🗑️ Supprimer une commande
export const deleteCommande = async (req, res) => {
  try {
    const deleted = await Commande.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
  }
};
