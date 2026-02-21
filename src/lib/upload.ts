import { supabase } from "./supabase";

/**
 * Upload a file to Supabase Storage (brand-assets bucket).
 * Returns the public URL on success or null on failure.
 */
export async function uploadBrandAsset(
  file: File,
  folder: "logos" | "vacancy-texts"
): Promise<string | null> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("brand-assets")
    .upload(safeName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("brand-assets").getPublicUrl(safeName);
  return data.publicUrl;
}
