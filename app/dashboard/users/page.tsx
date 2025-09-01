import { TableData } from "./components/ui/TableData"



const User = async () => {
  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuarios</h2>

          {/* <CreateModal
                company_id={session?.user.company_id as number}
                className="sm:hidden"
              /> */}

        </div>
        <TableData

        />
      </div>
    </>
  )
}
export default User