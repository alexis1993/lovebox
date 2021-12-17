
export interface FooterProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  /**
   * To know if footer is using from sendMessagescreen
   */
   fromSend: boolean

  /**
   * What happens when you press the left icon
   */
  onSendPress?(): void

  /**
   * What happens when you press the right icon
   */
  onListPress?(): void

  
}
