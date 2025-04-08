import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Facture = sequelize.define('Facture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commande_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'commande',
      key: 'id',
    },
  },
  montant_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_emission: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_echeance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM('payée', 'en_attente', 'partiellement_payée'),
    defaultValue: 'en_attente',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'facture',
  timestamps: true,
  underscored: true,
});

export default Facture;


