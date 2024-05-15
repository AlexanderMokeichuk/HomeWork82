import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbumsByQuery} from "./albumsThunks";
import {selectAlbums, selectLaudingAlbums} from "./albumsSlice";
import {Alert, AlertTitle, Grid, Typography} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner";
import AlbumCard from "./components/AlbumCard/AlbumCard";
import {CHECKING_PUBLICATIONS} from "../../constants";
import {selectUser} from "../Users/usersSlice";

const Albums: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const lauding = useAppSelector(selectLaudingAlbums);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumsByQuery(id));
    }
  }, [id, dispatch]);

  const check = CHECKING_PUBLICATIONS(albums);

  return (
    <Grid container display={"flex"} marginTop={20} alignItems={"center"} justifyContent={"center"} gap={2}>
      {lauding
        ? <Spinner/>
        : (
          <>
            {
              !albums.length
                ? (
                  <Alert severity="info" sx={{width: "100%"}}>
                    <AlertTitle>Info</AlertTitle>
                    <Typography variant={"h4"}>
                      This Artist has no albums!!
                    </Typography>
                  </Alert>
                )
                : check || user?.role === "admin"
                  ? albums.map((album) => {
                    return <AlbumCard key={album._id} album={album} artist={id!}/>;
                  })
                  : (
                    <Alert severity="info" sx={{width: "100%", margin: "auto"}}>
                      <AlertTitle>Info</AlertTitle>
                      <Typography variant={"h6"}>
                        There are no published albums!!
                      </Typography>
                    </Alert>
                  )
            }
          </>
        )
      }
    </Grid>
  );
};

export default Albums;