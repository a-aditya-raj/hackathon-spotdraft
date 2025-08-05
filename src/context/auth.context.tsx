import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { loginAsUser, signOut, checkSession } from "../services/api";
import { AuthState, AuthContextType, User } from "../types/auth.types";

// Auth Actions
type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" };

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication on app load
  const checkAuth = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await checkSession();
      if (!result.hasError && result.user) {
        dispatch({ type: "SET_USER", payload: result.user });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch({ type: "SET_USER", payload: null });
    }
  };

  // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await loginAsUser(email, password);

      if (!result.hasError && result.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: result.user });
        return { hasError: false };
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
        return {
          hasError: true,
          message: "Login failed. Please check your credentials.",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "SET_LOADING", payload: false });
      return {
        hasError: true,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Logout function
  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await signOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still logout locally even if server call fails
      dispatch({ type: "LOGOUT" });
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
