'use client';

import { useState } from "react";
import { useMediaQuery } from "react-amazing-hooks";
import { useParams, useRouter } from "next/navigation";
import { resetPasswordFunction } from "@/functions/auth";
import { useResetPasswordMutation } from "@/redux/slices/users.api.slice";

// components
import LayoutContainer from "@/components/LayoutContainer"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleChange } from "@/functions/common";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { userId, token } = params;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const isMin500px = useMediaQuery({ min: 500 });
  const isMin650px = useMediaQuery({ min: 650 });
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  // extract form field values from 'formData'
  const { password, confirmPassword } = formData;

  const onSubmitHandler = resetPasswordFunction(password, confirmPassword, resetPassword, userId, token, router);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <main>
          <div className={`flex justify-center items-center h-full px-5 mx-auto`}>
            <Card className={`${isMin650px ? "w-[600px] max-w-[600px]" : isMin500px ? "w-[480px] max-w-[480px]" : "w-full"}`}>
              <CardHeader>
                <CardTitle className="text-2xl">Reset your Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={onSubmitHandler}>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-normal">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••••"
                      required
                      disabled={isLoading}
                      onChange={(e) => handleChange(e, setFormData)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-normal">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      required
                      disabled={isLoading}
                      onChange={(e) => handleChange(e, setFormData)}
                    />
                  </div>
                  <Button
                    type="submit"
                    name="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading .." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </LayoutContainer >
    </>
  )
}

export default Page

