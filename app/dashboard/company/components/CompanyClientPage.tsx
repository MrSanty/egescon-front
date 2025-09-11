'use client'

import { useState } from "react"
import { useCompanies } from "@/hooks"
import { CompanyHeader } from "./CompanyHeader"
import { CompanyTable } from "./CompanyTable"
import { CreateModal } from "./modals/CreateModal"
import { UpdateModal } from "./modals/UpdateModal"
import { DeleteModal } from "./modals/DeleteModal"
import { Company } from "@/types"

export const CompanyClientPage = () => {
  // Hook para obtener datos y manejar la búsqueda
  const { companies, isLoading, searchTerm, setSearchTerm } = useCompanies()

  // Estados para controlar los modales y la compañía seleccionada
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null)
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null)

  return (
    <>
      {/* Encabezado con título, búsqueda y botón de crear */}
      <CompanyHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddCompany={() => setCreateOpen(true)}
      />

      {/* Tabla que solo muestra los datos */}
      <CompanyTable
        companies={companies}
        isLoading={isLoading}
        onEdit={setCompanyToEdit}
        onDelete={setCompanyToDelete}
      />

      {/* --- Modales controlados por este componente padre --- */}

      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />

      {companyToEdit && (
        <UpdateModal
          isOpen={!!companyToEdit}
          onClose={() => setCompanyToEdit(null)}
          company={companyToEdit}
        />
      )}

      {companyToDelete && (
        <DeleteModal
          isOpen={!!companyToDelete}
          onClose={() => setCompanyToDelete(null)}
          company={companyToDelete}
        />
      )}
    </>
  )
}