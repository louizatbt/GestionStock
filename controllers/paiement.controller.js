import Paiement from '../models/paiement.model.js';
import Facture from '../models/facture.model.js';

// ➕ Créer un paiement
export const createPaiement = async (req, res) => {
  try {
    const paiement = await Paiement.create(req.body);
    res.status(201).json(paiement);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du paiement", error });
  }
};

// 📥 Lister tous les paiements
export const getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      include: {
        model: Facture,
        attributes: ['id', 'montant_total', 'statut', 'date_emission'],
      },
      order: [['date_paiement', 'DESC']],
    });
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des paiements", error });
  }
};

// 🔎 Récupérer un paiement par ID
export const getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id, {
      include: {
        model: Facture,
        attributes: ['id', 'montant_total', 'statut', 'date_emission'],
      },
    });
    if (!paiement) return res.status(404).json({ message: "Paiement non trouvé" });
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du paiement", error });
  }
};

// ✏️ Mettre à jour un paiement
export const updatePaiement = async (req, res) => {
  try {
    const [updated] = await Paiement.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Paiement non trouvé" });
    res.json({ message: "Paiement mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du paiement", error });
  }
};

// 🗑️ Supprimer un paiement
export const deletePaiement = async (req, res) => {
  try {
    const deleted = await Paiement.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Paiement non trouvé" });
    res.json({ message: "Paiement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du paiement", error });
  }
};
