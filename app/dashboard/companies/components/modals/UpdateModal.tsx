'use client'

import { UpdateCompanieForm } from "../forms/UpdateCompanieForm"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react"
import { FC } from "react"
import { Company } from "@/types"

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
}

export const UpdateModal: FC<UpdateModalProps> = ({ isOpen, onClose, company }) => {
  return (
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose} disableAnimation size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">Actualizar Compañía</h4>
          <span className="text-sm text-gray-400">
            Actualiza la información de la compañía.
          </span>
        </ModalHeader>
        <ModalBody>
          <UpdateCompanieForm onClose={onClose} data={company} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}