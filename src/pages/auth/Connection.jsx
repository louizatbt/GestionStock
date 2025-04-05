"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Connection() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Login with:", { email, password, rememberMe })
    // Simuler une connexion réussie
    navigate("/accueil-gestionnaire")
  }

  const handleRegister = (e) => {
    e.preventDefault()
    console.log("Register with:", { email, password })
    // Simuler une inscription réussie
    navigate("/accueil-gestionnaire")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            Connexion
          </button>
          <button
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Inscription
          </button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Connexion</h2>
            <p className="auth-description">Connectez-vous à votre compte pour accéder au système</p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Mot de passe</label>
                <a href="#" className="forgot-password">
                  Mot de passe oublié?
                </a>
              </div>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <div className="remember-me">
              <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            <button type="submit" className="auth-button">
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Inscription</h2>
            <p className="auth-description">Créez un compte pour accéder au système</p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">Prénom</label>
                <input id="first-name" type="text" required />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Nom</label>
                <input id="last-name" type="text" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input id="register-email" type="email" placeholder="exemple@email.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Entreprise</label>
              <input id="company" type="text" placeholder="Nom de votre entreprise" />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Mot de passe</label>
              <div className="password-input">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirmer le mot de passe</label>
              <input id="confirm-password" type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="auth-button">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

