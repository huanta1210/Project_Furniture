import cloudinary from "../configs/cloudinaryConfig";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const images = req.files.map((file) => file.path);

    if (!images) {
      return res.status(400).json({
        message: "Images not found",
      });
    }

    const uploadImages = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
      uploadImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    return res.status(200).json({
      message: "Images uploaded successfully",
      datas: uploadImages,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteImages = async (req, res) => {
  try {
    const publicId = req.params.publicId;

    if (!publicId) {
      return res.status(404).json({
        message: "PublicId not found",
      });
    }
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(404).json({
        message: "Destroy image unsuccessful",
      });
    }
    return res.status(200).json({
      message: "Destroy image successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
