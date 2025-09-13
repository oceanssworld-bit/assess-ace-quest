import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Image, FileAudio, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  extractedTopics?: string[];
}

export const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((uploadedFiles: FileList) => {
    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'processing',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate processing
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            const isCompleted = newProgress >= 100;
            
            if (isCompleted) {
              clearInterval(interval);
              // Simulate extracted topics
              const topics = ['Machine Learning', 'Data Analysis', 'Statistical Methods', 'Python Programming'];
              return {
                ...f,
                progress: 100,
                status: 'completed',
                extractedTopics: topics.slice(0, Math.floor(Math.random() * 3) + 2)
              };
            }
            
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 500);
    });

    toast({
      title: "Files uploaded successfully",
      description: `Processing ${newFiles.length} file(s)...`,
    });
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  }, [handleFileUpload]);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (type.startsWith('audio/')) return <FileAudio className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Study Materials
          </CardTitle>
          <CardDescription>
            Upload PDFs, documents, images, or audio files to generate personalized assessments and study insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <div className="space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold">Drag and drop your files here</p>
                <p className="text-muted-foreground">or click to browse</p>
              </div>
              <Button 
                className="btn-gradient"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.wav,.m4a"
                className="hidden"
                onChange={handleFileInput}
              />
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOC, TXT, Images, and Audio files (max 20MB each)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Processing Files</CardTitle>
            <CardDescription>
              AI is analyzing your documents to extract key concepts and generate study materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{file.name}</p>
                      {getStatusIcon(file.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    
                    {file.status === 'processing' && (
                      <Progress value={file.progress} className="mt-2" />
                    )}
                    
                    {file.extractedTopics && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {file.extractedTopics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Badge 
                    variant={file.status === 'completed' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {file.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Stats */}
      {files.filter(f => f.status === 'completed').length > 0 && (
        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {files.filter(f => f.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Files Processed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {files.reduce((acc, f) => acc + (f.extractedTopics?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Topics Identified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {Math.floor(Math.random() * 20) + 15}
                </p>
                <p className="text-sm text-muted-foreground">Questions Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};