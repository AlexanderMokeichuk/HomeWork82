import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import {Grid} from "@mui/material";
import ArtistCard from "./components/ArtistCard/ArtistCard";

const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container display={"flex"} marginTop={20} alignItems={"center"} justifyContent={"center"} gap={2}>
      {artists.map((item) => {
        return <ArtistCard key={item._id} artist={item} />;
      })}

    </Grid>
  );
};

export default Artists;