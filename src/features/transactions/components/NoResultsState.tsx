import { StyleSheet } from 'react-native';

import AppButton from '@/src/components/AppButton';
import AppText from '@/src/components/AppText';
import { View } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { Spacing } from '@/src/tokens/spacing';

type Props = {
  onClear: () => void;
};

export default function NoResultsState({ onClear }: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <AppText variant="title">No matching transactions</AppText>
      <AppText variant="body" style={[styles.subtitle, { color: colors.text.muted }]}>
        Try a different search term or filter.
      </AppText>
      <AppButton
        title="Clear filters"
        variant="outline"
        onPress={onClear}
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
    gap: Spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.sm,
    minHeight: 44,
  },
});
