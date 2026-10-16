import { useLocalSearchParams } from 'expo-router';
import { Pressable, Share, StyleSheet, View } from 'react-native';

import { Text } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';

import TransactionAmount from '../components/TransactionAmount';
import { useTransactionsStore } from '../store/useTransactionsStore';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

type ThemeColors = (typeof Colors)['light'];

export default function TransactionDetailScreen() {
  const { refId } = useLocalSearchParams<{ refId: string }>();
  const theme = useColorScheme();
  const colors = Colors[theme];
  const transaction = useTransactionsStore((state) => state.getByRefId(refId));

  if (!transaction) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background.default }]}>
        <Text style={{ color: colors.text.muted }}>Transaction not found.</Text>
      </View>
    );
  }

  const handleShare = () => {
    Share.share({ message: buildShareMessage(transaction) });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.background.surface, borderColor: colors.border.subtle },
        ]}
      >
        <Text style={styles.transferName}>{transaction.transferName}</Text>
        <TransactionAmount amount={transaction.amount} style={styles.amount} />

        <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />

        <DetailRow label="Reference ID" value={transaction.refId} colors={colors} />
        <DetailRow label="Date" value={formatDate(transaction.transferDate)} colors={colors} />
        <DetailRow label="Recipient" value={transaction.recipientName} colors={colors} />
      </View>

      <Pressable
        onPress={handleShare}
        accessibilityRole="button"
        accessibilityLabel="Share transaction details"
        style={({ pressed }) => [
          styles.shareButton,
          { backgroundColor: colors.background.accent },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.shareLabel, { color: colors.text.inverse }]}>Share</Text>
      </Pressable>
    </View>
  );
}

function buildShareMessage(transaction: Transaction): string {
  return [
    transaction.transferName,
    `Reference ID: ${transaction.refId}`,
    `Date: ${formatDate(transaction.transferDate)}`,
    `Recipient: ${transaction.recipientName}`,
    `Amount: ${formatCurrency(transaction.amount)}`,
  ].join('\n');
}

function DetailRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: ThemeColors;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.text.muted }]}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  transferName: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 28,
    marginTop: Spacing.xs,
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    marginVertical: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: Spacing.sm,
  },
  rowLabel: {
    fontSize: 14,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  shareLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
