import { Colors as Tokens } from '@/src/tokens/colors';

export default {
  light: {
    text: Tokens.light.text.default,
    background: Tokens.light.background.default,
    tint: Tokens.light.background.accent,
    tabIconDefault: Tokens.light.icon.muted,
    tabIconSelected: Tokens.light.background.accent,
  },
  dark: {
    text: Tokens.dark.text.default,
    background: Tokens.dark.background.default,
    tint: Tokens.dark.background.accent,
    tabIconDefault: Tokens.dark.icon.muted,
    tabIconSelected: Tokens.dark.background.accent,
  },
};
