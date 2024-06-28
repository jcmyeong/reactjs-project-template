import React from 'react';
import Layout from '@/components/Layout';
import { useModal } from '@/context/ModalContext';

const About: React.FC = () => {
  const { showModal } = useModal();

  const handleShowModal = () => {
    showModal(<div>This is the about page.</div>);
  };
  
  return (
    <Layout>
      <h2>About Page</h2>
      <p>This is the about page.</p>
      <button onClick={handleShowModal}>Show Modal</button>
    </Layout>
  );
};

export default About