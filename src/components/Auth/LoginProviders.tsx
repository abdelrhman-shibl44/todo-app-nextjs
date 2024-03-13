import React, { useState } from "react";
import Button from "../Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
const LoginProviders = () => {
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const handleGithubSignIn = async () => {
    try {
      setGithubLoading(true);
      await signIn("github");
    } catch (err) {
      console.log(err);
      setGithubLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signIn("google");
    } catch (err) {
      console.log(err);
      setGoogleLoading(false);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
      <Button
        disabled={githubLoading}
        isFormLoading={githubLoading}
        onClick={handleGithubSignIn}
      >
        <span className="flex items-center gap-3">
          <Image
            width={25}
            height={25}
            src="/githubIcon.svg"
            alt="github-icon"
          />
          <span>Login with Google</span>
        </span>
      </Button>
      <Button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        isFormLoading={googleLoading}
      >
        <span className="flex items-center gap-3">
          <Image
            width={25}
            height={25}
            src="/googleIcon.svg"
            alt="github-icon"
          />
          <span>Login with GitHub</span>
        </span>
      </Button>
    </div>
  );
};

export default LoginProviders;
