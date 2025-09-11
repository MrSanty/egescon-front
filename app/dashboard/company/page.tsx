import { CompanyClientPage } from "./components/CompanyClientPage"

// Este es ahora un Componente de Servidor puro y simple.
const CompanyPage = () => {
  return (
    <div className="bg-zinc-50 p-5 rounded-md">
      <CompanyClientPage />
    </div>
  )
}
export default CompanyPage