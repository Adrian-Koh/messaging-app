const path = require("node:path");
const fs = require("node:fs");
const { DOWNLOAD_PATH } = require("../utils/multer");
const { uploadFile, downloadFile } = require("../utils/supabase");

async function editProfile(userid) {
  // TODO: handle no image uploaded
  const savedFilePath = path.join(req.savedPath, req.savedFileName);
  const fileContent = fs.readFileSync(savedFilePath);
  const photoUrl = await uploadFile(req.savedFileName, fileContent);
  // delete file in filesystem after upload
  fs.unlinkSync(savedFilePath);
  fs.rmdirSync(DOWNLOAD_PATH);
}

module.exports = { editProfile };
