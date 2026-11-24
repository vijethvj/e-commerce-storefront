import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

//router.tsx
// This file defines the routing configuration for the application using react-router-dom.
// The createBrowserRouter function is used to create a router instance with route definitions.
// The Layout component is used as the main layout for the application, and nested routes are defined as its children.
// The index route renders the ProductListPage, while other routes handle product details, the cart, and a 404 NotFoundPage.
// The '*' path acts as a catch-all route to display the NotFoundPage for any undefined routes.
