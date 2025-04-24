import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Auth() {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(email, password);
    console.log("response", response);
    if (response.status === "error") {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    } else {
      navigate("/dashboard");
    }
  };

  const handleRegister = async () => {
    const response = await register(email, password, confirmPassword);
    console.log("response", response);
    if (response.status === "error") {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    } else {
      navigate("/connect/login");
    }
  };

  return (
    <section className="flex flex-col gap-12">
      {contextHolder}
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex font-poppins font-semibold text-3xl text-black">
            Create and send
          </h2>
          <h2 className="flex font-poppins font-semibold text-3xl text-black">
            effective recuitement tests
          </h2>
        </div>
        <div>
          <p className="flex font-poppins font-medium text-md text-[#797979]">
            Centralize and manage your recruitment process with AI-powered tools
          </p>
        </div>
      </div>
      <div>
        {location.pathname === "/connect/register" ? (
          <Register
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleConnect={handleRegister}
          />
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleConnect={handleLogin}
          />
        )}
      </div>
    </section>
  );
}

function Register({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleConnect,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  handleConnect: () => void;
}) {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <CustomInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            change={(value) => setEmail(value)}
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            change={(value) => setPassword(value)}
          />
          <CustomInput
            label="Confirm Password"
            type="password"
            placeholder="Enter your same password"
            value={confirmPassword}
            change={(value) => setConfirmPassword(value)}
          />
        </div>
        <CustomButton label="Register" click={handleConnect} />
      </div>
    </>
  );
}

function Login({
  email,
  setEmail,
  password,
  setPassword,
  handleConnect,
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleConnect: () => void;
}) {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <CustomInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            change={(value) => setEmail(value)}
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            change={(value) => setPassword(value)}
          />
        </div>
        <CustomButton label="Login" click={handleConnect} />
      </div>
    </>
  );
}

function CustomButton({ label, click }: { label: string; click: () => void }) {
  return (
    <button
      onClick={click}
      className="bg-[#FFE55D] text-black py-2.5 flex items-center justify-center rounded-lg font-poppins font-semibold text-xl w-full button-shadow"
    >
      {label}
    </button>
  );
}

function CustomInput({
  label,
  placeholder,
  value,
  type = "text",
  change,
}: {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  change: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex font-poppins font-regular text-md text-black">
        {label}
      </label>
      <input
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
        value={value}
        type={type}
        className="w-full py-2.5 px-3 rounded-lg border border-[#E5E5E5] focus:outline-none font-poppins font-medium text-md input-shadow"
      />
    </div>
  );
}
