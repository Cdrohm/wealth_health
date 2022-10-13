import React from 'react'
import '../style/modal.css'

const ModalConfirm = ({show}) => {
    function closeModal() {
        show(false)
    }

    return (
        <div className='modal-confirm'>
            <div className='modal-confirm-message'>
                Employee's data have been successfully stored!
                <button className='modal-confirm-btn' onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default ModalConfirm