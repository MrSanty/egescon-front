'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react"
import { FC } from "react"
import { Role } from "@/types"
import { UpdateRoleForm } from "../forms/UpdateRoleForm"

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
}

export const UpdateModal: FC<UpdateModalProps> = ({ isOpen, onClose, role }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Actualizar Rol</h4>
          <span className="text-sm text-gray-400">
            Modifica la información y los permisos del rol.
          </span>
        </ModalHeader>
        <ModalBody>
          <UpdateRoleForm onClose={onClose} role={role} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}