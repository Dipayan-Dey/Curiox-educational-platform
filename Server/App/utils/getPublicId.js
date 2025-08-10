export default  function getPublicId(cloudinaryUrl) {
  // Example Cloudinary URL:
  // https://res.cloudinary.com/<cloud_name>/video/upload/v1234567890/folder/abc123.mp4
  const parts = cloudinaryUrl.split("/");
  const publicIdWithExtension = parts.slice(parts.indexOf("upload") + 1).join("/"); // folder/abc123.mp4
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove .mp4 or .jpg
  return publicId;
}
