import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import SignIn from "@/pages/SignIn";
import Dashboard from "@/pages/Dashboard";
import Unauthorized from "@/pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import PerfilPage from "@/pages/Usuario/perfil.page"; // Import PerfilPage

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: (
              <h2 className="text-2xl font-semibold">
                Selecciona una opción del menú
              </h2>
            ),
          },
          {
            path: "perfil",
            element: <PerfilPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
