import {
  createBrowserSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types_db";
import { v4 as uuidv4 } from "uuid";

export const supabase = createBrowserSupabaseClient<Database>();

export const getAudiences = async () => {
  const { data, error } = await supabase.from("audiences").select("*");

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
};

export const uploadImage = async (image: any) => {
  const imageName = `${uuidv4()}.png`;
  const { error } = await supabase.storage
    .from("images")
    .upload(`public/${imageName}`, image);

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(`public/${imageName}`);

  return data;
};
