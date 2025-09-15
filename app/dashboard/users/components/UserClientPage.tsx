'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks';
import { User } from '@/types';
import { UserHeader } from './UserHeader';
import { UserTable } from './UserTable';
import { CreateModal } from './modals/CreateModal';
import { UpdateModal } from './modals/UpdateModal';
import { DeleteModal } from './modals/DeleteModal';

export const UserClientPage = () => {
  const { users, isLoading, searchTerm, setSearchTerm } = useUsers();

  const [ isCreateOpen, setCreateOpen ] = useState(false);
  const [ userToEdit, setUserToEdit ] = useState<User | null>(null);
  const [ userToDelete, setUserToDelete ] = useState<User | null>(null);

  return (
    <>
      <UserHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddUser={() => setCreateOpen(true)}
      />

      <UserTable
        users={users}
        isLoading={isLoading}
        onEdit={setUserToEdit}
        onDelete={setUserToDelete}
      />

      <CreateModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />

      {userToEdit && (
        <UpdateModal
          isOpen={!!userToEdit}
          onClose={() => setUserToEdit(null)}
          user={userToEdit}
        />
      )}

      {userToDelete && (
        <DeleteModal
          isOpen={!!userToDelete}
          onClose={() => setUserToDelete(null)}
          user={userToDelete}
        />
      )}
    </>
  );
};