import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
export const CalendarModal = () => {
    const [isOpen, setisOpen] = useState(true)
    const onCloseModal = () => {
        console.log('cerrando');
        setisOpen(false)
    }

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName={"modal-fondo"}
        closeTimeoutMS={200}

    >
        <h1>Hola Mundo</h1>
        <br/>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi commodi ducimus recusandae vel, rem error laudantium eius qui inventore quisquam, autem reprehenderit? Voluptatum, necessitatibus. Voluptates pariatur numquam deserunt dolores molestiae?</p>
    </Modal>
  )
}
