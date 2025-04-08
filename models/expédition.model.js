import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Expeditions = sequelize.define('Expeditions', {
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
  numero_suivi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_envoi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_livraison_estimee: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM('en_transit', 'livré', 'retard'),
    allowNull: false,
  },
}, {
  tableName: 'expeditions',
  timestamps: false,
  underscored: true,
});

export default Expeditions;
