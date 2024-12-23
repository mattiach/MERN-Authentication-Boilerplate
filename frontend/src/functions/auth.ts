/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreatorWithPayload, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/const";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { clearCredentials, setCredentials } from "@/redux/slices/auth.slice";

export function loginFunction(
  email: string,
  password: string,
  login: any,
  dispatch: Dispatch<UnknownAction>,
  setCredentials: ActionCreatorWithPayload<IUser, "auth/setCredentials">
) {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;
    try {
      const res = await login({ email, password }).unwrap();
      if (!res.verified) throw new Error('Not verified email');
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.error('loginFunction: ', err);
    }
  };
}

export function logoutFunction(
  logout: any,
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance,
) {
  return async () => {
    try {
      await logout(null).unwrap();
      dispatch(clearCredentials());
      router.push("/");
    } catch (err) {
      console.error('Logout failed: ', err);
    }
  };
}

export function registerUserFunction(
  confirmPassword: string,
  password: string,
  register: any,
  userName: string,
  email: string,
  router: AppRouterInstance,
) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      console.log('Passwords do not match');
      return;
    }

    try {
      await register({ userName, email, password }).unwrap();
      router.push('/login');
    } catch (err) {
      console.log('err ➡️', err);
    }
  };
}

export const getJWTValueFromCookie = () => {
  const jwtCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('jwt='));

  if (jwtCookie) {
    return jwtCookie.split('=')[1];
  }

  return null;
}

export function deleteUserAccountFunction(
  deleteUser: any,
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance,
  userInfo: IUser,
) {
  return async () => {
    try {
      const jwtValue = getJWTValueFromCookie();

      if (!jwtValue) return;

      await deleteUser(userInfo, {});
      dispatch(clearCredentials());
      router.push("/login");
    } catch (error) {
      console.log('error ➡️', error)
    }
  };
}

export function updateUserAccountFunction(
  updateUser: any,
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance,
  userInfo: IUser,
  password: string,
  userName: string,
  email: string,
) {
  return async () => {
    const jwtValue = await getJWTValueFromCookie();

    if (!jwtValue) {
      dispatch(clearCredentials());
      router.push('/login');
      return;
    }

    try {
      const updatedUserData = {
        userName: userName,
        email: email,
        password
      };

      const res = await updateUser(updatedUserData, {
        headers: {
          Authorization: `Bearer ${jwtValue}`,
        },
      }).unwrap();

      dispatch(setCredentials({
        ...userInfo,
        email: res.email,
        userName: res.userName,
      }));

    } catch (err) {
      console.log('err ➡️', err)
    }
  };
}

export function forgotPasswordFunction(
  email: string,
  forgotPassword: any,
  router: AppRouterInstance,
) {
  return async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) return;
    try {
      const res = await forgotPassword({ email }).unwrap();
      console.info('res', res);
      router.push("/login");
    } catch (err) {
      console.log('onSubmitHandler error: ', err);
    }
  };
}

export function resetPasswordFunction(
  password: string,
  confirmPassword: string,
  resetPassword: any,
  userId: string | string[] | undefined,
  token: string | string[] | undefined,
  router: AppRouterInstance,
) {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !confirmPassword) return;
    if (password !== confirmPassword) {
      console.error("Passwords do not match .");
      return;
    }

    try {
      const res = await resetPassword({ password, userId, token }).unwrap();
      console.log(`${res.userName} your password has been reset successfully! now you can login`);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
}
