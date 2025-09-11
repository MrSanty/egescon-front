'use client'

import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react"
import { FC } from "react"
import { useDeleteCompany } from "@/hooks"
import toast from "react-hot-toast"
import { Company } from "@/types"

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
}

export const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, company }) => {
  const { handleDelete, isLoading } = useDeleteCompany({
    onSuccess: () => {
      toast.success(`La compañía "${company.name}" ha sido eliminada.`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
      onClose();
    }
  })

  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Confirmar Eliminación</h4>
          <span className="text-sm text-gray-700">
            ¿Estás seguro de que deseas eliminar la compañía <strong>{company.name}</strong>? Esta acción no se puede deshacer.
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
            onPress={() => handleDelete(company.id)}
          >
            {isLoading ? 'Eliminando...' : 'Confirmar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}