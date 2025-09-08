import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, Scan, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropDiagnosisProps {
  onBack: () => void;
}

export const CropDiagnosis: React.FC<CropDiagnosisProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  };

  const handleDiagnosis = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: 'Leaf Blight',
        confidence: 92,
        severity: 'Moderate',
        treatment: [
          'Apply copper-based fungicide',
          'Improve drainage in the field',
          'Remove affected leaves',
          'Ensure proper spacing between plants'
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Regular monitoring',
          'Proper crop rotation'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-earth shadow-card p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">
            {t('cropDiagnosis')}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Upload Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-6 h-6 text-primary" />
              <span>{t('uploadImage')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {previewUrl ? (
                <div className="space-y-4">
                  <img 
                    src={previewUrl} 
                    alt="Crop preview" 
                    className="mx-auto max-h-64 rounded-lg shadow-natural"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl('');
                      setAnalysisResult(null);
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Upload crop image</p>
                    <p className="text-muted-foreground">Take a clear photo of affected leaves or plants</p>
                  </div>
                  <label className="cursor-pointer">
                    <Button variant="farmer" asChild>
                      <span>Choose Image</span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {selectedImage && !analysisResult && (
              <Button 
                variant="field" 
                size="lg" 
                onClick={handleDiagnosis}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Scan className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    {t('diagnose')}
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Analysis Result */}
        {analysisResult && (
          <Card className="shadow-natural animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-success">
                <CheckCircle className="w-6 h-6" />
                <span>Diagnosis Complete</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Disease Info */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{analysisResult.disease}</div>
                  <div className="text-sm text-muted-foreground">Detected Disease</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-success">{analysisResult.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-warning">{analysisResult.severity}</div>
                  <div className="text-sm text-muted-foreground">Severity</div>
                </div>
              </div>

              {/* Treatment */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Recommended Treatment</h3>
                <div className="space-y-2">
                  {analysisResult.treatment.map((step: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                      <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-success-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prevention */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Prevention Tips</h3>
                <div className="grid gap-2">
                  {analysisResult.prevention.map((tip: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="farmer" size="lg" className="w-full">
                Save Diagnosis Report
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};