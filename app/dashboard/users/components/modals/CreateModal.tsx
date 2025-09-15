'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { FC } from 'react';
import { CreateUserForm } from '../forms/CreateUserForm';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="3xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Agregar Nuevo Usuario</h4>
          <span className="text-sm text-gray-400">
            Completa los datos para crear un nuevo usuario en el sistema.
          </span>
        </ModalHeader>
        <ModalBody>
          <CreateUserForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};