// pages/_app.tsx
import "../../public/styles/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // Evita problemas con los estilos en SSR
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NavbarAdmin from "@/presentation/components/Admin/NavbarAdmin";
import Navbar from "@/presentation/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {

    return (
        <ThemeProvider attribute="class">
            {/* Cambiar dependiendo del tipo de usuario */}
            <NavbarAdmin /> 
            {/* <Navbar /> */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}