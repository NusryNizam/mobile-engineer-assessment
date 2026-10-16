import * as Haptics from 'expo-haptics';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import AppPressable from '@/src/components/AppPressable';
import { Text } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { Spacing } from '@/src/tokens/spacing';

import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import TransactionAmount from './TransactionAmount';

type Props = {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
};

function TransactionListItem({ transaction, onPress }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress(transaction);
  };

  return (
    <AppPressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.transferName}, ${formatDate(transaction.transferDate)}, ${formatCurrency(transaction.amount)}`}
      style={[styles.container, { borderColor: colors.border.subtle }]}
    >
      <View style={styles.details}>
        <Text style={styles.transferName}>{transaction.transferName}</Text>
        <Text style={[styles.date, { color: colors.text.muted }]}>
          {formatDate(transaction.transferDate)}
        </Text>
      </View>
      <TransactionAmount amount={transaction.amount} />
    </AppPressable>
  );
}

export default memo(TransactionListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  details: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  transferName: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
    marginTop: Spacing.xxs,
  },
});
