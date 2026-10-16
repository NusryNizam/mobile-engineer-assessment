import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

import AppLoader from "@/src/components/AppLoader";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import TransactionListItem from "../components/TransactionListItem";
import { useTransactionsStore } from "../store/useTransactionsStore";
import type { Transaction } from "../types";

export default function TransactionsListScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();
  const colors = Colors[theme];
  const { transactions, status, error, fetchTransactions } =
    useTransactionsStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePressItem = useCallback((transaction: Transaction) => {
    router.push(`/transaction/${transaction.refId}`);
  }, []);

  const hasData = transactions.length > 0;

  if ((status === "idle" || status === "loading") && !hasData) {
    return <AppLoader title="Loading transactions…" />;
  }

  if (status === "error" && !hasData) {
    return (
      <ErrorState
        message={error ?? "Please try again."}
        onRetry={fetchTransactions}
      />
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background.default }}
      contentContainerStyle={
        hasData
          ? { ...styles.content, paddingBottom: insets.bottom }
          : styles.emptyContent
      }
      data={transactions}
      keyExtractor={(item) => item.refId}
      renderItem={({ item }) => (
        <TransactionListItem transaction={item} onPress={handlePressItem} />
      )}
      ListEmptyComponent={EmptyState}
      refreshControl={
        <RefreshControl
          refreshing={status === "loading"}
          onRefresh={fetchTransactions}
          tintColor={colors.icon.default}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {},
  emptyContent: {
    flexGrow: 1,
  },
});
