'use client'

import { FC } from "react"
import { Company } from "@/types"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Tooltip
} from "@heroui/react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { PencilIcon, TrashIcon } from "@/components/icons"

interface CompanyTableProps {
  companies: Company[];
  isLoading: boolean;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export const CompanyTable: FC<CompanyTableProps> = ({
  companies,
  isLoading,
  onEdit,
  onDelete
}) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <Table
        radius="md"
        isStriped
        classNames={{ wrapper: "shadow-none border border-gray-300" }}
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>NIT</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Última actualización</TableColumn>
          <TableColumn align="end">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={companies}
          emptyContent={!isLoading ? "No se encontraron compañías." : " "}
          loadingState={isLoading ? "loading" : "idle"}
          loadingContent={<Spinner label="Cargando..." size="md" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.nit}</TableCell>
              <TableCell>
                {format(new Date(item.createdAt), "dd 'de' MMMM, yyyy", { locale: es })}
              </TableCell>
              <TableCell>
                {format(new Date(item.updatedAt), "dd 'de' MMMM, yyyy", { locale: es })}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Tooltip content="Editar" color="foreground">
                  <button onClick={() => onEdit(item)}>
                    <PencilIcon className="size-5 text-gray-500" />
                  </button>
                </Tooltip>
                <Tooltip content="Eliminar" color="danger">
                  <button onClick={() => onDelete(item)}>
                    <TrashIcon className="size-5 text-red-500" />
                  </button>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}