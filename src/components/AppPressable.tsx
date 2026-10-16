import { Pressable, PressableProps, StyleSheet } from 'react-native';

type Props = PressableProps;

export default function AppPressable({ children, style, disabled, ...props }: Props) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={(state) => {
        const resolvedStyle = typeof style === 'function' ? style(state) : style;

        return [resolvedStyle, state.pressed && !disabled && props.onPress && styles.pressed];
      }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.98,
  },
});
