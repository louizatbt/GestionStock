import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import produitRoutes from './routes/produit.routes.js';
import commandeRoutes from './routes/commande.route.js';
import cartonRoutes from './routes/carton.routes.js';
import paiementRoutes from './routes/paiement.route.js';
import factureRoutes from './routes/facture.route.js';
import categorieRoutes from './routes/categorie.route.js';
import moouvementRoutes from './routes/stock-mouvement.route.js';
import avisProduitRoutes from './routes/avis-produit.route.js';
import utilisateurRoutes from './routes/utilisateur.route.js';
import expeditionRoutes from './routes/expedition.route.js';









import sequelize from './config/db.js';

dotenv.config();
const app = express();

app.use(cors()); // 🛡️ Autoriser les requêtes cross-origin
app.use(express.json());

app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/expeditions', expeditionRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/paiements', paiementRoutes);
app.use('/api/cartons', cartonRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/avis-produits', avisProduitRoutes);
app.use('/api/mouvements', moouvementRoutes);





const PORT = process.env.PORT || 5000;
try {
  await sequelize.authenticate();
  console.log('✅ Connexion DB OK');

  try {
    await sequelize.sync();
    console.log('✅ Modèles synchronisés');
  } catch (syncError) {
    console.error('⚠️ Erreur pendant la synchronisation des modèles :', syncError.message);
    // Tu peux logger l'erreur dans un fichier ici si tu veux
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });

} catch (dbError) {
  console.error('❌ Impossible de se connecter à la base de données :', dbError.message);
  process.exit(1); // ici on stoppe l'app si la connexion échoue
}

