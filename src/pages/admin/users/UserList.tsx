import React, { useEffect, useState } from "react";
import Pagination from "../../shared/Pagination";
import { UserService } from "../../../states/UserState";
const UserList: React.FC = () => {
  const { getUsersList, users, currentPage, total, totalPages, startFrom } =
    UserService();

  //   let users = [];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsersList();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold text-cyan-900 mb-4">Users List</h1>
      <div className="">
        <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
          {/* <div>
            <span className="text-blue-500">Users </span>
            <span className="text-gray-500">List</span>
          </div> */}
          <div className="text-gray-500 justify-end">
            {/* <router-link :to="{ name: 'AddAuthor' }" className="bg-sky-900 text-white px-4 py-2 rounded">
                        Add Author
                    </router-link> */}
          </div>
        </div>
        <table className="table-auto w-full border-collapse border border-green-600">
          {/* <!-- <caption className="text-lg font-semibold text-gray-700 mb-4">Authors</caption> --> */}
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/4 px-4 py-2">ID</th>
              <th className="w-1/4 px-4 py-2">Full Name</th>
              <th className="w-1/4 px-4 py-2">Email</th>
              <th className="w-1/4 px-4 py-2">Phone</th>
              <th className="w-1/4 px-4 py-2">Username</th>
              <th className="w-1/4 px-4 py-2">Role</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-b" key={user.id}>
                <>
                  <td className="px-4 py-2">{user?.id} </td>
                  <td className="px-4 py-2">{user?.name} </td>
                  <td className="px-4 py-2"> {user.email} </td>
                  <td className="px-4 py-2"> {user?.phone} </td>
                  <td className="px-4 py-2"> {user.username} </td>
                  <td className="px-4 py-2"> {user?.role?.replace("-", " ")} </td>
                  {/* <td className="px-4 py-2">{user.phone} </td> */}
                  <td className="px-4 py-2 flex justify-center-safe">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline ml-2">
                      Delete
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-center py-2" colSpan={4}>
                {!loading && (
                  <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom}
                    records={users.length}
                    total={total}
                    currentPage={currentPage}
                  />
                )}
              </td>
            </tr>
            {/* <tr>
                    <td colspan="4" className="text-center py-2">
                        <button @click="addAuthor" className="bg-blue-500 text-white px-4 py-2 rounded">Add Author</button>
                    </td>
                </tr> */}
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default UserList;
