import { StyleSheet } from 'react-native';

import AppButton from '@/src/components/AppButton';
import AppText from '@/src/components/AppText';
import { View } from '@/src/components/Themed';
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
      <AppText variant="title" style={{ color: colors.status.danger }}>
        Something went wrong
      </AppText>
      <AppText variant="body" style={[styles.message, { color: colors.text.muted }]}>
        {message}
      </AppText>
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
  message: {
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.sm,
    minHeight: 44,
  },
});
