import { useCallback, useEffect } from 'react'

import s from './Modal.module.css'
const Modal = ({ children, title = 'Default modal', closeModal }) => {
	const handleKeyDown = useCallback(
		e => {
			if (e.key === 'Escape') {
				closeModal()
			}
		},
		[closeModal]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [closeModal, handleKeyDown])

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	return (
		<div className={s.wrapper} onClick={handleBackdropClick}>
			<div className={s.content}>
				<>
					<h1>{title}</h1>
					<hr />
				</>
				<button onClick={closeModal} className={s.closeBtn}>
					×
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal

// Щоб використовувати модальне вікно треба додати і заімпортувати: 
// import { useToggle } from "../../hooks/useToggle"
// import Modal from "../../components/Modal/Modal"


//  const { openModal, closeModal, isOpen } = useToggle()
//
// В return додати :
{/* <button onClick={openModal}>Open modal</button> -------- Щось що відкриває модалку
      {isOpen && <Modal closeModal={closeModal}>
      <Navigation/>------------------------------------------Тут ваша форма яка буде всередині модалки
      </Modal>} */}