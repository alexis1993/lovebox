import { GestureResponderEvent } from "react-native";

export interface ImagePickerModalProps {
  isVisible:boolean,
  onClose:()=>void,
  onImageLibraryPress:(event: GestureResponderEvent) => void,
  onCameraPress:(event: GestureResponderEvent) => void,
}
