import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../src/data/content";
test("all exported routes, links and assets resolve", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route ? "/" + route + "/" : "/");
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => (n as HTMLAnchorElement).getAttribute("href")!),
      );
    for (const href of new Set(links))
      expect((await request.get(href)).status(), href).toBe(200);
  }
  expect(errors).toEqual([]);
});
test("responsive routes, zoom equivalent and landscape have no overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "",
      "actualidad",
      "agenda",
      "participa/formularios",
      "transparencia",
      "documentos",
      "comunidad",
      "multimedia",
      "admin-demo",
    ]) {
      await page.goto(route ? "/" + route + "/" : "/");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 740, height: 360 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 720, height: 450 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("search, empty state and pagination", async ({ page }) => {
  await page.goto("/buscar/");
  await page.getByRole("searchbox").fill("biblioteca");
  await expect(
    page.getByRole("heading", { name: "Biblioteca viva" }),
  ).toBeVisible();
  await page.getByRole("searchbox").fill("zzzxxy");
  await expect(page.getByText("No encontramos coincidencias.")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await expect(page.getByText("Página 1 de")).toBeVisible();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await expect(page.getByText("Página 2 de")).toBeVisible();
});
test("form validates, summarizes and never sends requests", async ({
  page,
}) => {
  const writes: string[] = [];
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method()))
      writes.push(r.url());
  });
  await page.goto("/contacto/");
  await page.getByRole("button", { name: "Revisar resumen" }).click();
  await expect(page.getByText("Revisa antes de confirmar")).not.toBeVisible();
  await page
    .getByRole("textbox")
    .fill("Una propuesta ficticia para un encuentro de lectura.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Revisar resumen" }).click();
  await expect(page.getByText("Revisa antes de confirmar")).toBeVisible();
  await page.getByRole("button", { name: "Confirmar demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Demostración completada." }),
  ).toBeVisible();
  expect(writes).toEqual([]);
});
test("poll and proposals work only in memory", async ({ page }) => {
  await page.goto("/participa/encuestas/");
  await expect(page.getByRole("button", { name: "Continuar" })).toBeDisabled();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: "Terminar simulación" }).click();
  await expect(
    page.getByRole("heading", { name: "Simulación completada" }),
  ).toBeVisible();
  await page.goto("/participa/propuestas/");
  await page.getByLabel("Título de ejemplo").fill("Una idea de prueba");
  await page
    .getByLabel("¿Qué propones?")
    .fill("Organizar un intercambio de lecturas de demostración.");
  await page.getByRole("button", { name: "Agregar propuesta demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Una idea de prueba" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Una idea de prueba" }),
  ).not.toBeVisible();
});
test("calendar, downloads, gallery and editor", async ({ page }) => {
  await page.goto("/agenda/");
  await page.getByRole("button", { name: "Calendario", exact: true }).click();
  await expect(page.locator(".calendar-grid")).toHaveCount(2);
  await page.goto("/agenda/encuentro-de-voces/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Guardar en calendario" }).click();
  expect((await downloadPromise).suggestedFilename()).toContain(".ics");
  await page.goto("/multimedia/herbario-florecer/");
  await page.getByRole("button", { name: "Abrir galería" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await expect(page.getByText("2 / 2")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.goto("/admin-demo/");
  await page
    .getByRole("textbox", { name: "Título", exact: true })
    .fill("Título editado de prueba");
  await expect(
    page.getByRole("heading", { name: "Título editado de prueba" }),
  ).toBeVisible();
});
test("mobile menu traps focus, escapes and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .getByRole("navigation", { name: "Menú móvil" })
    .getByRole("link", { name: "Actualidad", exact: true })
    .click();
  await expect(page).toHaveURL(/actualidad/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("notifications persist and reset", async ({ page }) => {
  await page.goto("/notificaciones/");
  await page
    .getByRole("button", { name: "Marcar como leído", exact: true })
    .first()
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Marcar sin leer" }),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Restablecer demo" }).click();
  await expect(
    page.getByRole("button", { name: "Marcar sin leer" }),
  ).toHaveCount(0);
});
test("representative desktop and mobile pages meet automated accessibility checks", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "",
      "actualidad",
      "participa/encuestas",
      "contacto",
      "admin-demo",
    ]) {
      await page.goto(route ? "/" + route + "/" : "/");
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        route + " " + width,
      ).toEqual([]);
    }
  }
});
test("reduced motion leaves hero visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-word")).toBeVisible();
  expect(
    await page
      .locator(".hero-word")
      .evaluate((el) => getComputedStyle(el).clipPath),
  ).toBe("none");
});

test("static content remains readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "florecer cambios.",
  );
  await page.goto("http://localhost:3000/actualidad/una-escuela-que-escucha/");
  await expect(page.locator(".reading")).toContainText("contenido de muestra");
  await context.close();
});
test("200 percent layout zoom and 404 recovery", async ({ page }) => {
  // A 1440×900 viewport at browser zoom 200% exposes 720×450 CSS pixels.
  await page.setViewportSize({ width: 720, height: 450 });
  for (const route of ["/", "/agenda/", "/participa/formularios/"]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  const response = await page.goto("/ruta-inexistente/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Volver al inicio" }),
  ).toBeVisible();
});

test("editorial motion pauses and reduced-motion changes revert the scene", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const band = page.getByRole("region", {
    name: "Escuchar, proponer, encontrarnos",
  });
  await band.scrollIntoViewIfNeeded();
  await expect(band).toHaveAttribute("data-running", "true");
  await page.getByRole("button", { name: "Pausar banda editorial" }).click();
  await expect(band).toHaveAttribute("data-running", "false");
  await page.getByRole("button", { name: "Reanudar banda editorial" }).click();
  await expect(band).toHaveAttribute("data-running", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(band).toHaveAttribute("data-running", "false");
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect
    .poll(() =>
      page
        .locator(".botanical-drift")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe("none");
  await expect(page.locator(".hero-word")).toBeVisible();
});
test("hero scroll depth is bounded and participation text stays complete", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect
    .poll(() =>
      page
        .locator(".botanical-drift")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe("none");
  await page.evaluate(() => window.scrollTo({ top: 550, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".botanical-drift")
        .evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
        ),
    )
    .toBeGreaterThan(10);
  const offset = await page
    .locator(".botanical-drift")
    .evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
    );
  expect(offset).toBeLessThan(60);
  expect(
    await page
      .locator(".participation-section h2")
      .evaluate((el) => getComputedStyle(el).clipPath),
  ).toBe("none");
  await page.getByRole("link", { name: "Florecer, inicio" }).click();
  await page
    .getByRole("link", { name: "Actualidad", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Lo que nos mueve." }),
  ).toBeVisible();
});
