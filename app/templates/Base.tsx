import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { toCapitalize } from "../utils";

interface Props {
  children?: ReactNode
}

export default function Base({ children }: Props) {
  const router = useRouter();
  const [routeName, setRouteName] = useState<string|false>();

  useEffect(() => {
    if (router.pathname === "/") setRouteName("Home");
    else if (router.pathname === "/404") setRouteName("NotFound");
    else setRouteName(toCapitalize(router.pathname.split("/")[1]));
  }, [router.pathname]);

  return (
    <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
      <Sidebar />
      <main className="ml-20 min-h-screen flex-1 border-r border-l md:ml-64">
        <header className="flex items-center justify-between space-x-6 border-b px-8 py-4">
          <div className="text-xl font-bold">{routeName}</div>
        </header>
        { children }
      </main>
    </div>
  )
}