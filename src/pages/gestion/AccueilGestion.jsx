import { Link } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function AccueilGestion() {
  const menuItems = [
    { title: "Gestion des stocks", path: "/stock" },
    { title: "Gestion des produits", path: "/liste-produits" },
    { title: "Gestion des commandes", path: "/commandes-fournisseur" },
    { title: "Historique", path: "/historique-stock" },
  ]

  return (
    <>
      <Header title="Accueil Gestion" />

      <div className="body">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-card">
              <h3>{item.title}</h3>
              <Link to={item.path} className="card-btn">
                Accéder
              </Link>
            </div>
          ))}
        </div>
      </div>

      <BarNavigation />
    </>
  )
}

export default AccueilGestion

