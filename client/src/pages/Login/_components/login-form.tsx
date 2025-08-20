import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input, InputPassword } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, LoginSchema } from "@/lib/zod-schemas/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitBtn from "./submit-btn";

import DBmessage from "@/components/DBMessage/DBmessage";
import { useAuthMutations } from "@/hooks/Auth/useAuthMutations";
import { useState } from "react";
import { ResMessage } from "@/hooks/GenericTABLE/useHanlderDialogCommand";
// import { DBResponseCommand } from "@/types/shared";
// import { User } from "@/types/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [responseMessage, setResponseMessage] = useState<ResMessage | null>({
    type: null,
    text: null,
  });
  const { doLogin } = useAuthMutations();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await doLogin.mutateAsync(data);

      setResponseMessage({
        type: res?.success ? "success" : "error",
        text: res?.message || `Login exitoso`,
      });

      if (res?.success) {
        setTimeout(() => {
          navigate("/private");
        }, 2000); // espera 2 segundos
      }
    } catch (err: any) {
      console.error(err);
      setResponseMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Este formulario está estrictamente reservado para administradores
            debidamente autorizados. El acceso no autorizado constituye una
            violación a las políticas de seguridad del sistema. Si usted no
            posee las credenciales correspondientes, le instamos a regresar a la
            página de{" "}
            <a className="text-blue-500" href="/">
              Inicio
            </a>
            . Cualquier intento de acceso o modificación no autorizado será
            registrado y podrá dar lugar a acciones legales, incluyendo la
            presentación de cargos penales conforme a la legislación vigente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DBmessage responseMessage={responseMessage} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type={"text"} placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2 pb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitBtn isLoading={doLogin.isPending} name="Login" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
