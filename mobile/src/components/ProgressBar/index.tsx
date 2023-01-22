import { View } from "react-native"
import { ProgressBarProps } from "./types"

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress = null }) => {
  return (
    <View className="w-full h-3 mt-4 rounded-xl bg-zinc-700">
      <View className="h-3 rounded-xl bg-violet-600" style={{ width: `${progress}%` }} />
    </View>
  )
}