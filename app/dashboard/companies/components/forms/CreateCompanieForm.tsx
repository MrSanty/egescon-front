'use client'

import { useCreateCompany } from "@/hooks";
import { Button, Input } from "@heroui/react"
import { FC } from "react"
import toast from "react-hot-toast";

interface CreateCompanieFormProps {
  onClose: () => void;
}

export const CreateCompanieForm: FC<CreateCompanieFormProps> = ({
  onClose
}) => {


  const {
    register,
    handleSubmit,
    isSubmitting,
    errors
  } = useCreateCompany({
    onSuccess: () => {
      toast.success('Compañía creada con éxito');
      onClose();
    }, onError: (error) => {
      toast.error('Error al crear la compañía');
      console.log(error);
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
          Guardar
        </Button>
      </div>
    </form>
  )
}