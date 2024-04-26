import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbumsByQuery} from "./albumsThunks";
import {selectAlbums, selectLaudingAlbums} from "./albumsSlice";
import {Grid} from "@mui/material";
import Spinner from "../../Ul/components/Spinner/Spinner";
import AlbumCard from "./components/AlbumCard/AlbumCard";

const Albums: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const lauding = useAppSelector(selectLaudingAlbums);


  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumsByQuery(id));
    }
  }, [id, dispatch]);
  return (
    <Grid container display={"flex"} marginTop={20} alignItems={"center"} justifyContent={"center"} gap={2}>
      {lauding
        ? <Spinner />
        : albums.map((album) => {
          return <AlbumCard key={album._id} album={album} />;
        })
      }
    </Grid>
  );
};

export default Albums;