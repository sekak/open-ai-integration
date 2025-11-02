export interface AnalysisData {
  description: string;
  details: {
    DetectedObjects: string[];
    ColorAnalysis: string[];
    MoodAtmosphere: string[];
    ImageQuality: string[];
  };
}
