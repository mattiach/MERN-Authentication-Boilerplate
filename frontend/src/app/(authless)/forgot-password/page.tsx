'use client';

import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-amazing-hooks";
import { useForgotPasswordMutation } from "@/redux/slices/users.api.slice";
import { useRouter } from "next/navigation";
import { forgotPasswordFunction } from "@/functions/auth";

// components
import withNoAuth from "@/components/hoc/withNoAuth";
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const isMin500px = useMediaQuery({ min: 500 });
  const isMin650px = useMediaQuery({ min: 650 });

  const onSubmitHandler = forgotPasswordFunction(email, forgotPassword, router);

  return (
    <>
      <LayoutContainer>
        <Navbar />
        <main>
          <div className={`flex justify-center items-center h-full px-5 mx-auto`}>
            <Card className={`${isMin650px ? "w-[600px] max-w-[600px]" : isMin500px ? "w-[480px] max-w-[480px]" : "w-full"}`}>
              <CardHeader>
                <CardTitle className="text-2xl">Recover your Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-normal">
                      Insert your E-mail, we will send you a link to reset your password
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      disabled={isLoading}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    name="submit"
                    className="w-full"
                    disabled={isLoading}
                    onClick={onSubmitHandler}
                  >
                    {isLoading ? "Loading .." : "Submit"}
                  </Button>
                  <div className={`${isLoading ? "opacity-50" : "opacity-100"}`}>
                    <p className="text-sm tracking-normal font-light">
                      Remember your password? {" "}
                      <Link href="/login">
                        <span className="text-blue-500 underline">Login</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </LayoutContainer >
    </>
  )
}

export default withNoAuth(Page);
