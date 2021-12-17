
export interface ImagePickerProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  /**
   * uri of image to send
   */
   uri?: string
   /**
   * text to apply on image to send
   */
   text?:string
  /**
   * What happens when you press the heart button
   */
  onPress?(): void

  sendImage?(uri):Promise<any>

  
}
