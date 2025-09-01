'use client'

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { SearchIcon } from "@/components/icons"
import toast from "react-hot-toast"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Select,
  SelectItem
} from "@heroui/react"
import { getUsers } from "@/services"


export const TableData = () => {
  const [ search, setSearch ] = useState("")
  const [ type_doc, setTypeDoc ] = useState("")
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "users", { search } ],
    queryFn: async () => {
      try {
        const response = await getUsers()
        return response
      } catch (error) {
        toast.error("Error al obtener los usuarios")
        return { data: [] }
      }
    }
  })

  useEffect(() => {
    refetch()
  }, [ search, type_doc ])

  const onSearchChange = (value: string) => {
    setSearch(value)
  }
  const onClear = () => {
    setSearch("")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        {/* <div className="flex items-start flex-col w-full sm:flex-row sm:items-center gap-1 sm:w-auto">
          <Input
            isClearable
            className="w-full"
            variant="bordered"
            placeholder="Buscar un usuario"
            size="sm"
            startContent={<SearchIcon className="size-4" />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <Select
            className="w-full"
            size="sm"
            variant="bordered"
            radius="sm"
            placeholder="Selecciona un tipo de documento"
            value={type_doc}
            onChange={(e) => setTypeDoc(e.target.value)}
          >
            <SelectItem key="CC">
              CC
            </SelectItem>
            <SelectItem key="CE">
              CE
            </SelectItem>
            <SelectItem key="TI" >
              TI
            </SelectItem>
            <SelectItem key="PPT">
              PPT
            </SelectItem>
            <SelectItem key="PST">
              PST
            </SelectItem>
          </Select>
        </div> */}

        {/* {
          permissions.canCreate && (
            <CreateModal
              company_id={company_id}
              className="hidden sm:flex"
            />
          )
        } */}
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table
          radius="md"
          isStriped
          classNames={{
            wrapper: "shadow-none border border-gray-300",
          }}
        >
          <TableHeader>
            <TableColumn
              align="center"
            >
              Nombre
            </TableColumn>
            <TableColumn align="center">
              Email
            </TableColumn>
            <TableColumn align="center">
              Tipo de Documento
            </TableColumn>
            <TableColumn align="center">
              Número de Documento
            </TableColumn>
            {/* <TableColumn align="center">
              Rol
            </TableColumn> */}
            {/* <TableColumn align="center">
              Empresa
            </TableColumn> */}
            {/* <TableColumn align="end">
              Acciones
            </TableColumn> */}
          </TableHeader>
          <TableBody
            emptyContent="No hay datos"
            loadingState={isLoading ? "loading" : "idle"}
            loadingContent={<Spinner label="Cargando datos" size="md" />}
          >
            {
              (Array.isArray(data?.data) ? data.data.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {item.email}
                  </TableCell>
                  <TableCell>
                    {item.docType}
                  </TableCell>
                  <TableCell>
                    {item.docNum}
                  </TableCell>
                  {/* <TableCell>
                    {item.role}
                  </TableCell> */}
                  {/* <TableCell>
                    {item.company}
                  </TableCell> */}
                  {/* <TableCell
                    className="flex justify-end gap-2"
                  >
                    {
                      permissions.canUpdate && (
                        <UpdateModal
                          data={item}
                          company_id={company_id}
                        />
                      )
                    }

                    {
                      (id !== item.id && permissions.canDelete) && (
                        <DeleteModal
                          id={item.id}
                        />
                      )
                    }
                  </TableCell> */}
                </TableRow>
              )) : [])
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}