import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import { deleteMessage } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";

export default function MessagesProvider({children}) {
    const { messages, user } = useSelector((state) => state.user);
    const { users } = useSelector((state) => state.admin);

    const [filterMessages, setFilterMessages] = useState();
    const [isDeleted, setIsDeleted] = useState(false);

    const [handleCreateMessage, isOpenCreateMessage] = useOpenModel();

    const dispatch = useDispatch();


    useEffect(() => {
        if (user?.isAdmin) dispatch(getUsers());
        if (user) dispatch(getMessagesByIdUser(user?._id));
      }, [user, isOpenCreateMessage, isDeleted]);
    
      const filterSearch = (e) => {
        setFilterMessages(
          messages?.filter(item => 
            Object.values({
              username: item?.from?.username,
              toUsername: item?.to?.username,
              title: item?.title,
              description: item?.description,
              date: item?.updatedAt
            }).some(value => value?.toLowerCase().includes(e.target.value.toLowerCase()))
          )
        );
      };


      const handleDelete = async (messageId) => {
        await deleteMessage(messageId);
        setIsDeleted(prev => !prev);
      };

const value={

}


  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>

}
