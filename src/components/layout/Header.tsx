import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Settings, User, TrendingUp, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ADmyBRAND</h1>
              <p className="text-xs text-primary font-medium">Insights</p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-sm font-medium">
            Overview
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Campaigns
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Analytics
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Reports
          </Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}