import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists, selectLaudingArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import {Grid} from "@mui/material";
import ArtistCard from "./components/ArtistCard/ArtistCard";
import Spinner from "../../UI/components/Spinner/Spinner";

const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const lauding = useAppSelector(selectLaudingArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid
      container
      marginTop={20}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}>
      {lauding
        ? <Spinner />
        : artists.map((item) => {
          return <ArtistCard key={item._id} artist={item} />;
        })
      }
    </Grid>
  );
};

export default Artists;