import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { updateWebsiteData } from "../../utils/supabase-admin";
import type { Database } from "../../types_db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const websiteId = req.body.websiteId;
  const updatedWebsiteData = req.body.data;
  const website = await updateWebsiteData(websiteId, updatedWebsiteData);
  res.status(200).json(website);
}
