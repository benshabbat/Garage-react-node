



//TODO: to make context for messages
//todo:to move all logic to context
//todo:to create all components to extenal components
export function useMessages() {








  const PageMessages = () => (

  );

  const LayoutMessages = ({ children }) => (
    <>
      <div className="table-container">
        <Search />
        {children}
      </div>
      <CreateMessage
        handelClick={handleCreateMessage}
        isOpen={isOpenCreateMessage}
        user={user}
        users={user?.isAdmin ? users : null}
      />
    </>
  );

  return { PageMessages, TableMessages, Search, LayoutMessages };
}