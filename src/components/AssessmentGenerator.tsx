import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Brain, CheckCircle, Clock, Play, RotateCcw, Award } from "lucide-react";

interface Assessment {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  questions: number;
  timeLimit: number;
  generatedFrom: string;
  status: 'available' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const AssessmentGenerator = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      subject: 'Machine Learning',
      difficulty: 'Medium',
      questions: 15,
      timeLimit: 30,
      generatedFrom: 'ML_Textbook_Chapter3.pdf',
      status: 'completed',
      score: 87,
      completedAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Statistical Analysis Quiz',
      subject: 'Statistics',
      difficulty: 'Hard',
      questions: 20,
      timeLimit: 45,
      generatedFrom: 'Statistics_Lecture_Notes.pdf',
      status: 'available'
    },
    {
      id: '3',
      title: 'Python Programming Basics',
      subject: 'Programming',
      difficulty: 'Easy',
      questions: 10,
      timeLimit: 20,
      generatedFrom: 'Python_Tutorial_Audio.mp3',
      status: 'in-progress'
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const sampleQuestions: Question[] = [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the primary goal of supervised learning?',
      options: [
        'To find hidden patterns in unlabeled data',
        'To learn from input-output pairs to make predictions',
        'To reduce the dimensionality of data',
        'To cluster similar data points together'
      ],
      correctAnswer: 'To learn from input-output pairs to make predictions',
      explanation: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs, enabling predictions on new data.',
      difficulty: 'medium'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'Which algorithm is commonly used for classification problems?',
      options: [
        'K-means clustering',
        'Principal Component Analysis',
        'Random Forest',
        'DBSCAN'
      ],
      correctAnswer: 'Random Forest',
      explanation: 'Random Forest is an ensemble method that can be used for both classification and regression tasks.',
      difficulty: 'medium'
    }
  ];

  const generateNewAssessment = () => {
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      title: 'Custom Assessment',
      subject: 'Mixed Topics',
      difficulty: 'Medium',
      questions: 12,
      timeLimit: 25,
      generatedFrom: 'Recently uploaded documents',
      status: 'available'
    };

    setAssessments(prev => [...prev, newAssessment]);
    toast({
      title: "Assessment Generated",
      description: "New assessment created from your uploaded documents",
    });
  };

  const startAssessment = (assessmentId: string) => {
    setAssessments(prev => prev.map(a => 
      a.id === assessmentId ? { ...a, status: 'in-progress' } : a
    ));
    toast({
      title: "Assessment Started",
      description: "Good luck! Take your time and think carefully.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Play className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-warning" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Assessment Generator Header */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Assessment Generator
          </CardTitle>
          <CardDescription>
            Generate personalized assessments from your uploaded study materials using advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="15">
                <SelectTrigger>
                  <SelectValue placeholder="Questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                  <SelectItem value="25">25 Questions</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                  <SelectItem value="stats">Statistics</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="btn-gradient"
              onClick={generateNewAssessment}
            >
              Generate Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4">
            {assessments.filter(a => a.status === 'available').map((assessment) => (
              <Card key={assessment.id} className="academic-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{assessment.title}</h3>
                        <Badge className={getDifficultyColor(assessment.difficulty)}>
                          {assessment.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">Subject: {assessment.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        Generated from: {assessment.generatedFrom}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{assessment.questions} questions</span>
                        <span>{assessment.timeLimit} minutes</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        className="btn-gradient"
                        onClick={() => startAssessment(assessment.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Assessment
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview Questions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {assessments.filter(a => a.status === 'in-progress').length > 0 ? (
            <Card className="academic-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Python Programming Basics</span>
                  <Badge variant="outline" className="text-warning">
                    <Clock className="h-4 w-4 mr-1" />
                    15:32 remaining
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {sampleQuestions[currentQuestion]?.question}
                  </h3>
                  
                  <div className="space-y-2">
                    {sampleQuestions[currentQuestion]?.options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          onChange={(e) => setSelectedAnswers(prev => ({
                            ...prev,
                            [currentQuestion]: e.target.value
                          }))}
                          className="text-primary"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    className="btn-gradient"
                    onClick={() => {
                      if (currentQuestion < sampleQuestions.length - 1) {
                        setCurrentQuestion(prev => prev + 1);
                      } else {
                        setShowResults(true);
                      }
                    }}
                  >
                    {currentQuestion < sampleQuestions.length - 1 ? 'Next' : 'Submit'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="academic-card">
              <CardContent className="p-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No assessments in progress</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {assessments.filter(a => a.status === 'completed').map((assessment) => (
              <Card key={assessment.id} className="academic-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{assessment.title}</h3>
                        <Badge variant="outline" className="text-success">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">Subject: {assessment.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        Completed {assessment.completedAt}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{assessment.questions} questions</span>
                        <span>Score: <span className="text-success font-medium">{assessment.score}%</span></span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline">
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retake
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};