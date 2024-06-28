import React from "react"
import PopupLayout from "@/components/PopupLayout"
import { CommonPopupProps } from "@/hooks/useCommonPopup"
import { useModalWindow } from "react-modal-global"
import { styled } from "styled-components"

const PopupAlert = (props: CommonPopupProps) => {
  const modal = useModalWindow()
  const { title, message, onConfirm, confirmLabel } = props

//  modal.params.

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (onConfirm) {
      onConfirm()
    }
    modal.close()
  }

  return (
    <PopupLayout title={title}>
      {title ? null : <SpaceArea />}
      <Message>{message}</Message>
      <ButtonGroup>
        <Button onClick={handleClick}>{ confirmLabel ?? '확인' }</Button>
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
`

export default PopupAlert
