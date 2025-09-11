'use client'

import { Button, Input, Select, SelectItem } from "@heroui/react"
import { useUpdateCompany } from "@/hooks"
import { FC } from "react"
import { Company } from "@/types"
import toast from "react-hot-toast"

interface UpdateCompanieFormProps {
  onClose: () => void;
  data: Company;
}

export const UpdateCompanieForm: FC<UpdateCompanieFormProps> = ({
  onClose,
  data
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isLoadingCompany,
    isLoading,
  } = useUpdateCompany({
    id: data.id,
    onSuccess: () => {
      toast.success('Compañía actualizada con éxito')
      onClose()
    },
    onError: (error) => {
      toast.error(error.message)
      onClose()
    }
  })

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Input
          {...register("nit")}
          label="Nit de la compañía"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el nit de la compañía"
        />
        <Input
          {...register("name")}
          label="Nombre de la compañía"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el nombre de la compañía"
        />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Button size="sm" color="danger" variant="light" onPress={onClose}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit">
          Actualizar
        </Button>
      </div>
    </form>
  )
}