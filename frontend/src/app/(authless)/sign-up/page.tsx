'use client';

import Link from "next/link";
import { useRegisterMutation } from "@/redux/slices/users.api.slice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUserFunction } from "@/functions/auth";
import { handleChange } from "@/functions/common";

// components
import withNoAuth from "@/components/hoc/withNoAuth";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Page = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitHandler = registerUserFunction(
    formData.confirmPassword,
    formData.password,
    register,
    formData.userName,
    formData.email,
    router
  );

  return (
    <>
      <form
        className="flex h-screen w-[400px] mx-auto items-center justify-center px-4"
        onSubmit={submitHandler}
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
              Create your account by entering your email below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Johny7"
                  required
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••••"
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••••"
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm flex gap-x-1 justify-center text-zinc-800">
              Already have an account?{" "}
              <Link href="/login" className="underline" aria-label="Log in to your account">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default withNoAuth(Page);
