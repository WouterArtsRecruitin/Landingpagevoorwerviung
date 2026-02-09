import { createContext, useContext, type ReactNode } from "react";
import type { LandingPageConfig } from "@/types/landing-page";

interface ConfigContextValue {
  config: LandingPageConfig;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({
  config,
  children,
}: {
  config: LandingPageConfig;
  children: ReactNode;
}) {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): LandingPageConfig {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context.config;
}
