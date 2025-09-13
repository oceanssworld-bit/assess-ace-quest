import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, BookOpen, Brain, TrendingUp, FileText, Award, Clock, Target } from "lucide-react";
import { DocumentUpload } from "./DocumentUpload";
import { ProgressAnalytics } from "./ProgressAnalytics";
import { AIRecommendations } from "./AIRecommendations";
import { AssessmentGenerator } from "./AssessmentGenerator";

const StudyDashboard = () => {
  const [studyStreak, setStudyStreak] = useState(7);
  const [weeklyGoal, setWeeklyGoal] = useState(85);
  const [completedAssessments, setCompletedAssessments] = useState(12);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            PersonalStudy AI
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your intelligent study companion for document processing, automated assessments, and personalized learning insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-primary">{studyStreak} days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-success to-success/80 flex items-center justify-center">
                  <Award className="h-6 w-6 text-success-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Progress</p>
                  <p className="text-2xl font-bold text-primary">{weeklyGoal}%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <Progress value={weeklyGoal} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assessments</p>
                  <p className="text-2xl font-bold text-primary">{completedAssessments}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold text-primary">4.2h</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-warning to-warning/80 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <ProgressAnalytics />
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <AssessmentGenerator />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <AIRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyDashboard;