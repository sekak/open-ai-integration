import { AnalysisData } from "@/components/types";
import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const model = "gemini-2.5-flash";

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A detailed description of the image, 4 to 7 lines long."
    },
    details: {
      type: Type.OBJECT,
      properties: {
        "DetectedObjects": {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of keywords for objects detected in the image."
        },
        "ColorAnalysis": {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of keywords describing the dominant colors."
        },
        "MoodAtmosphere": {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of keywords for the mood and atmosphere."
        },
        "ImageQuality": {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of keywords describing the image quality."
        }
      },
      required: ["DetectedObjects", "ColorAnalysis", "MoodAtmosphere", "ImageQuality"]
    }
  },
  required: ["description", "details"]
};
  
export const analyzeImageWithGemini = async (base64ImageData: string, mimeType: string): Promise<AnalysisData> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: "Analyze this image and provide a response in the specified JSON format. The response must include: 1. A 'description' field containing a summary of the image between 4 and 7 lines. 2. A 'details' object containing keyword arrays for the following categories: 'Detected Objects', 'Color Analysis', 'Mood & Atmosphere', and 'Image Quality'.",
    };

    const response = await ai.models.generateContent({
         model: model,
        contents: { parts: [imagePart, textPart] },
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        }
    });

    try {
      const jsonText = response?.text?.trim();
      if (!jsonText) throw new Error("Empty response from Gemini API");
      return JSON.parse(jsonText) as AnalysisData;
    } catch(e) {
      console.error("Failed to parse Gemini JSON response:", e, "Raw response:", response.text);
      throw new Error("Received an invalid format from the analysis service.");
    }

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};

export async function POST(req: Request) {
  const { base64 } = await req.json();
  
  const response = await analyzeImageWithGemini(base64.base64, base64.mimeType);
  return NextResponse.json(response);
}