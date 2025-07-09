import "../styles/About.css";
import { Link } from "react-router-dom";
import { FaHeadset, FaTruck, FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <section className="about-section">
      <Helmet>
        <title>Sobre Nosotros | Siempre Bella</title>
        <meta
          name="description"
          content="Conocé más sobre Siempre Bella, nuestro equipo, nuestros valores y cómo buscamos ayudarte a sentirte increíble."
        />
      </Helmet>

      <h2>Sobre Nosotros</h2>
      <p>
        En <strong>Siempre Bella</strong>, nos apasiona ayudarte a sentir y verte increíble.
        Somos un equipo comprometido con ofrecer productos de alta calidad para tu cuidado personal.
      </p>

      <div className="about-icons">
        <ul role="list">
          <li role="listitem">
            <FaHeadset size={40} color="#1976d2" />
            <p>Atención personalizada</p>
          </li>
          <li role="listitem">
            <FaTruck size={40} color="#1976d2" />
            <p>Envíos rápidos</p>
          </li>
          <li role="listitem">
            <FaCheckCircle size={40} color="#1976d2" />
            <p>Calidad garantizada</p>
          </li>
        </ul>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>
            Nuestra misión es brindarte una experiencia de compra sencilla, segura y
            rápida, con atención personalizada y productos seleccionados cuidadosamente.
          </p>
          <p>
            Desde cremas hasta accesorios, cada artículo en Siempre Bella está pensado para
            realzar tu belleza natural y bienestar.
          </p>
          <Link to="/productos" className="btn-discover" aria-label="Ir a la sección de productos para descubrir más">
            Descubre nuestros productos
          </Link>
        </div>

        <div className="about-images">
          <h3>Conocé a nuestro equipo</h3>
          <figure className="about-img-container">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
              alt="Carla - Atención al cliente"
            />
            <figcaption>
              <p>Carla</p>
              <small>Atención al cliente</small>
            </figcaption>
          </figure>
          <figure className="about-img-container">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
              alt="Valeria - Ventas y logística"
            />
            <figcaption>
              <p>Valeria</p>
              <small>Ventas y logística</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
