import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Box, Button, Grid, SelectChangeEvent, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {selectUser} from "../Users/usersSlice";
import {Track} from "../../type";
import {selectArtists} from "../Artists/artistsSlice";
import {fetchArtists} from "../Artists/artistsThunks";
import {selectAlbums} from "../Albums/albumsSlice";
import {fetchAlbumsByQuery} from "../Albums/albumsThunks";
import {postTrack} from "./tracksThinks";

const defaultState: Track = {
  name: "",
  album: "",
  item: "",
  duration: "",
};

const AddNewTrack: React.FC = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = React.useState<string>("");
  const [album, setAlbum] = React.useState<string>("");
  const [formState, setFormState] = useState<Track>(defaultState);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);


  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(fetchArtists());
      if (artist !== "") {
        dispatch(fetchAlbumsByQuery(artist));
      }
    }
  }, [dispatch, user, navigate, artist]);

  const handleChangeArtist = (event: SelectChangeEvent) => {
    setArtist(event.target.value as string);
  };


  const handleChangeAlbum = (event: SelectChangeEvent) => {
    setAlbum(event.target.value as string);
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    let number = 1;
    if (name === "price") {
      number = parseInt(value);
    }

    if (number > 0) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postTrack({
      name: formState.name,
      album: album,
      item: formState.item,
      duration: formState.duration,
    }));
    setAlbum("");
    setArtist("");
    setFormState(defaultState);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      bgcolor={"white"}
      padding={5}
      borderRadius={4}
      mt={5}
    >
      <form onSubmit={onSubmit}>
        <Grid
          item
          sx={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            id="input-with-sx"
            name={"name"}
            label="Name"
            required

            value={formState.name}
            onChange={onChangeForm}
          />

          <TextField
            id="input-with-sx"
            name={"item"}
            label="Item"
            type={"number"}
            required

            value={formState.item}
            onChange={onChangeForm}
          />


          <TextField
            id="outlined-multiline-flexible"
            name={"duration"}
            label={"Duration"}
            required
            multiline

            value={formState.duration}
            onChange={onChangeForm}
          />


          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Artists</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={artist}
                label="Artists"
                onChange={handleChangeArtist}
              >
                {artists.map((artist) => (
                  <MenuItem
                    key={artist._id}
                    value={artist._id}
                  >
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Albums</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={album}
                label="Albums"
                onChange={handleChangeAlbum}
              >
                {albums.map((album) => (
                  <MenuItem
                    key={album._id}
                    value={album._id}
                  >
                    {album.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>


          <Button
            variant="contained"
            aria-label="Basic button group"
            type={"submit"}
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: "auto"
            }}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddNewTrack;