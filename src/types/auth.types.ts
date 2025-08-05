export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface DemoConfiguration {
  company_name: string;
  company_email_domains: string[];
  invited_users: string[];
  create_dummy_data: boolean;
  demo_access_end_date: string;
  feature_list: string[];
}
