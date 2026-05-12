"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const roles = ["super_admin", "admin", "staff", "volunteer", "viewer"] as const;

export default function UsersPage() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [userForm, setUserForm] = useState({
    email: "",
    full_name: "",
    role: "viewer",
  });

  const supabase = useMemo(
    () => (typeof window !== "undefined" ? createSupabaseBrowserClient() : null),
    []
  );

  const loadUsers = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*");
    setLoading(false);

    if (error) {
      toast.error("Unable to load users.");
      return;
    }

    setUsers(data ?? []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!supabase) return;
    setCreating(true);
    const payload = {
      email: userForm.email,
      full_name: userForm.full_name,
      role: userForm.role,
    };
    const { error } = await supabase.from("profiles").insert(payload);
    setCreating(false);

    if (error) {
      toast.error("Unable to add user.");
      return;
    }

    setUserForm({ email: "", full_name: "", role: "viewer" });
    toast.success("User record created.");
    loadUsers();
  };

  const handleRoleChange = async (id: string, role: string) => {
    if (!supabase) return;
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) {
      toast.error("Unable to update user role.");
      return;
    }
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, role } : user)));
    toast.success("Role updated.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">User Management</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage profiles, roles, and access levels for the Aid Connect organization.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Team members</p>
              <h2 className="mt-2 text-2xl font-semibold">{users.length} active profiles</h2>
            </div>
            <div className="rounded-3xl bg-slate-950 px-4 py-3 text-slate-100">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Latest</p>
              <p className="mt-1 text-lg font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center text-slate-500">
                      No user records found yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.full_name ?? "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="max-w-xs"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role.replace("_", " ")}
                            </option>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "super_admin" ? "success" : "default"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Create user record</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add a new profile to the ERP user directory. This creates a user record for role management.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Full name</label>
              <Input
                value={userForm.full_name}
                onChange={(event) =>
                  setUserForm((current) => ({ ...current, full_name: event.target.value }))
                }
                placeholder="Alex Doe"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Email address</label>
              <Input
                type="email"
                value={userForm.email}
                onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>
              <Select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm((current) => ({ ...current, role: event.target.value }))
                }
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.replace("_", " ")}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Button onClick={handleCreateUser} disabled={creating || !userForm.email}>
            {creating ? "Creating…" : "Create profile"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
