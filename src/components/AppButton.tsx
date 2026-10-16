import { PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { Colors } from '@/src/tokens/colors';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';

import AppActivityIndicator from './AppActivityIndicator';
import AppPressable from './AppPressable';
import { useColorScheme } from './useColorScheme';

type ButtonVariant = 'fill' | 'outline' | 'tonal' | 'ghost';

type Props = {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
} & PressableProps;

export default function AppButton({
  title,
  variant = 'fill',
  disabled,
  onPress,
  loading,
  style,
  accessibilityLabel,
  ...props
}: Props) {
  const theme = useColorScheme();
  const colors = Colors[theme];

  const variantStyle: Record<ButtonVariant, ViewStyle & TextStyle> = {
    fill: {
      backgroundColor: colors.background.accent,
      color: colors.text.inverse,
    },
    outline: {
      color: colors.text.secondary,
      borderWidth: 1,
      borderColor: colors.border.strong,
    },
    tonal: {
      color: colors.text.secondary,
      backgroundColor: colors.background.accent + '18',
    },
    ghost: {
      color: colors.text.secondary,
    },
  };

  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={(state) => {
        const resolvedStyle = typeof style === 'function' ? style(state) : style;

        return [
          variantStyle[variant],
          styles.button,
          disabled && styles.disabled,
          resolvedStyle,
        ];
      }}
    >
      {loading ? (
        <AppActivityIndicator color={variantStyle[variant].color} />
      ) : (
        <Text style={[styles.label, { color: variantStyle[variant].color }]}>{title}</Text>
      )}
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
