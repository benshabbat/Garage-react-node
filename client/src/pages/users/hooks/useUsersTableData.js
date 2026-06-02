import { useState, useEffect, useCallback } from "react";
import { useAdminStore } from "../../../stores/adminStore";
import { useUsersUIStore } from "../../../stores/uiStores";
import { useUserAdminHandlers } from "./useUserAdminHandlers";
import useFilteredData from "../../../hooks/useFilteredData";
import { userFilterFn } from "../utils/userValidation";

export function useUsersTableData() {
  const users = useAdminStore((s) => s.users);
  const getUsers = useAdminStore((s) => s.getUsers);
  const { manageUserOpen, editUserOpen, deleteUserOpen, createUserOpen, toggleCreateUser } =
    useUsersUIStore();

  const memoizedUserFilterFn = useCallback(userFilterFn, []);
  const {
    displayData: displayUsers,
    handleSearch,
    setFilteredData: setFilteredUsers,
    handleSort,
  } = useFilteredData(users, memoizedUserFilterFn);

  const { handleUser } = useUserAdminHandlers(setFilteredUsers);

  useEffect(() => {
    getUsers();
  }, [manageUserOpen, editUserOpen, deleteUserOpen, createUserOpen, getUsers]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSortHeader = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    handleSort(key, direction);
  };

  return { displayUsers, handleSearch, handleUser, handleSortHeader, toggleCreateUser };
}
