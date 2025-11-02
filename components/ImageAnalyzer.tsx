"use client";
import { UploadImage } from "./UploadImage";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import AnalyzedResults from "./AnalayzedResults";
import { useState } from "react";
import { cn, fileToBase64 } from "@/lib/utils";
import { AnalysisData } from "./types";
import { toast } from "react-toastify";

const ImageAnalyzer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [selectImg, setSelectImg] = useState<{
    base64: { base64: string; mimeType: string };
    name: string;
  } | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectImg({
        base64: await fileToBase64(file),
        name: file.name,
      });
    }
  };

  const handleImageAnalyze = async () => {
    if (!selectImg) {
      toast.error("Please upload an image first.");
      return;
    }

    try {
      toast.loading("Analyzing image...");
      setLoading(true);
      const analyzeImage = fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify(selectImg),
      });

      const result = await analyzeImage.then((res) => res.json());
      setAnalysis(result);
      setLoading(false);
      toast.dismiss();
      toast.success("Image analyzed successfully!");
    } catch (err) {
      console.log("Error analyzing image:", err);
      toast.dismiss();
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex flex-col gap-4 border p-4 rounded-xl shadow-lg">
        <section
          className={cn(
            "upload-img",
            loading && "opacity-50 pointer-events-none"
          )}
        >
          <UploadImage uploadImage={handleImageUpload} />
        </section>
        {selectImg && (
          <section className="w-full border-[1.5px] border-gray-300 rounded-md p-4 bg-gray-100/40 shadow-md">
            <AspectRatio
              ratio={16 / 9}
              className="w-full rounded-md overflow-hidden"
            >
              <Image
                src={
                  selectImg.base64.base64
                    ? `data:${selectImg.base64.mimeType};base64,${selectImg.base64.base64}`
                    : ""
                }
                alt="Image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
          </section>
        )}
        <Button
          className="h-12 w-full justify-center"
          onClick={handleImageAnalyze}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Eye className="mr-2 size-4" />
          )}
          Analyze Image
        </Button>
      </div>
      {analysis && <AnalyzedResults analysis={analysis} />}
    </div>
  );
};

export default ImageAnalyzer;
