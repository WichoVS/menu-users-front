import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

export default function Dashboard() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64 h-screen" /> {/* Adjust width as needed */}
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for user info and logout - if desired, could be a separate component */}
        <header className="flex justify-end items-center p-4 border-b border-gray-200">
          {user && (
            <span className="text-gray-700 mr-4">Hola, {user.firstName}</span>
          )}
          <Button onClick={handleLogout}>Cerrar Sesión</Button>
        </header>

        {/* Dashboard main content */}
        <main className="flex-1 p-4">
          <Outlet /> {/* Render nested routes here if any */}
        </main>
      </div>
    </div>
  );
}
