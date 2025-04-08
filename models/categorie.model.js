import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categorie_parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categorie',
      key: 'id',
    },
    allowNull: true,
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
  tableName: 'categorie',
  timestamps: true,
  underscored: true,
});

export default Categorie;
