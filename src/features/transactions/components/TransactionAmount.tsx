import { StyleProp, Text, TextStyle } from 'react-native';

import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';

import { formatCurrency } from '../utils/formatCurrency';

type Props = {
  amount: number;
  style?: StyleProp<TextStyle>;
};

export default function TransactionAmount({ amount, style }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme].status;
  const color = amount < 0 ? colors.danger : colors.success;

  return <Text style={[{ color, fontWeight: '600' }, style]}>{formatCurrency(amount)}</Text>;
}
