import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Store</Link> | <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

// outlet:
// The <Outlet /> component is used in a layout to render the matched child route component.
// It acts as a placeholder for nested routes defined in the router configuration.
// This allows the layout (e.g., header and navigation) to remain consistent while the main content changes based on the route.

//nav:
// The <nav> element is used to define a set of navigation links.
// In this layout, it contains links to the main store page and the cart page.
// It helps users navigate between different sections of the application easily.
