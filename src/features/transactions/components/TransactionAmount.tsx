import type { StyleProp, TextStyle } from 'react-native';

import AppText from '@/src/components/AppText';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import type { TypographyVariant } from '@/src/tokens/typography';

import { formatCurrency } from '../utils/formatCurrency';

type Props = {
  amount: number;
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
};

export default function TransactionAmount({ amount, variant = 'body', style }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme].status;
  const color = amount < 0 ? colors.danger : colors.success;

  return (
    <AppText variant={variant} weight="600" style={[{ color }, style]}>
      {formatCurrency(amount)}
    </AppText>
  );
}
