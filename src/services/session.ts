import Cookies from "js-cookie";

// Get user details from session_token
export const getTokenDetails = (token: string) => {
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } else {
    return false;
  }
};

// Store token into localStorage
export const saveSession = (accessToken: any) => {
  Cookies.set("access_token", accessToken, {
    expires: 60,
  });
};

// Delete token from localStorage
export const deleteSession = () => {
  Cookies.remove("access_token");
};

export const getUserDetails = () =>
  getTokenDetails(Cookies.get("access_token")!);

// Check token expired or not
export const checkUserSession = () => {
  return Date.now() > getUserDetails()?.EXP;
};
