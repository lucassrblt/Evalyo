// import { useState } from "react";

const useInitialize = () => {
  const checkToken = async (token: string) => {
    const response = await fetch("/api/users/verify-initialyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log(data);
    console.log("data success", data.success);

    if (!data.success) {
      return { status: "error", message: data.message };
    }

    return { status: "sucess", message: data };
  };

  return {
    checkToken,
  };
};

export default useInitialize;
