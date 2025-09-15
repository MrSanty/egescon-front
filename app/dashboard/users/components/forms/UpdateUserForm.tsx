'use client';

import { FC } from 'react';
import { useUpdateUser, useRoles, useCompanies } from '@/hooks';
import { Button, Input, Select, SelectItem, Spinner } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { DocType, User } from '@/types';
import { useLoginStore } from '@/stores';

interface UpdateUserFormProps {
  onClose: () => void;
  user: User;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ onClose, user }) => {
  const { register, handleSubmit, control, errors, isSubmitting, isLoadingUser, watch, setValue } = useUpdateUser({
    id: user.id,
    onSuccess: onClose,
  });

  const { isSuperAdmin } = useLoginStore();
  const selectedCompanyId = watch('companyId');

  const { roles, isLoading: isLoadingRoles } = useRoles(selectedCompanyId);
  const { companies, isLoading: isLoadingCompanies } = useCompanies();

  const docTypes = Object.values(DocType);

  if (isLoadingUser) {
    return <div className="flex justify-center p-8"><Spinner label="Cargando datos del usuario..." /></div>;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          {...register('name')}
          label="Nombre Completo"
          labelPlacement="outside"
          variant="bordered"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          {...register('email')}
          label="Correo Electrónico"
          labelPlacement="outside"
          variant="bordered"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Controller
          name="docType"
          control={control}
          render={({ field }) => (
            <Select
              label="Tipo de Documento"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Seleccione un tipo"
              // Clave de la solución: selectedKeys espera un Set o Array de strings.
              selectedKeys={field.value ? [ field.value ] : []}
              onChange={(e) => field.onChange(e.target.value)}
              isInvalid={!!errors.docType}
              errorMessage={errors.docType?.message}
            >
              {docTypes.map((type) => (
                <SelectItem key={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Input
          {...register('docNum')}
          label="Número de Documento"
          labelPlacement="outside"
          variant="bordered"
          isInvalid={!!errors.docNum}
          errorMessage={errors.docNum?.message}
        />
        {isSuperAdmin && (
          <Controller
            name="companyId"
            control={control}
            render={({ field }) => (
              <Select
                label="Compañía"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Seleccione una compañía"
                isLoading={isLoadingCompanies}
                selectedKeys={field.value ? [ field.value ] : []}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue('roleId', '');
                }}
                isInvalid={!!errors.companyId}
                errorMessage={errors.companyId?.message}
              >
                {companies.map((company) => (
                  <SelectItem key={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        )}
        <Controller
          name="roleId"
          control={control}
          render={({ field }) => (
            <Select
              label="Rol"
              labelPlacement="outside"
              variant="bordered"
              placeholder={!selectedCompanyId ? "Selecciona una compañía" : "Selecciona un rol"}
              isLoading={isLoadingRoles}
              selectedKeys={field.value ? [ field.value ] : []}
              onChange={(e) => field.onChange(e.target.value)}
              isInvalid={!!errors.roleId}
              errorMessage={errors.roleId?.message}
              isDisabled={!selectedCompanyId || isLoadingRoles}
            >
              {roles.map((role) => (
                <SelectItem key={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 pt-4">
        <Button size="sm" variant="light" onPress={onClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Actualizando...' : 'Actualizar Usuario'}
        </Button>
      </div>
    </form>
  );
};