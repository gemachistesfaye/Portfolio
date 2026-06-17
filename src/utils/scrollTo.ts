export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
