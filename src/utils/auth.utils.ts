import { AuthError } from "firebase/auth";
import { Nullable } from "../types/auth.types";

/**
 * Firebase Auth Error Codes
 */
export const AUTH_ERROR_CODES = {
  EMAIL_EXISTS: "auth/email-already-in-use",
  PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_IDP_RESPONSE: "auth/invalid-credential",
  INVALID_LOGIN_CREDENTIALS: "auth/invalid-login-credentials",
  TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  WEAK_PASSWORD: "auth/weak-password",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",
  USER_DISABLED: "auth/user-disabled"
} as const;

/**
 * Maps Firebase auth error codes to user-friendly messages
 */
export function checkFirebaseAuthMessage(
  errorCode: string,
  defaultMessage: string
): string {
  const errorMessages: { [key: string]: string } = {
    [AUTH_ERROR_CODES.EMAIL_EXISTS]:
      "This account already exists. Please log in to continue.",
    [AUTH_ERROR_CODES.PROVIDER_ALREADY_LINKED]: "This account already exists.",
    [AUTH_ERROR_CODES.INVALID_EMAIL]: "Email address is invalid",
    [AUTH_ERROR_CODES.INVALID_IDP_RESPONSE]:
      "Incorrect email address or password",
    [AUTH_ERROR_CODES.INVALID_LOGIN_CREDENTIALS]:
      "Incorrect email address or password",
    [AUTH_ERROR_CODES.USER_NOT_FOUND]:
      "No account found with this email address",
    [AUTH_ERROR_CODES.WRONG_PASSWORD]: "Incorrect password",
    [AUTH_ERROR_CODES.WEAK_PASSWORD]:
      "Password should be at least 6 characters",
    [AUTH_ERROR_CODES.TOO_MANY_ATTEMPTS_TRY_LATER]:
      "Access to this account has been temporarily disabled due to many failed login attempts. " +
      "You can immediately restore it by resetting your password or you can try again later",
    [AUTH_ERROR_CODES.NETWORK_REQUEST_FAILED]:
      "Network error. Please check your connection and try again",
    [AUTH_ERROR_CODES.USER_DISABLED]: "This account has been disabled"
  };

  return errorMessages[errorCode] || defaultMessage;
}

/**
 * Handles Firebase auth errors and returns formatted error response
 */
export function handleAuthError(error: AuthError | Error): {
  hasError: true;
  user: null;
  errorMessage: string;
} {
  const errorCode = "code" in error ? error.code : "unknown";
  const errorMessage = checkFirebaseAuthMessage(errorCode, error.message);

  return {
    hasError: true,
    user: null,
    errorMessage: errorMessage
  };
}

/**
 * Checks if a value is defined and not null
 */
export function isDefinedAndNotNull<T>(
  value: T | null | undefined
): value is T {
  return value !== null && value !== undefined;
}

/**
 * Firestore path builder utility class
 */
export class FirestorePathBuilder {
  /**
   * Builds path for user document
   */
  static buildUserPath(userId: string): string {
    return `users/${userId}`;
  }

  /**
   * Builds path for user document with sub-collection
   */
  static buildUserDocumentPath(userId: string, documentId: string): string {
    return `users/${userId}/documents/${documentId}`;
  }

  /**
   * Builds path for user document segments
   */
  static buildDocumentSegmentsPath(userId: string, documentId: string): string {
    return `users/${userId}/documents/${documentId}/segments`;
  }
}

/**
 * Datadog user tracking utility
 */
export function setDatadogUser(
  user: Nullable<any>,
  datadogSetUser?: (user: { id: string; email: string; name: string }) => void
): void {
  if (!isDefinedAndNotNull(user) || !datadogSetUser) {
    return;
  }

  datadogSetUser({
    id: user.uid,
    email: user.email ?? "",
    name: user.displayName ?? ""
  });
}

/**
 * Logger utility functions
 */
export const logger = {
  error: (
    message: string,
    error?: any,
    logError?: (message: string, error: any) => void
  ) => {
    if (logError) {
      logError(message, error);
    } else {
      console.error(message, error);
    }
  },

  info: (
    message: string,
    data?: any,
    logInfo?: (message: string, data?: any) => void
  ) => {
    if (logInfo) {
      logInfo(message, data);
    } else {
      console.info(message, data);
    }
  }
};

/**
 * Creates a promise that resolves with auth state change
 */
export function createAuthStatePromise(auth: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user: any) => {
        unsubscribe();
        resolve(user);
      },
      (error: any) => {
        unsubscribe();
        reject(error);
      }
    );
  });
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Creates a debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
