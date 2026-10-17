import { router } from "expo-router";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppLoader from "@/src/components/AppLoader";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import NoResultsState from "../components/NoResultsState";
import SearchBar from "../components/SearchBar";
import TransactionFilterTabs from "../components/TransactionFilterTabs";
import TransactionListItem from "../components/TransactionListItem";
import { useTransactionsStore } from "../store/useTransactionsStore";
import type { Transaction } from "../types";
import {
  filterTransactions,
  type TransactionFilter,
} from "../utils/filterTransactions";

export default function TransactionsListScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();
  const colors = Colors[theme];
  const { transactions, status, error, fetchTransactions } =
    useTransactionsStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePressItem = useMemo(
    () =>
      debounce(
        (transaction: Transaction) => {
          router.push(`/transaction/${transaction.refId}`);
        },
        800,
        { leading: true, trailing: false },
      ),
    [],
  );

  useEffect(() => {
    return () => {
      handlePressItem.cancel();
    };
  }, [handlePressItem]);

  const handleClearFilters = useCallback(() => {
    setQuery("");
    setFilter("all");
  }, []);

  const hasData = transactions.length > 0;
  const hasActiveFilter = query.trim().length > 0 || filter !== "all";
  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, query, filter),
    [transactions, query, filter],
  );

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
    <View
      style={[styles.screen, { backgroundColor: colors.background.default }]}
    >
      {hasData && (
        <View style={styles.toolbar}>
          <SearchBar value={query} onChangeText={setQuery} />
          <TransactionFilterTabs value={filter} onChange={setFilter} />
        </View>
      )}
      <FlatList
        style={{ backgroundColor: colors.background.default }}
        contentContainerStyle={
          filteredTransactions.length > 0
            ? { ...styles.content, paddingBottom: insets.bottom }
            : styles.emptyContent
        }
        data={filteredTransactions}
        keyExtractor={(item) => item.refId}
        renderItem={({ item }) => (
          <TransactionListItem transaction={item} onPress={handlePressItem} />
        )}
        ListEmptyComponent={
          hasActiveFilter
            ? () => <NoResultsState onClear={handleClearFilters} />
            : EmptyState
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={fetchTransactions}
            tintColor={colors.icon.default}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  toolbar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  content: {},
  emptyContent: {
    flexGrow: 1,
  },
});
