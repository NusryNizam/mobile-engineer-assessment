import { useLocalSearchParams } from 'expo-router';
import { Share, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/src/components/AppButton';
import AppText from '@/src/components/AppText';
import Divider from '@/src/components/Divider';
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
  const insets = useSafeAreaInsets();

  if (!transaction) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background.default }]}>
        <AppText variant="body" style={{ color: colors.text.muted }}>
          Transaction not found.
        </AppText>
      </View>
    );
  }

  const handleShare = () => {
    Share.share({ message: buildShareMessage(transaction) });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background.default, paddingBottom: insets.bottom },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: colors.background.surface, borderColor: colors.border.subtle },
        ]}
      >
        <AppText variant="title">{transaction.transferName}</AppText>
        <TransactionAmount
          amount={transaction.amount}
          variant="amount"
          style={styles.amountSpacing}
        />

        <Divider style={styles.divider} />

        <DetailRow label="Reference ID" value={transaction.refId} colors={colors} />
        <DetailRow label="Date" value={formatDate(transaction.transferDate)} colors={colors} />
        <DetailRow label="Recipient" value={transaction.recipientName} colors={colors} />
      </View>

      <AppButton
        title="Share"
        onPress={handleShare}
        accessibilityLabel="Share transaction details"
      />
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
      <AppText variant="body" style={{ color: colors.text.muted }}>
        {label}
      </AppText>
      <AppText variant="body" weight="500">
        {value}
      </AppText>
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
  amountSpacing: {
    marginTop: Spacing.xs,
  },
  divider: {
    alignSelf: 'stretch',
    marginVertical: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: Spacing.sm,
  },
});
