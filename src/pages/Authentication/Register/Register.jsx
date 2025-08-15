import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { RegisterPost } from "../../../service/authService";

export default function Register({ className }) {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const Icon = {
    image: [
      "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
      "https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png",
    ],
    size: {
      width: "40px",
      height: "40px",
    },
  };

  async function register(r) {
    r.preventDefault();

    if (!email || !username || !password) return alert("wajib di isi !");

    const data = await RegisterPost(email, username, password);
    console.log(data);
  }

  return (
    <>
      <main className="flex items-center justify-center h-screen w-full bg-violet-400">
        <form
          onSubmit={register}
          className="bg-white w-[90%] items-center   rounded-lg p-5 shadow-lg"
        >
          <div className="BoxRegister">
            <div className="title">
              <h1 className="text-4xl font-bold text-sans">Register</h1>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <Input
                className="border-2 border-black p-2 w-75 rounded-lg outline-none text-sm font-semibold"
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="border-2 border-black p-2 w-70 rounded-lg outline-none text-sm font-semibold"
                value={username}
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="border-2 border-black p-2 w-65 rounded-lg outline-none text-sm font-semibold"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-9 w-[100%] flex justify-center m-auto">
              <Button
                name="Register "
                className="p-2 rounded-lg border-2 border-black w-[90%] font-bold text-md"
              />
            </div>
            <span className="flex gap-2 mt-5">
              <p className="font-bold text-black text-sm">Sudah Punya AKun ?</p>
              <Link to="/Login" className="font-bold text-blue-400">
                Login
              </Link>
            </span>
            <hr className="mt-3 w-[70%] m-auto" />
            <div className="mt-5 text-center">
              <div className="SignWith">
                <p className="text-md font-bold">Sign with</p>
              </div>
              <div className="icon flex gap-5 justify-center mt-7">
                <img
                  src={Icon.image[0]}
                  alt=""
                  width={Icon.size.width}
                  height={Icon.size.height}
                />
                <img
                  src={Icon.image[1]}
                  alt=""
                  width={Icon.size.width}
                  height={Icon.size.height}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
