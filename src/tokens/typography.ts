import type { TextStyle } from 'react-native';

export const Typography = {
  title: { fontSize: 16, fontWeight: '600' },
  amount: { fontSize: 28, fontWeight: '700' },
  button: { fontSize: 15, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof Typography;
