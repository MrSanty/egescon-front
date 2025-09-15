'use client';

import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from '@heroui/react';
import { FC } from 'react';
import { useDeleteUser } from '@/hooks';
import toast from 'react-hot-toast';
import { User } from '@/types';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, user }) => {
  const { handleDelete, isLoading } = useDeleteUser({
    onSuccess: () => {
      toast.success(`El usuario "${user.name}" ha sido desactivado.`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.body.message || 'Error al desactivar el usuario');
      onClose();
    },
  });

  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Confirmar Desactivación</h4>
          <span className="text-sm text-gray-700">
            ¿Estás seguro de que deseas desactivar al usuario <strong>{user.name}</strong>? Podrás reactivarlo más tarde.
          </span>
        </ModalHeader>
        <ModalFooter>
          <Button size="sm" variant="light" onPress={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            color="danger"
            size="sm"
            isLoading={isLoading}
            onPress={() => handleDelete(user.id)}
          >
            {isLoading ? 'Desactivando...' : 'Confirmar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};