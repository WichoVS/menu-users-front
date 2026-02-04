import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { menuService } from "@/services/menu.service";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useUserStore } from "@/store/userStore";

type MenuItem = {
  idMenu: number;
  isMain: boolean;
  name: string;
  parentId: number | null;
  route: string;
  children: MenuItem[];
};

interface SidebarProps {
  className?: string;
}

const MenuItemComponent: React.FC<{ item: MenuItem; level?: number }> = ({
  item,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const paddingLeft = level * 16 + 8; // Adjust padding for nesting

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between pr-4",
              `pl-[${paddingLeft}px]`,
            )}
          >
            <span className="truncate">{item.name}</span>
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen ? "rotate-180" : "rotate-0",
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {item.children.map((child) => (
              <MenuItemComponent
                key={child.idMenu}
                item={child}
                level={level + 1}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={cn("w-full justify-start", `pl-[${paddingLeft}px]`)}
    >
      <Link to={item.route} className="block w-full text-left">
        {item.name}
      </Link>
    </Button>
  );
};

export default function Sidebar({ className }: SidebarProps) {
  const { user } = useUserStore((state) => state);
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleGetMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await menuService.getMenuItems(user?.id || "");
      if (response.success && response.data) {
        setMenuItems(response.data);
      } else {
        setError(response.error || "Error al cargar el menú.");
      }
    } catch (err) {
      console.log(err);
      setError("Error de red al cargar el menú.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetMenuItems();
  }, []);

  if (loading) {
    return <div className={cn("p-4", className)}>Cargando menú...</div>;
  }

  if (error) {
    return <div className={cn("p-4 text-red-500", className)}>{error}</div>;
  }

  return (
    <div
      className={cn("flex flex-col h-full bg-gray-100 border-r p-2", className)}
    >
      <h2 className="text-lg font-semibold mb-4 px-2">Navegación</h2>
      <nav className="flex flex-col flex-grow space-y-1">
        {menuItems.map((item) => (
          <MenuItemComponent key={item.idMenu} item={item} />
        ))}
      </nav>
    </div>
  );
}
