"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div
      className="bg-custom-image w-full bg-cover h-screen flex justify-center items-end"
      style={{ backgroundImage: "url('/images/bg-login.svg')" }}
    >
      <form onSubmit={onSubmit} className=" w-1/2 flex-auto p-3">
        {error && (
          <p className="bg-red-500 text-xs text-white p-3 rounded mb-2">
            {error}
          </p>
        )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <input
          htmlFor="email"
          className="bg-gray-300 bg-opacity-70 flex rounded-full p-3 w-full"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email es requerido",
            },
          })}
          placeholder="Email"
        />

        {errors.email && (
          <span className="text-red-500 text-xs pl-4 mb-1 block">
            {errors.email.message}
          </span>
        )}

        <input
          className="rounded-full bg-gray-300 bg-opacity-70 mt-1 p-3 w-full"
          htmlFor="password"
          type="text"
          {...register("password", {
            required: {
              value: true,
              message: "Password es requerido",
            },
          })}
          placeholder="Contraseña"
        />

        {errors.password && (
          <span className="text-red-500 text-xs pl-4 mb-1 block">
            {errors.password.message}
          </span>
        )}

        <button className="w-full  mt-1 bg-blue-800 text-white p-3 rounded-full ">
          Ingresar
        </button>
        <Link href="/auth/register" passHref>
          <button className="flex text-blue-500 font-bold py-2 px-1 w-full space-x-1 ">
            <span>Registrarse</span>
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
