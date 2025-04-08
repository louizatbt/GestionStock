import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const StockMouvement = sequelize.define('StockMouvement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  date_mouvement: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type_mouvement: {
    type: DataTypes.ENUM('ajout', 'retrait'),
    allowNull: false,
  },
}, {
  tableName: 'stock_mouvement',
  timestamps: false,
  underscored: true,
});

export default StockMouvement;
