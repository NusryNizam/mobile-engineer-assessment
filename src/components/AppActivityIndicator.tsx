import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { Colors } from '@/src/tokens/colors';

import { useColorScheme } from './useColorScheme';

export default function AppActivityIndicator({ color, size }: ActivityIndicatorProps) {
  const theme = useColorScheme();

  return <ActivityIndicator size={size ?? 24} color={color ?? Colors[theme].icon.secondary} />;
}
