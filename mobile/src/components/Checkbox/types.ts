import { TouchableOpacityProps } from "react-native";

export interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}
