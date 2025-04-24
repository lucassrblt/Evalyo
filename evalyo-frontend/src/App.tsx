import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Create from "./pages/Create";
import Share from "./pages/Share/Share.tsx";
import "@ant-design/v5-patch-for-react-19";
import Auth from "./pages/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthGuard from "./guards/AuthGuard";
import Dashboard from "./pages/Dashboard";
import Expired from "./pages/Expired";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import Todo from "./pages/Todo";
import Job from "./pages/Job/JOb";
import ShareLayout from "./layout/ShareLayout.tsx";
import { CreateEvaluation } from "./pages/Evaluation/CreateEvaluation";
import EditEvaluation from "./pages/Evaluation/EditEvaluation";
import { EvaluationDashboard } from "./pages/Evaluation/EvaluationDashboard";

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="974154883272-er9r75n44alfnpn2tiepun6okicricdn.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/connect/login" element={<Auth />} />
            <Route path="/jobs" element={<MainLayout children={<Job />} />} />

            <Route element={<AuthGuard />}>
              <Route path="/create" element={<Create />} />
              <Route
                path="/dashboard"
                element={<MainLayout children={<Dashboard />} />}
              />
              <Route
                path="/todo"
                element={<MainLayout children={<Todo />} />}
              />

              <Route
                path="/inbox"
                element={<MainLayout children={<Create />} />}
              />
            </Route>
            <Route
              path="/evaluation/dashboard"
              element={<MainLayout children={<EvaluationDashboard />} />}
            />
            <Route
              path="/evalation/edit/:assesmentId"
              element={<MainLayout children={<EditEvaluation />} />}
            />

            <Route
              path="/evalation/create"
              element={<MainLayout children={<CreateEvaluation />} />}
            />
            <Route
              path="/share/:assesmentId"
              element={<ShareLayout children={<Share />} />}
            />
            <Route path="/share/expired" element={<Expired />} />
            {/* <Route path="/get-started/:token" element={<GetStarted />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
