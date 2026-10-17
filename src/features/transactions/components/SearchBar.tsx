import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import AppPressable from "@/src/components/AppPressable";
import AppText from "@/src/components/AppText";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { Typography } from "@/src/tokens/typography";

const SEARCH_DEBOUNCE_MS = 300;

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChangeText = useMemo(
    () => debounce(onChangeText, SEARCH_DEBOUNCE_MS),
    [onChangeText],
  );

  useEffect(() => {
    return () => {
      debouncedOnChangeText.cancel();
    };
  }, [debouncedOnChangeText]);

  // Keep the visible text in sync when the parent resets `value` externally
  // (e.g. the "Clear filters" action in NoResultsState).
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    debouncedOnChangeText(text);
  };

  const handleClear = () => {
    setInputValue("");
    debouncedOnChangeText.cancel();
    onChangeText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.subtle,
          borderColor: colors.border.subtle,
        },
      ]}
    >
      <AppText variant="body" style={{ color: colors.text.muted }}>
        🔍
      </AppText>
      <TextInput
        value={inputValue}
        onChangeText={handleChangeText}
        placeholder="Search transactions"
        placeholderTextColor={colors.text.muted}
        style={[styles.input, Typography.body, { color: colors.text.default }]}
        accessibilityLabel="Search transactions"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {inputValue.length > 0 && (
        <AppPressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <AppText variant="body" style={{ color: colors.text.muted }}>
            ✕
          </AppText>
        </AppPressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
