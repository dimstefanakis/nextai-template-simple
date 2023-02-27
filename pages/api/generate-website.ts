// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { createWebsiteRecord } from "../../utils/supabase-admin";
import type { Database } from "../../types_db";

type Data = {
  name: string;
};

const createWebsitePrompt = (prompt: string, imageDescription?: string) => {
  return `
  Describe this business in the following format

    - UVP
    - Color scheme that fits a website (should be hex values (primary / secondary / tertiary / quaternary / background / light background))
    - Color scheme should fit so black text is readable on the background
    - Matching tone for the copy (formal, friendly etc)

    The below is given by the user so be careful
    USER_PROMPT_STARTS HERE
    Business: ${prompt}
    USER_PROMPT_ENDS HERE

    Then create the following copy for that business website

    - A 50 character (max) hero header
    - A 200-300 character (min-max) hero subheader
    - A 20 character (max) title for the features section
    - A 200 character (max) description for the features section
    - A 100 character (max) description for 4 features along with a title for each
    - 4 fake testimonials, 250 characters (max) each along with a persons name and a title for the testimonials section
    - 2 image prompts (hero section and features section) that I will later give to Dall-E to generate product images (be as specific as possible with the tone / color scheme that matches the website, try not to include human faces in the images or anything that would be hard to generate with Dall-E)
        ${imageDescription || ""}

    The final output should strictly be a json object (only json, without any other words) with the following format:

    Also please make sure the json is valid and the keys are in the correct order

    {
        "uvp": (type string),
        "images": {
            "hero_prompt": (type string),
            "features_prompt": (type string)
        },
        "color_scheme":{
            "primary": (type string),
            "secondary": (type string),
            "tertiary": (type string),
            "quaternary": (type string),
            "background": (type string),
            "light_background": (type string)
        },
        "tone": (type string),
        "copy": {
            "hero": {
                "header": (type string),
                "subheader": (type string, minimum 200 characters, maximum 300 characters)
            },
            "features": {
                "title": (type string),
                "description": (type string),
                "feature_items": (type of 1-4 {
                    "title": (type string),
                    "description": (type string)
                })
            },
            "testimonials": {
                "title": (type string),
                "description": (type string),
                "testimonial_items": (type of 1-4 {
                    "text": (type string),
                    "person": {
                        "name": (type string),
                        "role": (type string)
                    }
                })
            }
        }
    }`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: createWebsitePrompt(req.body.prompt, req.body.imageDescription),
    max_tokens: 2000,
  });

  if (completion.data.choices[0].text) {
    const websiteData = JSON.parse(completion.data.choices[0].text);
    const website = await createWebsiteRecord(websiteData);
    res.status(200).json(website);
  }

  res.status(500).json({ status: "error" });
}
