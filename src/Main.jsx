import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { ProductosProvider } from './contexts/ProductosContext';
import { CarritoProvider } from './contexts/CarritoContext';
import { AdminProvider } from './contexts/AdminContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  </BrowserRouter>
);
