import React, { createContext, useContext } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";

// Theme and UI system for SafeHer
export type Palette = {
  bg: string; card: string; border: string; ink: string; muted: string;
  primary: string; onPrimary: string; primaryTint: string;
  safe: string; safeTint: string;
  danger: string; dangerSolid: string; dangerTint: string;
  warnBg: string; warnText: string;
};

export const NORMAL: Palette = {
  bg: "#F6F2FF", card: "#FFFFFF", border: "#DCD3F5", ink: "#2B2350", muted: "#5A5578",
  primary: "#5B3FD1", onPrimary: "#FFFFFF", primaryTint: "#E6DEFF",
  safe: "#0F6B52", safeTint: "#DDF5EC",
  danger: "#E5484D", dangerSolid: "#BF2F36", dangerTint: "#FFD9DA",
  warnBg: "#FFF0E3", warnText: "#7A3E0A",
};

export const HIGH_CONTRAST: Palette = {
  bg: "#FFFFFF", card: "#FFFFFF", border: "#000000", ink: "#000000", muted: "#222222",
  primary: "#3A1FA8", onPrimary: "#FFFFFF", primaryTint: "#E8E2FF",
  safe: "#005A3C", safeTint: "#E0F5EA",
  danger: "#C4151C", dangerSolid: "#A10E14", dangerTint: "#FFE0E0",
  warnBg: "#FFF3E0", warnText: "#5A2A00",
};

export type Theme = { c: Palette; highContrast: boolean };

export const ThemeContext = createContext<Theme>({ c: NORMAL, highContrast: false });
export const useTheme = () => useContext(ThemeContext);

type TxtProps = TextProps & { size?: number; weight?: "400" | "500" | "700" | "800"; color?: string; center?: boolean };

export function Txt({ size = 16, weight = "400", color, center, style, ...rest }: TxtProps) {
  const { c } = useTheme();
  return <Text {...rest} style={[{ fontSize: size, fontWeight: weight, color: color ?? c.ink, textAlign: center ? "center" : undefined }, style]} />;
}

type BtnKind = "primary" | "outline" | "danger" | "safe" | "ghost";

export function Btn(props: {
  label: string; onPress: () => void; kind?: BtnKind; disabled?: boolean; hint?: string; style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  const kind = props.kind ?? "primary";
  const bg = { primary: c.primary, danger: c.dangerSolid, safe: c.safe, outline: c.card, ghost: "transparent" }[kind];
  const fg = kind === "outline" ? c.primary : kind === "ghost" ? c.primary : c.onPrimary;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        { minHeight: 52, borderRadius: 26, paddingHorizontal: 20, alignItems: "center", justifyContent: "center", backgroundColor: bg, opacity: props.disabled ? 0.5 : 1 },
        kind === "outline" && { borderWidth: 2, borderColor: c.primary },
        props.style,
      ]}
    >
      <Txt weight="700" color={fg} center>{props.label}</Txt>
    </TouchableOpacity>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return (
    <View style={[{ backgroundColor: c.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: c.border, marginBottom: 14 }, style]}>
      {children}
    </View>
  );
}

export function Notice({ text, tone = "safe" }: { text: string; tone?: "safe" | "warn" }) {
  const { c } = useTheme();
  return (
    <View style={{ backgroundColor: tone === "safe" ? c.safeTint : c.warnBg, borderRadius: 14, padding: 13, marginBottom: 14 }}>
      <Txt size={14} weight="500" color={tone === "safe" ? c.safe : c.warnText}>{text}</Txt>
    </View>
  );
}

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const { c } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={c.bg} />
      {scroll ? <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 28 }} keyboardShouldPersistTaps="handled">{children}</ScrollView> : <View style={{ flex: 1, padding: 20 }}>{children}</View>}
    </SafeAreaView>
  );
}
