import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
