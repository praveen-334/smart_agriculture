import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Languages } from "lucide-react";

interface VoiceInputProps {
  onVoiceInput?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function VoiceInput({ onVoiceInput, placeholder = "Tap to speak...", className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi-IN");

  const languages = [
    { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
    { code: "en-IN", name: "English", flag: "🇺🇸" },
    { code: "pa-IN", name: "Punjabi", flag: "🇮🇳" },
    { code: "gu-IN", name: "Gujarati", flag: "🇮🇳" },
    { code: "mr-IN", name: "Marathi", flag: "🇮🇳" },
  ];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        onVoiceInput?.(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className={`shadow-elegant ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm bg-transparent border-0 focus:ring-0"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            {transcript && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => speakText(transcript)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Voice Input Button */}
          <div className="flex items-center gap-4">
            <Button
              variant={isListening ? "destructive" : "voice"}
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className={`flex-1 ${isListening ? "animate-pulse-glow" : ""}`}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  {placeholder}
                </>
              )}
            </Button>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="p-3 bg-accent/50 rounded-lg border-l-4 border-primary">
              <p className="text-sm font-medium text-primary mb-1">You said:</p>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          {isListening && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                Listening...
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}