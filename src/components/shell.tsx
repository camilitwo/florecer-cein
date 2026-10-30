"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, ArrowUpRight, Bell } from "lucide-react";
import { useBrowserStorage } from "@/lib/browser-storage";
import * as Dialog from "@radix-ui/react-dialog";
const nav = [
  ["Actualidad", "/actualidad/"],
  ["Agenda", "/agenda/"],
  ["Participa", "/participa/"],
  ["Comunidad", "/comunidad/"],
  ["Transparencia", "/transparencia/"],
  ["Multimedia", "/multimedia/"],
];
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useBrowserStorage(
    "florecer-notice",
    "open",
    true,
  );
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      {notice !== "closed" && (
        <div className="announcement">
          <span>
            Un espacio para imaginar lo que viene.{" "}
            <Link href="/agenda/">
              Conoce la agenda <ArrowUpRight size={14} />
            </Link>
          </span>
          <button
            aria-label="Cerrar aviso"
            onClick={() => {
              setNotice("closed");
            }}
          >
            <X size={17} />
          </button>
        </div>
      )}
      <header className="header">
        <Link className="brand" href="/" aria-label="Florecer, inicio">
          <Image src="/images/florecer.jpg" width={45} height={61} alt="" />
          <span>
            florecer<span>Sembrar voces, florecer cambios.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Principal">
          {nav.map(([t, h]) => (
            <Link
              key={h}
              href={h}
              aria-current={pathname.startsWith(h) ? "page" : undefined}
            >
              {t}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="icon-button" href="/buscar/" aria-label="Buscar">
            <Search size={21} />
          </Link>
          <Link
            className="icon-button notification-link"
            href="/notificaciones/"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="icon-button menu-trigger"
              aria-label="Abrir menú"
            >
              <Menu />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="overlay" />
              <Dialog.Content className="mobile-menu">
                <Dialog.Title>Exploremos.</Dialog.Title>
                <Dialog.Description>
                  La comunidad, a un paso.
                </Dialog.Description>
                <Dialog.Close
                  className="menu-close icon-button"
                  aria-label="Cerrar menú"
                >
                  <X />
                </Dialog.Close>
                <nav aria-label="Menú móvil">
                  {[
                    ["Inicio", "/"],
                    ...nav,
                    ["Documentos", "/documentos/"],
                    ["Contacto", "/contacto/"],
                  ].map(([t, h]) => (
                    <Link key={h} href={h} onClick={() => setOpen(false)}>
                      {t}
                      <ArrowUpRight size={22} />
                    </Link>
                  ))}
                </nav>
                <p className="demo-note">Plataforma de demostración</p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <h2>
              Las ideas se siembran.
              <br />
              <em>Los cambios florecen.</em>
            </h2>
            <p>
              Un espacio de encuentro para la comunidad del
              <br />
              Instituto Nacional José Miguel Carrera.
            </p>
          </div>
          <div className="footer-nav">
            <Link href="/documentos/">Documentos</Link>
            <Link href="/contacto/">Contacto</Link>
            <Link href="/notificaciones/">Avisos</Link>
            <Link href="/admin-demo/">Editor demo</Link>
            <Link href="/buscar/">Buscar</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Florecer · Sembrar voces, florecer cambios.</span>
          <span>Demostración independiente · Sin envío de datos</span>
          <button
            onClick={() => {
              localStorage.removeItem("florecer-read");
              sessionStorage.removeItem("florecer-notice");
              window.location.reload();
            }}
          >
            Restablecer demo
          </button>
          <a href="#contenido">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
