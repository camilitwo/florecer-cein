import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import "./home.css";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Florecer · Sembrar voces, florecer cambios.",
    template: "%s · Florecer",
  },
  description:
    "Una plataforma editorial estudiantil. Demostración estática de participación y comunidad.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Florecer · Sembrar voces, florecer cambios.",
    description: "Plataforma estudiantil de demostración",
    locale: "es_CL",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
