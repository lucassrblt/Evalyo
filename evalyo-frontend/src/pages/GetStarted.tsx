import { useEffect } from "react";
import { useParams } from "react-router";
import useInitialize from "../hook/useInitialize";
import { useNavigate } from "react-router";

export default function GetStarted() {
  const { token } = useParams();
  const { checkToken } = useInitialize();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      handleCheckToken(token);
    } else {
      navigate("/connect/login");
    }
  }, []);

  const handleCheckToken = async (token: string) => {
    const response = await checkToken(token);
    if (response.status === "error") {
      navigate("/connect/login");
    }
  };

  return (
    <div>
      <h1>Get Started</h1>
      <p>Hey there, you have subscribe to hirewise, please configure you</p>
    </div>
  );
}
