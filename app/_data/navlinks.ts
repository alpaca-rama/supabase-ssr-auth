import {Home, ShoppingCart, Package, NotebookPen , LucideIcon} from 'lucide-react';

interface NavLink {
    href: string;
    icon: LucideIcon;
    text: string;
}

export const navLinks: NavLink[] = [
    { href: "/dashboard", icon: Home, text: "Dashboard" },
    { href: "/orders", icon: ShoppingCart, text: "Orders" },
    { href: "/products", icon: Package, text: "Products" },
    { href: '/todos', icon: NotebookPen, text: 'Todos'}
];