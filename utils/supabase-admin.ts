import { createClient } from "@supabase/supabase-js";
import { toDateTime } from "./helpers";
import type { Database } from "../types_db";
import { v4 as uuidv4 } from "uuid";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const createWebsiteRecord = async (websiteData: any) => {
  const createdWebsiteData: Database["public"]["Tables"]["websites"]["Insert"] =
    {
      id: uuidv4(),
      data: websiteData,
      uvp: websiteData.uvp,
      template: "landing_page-1",
    };
  const { data, error } = await supabaseAdmin
    .from("websites")
    .insert([createdWebsiteData])
    .select("*");
  if (error) throw error;
  console.log(`Website inserted`);
  return data;
};

const getUserProfile = async (user_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", user_id)
    .single();
  if (error) throw error;
  return data;
};

const retrieveWebsite = async (websiteId: string) => {
  const { data, error } = await supabaseAdmin
    .from("websites")
    .select("*")
    .eq("id", websiteId)
    .single();
  console.log(data, websiteId);
  if (error) throw error;
  return data;
};

const updateWebsiteData = async (websiteId: string, websiteData: any) => {
  const { data, error } = await supabaseAdmin
    .from("websites")
    .update({ data: websiteData })
    .eq("id", websiteId)
    .select("*");
  if (error) throw error;
  return data;
};

const uploadImage = async (
  websiteId: string,
  imageUrl: any,
  dataKey: string
) => {
  let data, error;
  const website = await retrieveWebsite(websiteId);
  const websiteData = JSON.parse(JSON.stringify(website.data));
  if (dataKey == "image_prompt") {
    let res = await supabaseAdmin
      .from("websites")
      .update({
        data: {
          ...websiteData,
          images: {
            ...websiteData.images,
            hero_prompt: imageUrl,
          },
        },
      })
      .eq("id", websiteId)
      .select("*");
    data = res.data;
    error = res.error;
  } else if (dataKey == "features_prompt") {
    let res = await supabaseAdmin
      .from("websites")
      .update({
        data: {
          ...websiteData,
          images: {
            ...websiteData.images,
            features_prompt: imageUrl,
          },
        },
      })
      .eq("id", websiteId)
      .select("*");
    data = res.data;
    error = res.error;
  }

  if (error) throw error;
  return data;
};

export {
  getUserProfile,
  createWebsiteRecord,
  retrieveWebsite,
  updateWebsiteData,
  uploadImage,
};
