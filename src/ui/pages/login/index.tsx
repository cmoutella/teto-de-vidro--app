"use client";
import { useSessionContext } from "@/providers/AuthProvider";
import Button from "@/ui/components/button";
import Input from "@/ui/components/forms/input";
import { ChangeEvent, FormEvent, useState } from "react";

const LoginView = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const { login } = useSessionContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    console.log("email", email);
    console.log("password", password);

    await login(email, password);
  };

  const changeUsernameValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);
  };
  const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  };

  const EyeButton = () => {
    const eye = passwordVisible ? "XX" : "OO";

    return (
      <span
        className="cursor-pointer text-slate-600 hover:text-slate-700 leading-none"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {eye}
      </span>
    );
  };

  return (
    <div className="w-full h-full px-6 py-10">
      <div className="container">
        <div className="flex justify-center">
          <div className="px-6 py-8 pb-6 w-6/12 max-w-xl shadow-md shadow-white">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full"
            >
              <Input
                label="E-mail"
                name="username"
                value={email ?? ""}
                onChange={changeUsernameValue}
                placeholder="Digite seu e-mail"
              />
              <Input
                name="password"
                label="Senha"
                onChange={changePasswordValue}
                value={password ?? ""}
                type={passwordVisible ? "text" : "password"}
                placeholder="Digite sua senha"
                iconButton={<EyeButton />}
              />
              <Button
                type="submit"
                className="self-end"
                disabled={!password && !email}
                label="Entrar"
                theme="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
