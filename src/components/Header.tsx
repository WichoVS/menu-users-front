import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming cn utility is available

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between p-4 border-b border-gray-200',
        className
      )}
    >
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">Mi Logo</Link>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex gap-4">
        <Button asChild>
          <Link to="/login">Iniciar Sesión</Link>
        </Button>
        <Button asChild>
          <Link to="/signin">Registrarse</Link>
        </Button>
      </nav>
    </header>
  );
}
