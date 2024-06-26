import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Box, Button, Grid, SelectChangeEvent, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import FileInput from "../../UI/components/FileInput/FileInput";
import {Album} from "../../type";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {selectUser} from "../Users/usersSlice";
import {fetchArtists} from "../Artists/artistsThunks";
import {selectArtists} from "../Artists/artistsSlice";
import {postAlbum} from "./albumsThunks";

const defaultState: Album = {
  name: "",
  artist: "",
  createdAt: "",
  image: null,
};

const AddNewAlbum: React.FC = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = React.useState<string>('');
  const [formState, setFormState] = useState<Album>(defaultState);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(fetchArtists());
    }
  }, [dispatch, user, navigate]);


  const handleChange = (event: SelectChangeEvent) => {
    setArtist(event.target.value as string);
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postAlbum({
      name: formState.name,
      artist: artist,
      createdAt: formState.createdAt,
      image: formState.image,
    }));
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
            label="name"
            required

            value={formState.name}
            onChange={onChangeForm}
          />

          <TextField
            id="input-with-sx"
            name={"createdAt"}
            type={"number"}
            label="Date of creation"
            required

            value={formState.createdAt}
            onChange={onChangeForm}
          />


          <FileInput
            name={"image"}
            onChange={onChangeFileInput}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Artists</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={artist}
                label="Artists"
                onChange={handleChange}
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

export default AddNewAlbum;