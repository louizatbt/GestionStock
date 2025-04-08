import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date_commande: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.ENUM('client', 'fournisseur'),
    allowNull: false,
    defaultValue: 'client',
  },
  statut: {
    type: DataTypes.ENUM('en_attente', 'confirmée', 'annulée', 'livrée'),
    defaultValue: 'en_attente',
  },
  montant_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  acompte: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  reste_a_payer: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id',
    },
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
  tableName: 'commande',
  timestamps: true,
  underscored: true,
});

export default Commande;
