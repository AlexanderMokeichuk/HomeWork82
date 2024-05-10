import express from "express";
import {imagesUpload} from "../multer";
import {AlbumApi, AlbumArtistData} from "../type";
import Album from "../models/Album";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
  try {
    const postAlbum = {
      name: req.body.name,
      artist: req.body.artist,
      createdAt: parseInt(req.body.createdAt),
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
      const albumsById = await Album.find({artist: query}).sort({createdAt: - 1});
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

albumsRouter.patch("/:id/togglePublished", auth, permit(["admin"]), async (req, res, next) => {
  const {id} = req.params;

  try {

    const album = await Album.findById({_id: id});

    if (!album) return res.status(400).send({error: "Not found album!"});

    album.isPublished = !album.isPublished;
    await album.save();
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.delete('/:id', auth, permit(["admin"]), async (req, res, next) => {
  const id = req.params.id;
  try {

    const album = await Album.findOne({_id: id});
    if (!album) {
      return res.status(404).send({error: "Not found album!"});
    }

    await Album.findOneAndDelete({_id: id});
    return res.send({ message: 'Deleted!', id: id });
  } catch (e) {
    next();
  }
});

export default albumsRouter;