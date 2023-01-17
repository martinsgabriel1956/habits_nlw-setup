import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#7C3AED" />
    </View>
  )
}