import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from "../../type";
import {RootState} from "../../app/store";
import {unsetUser} from "./usersSlice";

export const registration = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/registration',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const {data: response} = await axiosApi.post<RegisterResponse>('/users', registerMutation);

      console.log(response.user);
      return response.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  "users/login",
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data: response} = await axiosApi.post<RegisterResponse>("/users/sessions", loginMutation);
      return response.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(unsetUser());
  },
);