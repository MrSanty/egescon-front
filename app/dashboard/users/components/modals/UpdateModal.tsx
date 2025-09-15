'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { FC } from 'react';
import { User } from '@/types';
import { UpdateUserForm } from '../forms/UpdateUserForm';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const UpdateModal: FC<UpdateModalProps> = ({ isOpen, onClose, user }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="3xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Actualizar Usuario</h4>
          <span className="text-sm text-gray-400">
            Modifica la información del usuario seleccionado.
          </span>
        </ModalHeader>
        <ModalBody>
          <UpdateUserForm onClose={onClose} user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};