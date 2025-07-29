// Google Generative AI Service for ADmyBRAND Insights

interface AIResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class AIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateInsight(data: any, context: string): Promise<AIResponse> {
    try {
      const prompt = this.buildInsightPrompt(data, context);
      console.log('Generated prompt:', prompt);
      console.log('Making API call to:', `${this.baseUrl}?key=${this.apiKey.substring(0, 10)}...`);
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No response generated');
      }

      return {
        success: true,
        message: generatedText,
        data: result
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async chatMessage(message: string, chatHistory: ChatMessage[] = []): Promise<AIResponse> {
    try {
      const systemPrompt = `You are an AI assistant for ADmyBRAND Insights, a digital marketing analytics platform. 
You help digital marketing agencies analyze their campaign performance, understand trends, and optimize their strategies.
Be professional, knowledgeable about digital marketing, and provide actionable insights.`;
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUser: ${message}\n\nPlease provide a helpful response about digital marketing analytics:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Chat API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No response generated');
      }

      return {
        success: true,
        message: generatedText.trim(),
        data: result
      };
    } catch (error) {
      console.error('AI Chat Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private buildInsightPrompt(data: any, context: string): string {
    return `
As an AI assistant for ADmyBRAND Insights, a digital marketing analytics platform, provide a concise and actionable insight based on the following data:

Context: ${context}
Data: ${JSON.stringify(data, null, 2)}

Please provide:
1. A brief summary of what the data shows
2. Key insights or trends
3. Actionable recommendations for improving performance
4. Any potential areas of concern or opportunity

Keep your response professional, data-driven, and focused on helping digital marketing agencies optimize their campaigns.
    `.trim();
  }

  private buildChatContext(chatHistory: ChatMessage[]): string {
    const systemPrompt = `You are an AI assistant for ADmyBRAND Insights, a digital marketing analytics platform. 
You help digital marketing agencies analyze their campaign performance, understand trends, and optimize their strategies.

You should:
- Be professional and knowledgeable about digital marketing
- Provide actionable insights and recommendations
- Help users understand their data and metrics
- Suggest optimization strategies for campaigns
- Be concise but thorough in your responses

Previous conversation:`;

    const conversation = chatHistory.slice(-5).map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    return `${systemPrompt}\n${conversation}`;
  }

  async generateCampaignRecommendations(campaignData: any[]): Promise<AIResponse> {
    const topPerformers = campaignData
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3);
    
    const lowPerformers = campaignData
      .sort((a, b) => a.ctr - b.ctr)
      .slice(0, 3);

    return this.generateInsight({
      topPerformers,
      lowPerformers,
      totalCampaigns: campaignData.length
    }, 'Campaign Performance Analysis');
  }

  async generateRevenueInsights(revenueData: any[]): Promise<AIResponse> {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
    const avgMonthlyRevenue = totalRevenue / revenueData.length;
    const growth = revenueData.length > 1 
      ? ((revenueData[revenueData.length - 1].value - revenueData[0].value) / revenueData[0].value) * 100
      : 0;

    return this.generateInsight({
      totalRevenue,
      avgMonthlyRevenue,
      growth,
      monthlyData: revenueData
    }, 'Revenue Trend Analysis');
  }
}

export { AIService, type AIResponse, type ChatMessage };