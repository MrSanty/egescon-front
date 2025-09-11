'use client'

import { useState } from "react"
import { useRoles } from "@/hooks"
import { RoleHeader } from "./RoleHeader"
import { RoleTable } from "./RoleTable"
import { CreateModal } from "./modals/CreateModal"
import { UpdateModal } from "./modals/UpdateModal"
import { DeleteModal } from "./modals/DeleteModal"
import { Role } from "@/types"

export const RoleClientPage = () => {
  const { roles, isLoading } = useRoles()

  const [ isCreateOpen, setCreateOpen ] = useState(false)
  const [ roleToEdit, setRoleToEdit ] = useState<Role | null>(null)
  const [ roleToDelete, setRoleToDelete ] = useState<Role | null>(null)

  return (
    <>
      <RoleHeader onAddRole={() => setCreateOpen(true)} />

      <RoleTable
        roles={roles}
        isLoading={isLoading}
        onEdit={setRoleToEdit}
        onDelete={setRoleToDelete}
      />

      {/* --- Modales --- */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />

      {roleToEdit && (
        <UpdateModal
          isOpen={!!roleToEdit}
          onClose={() => setRoleToEdit(null)}
          role={roleToEdit}
        />
      )}

      {roleToDelete && (
        <DeleteModal
          isOpen={!!roleToDelete}
          onClose={() => setRoleToDelete(null)}
          role={roleToDelete}
        />
      )}
    </>
  )
}