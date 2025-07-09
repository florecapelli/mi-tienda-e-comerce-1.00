🛒 Mi Tienda React
Tienda online desarrollada con React que permite a los usuarios explorar productos, agregarlos al carrito y simular una compra. Incluye autenticación, administración de productos, diseño responsivo, rutas protegidas y más.

🚀 Funcionalidades
Autenticación: Login simulado con roles (admin / usuario) usando localStorage.

CRUD de productos: Agregar, editar y eliminar productos conectados a MockAPI.

Carrito de compras: Funcional con Context API y manejo de stock.

Diseño responsivo: Usando React Bootstrap.

Validaciones: Formularios con SweetAlert2 para mensajes interactivos.

Rutas protegidas: Acceso restringido al panel de administración.

Búsqueda y paginación: Para mejorar la navegación de productos.

SEO básico: Títulos y meta descripciones dinámicas con React Helmet.

🛠️ Tecnologías
React 18

React Router v6

React Bootstrap

SweetAlert2

MockAPI (Backend simulado)

React Helmet

LocalStorage (Autenticación y persistencia local)

📁 Estructura del Proyecto
bash
Copiar
Editar
├── components/      # Todos los componentes y páginas (Login, Admin, Productos, etc.)
├── contexts/        # Contextos (Auth, Carrito, Productos)
├── styles/          # Archivos CSS
├── assets/          # Recursos estáticos
├── App.jsx          # Enrutamiento principal
├── main.jsx         # Punto de entrada
└── README.md
🧪 Cómo usar
Iniciar sesión:

Admin: admin2@admin.com / admin456

Usuario: user@user.com / user123

Explora productos, agrégalos al carrito y usa las funcionalidades.

Si eres admin, accede al panel para gestionar productos.

💡 Mejoras futuras
Backend real (Node.js, Express, Firebase).

Pasarela de pagos simulada.

Filtros avanzados (categorías, precios, etc).

Panel de estadísticas para admins.

📄 Licencia
Uso libre para fines educativos o personales.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
