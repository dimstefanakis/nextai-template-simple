import type { NextApiRequest, NextApiResponse } from "next";
import { uploadImage } from "../../utils/supabase-admin";
import type { Database } from "../../types_db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const websiteId = req.body.websiteId;
  const image = req.body.image;
  const dataKey = req.body.dataKey;
  const data = await uploadImage(websiteId, image, dataKey);
  res.status(200).json(data);
}
