import { useUsersContext } from "./UsersContext";

export default function UsersTable() {
    const {handleUser,filteredUsers,users,displayUsers}= useUsersContext()
    // const displayUsers = filteredUsers || users;
    return (
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Actions</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers?.map((user) => (
                <tr key={user?._id}>
                  <td data-label="Actions">
                    <button value={user?._id} onClick={handleUser}>
                      Manage
                    </button>
                  </td>
                  <td data-label="User Name">{user?.username}</td>
                  <td data-label="Email">{user?.email}</td>
                  <td data-label="Phone Number">{user?.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    };
