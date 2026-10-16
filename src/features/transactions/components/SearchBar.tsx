import { StyleSheet, TextInput, View } from "react-native";

import AppPressable from "@/src/components/AppPressable";
import AppText from "@/src/components/AppText";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { Typography } from "@/src/tokens/typography";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

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
        value={value}
        onChangeText={onChangeText}
        placeholder="Search transactions"
        placeholderTextColor={colors.text.muted}
        style={[styles.input, Typography.body, { color: colors.text.default }]}
        accessibilityLabel="Search transactions"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <AppPressable
          onPress={() => onChangeText("")}
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
  },
});
