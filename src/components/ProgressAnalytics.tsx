import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Clock, Target, Award, Calendar } from "lucide-react";

export const ProgressAnalytics = () => {
  const weeklyData = [
    { day: 'Mon', studyTime: 45, assessments: 2, score: 85 },
    { day: 'Tue', studyTime: 60, assessments: 3, score: 92 },
    { day: 'Wed', studyTime: 30, assessments: 1, score: 78 },
    { day: 'Thu', studyTime: 75, assessments: 4, score: 96 },
    { day: 'Fri', studyTime: 40, assessments: 2, score: 88 },
    { day: 'Sat', studyTime: 90, assessments: 5, score: 94 },
    { day: 'Sun', studyTime: 50, assessments: 2, score: 90 }
  ];

  const subjects = [
    { name: 'Machine Learning', progress: 85, timeSpent: '12.5h', lastStudied: '2 hours ago', performance: 92 },
    { name: 'Data Analysis', progress: 72, timeSpent: '8.2h', lastStudied: '1 day ago', performance: 88 },
    { name: 'Statistics', progress: 94, timeSpent: '15.1h', lastStudied: '30 min ago', performance: 96 },
    { name: 'Python Programming', progress: 67, timeSpent: '6.8h', lastStudied: '3 days ago', performance: 82 }
  ];

  const achievements = [
    { title: 'Week Warrior', description: 'Studied 7 days in a row', icon: Award, color: 'text-yellow-500' },
    { title: 'Quick Learner', description: 'Completed 5 assessments in one day', icon: TrendingUp, color: 'text-green-500' },
    { title: 'Time Master', description: 'Studied for 2+ hours today', icon: Clock, color: 'text-blue-500' },
    { title: 'Perfect Score', description: 'Got 100% on last assessment', icon: Target, color: 'text-purple-500' }
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-primary">6.2h</p>
                <p className="text-xs text-muted-foreground">Study Time</p>
              </div>
              <Clock className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-success">89%</p>
                <p className="text-xs text-success">+5% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-primary">19</p>
                <p className="text-xs text-muted-foreground">Assessments</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goal</p>
                <p className="text-2xl font-bold text-warning">85%</p>
                <p className="text-xs text-muted-foreground">Weekly target</p>
              </div>
              <Target className="h-8 w-8 text-warning opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>
            Your study activity and performance over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Study Time: {day.studyTime}min</span>
                    <span className={getPerformanceColor(day.score)}>
                      Score: {day.score}%
                    </span>
                  </div>
                  <Progress value={(day.studyTime / 90) * 100} className="h-2" />
                </div>
                
                <Badge variant="secondary" className="ml-2">
                  {day.assessments}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Progress */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>
            Track your advancement across different topics and learning areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={subject.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {subject.timeSpent} • Last studied {subject.lastStudied}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{subject.progress}%</p>
                    <p className={`text-sm ${getPerformanceColor(subject.performance)}`}>
                      Avg: {subject.performance}%
                    </p>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>
            Celebrate your learning milestones and accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={achievement.title} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                <div className={`p-2 rounded-full bg-background ${achievement.color}`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};