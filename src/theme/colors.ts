export const colors = {
  background: '#fdf9f2', // Cream / warm background
  primary: '#496251',    // Sage green (main buttons, active states)
  primaryContainer: '#617a69',
  secondary: '#93493b',  // Terracotta (accent / warnings / highlights)
  secondaryContainer: '#ffa08f',
  tertiary: '#4c6057',   // Forest green (headings, dark green texts)
  tertiaryContainer: '#64796f',
  surface: '#fdf9f2',
  surfaceBright: '#ffffff', // Pure white (cards and forms)
  surfaceContainer: '#f1ede6', // Light beige / gray for backgrounds
  surfaceContainerHigh: '#ebe8e1', // Slightly darker beige
  onPrimary: '#ffffff',
  onSurface: '#1c1c18',    // Very dark gray / charcoal
  onSurfaceVariant: '#424843', // Medium gray for description/meta
  outline: '#737973',      // Slate border gray
  outlineVariant: '#c2c8c1', // Soft border gray
  error: '#ba1a1a',
  onError: '#ffffff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const roundness = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const shadows = {
  // Diffused sunlight shadow using primary Sage green tint for premium feel
  soft: {
    shadowColor: '#496251',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  medium: {
    shadowColor: '#496251',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
