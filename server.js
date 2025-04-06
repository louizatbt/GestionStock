import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import produitRoutes from './routes/produit.routes.js';
import sequelize from './config/db.js';

dotenv.config();
const app = express();

app.use(cors()); // 🛡️ Autoriser les requêtes cross-origin
app.use(express.json());

app.use('/api/produits', produitRoutes);

const PORT = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  console.log('✅ Connexion DB OK');

  await sequelize.sync(); // 🛠️ Synchronisation des modèles
  console.log('✅ Modèles synchronisés');

  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Erreur DB:', error);
}
