import React from 'react'
import { useModal } from '@context/ModalContext'
import Layout from '@components/Layout'
import { Modal } from '../App';
import PopupExample from '@components/Popup/PopupExample';

const Home: React.FC = () => {
  const { showModal } = useModal();

  const handleShowModal = () => {
    showModal(<div>Welcome to the home page!</div>);
  }

  const openPopup = () => Modal.open(PopupExample)
  
  return (
    <Layout>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
      <button onClick={openPopup}>Show Modal</button>
    </Layout>
  );
};

export default Home;