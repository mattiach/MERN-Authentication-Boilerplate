'use client';

import { useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserMutation, useLogoutMutation, useUpdateUserMutation } from "@/redux/slices/users.api.slice";
import { useRouter } from "next/navigation";
import { deleteUserAccountFunction, logoutFunction, updateUserAccountFunction } from "@/functions/auth";
import { handleChange } from "@/functions/common";

// components
import withAuth from "@/components/hoc/withAuth";
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: userInfo ? userInfo.userName : '',
    email: userInfo ? userInfo.email : '',
    password: '',
    confirmPassword: ''
  });

  if (!userInfo) return null;

  // extract form field values from 'formData'
  const { userName, email, password, confirmPassword } = formData;

  // User action handlers: user logout, account deletion, and profile update
  const logoutHandler = logoutFunction(logout, dispatch, router);
  const deleteUserHandler = deleteUserAccountFunction(deleteUser, dispatch, router, userInfo);
  const submitHandler = updateUserAccountFunction(updateUser, dispatch, router, userInfo, password, userName, email);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <main>
          <div className="flex flex-col justify-center w-full max-w-md gap-2 p-3 mx-auto sm:p-0">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="userName"
                    value={userName}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
              </CardContent>
              <CardFooter className="grid col-span-1 gap-y-4">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => submitHandler()}
                  disabled={isLoading || confirmPassword !== password || password.length < 1 || confirmPassword.length < 1}
                >
                  {isLoading ? "Loading" : "Save Changes"}
                </Button>
                <Button size="sm" onClick={() => logoutHandler()} disabled={isLoading}>
                  Logout
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="delete-account">Delete Account</Label>
                  <Button variant="destructive" size="sm" onClick={() => deleteUserHandler()} disabled={isLoading}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </LayoutContainer>
    </>
  );
};

export default withAuth(Page);
