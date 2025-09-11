'use client'

import { Input } from "@heroui/react"
import { CreateModal } from "./modals/CreateModal"
import { SearchIcon } from "@/components/icons"
import { FC } from "react"

interface CompanyHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCompany: () => void;
}

export const CompanyHeader: FC<CompanyHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddCompany
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Compañías</h2>
        {/* Botón de agregar para móviles */}
        <button
          onClick={onAddCompany}
          className="sm:hidden flex items-center justify-center p-2 bg-zinc-900 text-white rounded-md"
        >
          <span className="sr-only">Agregar Compañía</span>
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>

      <div className="flex justify-between items-center mb-3">
        <Input
          isClearable
          className="w-full max-w-sm"
          variant="bordered"
          placeholder="Buscar por nombre o NIT..."
          size="sm"
          startContent={<SearchIcon className="size-4" />}
          value={searchTerm}
          onClear={() => onSearchChange("")}
          onValueChange={onSearchChange}
        />
        <button
          onClick={onAddCompany}
          className="hidden sm:flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Agregar Compañía
        </button>
      </div>
    </>
  )
}