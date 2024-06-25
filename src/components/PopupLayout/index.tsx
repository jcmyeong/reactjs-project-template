import React from 'react';
import { useModalWindow } from 'react-modal-global';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  align-items: center;

  padding: 10px;
  background: white;
  border-radius: 1em;

  min-width: 30vw;
	/* max-width: 75vw; */

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
  /* gap: 2.5em; */
  /* padding-right: 60px; */
`

const TitleBar = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 2.5em;
  /* padding-right: 60px; */
`
const Title = styled.h3`
  font-size: 700;
  margin-left: 10px;
`

const CloseButton = styled.button`
  margin-left: auto;

	position: absolute;
	top: 1.30em;
	right: 1.0em;
`

const Content = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`

interface PopupLayoutProps {
  width?: string
  title?: string
  children: React.ReactNode
}

const PopupLayout: React.FC<PopupLayoutProps> = (props: PopupLayoutProps) => {
  const modal = useModalWindow()
  return (
    <Wrapper>
      <Container>
        <TitleBar>
          {props.title && <Title>{props.title}</Title>} 
          <CloseButton onClick={modal.close}>&#9587;</CloseButton>
        </TitleBar>
        <Content>{props.children}</Content>
      </Container>
    </Wrapper>
  )
}

export default PopupLayout