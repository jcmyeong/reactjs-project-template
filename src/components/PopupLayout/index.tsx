import React from 'react';
import { useModalWindow } from 'react-modal-global';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  padding: 2em;
  background: white;
  border-radius: 1em;

  // min-width: 20em;
	// max-width: 75vw;

	max-height: 90vh;

  margin: auto;
	overflow: auto;
	overflow: overlay;
	overscroll-behavior: contain;

  color: #333;
	box-shadow: 0px 0px 20px 10px rgba(black, 0.1);
	cursor: initial;

	transition: 250ms ease top;
	top: -2.5em;

  .modal--active & {
    top: 0em;
  }
`

const Container = styled.div`
  display: grid;
  gap: 2.5em;
`

const CloseButton = styled.button`
  margin-left: auto;

	position: absolute;
	top: 1.25em;
	right: 1.5em;
`

const Inner = styled.div`
`

interface PopupLayoutProps {
  width?: string
  children: React.ReactNode
}

const PopupLayout: React.FC<PopupLayoutProps> = (props: PopupLayoutProps) => {
  const modal = useModalWindow()
  return (
    <Wrapper>
      <Container>
        <CloseButton onClick={modal.close}>&#9587;</CloseButton>
        <Inner>{props.children}</Inner>
      </Container>
    </Wrapper>
  )
}

export default PopupLayout