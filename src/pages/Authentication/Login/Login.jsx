import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { LoginAuth } from "../../../service/loginService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function HandelForm(e) {
    e.preventDefault();

    if (!email || !password) return alert("Wajib Di isi");

    const data = await LoginAuth(email, password);
    console.log(data);
  }

  return (
    <>
      <main className="flex h-screen bg-blue-400 justify-center items-center">
        <form onSubmit={HandelForm} className="w-90">
          <div className="boxForm bg-white p-4 rounded-lg">
            <div className="TitleForm">
              <h1 className="text-3xl font-bold">Log In</h1>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <Input
                type="email"
                className="border-2 border-black p-2 rounded-lg w-[90%] outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                className="border-2 border-black p-2 rounded-lg w-[85%] outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />

              <Button
                type="submit"
                className="p-2 w-[80%] m-auto mt-5 border-2 bordre-black rounded-lg font-bold text-md"
                name="Login"
              />

              <div className="Lppass mt-2 flex gap-3">
                <p className="font-bold">Lupa Password ? </p>
                <Link to={"/Reset"} className="font-semibold text-blue-500">
                  Reset
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
