"use client"

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../utils/backend"
import { useDispatch } from "react-redux"
import { setUser } from "../../reducer/userSlice"
import { authService } from "../../services/authService"

export default function Connection() {
  const [activeTab, setActiveTab] = useState("login")
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    mot_de_passe: "",
    confirmPassword: "",
    role: "client"
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
   const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
     const response =   await axios.post(`${BACKEND_URL}/login`, {email: form.email ,
         mot_de_passe: form.mot_de_passe
      })
      const data = response.data
      const {utilisateur} = data
      console.log("utilisateur" , utilisateur)
      dispatch(setUser(utilisateur))
      navigate("/accueil-gestionnaire")
    } catch (error) {
       console.error(error)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (form.mot_de_passe !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }

    const user = {
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      adresse: form.adresse,
      mot_de_passe: form.mot_de_passe,
      role: form.role
    }
    
    try {
      const data =  await authService.register(user)
      const {utilisateur} = data

      dispatch(setUser(utilisateur))

      navigate("/accueil-gestionnaire")

    } catch (error) {
      console.error("error" , error)
    }
    
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
                name="email"
                type="email"
                placeholder="exemple@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="mot_de_passe">Mot de passe</label>
                <a href="#" className="forgot-password">Mot de passe oublié?</a>
              </div>
              <div className="password-input">
                <input
                  id="mot_de_passe"
                  name="mot_de_passe"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.mot_de_passe}
                  onChange={handleChange}
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

            <button type="submit" className="auth-button">Se connecter</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Inscription</h2>
            <p className="auth-description">Créez un compte pour accéder au système</p>

            <div className="form-group">
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                id="telephone"
                name="telephone"
                type="text"
                value={form.telephone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                name="adresse"
                type="text"
                value={form.adresse}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mot_de_passe">Mot de passe</label>
              <div className="password-input">
                <input
                  id="mot_de_passe"
                  name="mot_de_passe"
                  type={showPassword ? "text" : "password"}
                  value={form.mot_de_passe}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="client">Client</option>
                <option value="fournisseur">Fournisseur</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="auth-button">S'inscrire</button>
          </form>
        )}
      </div>
    </div>
  )
}
