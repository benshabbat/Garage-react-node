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
  validUserIsExist,
} from "../../validation/valid";
import useOpenModal from "../../hooks/useOpenModal";
import { templatePhone } from "../../../../server/utils/templates";

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
  const displayUsers = filteredUsers || users;
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
          item.username.includes(value) ||
          item.email.includes(value) ||
          item.phone.includes(value)
      )
    );
  };

  const [formData, setFormData] = useState();

  const onSubmitCreateCar = async (e) => {
    e.preventDefault();
    if (validCar(formData?.numberPlate)) {
      await createCar(selectedUser?._id, formData);
      handleCreateCar();
    }
  };

  const useEditUser = () => {
    const [formData, setFormData] = useState(selectedUser);
    setIsExistEmail(
      users?.some(
        (user) =>
          user.email === formData?.email && user._id !== selectedUser?._id
      )
    );
    setIsExistPhone(
      users?.some(
        (user) =>
          user.phone === templatePhone(formData?.phone) &&
          user._id !== selectedUser?._id
      )
    );
    setIsExistUser(
      users?.some(
        (user) =>
          user.username === formData?.username && user._id !== selectedUser?._id
      )
    );

    const onSubmitEditUser = async (e) => {
      e.preventDefault();
      if (
        isValidUserName(formData) &&
        !isExistEmail &&
        !isExistPhone &&
        !isExistUser
      ) {
        await updateUser(selectedUser?._id, formData);
        handleEditUser();
        setFilteredUsers(
          users.map((user) =>
            user._id === selectedUser?._id
              ? { ...formData, phone: templatePhone(formData.phone) }
              : user
          )
        );
      }
    };
    return {
      formData,
      setFormData,
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
    useEffect(() => {
      setIsExistEmail(users?.some((user) => user.email === formData?.email));
      setIsExistPhone(
        users?.some((user) => user.phone === templatePhone(formData?.phone))
      );
      setIsExistUser(users?.some((user) => user.username === formData?.username));
    }, [formData, users]);
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
    return { setFormData, onSubmit, isExistEmail, isExistPhone, isExistUser };
  }

  const useDeleteUser = async (e) => {
    e.preventDefault();
    await deleteUser(selectedUser?._id);
    handleDeleteUser();
    handleManageUser();
    setFilteredUsers(users?.filter((user) => user._id !== selectedUser?._id));
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
