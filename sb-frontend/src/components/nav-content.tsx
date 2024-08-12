import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import Logo from "../../public/logo/cover-2.png"
import Image from "next/image";

interface RouteProps {
    href: string;
    label: string;
  }
  
  const routeList: RouteProps[] = [
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
      label: "Signup",
    },
  ];


export function NavContent() {
  return (
    <nav className="flex w-full justify-between py-4 lg:mr-2 sm:mx-auto">
      <div className="flex items-center gap-4 max-w-48">
      <Image
        src={Logo}
        alt="logo"
        sizes="100vw"
        style={{
          width: 'auto',
          height: 'auto',
        }}
      />
      </div>
    {routeList.map((route: RouteProps, i) => (
      <a
        rel="noreferrer noopener"
        href={route.href}
        key={i}
        className={`text-[17px] ${buttonVariants({
          variant: "ghost",
        })}`}
      >
        {route.label}
      </a>
    ))}
        
  </nav>
  )
}
