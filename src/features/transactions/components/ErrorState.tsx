import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';
import { Colors } from '@/src/tokens/colors';

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.status.danger }]}>Something went wrong</Text>
      <Text style={[styles.message, { color: colors.text.muted }]}>{message}</Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Retry loading transactions"
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.background.accent },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonLabel, { color: colors.text.inverse }]}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
