import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Colors } from '@/src/tokens/colors';
import { Spacing } from '@/src/tokens/spacing';

export default function LoadingState() {
  const theme = useColorScheme();
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.icon.default} />
      <Text style={[styles.label, { color: colors.text.muted }]}>Loading transactions…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  label: {
    fontSize: 14,
  },
});
