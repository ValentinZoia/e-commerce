import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import LoaderPage from "./components/LoaderPage/LoaderPage";

const App = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
