"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // or use your own toast component

export default function LoginForm() {
  const googleLogin = useMutation({
    mutationFn: async () => {
      toast.info("Redirecting to Google...");
      await signIn("google", { callbackUrl: "/dashboard" });
    },
    onError: () => {
      toast.error("Google login failed. Please try again!");
    },
  });

  return (
    <div className="flex items-center gap-4 h-full">
      <Card className="w-full md:max-w-md border-none">
        <CardHeader className="gap-0 py-0">
          <CardTitle className="text-2xl">Log In</CardTitle>

          <div className="flex flex-col mt-4 gap-2">
            <Button
              size="lg"
              className="rounded-md font-medium flex items-center justify-center gap-2"
              variant="outline"
              onClick={() => googleLogin.mutate()}
              disabled={googleLogin.isPending}
            >
              {googleLogin.isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Image src="/google.svg" height={20} width={20} alt="google" />
                  Login with Google
                </>
              )}
            </Button>

            <Button size="lg" className="rounded-md flex font-medium items-center gap-2" variant="outline">
              <Image src="/microsoft.svg" height={15} width={15} alt="microsoft" />
              Login with Microsoft
            </Button>
          </div>

          <CardDescription className="mt-4">
            <div className="flex items-center justify-center">or</div>
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-3 flex flex-col">
          <form className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="(eg) your.name@example.com"
              className="border rounded-md p-2"
            />
          </form>

          <Link href="/dashboard" className="w-full">
            <Button size="lg" className="w-full rounded-md bg-[#F5F5F5] border" variant="ghost">
              Continue
            </Button>
          </Link>

          <CardDescription className="text-sm">
            By using Vexar, you agree to our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>{" "}
            and our{" "}
            <Link href="/terms-of-services" className="underline">
              Terms of Service
            </Link>
            .
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
