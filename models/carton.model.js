import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cartons = sequelize.define('Cartons', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commande_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Commandes',
      key: 'id',
    },
  },
  produit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Produits',
      key: 'id',
    },
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_emballage: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_expiration: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'cartons',
  timestamps: false,
  underscored: true,
});

export default Cartons;
