import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.stringify({
      email: "lrimbault92@gmail.com",
      id: "cm9tw1dhp0000vb26k8ybibw9",
      createdAt: "2025-04-23T12:06:22.093Z",
      updatedAt: "2025-04-23T12:07:07.506Z",
      active: true,
      token: 0,
    });
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        return { status: "error", message: data.message };
      }
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);

      return { status: "success", message: "Connexion réussie" };
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Vérifier la validité du token au chargement et périodiquement
  useEffect(() => {
    const verifyToken = async () => {
      const currentToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      console.log("currentToken", currentToken);
      console.log("savedUser", savedUser);

      if (!currentToken || !savedUser) {
        logout();
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);
        if (!parsedUser?.id) {
          throw new Error("Données utilisateur invalides");
        }

        // Vérifier si le token est valide avec l'ID de l'utilisateur
        const response = await fetch(
          `api/users/verify-token/${parsedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );
        const data = await response.json();
        if (!data.success || !data.data.user) {
          throw new Error("Token invalide");
        }
        setUser(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } catch (error) {
        console.error("Erreur de vérification du token:", error);
        logout();
      }
    };

    // Vérifier le token au chargement
    verifyToken();

    // Vérifier le token toutes les 5 minutes
    const interval = setInterval(verifyToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]); // Ajouter token comme dépendance

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        return { status: "error", message: data.message };
      }

      return { status: "success", message: "Inscription réussie" };
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return { status: "error", message: error };
    }
  };

  const fetchGoogleInfos = async (googleToken: any) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${googleToken.access_token}`,
          },
        }
      );

      const data = await response.json();
      if (data.error) {
        return { status: "error", message: data.error_description };
      }
      return data;
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  const googleLogin = async (googleInfos: any) => {
    try {
      const response = await fetch(`/api/users/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: googleInfos.email,
          googleId: googleInfos.sub,
        }),
      });
    } catch (err) {
      console.error("Erreur de connexion Google:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        fetchGoogleInfos,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
