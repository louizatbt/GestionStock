// models/index.js
import sequelize from '../config/db.js';
import Cartons from './carton.model.js';
import Categorie from './categorie.model.js';
import Commande from './commande.model.js';
import Expeditions from './expédition.model.js';
import Facture from './facture.model.js';
import Paiement from './paiement.model.js';
import Produit from './produit.model.js';
import StockMouvement from './stock-mouvement.model.js';

Cartons.belongsTo(Commande, { foreignKey: 'commande_id' });
Cartons.belongsTo(Produit, { foreignKey: 'produit_id' });

Categorie.belongsTo(Categorie, {
  as: 'ParentCategorie',
  foreignKey: 'categorie_parent_id',
});
Categorie.hasMany(Categorie, {
  as: 'SubCategories',
  foreignKey: 'categorie_parent_id',
});

// Dans models/Expeditions.js
Expeditions.belongsTo(Commande, { foreignKey: 'commande_id' });

// Et dans models/Commande.js
Commande.hasMany(Expeditions, { foreignKey: 'commande_id' });

Commande.hasOne(Facture, { foreignKey: 'commande_id' });
Facture.belongsTo(Commande, { foreignKey: 'commande_id' });

Paiement.belongsTo(Facture, { foreignKey: 'facture_id' });

Facture.hasMany(Paiement, { foreignKey: 'facture_id' });

Produit.belongsTo(Categorie, { foreignKey: 'categorie_id' });
Categorie.hasMany(Produit, { foreignKey: 'categorie_id' });


StockMouvement.belongsTo(Produit, { foreignKey: 'produit_id' });
Produit.hasMany(StockMouvement, { foreignKey: 'produit_id' });


const db = {
  sequelize,
  Produit,
};

export default db;
