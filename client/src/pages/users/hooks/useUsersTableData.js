import { useState, useEffect } from "react";
import { useAdminStore } from "../../../stores/adminStore";
import { useUsersUIStore } from "../../../stores/uiStores";
import { useUserAdminHandlers } from "./useUserAdminHandlers";
import useFilteredData from "../../../hooks/useFilteredData";
import { userFilterFn } from "../utils/userValidation";
import { exportToCsv } from "../../../utils/exportCsv";

export function useUsersTableData() {
  const users = useAdminStore((s) => s.users);
  const getUsers = useAdminStore((s) => s.getUsers);
  const { manageUserOpen, editUserOpen, deleteUserOpen, createUserOpen, toggleCreateUser } =
    useUsersUIStore();

  const {
    displayData: displayUsers,
    handleSearch,
    setFilteredData: setFilteredUsers,
    handleSort,
  } = useFilteredData(users, userFilterFn);

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

  const handleExport = () => {
    const rows = displayUsers?.map((u) => ({
      username: u.username,
      email: u.email,
      phone: u.phone,
    }));
    exportToCsv(rows, "users");
  };

  return {
    displayUsers,
    handleSearch,
    handleUser,
    handleSortHeader,
    toggleCreateUser,
    handleExport,
  };
}
