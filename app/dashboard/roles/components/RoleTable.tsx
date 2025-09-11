'use client'

import { FC } from "react"
import { Role } from "@/types"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Tooltip,
  Button
} from "@heroui/react"
import { PencilIcon, TrashIcon } from "@/components/icons"

interface RoleTableProps {
  roles: Role[];
  isLoading: boolean;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export const RoleTable: FC<RoleTableProps> = ({
  roles,
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
          <TableColumn>Permisos Asignados</TableColumn>
          <TableColumn align="end">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={roles}
          emptyContent={!isLoading ? "No se encontraron roles." : " "}
          loadingState={isLoading ? "loading" : "idle"}
          loadingContent={<Spinner label="Cargando..." size="md" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Tooltip
                  className="overflow-auto max-h-60"
                  content={
                    <div className="p-1">
                      <p className="font-bold text-sm mb-1">Permisos:</p>
                      <ul className="list-disc list-inside">
                        {item.permissions && item.permissions.length > 0 ? (
                          item.permissions.map(p => <li key={p.id}>{p.description}</li>)
                        ) : (
                          <li>Sin permisos asignados</li>
                        )}
                      </ul>
                    </div>
                  }
                  color="foreground"
                >
                  <Button size="sm" variant="light" className="text-blue-600">
                    {item.permissions?.length || 0} permisos
                  </Button>
                </Tooltip>
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Tooltip content="Editar Rol" color="foreground">
                  <button onClick={() => onEdit(item)}>
                    <PencilIcon className="size-5 text-gray-500" />
                  </button>
                </Tooltip>
                <Tooltip content="Eliminar Rol" color="danger">
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