'use client'

import { Skeleton } from "@heroui/react"

const Loading = () => {
  return (
    <div className="bg-zinc-50 p-5 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles y Permisos</h2>
      </div>
      <div className="flex justify-end items-center mb-3">
        <Skeleton className="rounded-md h-9 w-40 hidden sm:flex" />
      </div>
      <div className="overflow-x-auto rounded-md">
        <Skeleton className="w-full h-80" />
      </div>
    </div>
  )
}
export default Loading