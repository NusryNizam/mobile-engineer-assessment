import { useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/src/components/Themed';

export default function TransactionDetailRoute() {
  const { refId } = useLocalSearchParams<{ refId: string }>();

  // TODO: replace with the real detail screen (next step) + Share.share()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Transaction {refId}</Text>
    </View>
  );
}
