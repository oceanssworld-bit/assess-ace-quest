import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Lightbulb, BookOpen, Target, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: 'focus',
      priority: 'high',
      title: 'Focus on Statistical Methods',
      description: 'Your recent assessment scores suggest strengthening your understanding of statistical hypothesis testing and confidence intervals.',
      impact: 'Could improve overall performance by 15%',
      timeEstimate: '2-3 hours',
      actions: ['Review confidence intervals', 'Practice hypothesis testing', 'Complete statistical methods quiz'],
      confidence: 92
    },
    {
      id: 2,
      type: 'schedule',
      priority: 'medium',
      title: 'Optimize Study Schedule',
      description: 'Your performance is 18% higher during afternoon sessions. Consider scheduling complex topics between 2-4 PM.',
      impact: 'Better retention and understanding',
      timeEstimate: 'Ongoing',
      actions: ['Reschedule morning sessions', 'Block afternoon time for difficult topics', 'Review scheduling data'],
      confidence: 87
    },
    {
      id: 3,
      type: 'content',
      priority: 'medium',
      title: 'Expand Machine Learning Knowledge',
      description: 'You have strong foundations. Ready to tackle advanced topics like neural networks and ensemble methods.',
      impact: 'Accelerate learning progression',
      timeEstimate: '4-5 hours',
      actions: ['Start neural networks module', 'Practice ensemble methods', 'Join advanced ML discussion'],
      confidence: 94
    },
    {
      id: 4,
      type: 'review',
      priority: 'low',
      title: 'Review Python Fundamentals',
      description: 'Some gaps detected in object-oriented programming concepts. A quick review could solidify your foundation.',
      impact: 'Strengthen programming skills',
      timeEstimate: '1-2 hours',
      actions: ['Review OOP concepts', 'Practice class inheritance', 'Complete Python exercises'],
      confidence: 78
    }
  ];

  const studyPlan = [
    { time: '9:00 AM', activity: 'Python OOP Review', duration: '30 min', type: 'review' },
    { time: '2:00 PM', activity: 'Statistical Methods Practice', duration: '45 min', type: 'focus' },
    { time: '3:00 PM', activity: 'Neural Networks Introduction', duration: '60 min', type: 'content' },
    { time: '4:30 PM', activity: 'Assessment: Hypothesis Testing', duration: '30 min', type: 'assessment' }
  ];

  const weaknessAreas = [
    { topic: 'Hypothesis Testing', confidence: 65, improvement: '+12%' },
    { topic: 'Confidence Intervals', confidence: 71, improvement: '+8%' },
    { topic: 'OOP in Python', confidence: 78, improvement: '+15%' },
    { topic: 'Ensemble Methods', confidence: 54, improvement: '+22%' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus': return <Target className="h-4 w-4" />;
      case 'schedule': return <Clock className="h-4 w-4" />;
      case 'content': return <BookOpen className="h-4 w-4" />;
      case 'review': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'focus': return 'border-l-destructive';
      case 'content': return 'border-l-primary';
      case 'review': return 'border-l-warning';
      case 'assessment': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="academic-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Study Advisor</h3>
              <p className="text-muted-foreground">
                Personalized recommendations based on your learning patterns and performance data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered suggestions to optimize your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-lg font-bold text-primary">{rec.confidence}%</p>
                  </div>
                </div>

                <p className="text-muted-foreground">{rec.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-success">Expected Impact</p>
                    <p className="text-muted-foreground">{rec.impact}</p>
                  </div>
                  <div>
                    <p className="font-medium text-warning">Time Estimate</p>
                    <p className="text-muted-foreground">{rec.timeEstimate}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Suggested Actions:</p>
                  <div className="space-y-1">
                    {rec.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="btn-gradient w-full">
                  Start This Recommendation
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's AI-Generated Study Plan */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Today's AI Study Plan</CardTitle>
          <CardDescription>
            Optimized schedule based on your peak performance times and learning goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyPlan.map((item, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg border-l-4 bg-muted/30 ${getActivityTypeColor(item.type)}`}>
                <div className="text-center min-w-0">
                  <p className="text-sm font-medium">{item.time}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.activity}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {item.type}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weakness Analysis */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Focus Areas
          </CardTitle>
          <CardDescription>
            Topics that need attention based on assessment performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weaknessAreas.map((area, index) => (
              <div key={area.topic} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{area.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-success">{area.improvement}</span>
                    <span className="text-sm text-muted-foreground">
                      {area.confidence}% confidence
                    </span>
                  </div>
                </div>
                <Progress value={area.confidence} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};