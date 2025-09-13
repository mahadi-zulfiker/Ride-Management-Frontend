import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllUsersQuery, useBlockUserMutation, useSuspendDriverMutation } from "@/redux/features";
import { IUser } from "@/types";



const AllUsers = () => {
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [blockModalId, setBlockModalId] = useState<string | null>(null);
  const [suspendModalId, setSuspendModalId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({
    role: roleFilter || undefined,
    search: search || undefined,
  });

  const [blockUser] = useBlockUserMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleBlockToggle = async (id: string, block: boolean) => {
    await blockUser({ id, block }).unwrap();
    refetch();
    setBlockModalId(null); 
  };

  const handleSuspendToggle = async (id: string, suspend: boolean) => {
    await suspendDriver({ id, suspend }).unwrap();
    refetch();
    setSuspendModalId(null); 
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-red-600">Failed to load users</p>;

  const users = data?.data || [];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex gap-4 mb-4 flex-wrap">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          className="border rounded  px-2 py-1"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="driver">Driver</option>
          <option value="rider">Rider</option>
        </select>
        <Button onClick={() => refetch()}>Apply</Button>
      </div>

        {/* user */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto  border-collapse border border-gray-300 ">
          <thead>
            <tr className="">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user: IUser) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="border p-2">{user.availability || "-"}</td>
                <td className="border p-2 flex flex-row space-x-2">
                  {/* Block / Unblock Modal */}
                  <Dialog open={blockModalId === user._id} onOpenChange={(open) => setBlockModalId(open ? user._id : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant={user.isBlocked ? "default" : "destructive"}>
                        {user.isBlocked ? "Unblock" : "Block"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{user.isBlocked ? "Unblock" : "Block"} User</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to {user.isBlocked ? "unblock" : "block"} this user?</p>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => handleBlockToggle(user._id, !user.isBlocked)}
                        >
                          Yes, {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {user.role === "driver" && (
                    <Dialog open={suspendModalId === user._id} onOpenChange={(open) => setSuspendModalId(open ? user._id : null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant={user.isSuspend ? "default" : "destructive"}>
                          {user.isSuspend ? "Approve" : "Suspend"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{user.isSuspend ? "Approve" : "Suspend"} Driver</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to {user.isSuspend ? "approve" : "suspend"} this driver?</p>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={() => handleSuspendToggle(user._id, !user.isSuspend)}
                          >
                            Yes, {user.isSuspend ? "Approve" : "Suspend"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="border p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
