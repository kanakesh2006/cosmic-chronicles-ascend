
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Database, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScrapingStatus {
  totalEvents: number;
  dateRange?: {
    earliest: string;
    latest: string;
  };
}

const DataScrapingManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ScrapingStatus | null>(null);
  const [scrapingResult, setScrapingResult] = useState<any>(null);
  const { toast } = useToast();

  const checkStatus = async () => {
    try {
      const response = await fetch(`https://nrsjgfqmslqdjwxaulyl.supabase.co/functions/v1/get-space-events?action=status`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yc2pnZnFtc2xxZGp3eGF1bHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NDk3MTMsImV4cCI6MjA2NzIyNTcxM30.xJvn3JiWwOl-xNuQYEfISU0fvGl0DiS3BT1TTchfH2E`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check status');
      }

      const data = await response.json();
      setStatus(data);
      
      toast({
        title: "Status Updated",
        description: `Found ${data.totalEvents} events in database`,
      });
    } catch (error) {
      console.error('Status check error:', error);
      toast({
        title: "Error",
        description: "Failed to check database status",
        variant: "destructive",
      });
    }
  };

  const startScraping = async () => {
    setIsLoading(true);
    setScrapingResult(null);
    
    try {
      toast({
        title: "Scraping Started",
        description: "This will take several minutes to complete...",
      });

      // Use the new proxy function - no auth headers needed!
      const response = await fetch(`https://nrsjgfqmslqdjwxaulyl.supabase.co/functions/v1/trigger-scrape?action=scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setScrapingResult(result);
      
      if (result.success) {
        toast({
          title: "Scraping Complete!",
          description: `Successfully added ${result.totalEvents} space events`,
        });
        await checkStatus(); // Refresh status
      } else {
        throw new Error(result.message || 'Scraping failed');
      }
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: "Scraping Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="cosmic-gradient bg-clip-text text-transparent">
            Space Events Data Manager
          </span>
        </h1>
        <p className="text-gray-400">
          Scrape and manage historical space events from Wikipedia
        </p>
      </div>

      {/* Status Card */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-200">
            <Database className="w-5 h-5" />
            Database Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="text-2xl font-bold text-purple-300">{status.totalEvents}</p>
              </div>
              {status.dateRange && (
                <div>
                  <p className="text-sm text-gray-400">Date Range</p>
                  <p className="text-sm text-purple-300">
                    {status.dateRange.earliest} to {status.dateRange.latest}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">Loading status...</p>
          )}
          
          <Button onClick={checkStatus} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
        </CardContent>
      </Card>

      {/* Scraping Control Card */}
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-200">
            <Download className="w-5 h-5" />
            Data Scraping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-medium mb-1">What this does:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-200">
                  <li>Scrapes Wikipedia "On This Day" events for all 365 days</li>
                  <li>Filters for space-related events using AI keywords</li>
                  <li>Fetches NASA images for each event</li>
                  <li>Stores everything in your Supabase database</li>
                  <li>Takes 5-10 minutes to complete</li>
                </ul>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-300">Scraping in progress...</span>
                <span className="text-gray-400">This may take several minutes</span>
              </div>
              <Progress className="w-full" />
            </div>
          )}

          <Button 
            onClick={startScraping} 
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Scraping Events...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Start Scraping All Events
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Card */}
      {scrapingResult && (
        <Card className="bg-slate-800/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-300">Scraping Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-green-200">
                ✅ {scrapingResult.message}
              </p>
              <p className="text-sm text-gray-400">
                Total Events Added: {scrapingResult.totalEvents}
              </p>
              {scrapingResult.errors && scrapingResult.errors.length > 0 && (
                <div className="mt-4">
                  <p className="text-yellow-400 text-sm font-medium">Some errors occurred:</p>
                  <ul className="text-xs text-yellow-300 mt-1">
                    {scrapingResult.errors.map((error: string, index: number) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataScrapingManager;
