import type { TextStyle } from "react-native";

import type { TypographyVariant } from "@/src/tokens/typography";
import { Typography } from "@/src/tokens/typography";

import { Text as ThemedText, TextProps as ThemedTextProps } from "./Themed";

type Props = ThemedTextProps & {
  variant?: TypographyVariant;
  weight?: TextStyle["fontWeight"];
};

export default function AppText({
  variant = "body",
  weight,
  style,
  ...props
}: Props) {
  return (
    <ThemedText
      style={[
        Typography[variant],
        weight ? { fontWeight: weight } : undefined,
        style,
      ]}
      {...props}
    />
  );
}
