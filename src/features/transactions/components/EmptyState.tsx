import { StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { Spacing } from '@/src/tokens/spacing';

export default function EmptyState() {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No transactions yet</Text>
      <Text style={[styles.subtitle, { color: colors.text.muted }]}>
        Your incoming and outgoing transfers will show up here.
      </Text>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
