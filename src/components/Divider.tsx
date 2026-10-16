import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

import AppText from "./AppText";
import { useColorScheme } from "./useColorScheme";

type Props = {
  text?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Divider({ text, style }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: colors.border.subtle }]} />
      {!!text && (
        <AppText
          variant="caption"
          style={[
            styles.text,
            {
              color: colors.text.muted,
              backgroundColor: colors.background.surface,
            },
          ]}
        >
          {text}
        </AppText>
      )}
      <View style={[styles.line, { backgroundColor: colors.border.subtle }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
  },
  text: {
    paddingHorizontal: Spacing.xs,
  },
});
