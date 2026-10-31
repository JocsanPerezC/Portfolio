const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 font-bold transition-[background-color,color,translate] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0";

export const buttonStyles = {
  primary: `${buttonBase} bg-ink text-page hover:bg-accent hover:text-page`,
  secondary: `${buttonBase} border-2 border-ink text-ink hover:bg-ink hover:text-page`,
};

// Mirrors the CSS tokens in index.css for WebGL, which cannot read CSS variables.
export const PALETTES = {
  light: { ink: "#14231a", page: "#f2f5f1", cloth: "#1e4d36", accent: "#1d5fd1", tab: "#f08a24" },
  dark: { ink: "#e8efe9", page: "#16301f", cloth: "#0c1a12", accent: "#9dbcff", tab: "#f08a24" },
};
