"use client"
import { buttonVariants } from "./ui/button";
import Logo from "../../public/logo/cover-2.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"; 
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import dynamic from 'next/dynamic';

// Fix hydration issues by using Next.js Dynamic Import to render the Menu Icon only on the client side 
const DynamicMenu = dynamic(() => import('lucide-react').then(mod => mod.Menu), {
  ssr: false,
});

interface RouteProps {
  href: string;
  label: string;
}

const unathenticatedRoutes: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/#about",
    label: "About",
  },
  {
    href: "/login",
    label: "Login",
  },
  {
    href: "/signup",
    label: "Sign Up",
  },
];

const authenticatedRoutes: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, username, cash, logout, loading } = useAuth();
  const routes = isAuthenticated ? authenticatedRoutes : unathenticatedRoutes;
  const router = useRouter(); 
  

  const handleLogout = () => {
    logout();
    router.push("/"); 
  };


  // wait for auth context to load 
  if (loading) {
    return null; 
  }

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="flex gap-4 max-w-48 sm:max-w-36">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center"
            >
              <Image
                src={Logo}
                alt="logo"
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger asChild>
                <button className="px-2" aria-label="Open menu">
                  <DynamicMenu
                    className="h-5 w-5 mr-10"
                    onClick={() => setIsOpen(true)}
                  />
                </button>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Fortress
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routes.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <div className="flex flex-col justify-center items-center gap-2 mt-4">
                      <span className="text-sm">
                        {username} with ${cash}
                      </span>
                      <button onClick={handleLogout} className="bg-blue-500 px-2 py-2 rounded text-sm">
                        Logout
                      </button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routes.map((route: RouteProps, i) => (
              <Link
                key={i}
                href={route.href}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {isAuthenticated && (
            <div className="hidden md:flex justify-between gap-2 items-center">
              <span className="text-sm text-center flex items-center">
                {username} with ${cash}
              </span>
              <button onClick={handleLogout} className="text-[17px] bg-blue-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}