'use client';

import { Input } from '@heroui/react';
import { SearchIcon } from '@/components/icons';
import { FC } from 'react';

interface UserHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
}

export const UserHeader: FC<UserHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddUser,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Usuarios</h2>
      </div>
      <div className="flex justify-between items-center mb-3">
        <Input
          isClearable
          className="w-full max-w-sm"
          variant="bordered"
          placeholder="Buscar por nombre o documento..."
          size="sm"
          startContent={<SearchIcon className="size-4" />}
          value={searchTerm}
          onClear={() => onSearchChange('')}
          onValueChange={onSearchChange}
        />
        <button
          onClick={onAddUser}
          className="hidden sm:flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Agregar Usuario
        </button>
      </div>
    </>
  );
};