import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../apis/auth.api";
import { useRef } from "react";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const message = params.get("message");
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (message === "error" && !hasShownToast.current) {
      toast.success("Token invalide ! Veuillez vous réinscrire");
      hasShownToast.current = true;
      navigate("/register", { replace: true });
    }
  }, [message, navigate]);
  const schema = yup.object({
    email: yup
      .string()
      .email()
      .required("Le champ est obligatoire")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide"
      ),
   
    // rgpd: yup
    //   .boolean()
    //   .oneOf([true], "Vous devez accepter les termes et conditions"),
      
    },

);

  const defaultValues = {
     
    email: "",
 
 
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
    
  })


  async function submit(values) {
    console.log(values);
    toast.success(`veuillez consulter vos email à l'adresse'+" "+${values.email}`);
   
    
  }
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4 mb-6 mx-auto max-w-[400px]"
        >
          
          <div className="flex flex-col mb-2">
        <h1 className="mb-2 text-lg font-bold">Mot de passe oublié</h1>
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded px-3 py-2 focus: outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="veuillez saisir une addresse mail"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          
          {/* <div className="flex flex-col mb-2">
            <label htmlFor="rgpd" className="mb-2">
              <input
                {...register("rgpd")}
                type="checkbox"
                className="mr-4"
                id="rgpd"
              />
              En soumettant ce formulaire j'accepte ...
            </label>
            {errors.rgpd && (
              <p className="text-red-500">{errors.rgpd.message}</p>
            )}
          </div> */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Se connecter
          </button>        </form>
      </div>
    </div>
  );
}
