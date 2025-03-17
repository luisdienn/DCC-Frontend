// pages/_app.tsx
import "../../public/styles/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // Evita problemas con los estilos en SSR
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NavbarAdmin from "@/presentation/components/Admin/NavbarAdmin";
import Navbar from "@/presentation/components/Navbar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    const isAdmin = router.pathname.startsWith("/admin");
    const isHome = router.pathname === "/";

    return (
        <ThemeProvider attribute="class">
            {!isHome && (isAdmin ? <NavbarAdmin /> : <Navbar />)}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}