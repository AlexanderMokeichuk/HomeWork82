import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbumsByQuery} from "./albumsThunks";
import {selectAlbums, selectLaudingAlbums} from "./albumsSlice";
import {Grid} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner";
import AlbumCard from "./components/AlbumCard/AlbumCard";
import {CHECKING_PUBLICATIONS} from "../../constants";
import {selectUser} from "../Users/usersSlice";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert";

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
                  <OwnAlert>
                    This Artist has no albums!!
                  </OwnAlert>
                )
                : check || user?.role === "admin"
                  ? albums.map((album) => {
                    return <AlbumCard key={album._id} album={album} artist={id!}/>;
                  })
                  : (
                    <OwnAlert>
                      There are no published albums!!
                    </OwnAlert>
                  )
            }
          </>
        )
      }
    </Grid>
  );
};

export default Albums;