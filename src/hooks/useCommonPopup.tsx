
import PopupAlert from "@/components/Popup/PopupAlert"
import { Modal } from "../App"
import PopupConfirm from "@/components/Popup/PopupConfirm"

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
    Modal.open(PopupAlert, props)
  }

  /**
   * Confirm Popup 표시
   */
  const showConfirm = (props: CommonPopupProps) => {
    Modal.open(PopupConfirm, props)
  }

  return { showAlert, showConfirm }
}