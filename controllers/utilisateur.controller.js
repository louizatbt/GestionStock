import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';

// Controller pour l'inscription (Create)
export const register = async (req, res) => {
  const { nom, email, mot_de_passe, telephone, adresse } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExist = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExist) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hacher le mot de passe avant de le sauvegarder
    const hash = bcrypt.hashSync(mot_de_passe, 10);

    // Créer l'utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      email,
      mot_de_passe: hash,
      telephone,
      adresse,
    });

    // Créer un token JWT
    const token = jwt.sign(
      { id: nouvelUtilisateur.id, role: nouvelUtilisateur.role },
      'votre_clé_secrète', // A utiliser avec une clé secrète sécurisée dans un fichier .env
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
};

// Controller pour la connexion (login)
export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      'votre_clé_secrète', // Utiliser une clé secrète sécurisée
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};

// Controller pour récupérer un utilisateur par ID
export const getUtilisateur = async (req, res) => {
  const { id } = req.params;

  try {
    const utilisateur = await Utilisateur.findByPk(id); // Recherche par ID
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des informations", error });
  }
};

// Controller pour récupérer tous les utilisateurs
export const getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
};

// Controller pour mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  const { nom, email, telephone, adresse } = req.body;

  try {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations
    utilisateur.nom = nom || utilisateur.nom;
    utilisateur.email = email || utilisateur.email;
    utilisateur.telephone = telephone || utilisateur.telephone;
    utilisateur.adresse = adresse || utilisateur.adresse;

    await utilisateur.save(); // Sauvegarder les changements

    res.status(200).json({ message: "Utilisateur mis à jour avec succès", utilisateur });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
  }
};

// Controller pour supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  const { id } = req.params;

  try {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await utilisateur.destroy(); // Supprimer l'utilisateur
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
  }
};
