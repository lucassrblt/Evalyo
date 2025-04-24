import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Input, Modal } from "antd";
import { message as messageApi } from "antd";

export default function Dashboard() {
  const { user } = useAuth();
  const [passwordModal, setPasswordModal] = useState(false);

  useEffect(() => {
    if (user) {
      !user.active ? setPasswordModal(true) : setPasswordModal(false);
    }
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {passwordModal && (
        <PasswordModal
          open={passwordModal}
          user={user}
          setOpen={() => setPasswordModal(!passwordModal)}
        />
      )}
    </>
  );
}

const PasswordModal = ({
  open,
  user,
  setOpen,
}: {
  open: boolean;
  user: any;
  setOpen: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      if (password === "" || confirmPassword === "") {
        return messageApi.open({
          type: "error",
          content: "Veuillez remplir les champs",
        });
      }

      if (password !== confirmPassword) {
        messageApi.open({
          type: "error",
          content: "Les mots de passe ne correspondent pas",
        });
      }

      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: user.email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        return;
      }

      setOpen();
    } catch (error) {
      console.error("Erreur de changement de mot de passe:", error);
      return { status: "error", message: error };
    }
  };

  return (
    <Modal title="Basic Modal" open={open}>
      <Form>
        <Form.Item label="Password">
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" onClick={handleChangePassword}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};
