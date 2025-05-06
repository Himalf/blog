import { supabase } from "../utils/supabase.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const uploadImageToSupabase = async (filePath, originalname) => {
  const ext = originalname.split(".").pop();
  const uniqueName = `${uuidv4()}.${ext}`;
  const buffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(uniqueName, buffer, {
      contentType: `image/${ext}`,
      cacheControl: "3600",
    });

  if (error) throw error;

  const publicUrl = supabase.storage
    .from("blog-images")
    .getPublicUrl(uniqueName).data.publicUrl;

  return publicUrl;
};
