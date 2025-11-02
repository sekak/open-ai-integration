import { Eye, Grid, Palette } from "lucide-react";
import { Badge } from "./ui/badge";
import { AnalysisData } from "./types";

const AnalyzedResults = ({ analysis }: { analysis: AnalysisData }) => {
  console.log(analysis.details.DetectedObjects.map(obj => obj));
  return (
    <footer className="flex flex-col gap-6">
      <div className="shadow-lg border p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Visual Analysis</h2>
        </div>
        <p className="text-foreground leading-relaxed text-lg">
          {analysis.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="shadow-lg border p-4 rounded-xl flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-2 text-lg">
            <Grid className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Detected Objects</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.details.DetectedObjects.map((object,i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-base px-4 py-2"
              >
                {object}
              </Badge>
            ))}
          </div>
        </div>
        <div className="shadow-lg border p-4 rounded-xl flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-2 text-lg">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Color Analysis</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.details.ColorAnalysis.map((color, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-base px-4 py-2"
              >
                {color}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* additional analysis sections */}
      <div className="grid md:grid-cols-2 gap-6 w-full">
        <div className="shadow-lg border p-4 rounded-xl flex flex-col gap-4 flex-1">
          <h2 className="text-xl font-semibold">Mood & Atmosphere</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.details.MoodAtmosphere.map((mood) => (
              <Badge key={mood} variant="default" className="text-base px-4 py-2">
                {/* {analysis.mood} */}
                {mood}
              </Badge>
            ))}
          </div>
        </div>

        <div className="shadow-lg border p-4 rounded-xl flex flex-col gap-4 flex-1">
          <div>
            <h2 className="text-xl font-semibold">Image Quality</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.details.ImageQuality.map((quality) => (
              <Badge key={quality} variant="default" className="text-base px-4 py-2">
                {/* {analysis.quality} */}
                {quality}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AnalyzedResults;
