"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form data:", data);

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Error al registrar usuario:", await res.json());
    }
  });

  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-custom-image bg-cover bg-center md:w-1/4 w-full  h-screen flex justify-center items-end"
        style={{ backgroundImage: "url('/images/bg-login.svg')" }}
      >
        <form onSubmit={onSubmit} className=" w-1/2 flex-auto p-3">
          <h1 className="text-slate-200 font-bold text-4xl mb-4">Registro</h1>

          <input
            htmlFor="name"
            className="bg-gray-800 bg-opacity-50 flex rounded-full p-3 w-full"
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
            })}
            placeholder="Nombre"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}

          <input
            htmlFor="email"
            className="bg-gray-800 bg-opacity-50 flex mt-1 rounded-full p-3 w-full"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email es requerido",
              },
            })}
            placeholder="Correo"
          />

          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <input
            htmlFor="password"
            className="bg-gray-800 bg-opacity-50 mt-1 flex rounded-full p-3 w-full"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password es requerido",
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button className="w-full bg-blue-800 text-white p-3 rounded-full mt-1">
            Registrar
          </button>
          <Link href="/" passHref>
            <button className="flex text-blue-500 font-bold py-2 px-1 w-full space-x-1 ">
              <span>Login</span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
