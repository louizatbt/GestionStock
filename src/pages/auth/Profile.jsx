"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import useAuth from "../../hooks/useAuth"

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("account")
   const {user} = useAuth()
 

  const handleLogout = () => {
    // Logique de déconnexion
    navigate("/login")
  }

  return (
    <div className="profile-container">
      <Header title="Profil Utilisateur" />

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="avatar-image" />
            <button className="edit-avatar-btn">✏️</button>
          </div>

          <h2 className="profile-name">{user.nom}</h2>
          <p className="profile-email">{user.email}</p>

          <div className="profile-badges">
            <span className="profile-badge role">{user.role}</span>
            <span className="profile-badge department">{user.department}</span>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <span>Dernière connexion:</span>
              <span>{user.lastLogin}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>

        <div className="profile-main">
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Compte
            </button>
            <button
              className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Sécurité
            </button>
            <button
              className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              Confidentialité
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "account" && (
              <div className="account-tab">
                <h3>Informations personnelles</h3>
                <p>Mettez à jour vos informations personnelles et professionnelles</p>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input type="text" defaultValue={user.nom} />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} />
                  </div>

                  <div className="form-group">
                    <label>Téléphone</label>
                    <input type="text" defaultValue={user.telephone} />
                  </div>

                  <div className="form-group">
                    <label>Département</label>
                    <input type="text" defaultValue={user.department} />
                  </div>
                </div>

                <button className="save-btn">Enregistrer les modifications</button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="security-tab">
                <h3>Sécurité du compte</h3>
                <p>Gérez votre mot de passe et les paramètres de sécurité</p>

                <div className="password-section">
                  <h4>Changer le mot de passe</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Mot de passe actuel</label>
                      <input type="password" />
                    </div>

                    <div className="form-group">
                      <label>Nouveau mot de passe</label>
                      <input type="password" />
                    </div>
                  </div>

                  <button className="update-password-btn">Mettre à jour le mot de passe</button>
                </div>

                <div className="two-factor-section">
                  <h4>Authentification à deux facteurs</h4>

                  <div className="toggle-option">
                    <div>
                      <p className="option-title">Authentification par SMS</p>
                      <p className="option-desc">Recevez un code par SMS lors de la connexion</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-option">
                    <div>
                      <p className="option-title">Authentification par application</p>
                      <p className="option-desc">Utilisez une application d'authentification</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Autres onglets similaires */}
          </div>
        </div>
      </div>
    </div>
  )
}

