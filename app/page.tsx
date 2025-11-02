import ImageAnalyzer from "@/components/ImageAnalyzer";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen max-h-screen overflow-x-hidden p-4">
     <div className="max-w-[1200px] w-full mx-auto">
       <div className="flex flex-col items-center p-8">
        <div className="flex items-center gap-2">
          <Sparkles className="size-8 stroke-2"/>
          <h1 className="font-bold text-5xl">Image Analyzer</h1>
        </div>
        <p className="text-lg py-3 text-gray-500">
          Upload an image to get comprehensive AI-powered visual analysis
        </p>
      </div>
      <ImageAnalyzer />
     </div>
    </main>
  );
}
