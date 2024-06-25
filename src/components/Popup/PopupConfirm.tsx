import React from "react"
import PopupLayout from "@components/PopupLayout"
import { CommonPopupProps } from "@hooks/useCommonPopup"
import { useModalWindow } from "react-modal-global"
import { styled } from "styled-components"

const PopupConfirm = (props: CommonPopupProps) => {
  const modal = useModalWindow()
  const { title, message, onConfirm, confirmLabel, onCancel, cancelLabel } = props

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const type = event.currentTarget.getAttribute('data-type')
    if (type === 'confirm') {
      if (onConfirm) {
        onConfirm()
      }
    } else {
      if (onCancel) {
        onCancel()
      }
    }
    modal.close()
  }
  return (
    <PopupLayout title={title}>
      {title ? null : <SpaceArea />}
      <Message>{message}</Message>
      <ButtonGroup>
        <Button data-type="confirm" onClick={handleClick}>{ confirmLabel ?? '확인' }</Button>
        <Button className={"right"} data-type="cancel" onClick={handleClick}>{ cancelLabel ?? '취소' }</Button>
      </ButtonGroup>
    </PopupLayout>
  )
}

const SpaceArea = styled.div`
  padding: 10px;
`

const Message = styled.p`
  text-align: left;
`

const ButtonGroup = styled.div`
  display: flex;
  text-align: center;
`

const Button = styled.button`
  margin-left: auto;
  border-color: gray;
  &.right {
    margin-left: 3%;
  }
`

export default PopupConfirm
