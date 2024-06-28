
import React, { Suspense } from 'react';
import { ModalProvider } from '@/context/ModalContext';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';

//import "./App.css";
import "react-modal-global/styles/modal.scss";
import { ModalContainer, ModalController } from 'react-modal-global'
import PopupExample from '@/components/Popup/PopupExample';
import { RecoilRoot } from 'recoil';
export const Modal = new ModalController({
  defaultParams: {},
  components: {
    PopupExample,
    // DrawerExample,
    // lazied: lazy(() => import('./DrawerExample')),
  },
})

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ModalProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/about" Component={About} />
            </Routes>
          </div>
          <Suspense>
            <ModalContainer controller={Modal} />
          </Suspense>
        </BrowserRouter>
      </ModalProvider>
    </RecoilRoot> 
  )
}

export default App
