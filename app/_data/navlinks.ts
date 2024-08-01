import {
    Home,
    ShoppingCart,
    Package,
    NotebookPen,
    Contact,
    User,
    Settings2,
    Cog,
    LucideIcon
} from 'lucide-react';

interface NavLink {
    href: string;
    icon: LucideIcon;
    text: string;
}

export const dashNavLinks: NavLink[] = [
    { href: "/dashboard", icon: Home, text: "Dashboard" },
    { href: "/orders", icon: ShoppingCart, text: "Orders" },
    { href: "/products", icon: Package, text: "Products" },
    { href: '/todos', icon: NotebookPen, text: 'Todos'}
];

export const accNavLinks: NavLink[] = [
    { href: '/account', icon: Contact, text: 'My Account'},
    { href: '/account/profile', icon: User, text: 'Profile'},
    {href: '/account/preferences', icon: Settings2, text: 'Preferences'},
    {href: '/account/settings', icon: Cog, text: 'Settings'}
];