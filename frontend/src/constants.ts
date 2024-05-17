import {AlbumApi, ArtistsApi, TrackApi, User} from "./type";

export const API_URL = "http://localhost:8000";

export const PERMISSIONS_CHECK = (user: User | null, isPublished: boolean) => {
  let permissionsCheck = false;

  if (user?.role === "admin") {
    permissionsCheck = true;
  } else if (user?.role !== "admin" && isPublished) {
    permissionsCheck = true;
  }

  return permissionsCheck;
};
export const CHECKING_PUBLICATIONS = (array: ArtistsApi[] | AlbumApi[] | TrackApi[]) => {
  let checkResult = false;
  array.forEach((item) => {
    if (item.isPublished) {
      checkResult = true;
    }
  });

  return checkResult;
};

export const GOOGLE_CLIENT_ID = '886098740392-kbvoko9c22rtih0p0qjuhj8qptp4h81c.apps.googleusercontent.com';
