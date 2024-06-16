import React from 'react';
import Layout from '@components/Layout';
import { useModal } from '@context/ModalContext';

const Home: React.FC = () => {
  const { showModal } = useModal();

  const handleShowModal = () => {
    showModal(<div>Welcome to the home page!</div>);
  }
  
  return (
    <Layout>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
      <button onClick={handleShowModal}>Show Modal</button>
    </Layout>
  );
};

export default Home;