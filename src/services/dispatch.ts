import { postService } from "./service";

export interface SigninSchema {
  email: string;
  password: string;
}
// Login api
export const signin = async (input: SigninSchema) => {
  try {
    const { data: res } = await postService(
      "/api/v1/user/login?_format=json",
      input
    );

    if (res.code === "200" && res.status === "success") {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    throw error;
  }
};
