import { getUsers } from "../../features/admin/adminSlice";
import { UsersContext } from "./UsersContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, createCar, updateUser, createUser } from "../../utils";
import {
  validCar,
  validPhone,
  validPass,
  validEmail,
} from "../../validation/valid";
import useOpenModal from "../../hooks/useOpenModal";
import { templatePhone } from "../../../../server/utils/templates";
import PropTypes from "prop-types";

export default function UsersProvider({ children }) {
  const { users } = useSelector((state) => state.admin);

  const [selectedUser, setSelctedUser] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  
  const [isExistEmail, setIsExistEmail] = useState(false);
  const [isExistPhone, setIsExistPhone] = useState(false);
  const [isExistUser, setIsExistUser] = useState(false);
  
  const [handleManageUser, isOpenManageUser] = useOpenModal();
  const [handleCreateUser, isOpenCreateUser] = useOpenModal();
  const [handleCreateCar, isOpenModalCreateCar] = useOpenModal();
  const [handleEditUser, isOpenModalEditUser] = useOpenModal();
  const [handleDeleteUser, isOpenModalDeleteUser] = useOpenModal();


  const displayUsers=filteredUsers || users;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [
    isOpenModalEditUser,
    isOpenModalDeleteUser,
    isOpenManageUser,
    isOpenCreateUser,
    dispatch,
  ]);

  const handleUser = async (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    setSelctedUser(users.find((user) => user._id === value));

    switch (name) {
      case "editUser":
        handleEditUser();
        break;
      case "createCar":
        handleCreateCar();
        break;
      case "deleteUser":
        handleDeleteUser();
        break;
      default:
        handleManageUser();
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilteredUsers(
      users?.filter(
        (item) =>
          item.username?.includes(value) ||
          item.email?.includes(value) ||
          item.phone?.includes(value)
      )
    );
  };

  const [formData, setFormData] = useState();

  // Validation wrapper for formData changes
  const setFormDataWithValidation = (newData) => {
    setFormData(newData);
    
    // Validate on change if modal is open
    if (isOpenCreateUser && newData) {
      const emails = users?.map((user) => user.email) || [];
      const phones = users?.map((user) => templatePhone(user.phone)) || [];
      const usernames = users?.map((user) => user.username) || [];
      
      setIsExistEmail(newData.email ? emails.includes(newData.email) : false);
      setIsExistPhone(newData.phone ? phones.includes(templatePhone(newData.phone)) : false);
      setIsExistUser(newData.username ? usernames.includes(newData.username) : false);
    }
  };

  const onSubmitCreateCar = async (e) => {
    e.preventDefault();
    if (validCar(formData?.numberPlate)) {
      await createCar(selectedUser?._id, formData);
      handleCreateCar();
    }
  };

  const useEditUser = () => {
    const [localFormData, setLocalFormData] = useState(selectedUser);
    
    // Validation wrapper for edit form
    const setLocalFormDataWithValidation = (newData) => {
      setLocalFormData(newData);
      
      if (isOpenModalEditUser && newData) {
        setIsExistEmail(
          users?.some(
            (user) =>
              user.email === newData.email && user._id !== selectedUser?._id
          ) || false
        );
        setIsExistPhone(
          users?.some(
            (user) =>
              user.phone === templatePhone(newData.phone) &&
              user._id !== selectedUser?._id
          ) || false
        );
        setIsExistUser(
          users?.some(
            (user) =>
              user.username === newData.username && user._id !== selectedUser?._id
          ) || false
        );
      }
    };

    const onSubmitEditUser = async (e) => {
      e.preventDefault();
      if (
        isValidUserName(localFormData) &&
        !isExistEmail &&
        !isExistPhone &&
        !isExistUser
      ) {
        await updateUser(selectedUser?._id, localFormData);
        handleEditUser();
        setFilteredUsers(
          users.map((user) =>
            user._id === selectedUser?._id
              ? { ...localFormData, phone: templatePhone(localFormData.phone) }
              : user
          )
        );
      }
    };
    return {
      formData: localFormData,
      setFormData: setLocalFormDataWithValidation,
      onSubmitEditUser,
      isExistEmail,
      isExistPhone,
      isExistUser,
    };
  };

  const isValidUserName = (formData) => {
    return (
      validPhone(formData?.phone) &&
      validPass(formData?.password) &&
      validEmail(formData?.email)
    );
  };

  function useRegister() {
    const onSubmit = async (e) => {
      e.preventDefault();
      if (
        isValidUserName(formData) &&
        !isExistEmail &&
        !isExistPhone &&
        !isExistUser
      ) {
        const newUser = await createUser(formData);
        handleCreateUser();
        setFilteredUsers(() => [...users, newUser.data]);
      }
    };
    return { setFormData: setFormDataWithValidation, onSubmit, isExistEmail, isExistPhone, isExistUser };
  }

  const useDeleteUser = async (e) => {
    e.preventDefault();
    await deleteUser(selectedUser?._id);
    handleDeleteUser();
    handleManageUser();
    setFilteredUsers(users?.filter((user) => user._id !== selectedUser?._id));
  };

  const handleSort = (key, direction) => {
    const sortedData = [...displayUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedData);
  };







  const value = {
    useDeleteUser,
    useRegister,
    displayUsers,
    selectedUser,
    handleUser,
    handleSearch,
    setFormData,
    onSubmitCreateCar,
    useEditUser,
    handleSort,
    modals: {
      manageUser: { isOpen: isOpenManageUser, handle: handleManageUser },
      createUser: { isOpen: isOpenCreateUser, handle: handleCreateUser },
      createCar: { isOpen: isOpenModalCreateCar, handle: handleCreateCar },
      editUser: { isOpen: isOpenModalEditUser, handle: handleEditUser },
      deleteUser: { isOpen: isOpenModalDeleteUser, handle: handleDeleteUser },
    },
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
