import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';

const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validation de l'email
    },
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10); // Hash du mot de passe
      this.setDataValue('mot_de_passe', hash);
    },
  },
  role: {
    type: DataTypes.ENUM('client', 'fournisseur', 'admin'),
    defaultValue: 'client',
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
  tableName: 'utilisateur',
  timestamps: true,
  underscored: true,
});

// Méthode pour vérifier si le mot de passe est correct
Utilisateur.prototype.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.mot_de_passe);
};

export default Utilisateur;
