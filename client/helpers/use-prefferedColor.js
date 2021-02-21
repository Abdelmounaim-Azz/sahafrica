export function getPrefColorScheme() {
  if (typeof window !== "undefined") {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}
