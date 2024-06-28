import PopupLayout from "@/components/PopupLayout"
import { Modal } from "@/App"

const PopupExample = () => {
  const openPopup = () => Modal.open(PopupExample)
  
  return (
    <PopupLayout>
      <h2>Title</h2>
      <p>Description</p>

      <button onClick={openPopup}>Open another Popup</button>
      <br />
      <br />
      <span>{Math.random()}</span>
    </PopupLayout>
  )
}

export default PopupExample