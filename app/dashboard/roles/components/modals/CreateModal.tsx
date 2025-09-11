'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react"
import { FC } from "react"
import { CreateRoleForm } from "../forms/CreateRoleForm"

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Crear Nuevo Rol</h4>
          <span className="text-sm text-gray-400">
            Define un nuevo rol y asigna sus permisos.
          </span>
        </ModalHeader>
        <ModalBody>
          <CreateRoleForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}