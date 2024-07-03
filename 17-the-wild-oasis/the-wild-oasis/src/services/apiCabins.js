import supabase, { supabaseUrl } from "./supabase.js";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be deleted");
  }

  return data;
};

export const createEditCabin = async (newCabin, cabinID) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://afcofqoyoavfzctgfqvx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins");

  if (!cabinID) query = query.insert([{ ...newCabin, image: imagePath }]);
  else if (cabinID)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", cabinID);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image couldn't be uploaded and the cabin was not created",
    );
  }
  return data;
};
