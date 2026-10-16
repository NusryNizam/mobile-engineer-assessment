import { StyleSheet, View } from "react-native";

import AppPressable from "@/src/components/AppPressable";
import AppText from "@/src/components/AppText";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

import type { TransactionFilter } from "../utils/filterTransactions";

const OPTIONS: { value: TransactionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

type Props = {
  value: TransactionFilter;
  onChange: (filter: TransactionFilter) => void;
};

export default function TransactionFilterTabs({ value, onChange }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.subtle }]}
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value;

        return (
          <AppPressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`Filter: ${option.label}`}
            style={[
              styles.tab,
              selected && { backgroundColor: colors.background.accent },
            ]}
          >
            <AppText
              variant="body"
              weight={selected ? "600" : "400"}
              style={{
                color: selected ? colors.text.inverse : colors.text.secondary,
              }}
            >
              {option.label}
            </AppText>
          </AppPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: BorderRadius.pill,
    padding: 4,
    gap: Spacing.xxs,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
});
