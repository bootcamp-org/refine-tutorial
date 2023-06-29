import type { AuthBindings } from "@refinedev/core";

const mockUsers = [
  { email: "john@mail.com", roles: ["admin"] },
  { email: "jane@mail.com", roles: ["guest"] },
];

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    // Mocking a request to a backend...
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login error",
        name: "Invalid credentials",
      },
    };
  },
  check: async (params: any) => {
    const user = localStorage.getItem("auth");

    if (user) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  logout: async (params: any) => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
  getPermissions: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { roles } = JSON.parse(user);
      return roles;
    }

    return null;
  },
  getIdentity: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, roles } = JSON.parse(user);

      return {
        email,
        roles,
        name: email,
        avatar: "https://i.pravatar.cc/300",
      };
    }

    return null;
  },
  register: async ({ email }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({ email, roles: [""] });

    return {
      success: true,
      redirectTo: "/login",
    };
  },
};

export default authProvider;
