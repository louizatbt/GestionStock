import Expeditions from '../models/expédition.model.js';
import Commande from '../models/commande.model.js';

// ➕ Créer une expédition
export const createExpedition = async (req, res) => {
  try {
    const expedition = await Expeditions.create(req.body);
    res.status(201).json(expedition);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'expédition', error });
  }
};

// 📥 Récupérer toutes les expéditions
export const getAllExpeditions = async (req, res) => {
  try {
    const expeditions = await Expeditions.findAll({
      include: {
        model: Commande,
        attributes: ['id', 'date_commande', 'statut', 'montant_total'],
      },
      order: [['date_envoi', 'DESC']],
    });
    res.json(expeditions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des expéditions', error });
  }
};

// 🔎 Récupérer une expédition par ID
export const getExpeditionById = async (req, res) => {
  try {
    const expedition = await Expeditions.findByPk(req.params.id, {
      include: {
        model: Commande,
        attributes: ['id', 'date_commande', 'statut', 'montant_total'],
      },
    });
    if (!expedition) return res.status(404).json({ message: 'Expédition non trouvée' });
    res.json(expedition);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'expédition', error });
  }
};

// ✏️ Mettre à jour une expédition
export const updateExpedition = async (req, res) => {
  try {
    const [updated] = await Expeditions.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'Expédition non trouvée' });
    res.json({ message: 'Expédition mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'expédition', error });
  }
};

// 🗑️ Supprimer une expédition
export const deleteExpedition = async (req, res) => {
  try {
    const deleted = await Expeditions.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Expédition non trouvée' });
    res.json({ message: 'Expédition supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'expédition', error });
  }
};
