import { LoginForm } from "./_components";

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p.10 bg-background">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
