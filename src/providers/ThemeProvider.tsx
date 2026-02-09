import { useEffect, type ReactNode } from "react";
import type { ThemeConfig } from "@/types/landing-page";
import { hexToHsl } from "@/lib/utils";

interface ThemeProviderProps {
  theme: ThemeConfig;
  children: ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    // Zet CSS custom properties vanuit de theme config
    root.style.setProperty("--primary", hexToHsl(theme.colors.primary));
    root.style.setProperty("--primary-foreground", "0 0% 100%");
    root.style.setProperty("--secondary", hexToHsl(theme.colors.secondary));
    root.style.setProperty("--secondary-foreground", "0 0% 100%");
    root.style.setProperty("--accent", hexToHsl(theme.colors.accent));
    root.style.setProperty("--accent-foreground", hexToHsl(theme.colors.foreground));
    root.style.setProperty("--background", hexToHsl(theme.colors.background));
    root.style.setProperty("--foreground", hexToHsl(theme.colors.foreground));
    root.style.setProperty("--muted", hexToHsl(theme.colors.muted));
    root.style.setProperty("--muted-foreground", hexToHsl(theme.colors.mutedForeground));
    root.style.setProperty("--radius", theme.borderRadius);
    root.style.setProperty("--font-heading", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);

    // Card, popover, etc. leiden af van background
    root.style.setProperty("--card", hexToHsl(theme.colors.background));
    root.style.setProperty("--card-foreground", hexToHsl(theme.colors.foreground));
    root.style.setProperty("--popover", hexToHsl(theme.colors.background));
    root.style.setProperty("--popover-foreground", hexToHsl(theme.colors.foreground));
    root.style.setProperty("--border", hexToHsl(theme.colors.muted));
    root.style.setProperty("--input", hexToHsl(theme.colors.muted));
    root.style.setProperty("--ring", hexToHsl(theme.colors.primary));
  }, [theme]);

  return <>{children}</>;
}
