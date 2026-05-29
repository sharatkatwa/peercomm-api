import ImageKit from "@imagekit/nodejs";

const imagekitInstance = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE,
  publicKey: process.env.IMAGEKIT_PUBLIC,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

const uploadToImagekit = async (file, userId) => {
  return await imagekitInstance.files.upload({
    file: await ImageKit.toFile(file.buffer, file.originalname),
    fileName: `product-${userId}-${Date.now()}`,
    folder: "/peerCommerce/products",
  });
};
