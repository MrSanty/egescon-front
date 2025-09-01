'use client'

import { FC } from "react"
import { Sidebar } from "./(home)/components/SideBar"
import { NavBar } from "./(home)/components/NavBar"
import { Footer } from "./(home)/components/Footer"
import { useUiStore } from "@/stores"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { isSidebarOpen } = useUiStore()

  return (
    <div
      className={
        `min-h-screen bg-zinc-200/50 ${isSidebarOpen ? "grid-container" : "grid-container-collapse"}`
      }
    >
      <Sidebar />
      <NavBar />
      <main
        className="main py-5 px-2 lg:px-5 overflow-y-auto"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DashboardLayout