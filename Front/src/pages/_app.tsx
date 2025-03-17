import "../../public/styles/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NavbarAdmin from "@/presentation/components/Admin/NavbarAdmin";
import { SessionProvider } from "next-auth/react"; 
import Navbar from "@/presentation/components/Navbar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");
  const isHome = router.pathname === "/";
  const isLogin = router.pathname === "/login";


  return (
      <SessionProvider session={pageProps.session}>
          <ThemeProvider attribute="class">
              {!isHome && !isLogin && (isAdmin ? <NavbarAdmin /> : <Navbar />)}
              
              <Component {...pageProps} />
          </ThemeProvider>
      </SessionProvider>
  );
}
