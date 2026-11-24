import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

// main.tsx
// This is the entry point of the React application.
// It uses createRoot to render the application into the DOM element with the id 'root'.
// The StrictMode component is used to enable additional checks and warnings for its descendants.
// The RouterProvider component is used to provide the router configuration to the application, enabling client-side routing.
