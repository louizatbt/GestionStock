import StockMouvement from '../models/stock-mouvement.model.js';
import Produit from '../models/produit.model.js';

// ➕ Ajouter un mouvement de stock
export const createMouvement = async (req, res) => {
  const { produit_id, quantite, type_mouvement } = req.body;

  try {
    const produit = await Produit.findByPk(produit_id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    let nouvelleQuantite;

    if (type_mouvement === 'ajout') {
      nouvelleQuantite = produit.quantite_stock + quantite;
    } else if (type_mouvement === 'retrait') {
      if (quantite > produit.quantite_stock) {
        return res.status(400).json({ message: "Quantité insuffisante en stock" });
      }
      nouvelleQuantite = produit.quantite_stock - quantite;
    } else {
      return res.status(400).json({ message: "Type de mouvement invalide" });
    }

    await Produit.update(
      { quantite_stock: nouvelleQuantite },
      { where: { id: produit_id } }
    );

    const mouvement = await StockMouvement.create({ produit_id, quantite, type_mouvement });

    res.status(201).json({ message: 'Mouvement enregistré', mouvement });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement du mouvement", error });
  }
};

// 📥 Liste des mouvements de stock
export const getAllMouvements = async (req, res) => {
  try {
    const mouvements = await StockMouvement.findAll({
      include: {
        model: Produit,
        attributes: ['id', 'nom'],
      },
      order: [['date_mouvement', 'DESC']],
    });
    res.json(mouvements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des mouvements", error });
  }
};

// 🔎 Mouvements par produit
export const getMouvementsByProduit = async (req, res) => {
  try {
    const mouvements = await StockMouvement.findAll({
      where: { produit_id: req.params.produitId },
      order: [['date_mouvement', 'DESC']],
    });
    res.json(mouvements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};
