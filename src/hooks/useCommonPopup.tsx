
import PopupAlert from "@components/Popup/PopupAlert"
import { Modal } from "../App"
import PopupConfirm from "@components/Popup/PopupConfirm"

/**
 * 공통 Popup Properties
 */
export interface CommonPopupProps {
  title?: string              // Popup 제목
  message: string             // Popup 메시지
  confirmLabel?: string       // 확인 버튼 라벨
  cancelLabel?: string        // 취소 버튼 라벨
  onConfirm?: () => void      // 확인 버튼 이벤트
  onCancel?: () => void       // 취소 버튼 이벤트
}

/**
 * 공통 Popup custom hooks
 */
export const useCommonPopup = () => {

  /**
   * Alert Popup 표시
   */
  const showAlert = (props: CommonPopupProps) => {
    //const { title, message, onConfirm } = props
    // if (title) {
    //   alert(`[${title}]\n\n${message}`)
    // } else {
    //   alert(`${message}`)
    // }
    
    // if (onConfirm !== undefined) {
    //   onConfirm()
    // }
    Modal.open(PopupAlert, props)
  }

  /**
   * Confirm Popup 표시
   */
  const showConfirm = (props: CommonPopupProps) => {
    //const { title, message, onConfirm, onCancel } = props
    // let result: boolean
    // if (title) {
    //   result = confirm(`[${title}]\n\n${message}`)
    // } else {
    //   result = confirm(`${message}`)
    // }
    
    // if (result) {
    //   if (onConfirm !== undefined) {
    //     onConfirm()
    //   }
    // } else {
    //   if (onCancel !== undefined) {
    //     onCancel()
    //   }
    // }
    Modal.open(PopupConfirm, props)
  }

  return { showAlert, showConfirm }
}