import Facture from '../models/facture.model.js';
import Commande from '../models/commande.model.js';

// ➕ Créer une facture
export const createFacture = async (req, res) => {
  try {
    const facture = await Facture.create(req.body);
    res.status(201).json(facture);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la facture', error });
  }
};

// 📥 Récupérer toutes les factures
export const getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.findAll({
      include: {
        model: Commande,
        attributes: ['id', 'date_commande', 'type', 'montant_total', 'statut'],
      },
      order: [['date_emission', 'DESC']],
    });
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des factures', error });
  }
};

// 🔎 Récupérer une facture par ID
export const getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findByPk(req.params.id, {
      include: {
        model: Commande,
        attributes: ['id', 'date_commande', 'type', 'montant_total', 'statut'],
      },
    });
    if (!facture) return res.status(404).json({ message: 'Facture non trouvée' });
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la facture', error });
  }
};

// ✏️ Mettre à jour une facture
export const updateFacture = async (req, res) => {
  try {
    const [updated] = await Facture.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'Facture non trouvée' });
    res.json({ message: 'Facture mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture', error });
  }
};

// 🗑️ Supprimer une facture
export const deleteFacture = async (req, res) => {
  try {
    const deleted = await Facture.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Facture non trouvée' });
    res.json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la facture', error });
  }
};
