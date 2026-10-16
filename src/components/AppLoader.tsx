import { StyleSheet, View } from "react-native";

import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

import AppActivityIndicator from "./AppActivityIndicator";
import AppText from "./AppText";
import { useColorScheme } from "./useColorScheme";

type Props = {
  title?: string;
};

export default function AppLoader({ title }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <AppActivityIndicator />
      {!!title && (
        <AppText variant="body" style={{ color: colors.text.muted }}>
          {title}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
});
