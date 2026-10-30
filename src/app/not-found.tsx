import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap section page-heading">
      <span className="demo-note">Página no encontrada · 404</span>
      <h1>
        Este camino aún
        <br />
        no florece.
      </h1>
      <p>Vuelve al inicio o busca otra forma de llegar.</p>
      <div className="button-row">
        <Link className="button" href="/">
          Volver al inicio
        </Link>
        <Link className="button secondary" href="/buscar/">
          Buscar contenido
        </Link>
      </div>
    </section>
  );
}
