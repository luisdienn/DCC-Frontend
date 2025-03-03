// pages/_app.tsx
import "../../public/styles/index.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

    return (
            <Component {...pageProps} />
    );
}