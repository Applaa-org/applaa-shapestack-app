import type { ThemeName } from "@/components/applaa/presets/themes";

export interface AppItem {
  id: number;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  value?: string;
  category?: string;
  date?: string;
  progress?: number;
  [key: string]: unknown;
}

export interface AppStat {
  label: string;
  value: string;
  icon: string;
  trend?: "up" | "down" | "neutral";
}

export interface AppConfig {
  name: string;
  tagline: string;
  emoji: string;
  theme: ThemeName;
  stats: AppStat[];
  items: AppItem[];
  categories: string[];
  cta: {
    label: string;
    icon?: string;
  };
  features: {
    search?: boolean;
    filter?: boolean;
    stats?: boolean;
    detail?: boolean;
    counter?: boolean;
    progress?: boolean;
    admin?: boolean;
    offline?: boolean;
  };
}

export const APP_CONFIG: AppConfig = {
  name: "ShapeStack",
  tagline: "Stack shapes correctly and build amazing towers!",
  emoji: "📐",
  theme: "CANDY",
  stats: [
    { label: "Shapes Played", value: "0", icon: "🔷" },
    { label: "Towers Built", value: "0", icon: "🏗️" },
    { label: "Best Height", value: "0", icon: "📏" },
  ],
  items: [],
  categories: ["All"],
  cta: {
    label: "Start Stacking",
    icon: "🚀",
  },
  features: {
    search: false,
    filter: false,
    stats: true,
    detail: false,
    counter: false,
    progress: false,
    admin: false,
    offline: true,
  },
};
