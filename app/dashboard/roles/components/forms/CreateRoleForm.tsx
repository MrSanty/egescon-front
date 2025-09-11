'use client'

import { FC } from "react"
import { useCreateRole, usePermissions } from "@/hooks"
import toast from "react-hot-toast"
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"

interface CreateRoleFormProps {
  onClose: () => void;
}

export const CreateRoleForm: FC<CreateRoleFormProps> = ({ onClose }) => {
  const { register, handleSubmit, control, errors, isSubmitting } = useCreateRole({
    onSuccess: () => {
      toast.success('Rol creado con éxito');
      onClose();
    },
    onError: (error) => {
      toast.error(error.body.message || 'Error al crear el rol');
    }
  });

  const { permissions, isLoading: isLoadingPermissions } = usePermissions();

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
        control={control}
        name="permissionIds"
        render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
          <Select
            name={name}
            label="Permisos"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            placeholder="Selecciona los permisos para este rol"
            selectionMode="multiple"
            isLoading={isLoadingPermissions}
            selectedKeys={new Set(value || [])}
            onSelectionChange={(keys) => {
              onChange(Array.from(keys) as string[]);
            }}
            className="w-full"
            isInvalid={invalid}
            errorMessage={error?.message}
            onBlur={onBlur}
            ref={ref}
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
        <Button size="sm" variant="light" onPress={onClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}