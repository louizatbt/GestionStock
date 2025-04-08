import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const AvisProduit = sequelize.define('AvisProduit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produit_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'produit',
      key: 'id',
    },
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'utilisateur',
      key: 'id',
    },
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date_avis: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'avis_produit',
  timestamps: true,
  underscored: true,
});

export default AvisProduit;
