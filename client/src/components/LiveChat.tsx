
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  messageType?: 'text' | 'suggestion' | 'link';
  metadata?: any;
}

interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session
    const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      sender: 'bot',
      message: "🙏 Kuzuzangpo! Welcome to Bhutan Travel Assistant. I can help you with:\n\n• Tour packages and pricing\n• Hotel recommendations\n• Flight information\n• Visa requirements\n• Festival dates\n• Custom itineraries\n\nHow can I assist you today?",
      timestamp: new Date(),
      messageType: 'text'
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const predefinedResponses = {
    visa: {
      message: "For Bhutan visa information:\n\n🛂 Tourist Visa Requirements:\n• Minimum daily tariff of $200-250 per person per night\n• Valid passport (6+ months validity)\n• Visa processed through licensed tour operator\n• No independent travel allowed\n\n📝 Required Documents:\n• Passport copy\n• Passport-size photos\n• Travel insurance\n• Tour booking confirmation\n\nWould you like me to connect you with our visa specialist?",
      suggestions: ["Connect with visa specialist", "View tour packages", "Check visa fees"]
    },
    tours: {
      message: "🏔️ Popular Bhutan Tour Categories:\n\n🎭 Cultural Tours (7-14 days)\n• Tiger's Nest Monastery\n• Dzongs and temples\n• Traditional festivals\n\n🥾 Trekking Adventures\n• Druk Path Trek\n• Snowman Trek\n• Jomolhari Trek\n\n🌸 Festival Tours\n• Paro Tsechu\n• Thimphu Tshechu\n• Punakha Drubchen\n\nWhich type interests you most?",
      suggestions: ["Cultural tours", "Trekking packages", "Festival tours", "Luxury tours"]
    },
    hotels: {
      message: "🏨 Bhutan Accommodation Options:\n\n✨ Luxury Hotels\n• Amankora resorts\n• Taj Tashi, Thimphu\n• Six Senses Bhutan\n\n🏡 Boutique Properties\n• Traditional architecture\n• Mountain views\n• Local experiences\n\n🏠 Authentic Homestays\n• Farm stays\n• Cultural immersion\n• Traditional meals\n\nWhat's your preferred accommodation style?",
      suggestions: ["Luxury hotels", "Boutique properties", "Homestays", "Budget options"]
    },
    flights: {
      message: "✈️ Flights to Bhutan:\n\n🛩️ Airlines:\n• Druk Air (Royal Bhutan Airlines)\n• Bhutan Airlines\n\n🌍 Routes:\n• Delhi - Paro\n• Kathmandu - Paro\n• Bangkok - Paro\n• Dhaka - Paro\n\n💰 Approximate Costs:\n• Delhi: $300-500\n• Kathmandu: $200-350\n• Bangkok: $400-600\n\nWould you like current flight schedules?",
      suggestions: ["Check flight schedules", "Book flights", "Airport transfer", "Baggage allowance"]
    },
    custom: {
      message: "🎯 Custom Tour Planning:\n\nI can help you create a personalized itinerary based on:\n\n⏰ Duration: 5-21 days\n👥 Group size: 1-15 people\n💰 Budget: $200-1000+ per day\n🎨 Interests: Culture, nature, adventure, spirituality\n📅 Travel dates: Any season\n\nTell me about your preferences and I'll suggest the perfect itinerary!",
      suggestions: ["Start custom planning", "View sample itineraries", "Budget calculator", "Best travel times"]
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      message: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message.trim().toLowerCase());
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const messageId = `bot_${Date.now()}`;
    
    // Check for keywords and return appropriate response
    if (userMessage.includes('visa') || userMessage.includes('entry') || userMessage.includes('permit')) {
      return {
        id: messageId,
        sender: 'bot',
        message: predefinedResponses.visa.message,
        timestamp: new Date(),
        messageType: 'suggestion',
        metadata: { suggestions: predefinedResponses.visa.suggestions }
      };
    }
    
    if (userMessage.includes('tour') || userMessage.includes('package') || userMessage.includes('itinerary')) {
      return {
        id: messageId,
        sender: 'bot',
        message: predefinedResponses.tours.message,
        timestamp: new Date(),
        messageType: 'suggestion',
        metadata: { suggestions: predefinedResponses.tours.suggestions }
      };
    }
    
    if (userMessage.includes('hotel') || userMessage.includes('accommodation') || userMessage.includes('stay')) {
      return {
        id: messageId,
        sender: 'bot',
        message: predefinedResponses.hotels.message,
        timestamp: new Date(),
        messageType: 'suggestion',
        metadata: { suggestions: predefinedResponses.hotels.suggestions }
      };
    }
    
    if (userMessage.includes('flight') || userMessage.includes('airline') || userMessage.includes('airport')) {
      return {
        id: messageId,
        sender: 'bot',
        message: predefinedResponses.flights.message,
        timestamp: new Date(),
        messageType: 'suggestion',
        metadata: { suggestions: predefinedResponses.flights.suggestions }
      };
    }
    
    if (userMessage.includes('custom') || userMessage.includes('personalized') || userMessage.includes('tailor')) {
      return {
        id: messageId,
        sender: 'bot',
        message: predefinedResponses.custom.message,
        timestamp: new Date(),
        messageType: 'suggestion',
        metadata: { suggestions: predefinedResponses.custom.suggestions }
      };
    }

    // Generic helpful response
    return {
      id: messageId,
      sender: 'bot',
      message: "I'd be happy to help you with that! Here are some things I can assist with:\n\n• Tour packages and recommendations\n• Hotel bookings and information\n• Flight schedules and booking\n• Visa requirements and process\n• Festival dates and cultural events\n• Custom itinerary planning\n\nCould you tell me more specifically what you're looking for?",
      timestamp: new Date(),
      messageType: 'suggestion',
      metadata: { 
        suggestions: ["Tour packages", "Hotel booking", "Flight info", "Visa help", "Custom planning", "Talk to human agent"] 
      }
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Bhutan Travel Assistant</h3>
            <p className="text-xs opacity-90">Typically replies instantly</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 h-[360px] space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  {msg.metadata?.suggestions && (
                    <div className="mt-2 space-y-1">
                      {msg.metadata.suggestions.map((suggestion: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                <Bot className="h-3 w-3 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
