import { StyleSheet } from "react-native";

import AppText from "@/src/components/AppText";
import { View } from "@/src/components/Themed";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

export default function EmptyState() {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <AppText variant="title">No transactions yet</AppText>
      <AppText
        variant="body"
        style={[styles.subtitle, { color: colors.text.muted }]}
      >
        Your incoming and outgoing transfers will show up here.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
  },
  subtitle: {
    textAlign: "center",
  },
});
