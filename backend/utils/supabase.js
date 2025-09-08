const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://xngztpgfiwfxejioajkg.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "Messaging App";

async function uploadFile(fileName, fileContent) {
  let filePath = fileName;
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileContent, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log(JSON.stringify(error));
    throw error;
  } else {
    return getFileUrl(filePath);
  }
}

async function downloadFile(fileName) {
  let filePath = fileName;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(filePath);

  if (error) {
    throw error;
  } else {
    return data;
  }
}

function getFileUrl(filePath) {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
}

module.exports = {
  uploadFile,
  downloadFile,
  getFileUrl,
};
