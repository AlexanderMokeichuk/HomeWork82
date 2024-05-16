import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists, selectLaudingArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import {Grid} from "@mui/material";
import ArtistCard from "./components/ArtistCard/ArtistCard";
import Spinner from "../../UI/components/Spinner/Spinner";
import {CHECKING_PUBLICATIONS} from "../../constants";
import {selectUser} from "../Users/usersSlice";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert";

const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const lauding = useAppSelector(selectLaudingArtists);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const check = CHECKING_PUBLICATIONS(artists);

  return (
    <Grid
      container
      marginTop={20}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}>
      {lauding
        ? <Spinner/>
        : (
          <>
            {check || user?.role === "admin"
              ? artists.map((item) => {
                return <ArtistCard key={item._id} artist={item}/>;
              })
              : (
                <OwnAlert>
                  There is no published artist!!
                </OwnAlert>
              )
            }
          </>
        )
      }
    </Grid>
  )
    ;
};

export default Artists;