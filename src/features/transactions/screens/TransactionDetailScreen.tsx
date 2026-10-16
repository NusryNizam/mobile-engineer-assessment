import { useLocalSearchParams } from "expo-router";
import { Share, StyleSheet, View } from "react-native";

import AppButton from "@/src/components/AppButton";
import Divider from "@/src/components/Divider";
import { Text } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import TransactionAmount from "../components/TransactionAmount";
import { useTransactionsStore } from "../store/useTransactionsStore";
import type { Transaction } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

type ThemeColors = (typeof Colors)["light"];

export default function TransactionDetailScreen() {
  const { refId } = useLocalSearchParams<{ refId: string }>();
  const theme = useColorScheme();
  const colors = Colors[theme];
  const transaction = useTransactionsStore((state) => state.getByRefId(refId));
  const insets = useSafeAreaInsets();

  if (!transaction) {
    return (
      <View
        style={[styles.center, { backgroundColor: colors.background.default }]}
      >
        <Text style={{ color: colors.text.muted }}>Transaction not found.</Text>
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
        {
          backgroundColor: colors.background.default,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background.surface,
            borderColor: colors.border.subtle,
          },
        ]}
      >
        <Text style={styles.transferName}>{transaction.transferName}</Text>
        <TransactionAmount amount={transaction.amount} style={styles.amount} />

        <Divider style={styles.divider} />

        <DetailRow
          label="Reference ID"
          value={transaction.refId}
          colors={colors}
        />
        <DetailRow
          label="Date"
          value={formatDate(transaction.transferDate)}
          colors={colors}
        />
        <DetailRow
          label="Recipient"
          value={transaction.recipientName}
          colors={colors}
        />
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
  ].join("\n");
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
      <Text style={[styles.rowLabel, { color: colors.text.muted }]}>
        {label}
      </Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: "center",
  },
  transferName: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    fontSize: 28,
    marginTop: Spacing.xs,
  },
  divider: {
    alignSelf: "stretch",
    marginVertical: Spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: Spacing.sm,
  },
  rowLabel: {
    fontSize: 14,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "500",
  },
});
