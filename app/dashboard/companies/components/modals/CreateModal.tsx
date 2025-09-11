'use client'

import { CreateCompanieForm } from "../forms/CreateCompanieForm"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react"
import { FC } from "react"

// Recibe `isOpen` y `onClose` como props
interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Agregar Compañía</h4>
          <span className="text-sm text-gray-400">
            Ingresa los datos de la nueva compañía.
          </span>
        </ModalHeader>
        <ModalBody>
          {/* Le pasamos la función onClose al formulario para que pueda cerrar el modal */}
          <CreateCompanieForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}