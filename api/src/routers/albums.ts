import express from "express";
import {imagesUpload} from "../multer";
import {AlbumApi, AlbumArtistData, AlbumFront} from "../type";
import Album from "../models/Album";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const postAlbum: AlbumFront = {
      name: req.body.name,
      artist: req.body.artist,
      createdAt: req.body.createdAt,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(postAlbum);
    await album.save();

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

albumsRouter.get("/", async (req, res, next) => {
  const query = req.query.artist as string;
  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({ error: 'Not found artist!!' });
      }
      const albumsById = await Album.find({artist: query}).sort({createdAr: -1});
      return res.send(albumsById);
    }

    const albums: AlbumApi[] = await Album.find();
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).send({ error: 'Artist not found!' });
  }

  try {
    const albumById = await Album.findOne<AlbumArtistData>({_id: id}).populate(
      'artist',
      'name description image'
    );

    if (!albumById) {
      return res.status(422).send({ error: 'Artist not found!' });
    }

    return res.send(albumById);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;