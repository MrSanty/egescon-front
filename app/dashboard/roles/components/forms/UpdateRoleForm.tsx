'use client'

import { FC } from "react"
import { useUpdateRole, usePermissions } from "@/hooks"
import toast from "react-hot-toast"
import { Role } from "@/types"
import { Button, Input, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"

interface UpdateRoleFormProps {
  onClose: () => void;
  role: Role;
}

export const UpdateRoleForm: FC<UpdateRoleFormProps> = ({ onClose, role }) => {
  const { register, handleSubmit, control, errors, isLoading, isLoadingRole } = useUpdateRole({
    id: role.id,
    onSuccess: () => {
      toast.success('Rol actualizado con éxito');
      onClose();
    },
    onError: (error) => {
      toast.error(error.body.message || 'Error al actualizar el rol');
    }
  });

  const { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingRole) {
    return <div className="flex justify-center p-8"><Spinner /></div>;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        {...register("name")}
        label="Nombre del Rol"
        labelPlacement="outside"
        variant="bordered"
        radius="sm"
        placeholder="Ej: Administrador de Contratos"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        {...register("description")}
        label="Descripción (Opcional)"
        labelPlacement="outside"
        variant="bordered"
        radius="sm"
        placeholder="Describe las responsabilidades de este rol"
      />

      <Controller
        name="permissionIds"
        control={control}
        render={({ field }) => (
          <Select
            label="Permisos"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            placeholder="Selecciona los permisos para este rol"
            selectionMode="multiple"
            isLoading={isLoadingPermissions}
            selectedKeys={new Set(field.value || [])}
            onSelectionChange={(keys) => field.onChange(Array.from(keys))}
            className="w-full"
          >
            {permissions.map((p) => (
              <SelectItem key={p.id}>
                {p.description}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="grid grid-cols-2 gap-5 pt-4">
        <Button size="sm" variant="light" onPress={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit" isLoading={isLoading}>
          {isLoading ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>
    </form>
  )
}