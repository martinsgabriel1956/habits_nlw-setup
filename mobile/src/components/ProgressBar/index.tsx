import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { ProgressBarProps } from "./types";

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const sharedProgress = useSharedValue(progress);

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  }, [progress])

  return (
    <View className="w-full h-3 mt-4 rounded-xl bg-zinc-700">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={style}
      />
    </View>
  )
}