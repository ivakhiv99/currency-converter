import { FC } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

interface IApiErrorModal {
  isOpen: boolean;
  handleClose: () => void;
}

const StyledModal = styled(Modal)`
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 300px !important;
  }
`;



const ApiErrorModal:FC<IApiErrorModal> = ({isOpen, handleClose}) => {
  return (
      <StyledModal
        onClose={handleClose}
        open={isOpen}
        dimmer={false}
      >
        <Modal.Header>Ooops!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>There migh be an error with our imaginary API</Header>
            <p>Please wait while it magicaly fixes itself or refresh the page to try and fix it yourself :)</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Refresh"
            icon='checkmark'
            onClick={handleClose}
            positive
          />
        </Modal.Actions>
      </StyledModal>
  )
}

export default ApiErrorModal;