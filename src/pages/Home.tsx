import React from 'react'
import Layout from '@/components/Layout'
import { Modal } from '../App';
import PopupExample from '@/components/Popup/PopupExample';
import { useCommonPopup } from '@/hooks/useCommonPopup';
import styled from 'styled-components';

const Home: React.FC = () => {

  const { showAlert, showConfirm } = useCommonPopup()


  const openPopup = () => Modal.open(PopupExample)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const type = event.currentTarget.getAttribute('data-type')
    if (type === 'alert') {
      showAlert({
        title: 'Alert 팝업',
        message: '이것은 Alert 팝업 예제 입니다.',
        onConfirm: () => { console.log('확인 클릭!') },
      })
    } else if (type === 'confirm') {
      showConfirm({
        title: 'Confirm 팝업',
        message: '현재 진행 상황을 저장하시겠습니까?',
        confirmLabel: '예',
        cancelLabel: '아니요',
        onConfirm: () => { console.log('확인 클릭!') },
        onCancel: () => { console.log('취소 클릭!') }
      })
    }
  }
  
  return (
    <Layout>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
      <ChildNode>
        <button onClick={openPopup}>Show Modal</button>
      </ChildNode>
      <ChildNode>
        <button data-type="alert" onClick={handleClick}>Show Alert</button>
      </ChildNode>
      <ChildNode>
        <button data-type="confirm" onClick={handleClick}>Show Confirm</button>
      </ChildNode>
    </Layout>
  );
}

const ChildNode = styled.div`
  display: flex;
  margin-top: 20px;
`

export default Home;