import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div>
      <h1>No autorizado</h1>
      <p>No tienes permiso para ver esta página.</p>
      <Link to="/login">Ir al Login</Link>
    </div>
  );
}
