'use client';

import { FC } from 'react';
import { User } from '@/types';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Tooltip,
  Chip,
} from '@heroui/react';
import { PencilIcon, TrashIcon } from '@/components/icons';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: FC<UserTableProps> = ({
  users,
  isLoading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <Table
        radius="md"
        isStriped
        classNames={{ wrapper: 'shadow-none border border-gray-300' }}
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Documento</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn align="end">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={users}
          emptyContent={!isLoading ? 'No se encontraron usuarios.' : ' '}
          loadingState={isLoading ? 'loading' : 'idle'}
          loadingContent={<Spinner label="Cargando..." size="md" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{`${item.docType} - ${item.docNum}`}</TableCell>
              <TableCell>{item.role?.name || 'N/A'}</TableCell>
              <TableCell>
                <Chip color={item.isActive ? 'success' : 'danger'} variant="flat">
                  {item.isActive ? 'Activo' : 'Inactivo'}
                </Chip>
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Tooltip content="Editar Usuario" color="foreground">
                  <button onClick={() => onEdit(item)}>
                    <PencilIcon className="size-5 text-gray-500" />
                  </button>
                </Tooltip>
                <Tooltip content="Desactivar Usuario" color="danger">
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
  );
};