import React, { createContext, useContext, ReactNode, useState } from 'react';
import { GenericModal, GeneralModalProps } from '../components/GenericModal';

interface ModalContextData {
  showModal: (props: GeneralModalProps) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextData | undefined>(undefined);

// Defina o estado inicial do modal para reutilizá-lo tanto na criação quanto no reset
const initialModalProps: GeneralModalProps = {
  isVisible: false,
  closeModal: () => {}, 
};

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<GeneralModalProps>(initialModalProps);

  // Mostra o modal com as props fornecidas, garantindo que está visível
  const showModal = (props: GeneralModalProps) => {
    setModalProps({
      ...initialModalProps, 
      ...props, 
      isVisible: true, 
      closeModal: hideModal, 
    });
  };

  // Esconde o modal e reseta suas props para o estado inicial
  const hideModal = () => {
    setModalProps(initialModalProps);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <GenericModal {...modalProps} />
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
