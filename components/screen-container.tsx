import { View, type ViewProps, ImageBackground } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { cn } from "@/lib/utils";

export interface ScreenContainerProps extends ViewProps {
  /**
   * SafeArea edges to apply. Defaults to ["top", "left", "right"].
   * Bottom is typically handled by Tab Bar.
   */
  edges?: Edge[];
  /**
   * Tailwind className for the content area.
   */
  className?: string;
  /**
   * Additional className for the outer container (background layer).
   */
  containerClassName?: string;
  /**
   * Additional className for the SafeAreaView (content layer).
   */
  safeAreaClassName?: string;
}

/**
 * A container component that properly handles SafeArea and background colors.
 *
 * The outer View extends to full screen (including status bar area) with the background color,
 * while the inner SafeAreaView ensures content is within safe bounds.
 *
 * Usage:
 * ```tsx
 * <ScreenContainer className="p-4">
 *   <Text className="text-2xl font-bold text-foreground">
 *     Welcome
 *   </Text>
 * </ScreenContainer>
 * ```
 */
export function ScreenContainer({
  children,
  edges = ["top", "left", "right"],
  className,
  containerClassName,
  safeAreaClassName,
  style,
  ...props
}: ScreenContainerProps) {
  const colorScheme = useColorScheme();
  
  // Select background image based on color scheme
  const backgroundImage = colorScheme === "dark" 
    ? require("@/assets/images/background-dark.png")
    : require("@/assets/images/background-light.png");

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <View
        className={cn(
          "flex-1",
          containerClassName
        )}
        {...props}
      >
        <SafeAreaView
          edges={edges}
          className={cn("flex-1", safeAreaClassName)}
          style={style}
        >
          <View className={cn("flex-1", className)}>{children}</View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
