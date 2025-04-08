import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Paiement = sequelize.define('Paiement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  facture_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'facture',
      key: 'id',
    },
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_paiement: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  moyen_paiement: {
    type: DataTypes.ENUM('carte', 'virement', 'espèces'),
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
  tableName: 'paiement',
  timestamps: true,
  underscored: true,
});

export default Paiement;
