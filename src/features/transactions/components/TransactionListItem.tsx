import * as Haptics from 'expo-haptics';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

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
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.transferName}, ${formatDate(transaction.transferDate)}, ${formatCurrency(transaction.amount)}`}
      style={({ pressed }) => [
        styles.container,
        { borderColor: colors.border.subtle },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.details}>
        <Text style={styles.transferName}>{transaction.transferName}</Text>
        <Text style={[styles.date, { color: colors.text.muted }]}>
          {formatDate(transaction.transferDate)}
        </Text>
      </View>
      <TransactionAmount amount={transaction.amount} />
    </Pressable>
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
  pressed: {
    opacity: 0.6,
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
