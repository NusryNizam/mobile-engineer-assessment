import { StyleSheet } from 'react-native';

import AppButton from '@/src/components/AppButton';
import { Text, View } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { Spacing } from '@/src/tokens/spacing';

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
      <AppButton
        title="Retry"
        onPress={onRetry}
        accessibilityLabel="Retry loading transactions"
        style={styles.button}
      />
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
    minHeight: 44,
  },
});
