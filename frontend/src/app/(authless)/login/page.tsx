'use client';

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/slices/users.api.slice";
import { setCredentials } from "@/redux/slices/auth.slice";
import { loginFunction } from "@/functions/auth";
import { handleChange } from "@/functions/common";

// components
import withNoAuth from "@/components/hoc/withNoAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = loginFunction(formData.email, formData.password, login, dispatch, setCredentials);

  return (
    <form
      className="flex h-screen w-[400px] mx-auto items-center justify-center px-4"
      onSubmit={submitHandler}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  aria-label="Recover your password"
                  className="ml-auto inline-block text-xs underline underline-offset-2"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••••"
                value={formData.password}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? "Loading ..." : "Sign In"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm flex gap-x-1 justify-center text-zinc-800">
            Don&apos;t have an account?{""}
            <Link
              href="/sign-up"
              className="underline"
              aria-label="Sign up for a new account"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default withNoAuth(Page);
