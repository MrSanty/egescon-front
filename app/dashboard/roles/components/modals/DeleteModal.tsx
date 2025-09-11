'use client'

import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react"
import { FC } from "react"
import { useDeleteRole } from "@/hooks"
import toast from "react-hot-toast"
import { Role } from "@/types"

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
}

export const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, role }) => {
  const { handleDelete, isLoading } = useDeleteRole({
    onSuccess: () => {
      toast.success(`El rol "${role.name}" ha sido eliminado.`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.body.message || 'Error al eliminar el rol');
      onClose();
    }
  })

  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Confirmar Eliminación</h4>
          <span className="text-sm text-gray-700">
            ¿Estás seguro de que deseas eliminar el rol <strong>{role.name}</strong>? Esta acción no se puede deshacer.
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
            onPress={() => handleDelete(role.id)}
          >
            {isLoading ? 'Eliminando...' : 'Confirmar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}