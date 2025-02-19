import { Photo } from "../../../database/models/photo.model.js";
import { catchError } from "../../middlewares/catchError.js";

const uploadPhoto = catchError(async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const { title } = req.body;
  const file = req.file;
  const imgUrl = file.filename; // Note: file.path is the absolute path of the file, but file.filename is the name of the file - we use file.filename to avoid path issues incase of changing the destination folder.

  const photo = await Photo.create({ title, imgUrl });
  res.status(201).json({ message: "Photo uploaded successfully", photo });
});

const uploadPhotos = catchError(async (req, res, next) => {
  const { title } = req.body;
  const { files } = req;
  const imgUrls = files.map((file) => file.filename);
  const photos = await Photo.insertMany(
    imgUrls.map((imgUrl) => ({ title, imgUrl }))
  );
  res.status(201).json({ message: "Photos uploaded successfully", photos });
});

const uploadPhotosWithFields = catchError(async (req, res, next) => {
  // console.log(req.files);
  const coverImage = req.files.cover[0].filename;
  const productImages = req.files.product.map((file) => file.filename);
  const photos = await Photo.create({
    title: req.body.title,
    imgUrl: coverImage,
    productImgUrls: productImages,
  });
  res.status(200).json({ message: "Photos uploaded successfully", photos });
});

const getPhotos = catchError(async (req, res, next) => {
  const photos = await Photo.find();
  // photos.forEach(photo => {
  //   photo.imgUrl = `http://localhost:4000/uploads/${photo.imgUrl}`;
  // });
  res.status(200).json({ message: "Photos fetched successfully", photos });
});

export { uploadPhoto, uploadPhotos, getPhotos, uploadPhotosWithFields };
