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
import { useState } from "react";
import { FormValues, LoginSchema } from "@/lib/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitBtn from "./submit-btn";
import useFetch from "@/hooks/useFetch";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const ADMIN_URL = import.meta.env.API_ADMIN_URL || "/api/admin";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const URL = `${API_BASE_URL}${ADMIN_URL}`;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { post } = useFetch(`${URL}/login`);

  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      //Crear FormData
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      //Realizar peticion
      const response = await post<ApiResponse>(formData, {
        headers: {},
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.success) {
        // ponse algun toast aca
        console.log(response);
        console.log(response.data);
        console.log("Formulario enviado correctamente", response.data.message);
      } else {
        throw new Error(
          response.data?.message || "Error al procesar la solicitud"
        );
      }
    } catch (error) {
      // ponse algun toast aca
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error en el envío del formulario:", errorMessage);
    } finally {
      setIsLoading(false);
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
          {error && (
            <>
              <CardDescription className="bg-destructive mb-2 text-white px-4 py-2 font-bold rounded-sm">
                {error}
              </CardDescription>
            </>
          )}
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
              <SubmitBtn isLoading={isLoading} name="Login" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
