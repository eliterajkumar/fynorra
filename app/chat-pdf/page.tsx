'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Upload, FileText, Send, Bot, User, X, Download } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function ChatPDFPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! Upload a PDF document and I\'ll help you analyze and answer questions about it.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (file.type === 'application/pdf') {
        setIsLoading(true);
        const uploadResult = await uploadPDF(file);
        
        if (uploadResult) {
          const newFile: UploadedFile = {
            id: uploadResult.fileId || Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
          };
          setUploadedFiles(prev => [...prev, newFile]);
          toast.success(`${file.name} uploaded successfully!`);
          
          const aiMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `I've received your PDF "${file.name}". You can now ask me questions about its content!`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);
        }
        setIsLoading(false);
      } else {
        toast.error('Please upload only PDF files');
      }
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success('File removed');
  };

  const uploadPDF = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      console.log('Uploading PDF:', file.name);
      const response = await fetch('https://fynorra-rag-backend.onrender.com/rag/upload-pdfs', {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        body: formData
      });
      
      console.log('Upload response status:', response.status);
      const data = await response.json();
      console.log('Upload response data:', data);
      
      if (response.ok) {
        return data;
      } else {
        throw new Error(`Upload failed: ${data.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload PDF: ${error.message}`);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending message:', currentMessage);
      const response = await fetch('https://fynorra-rag-backend.onrender.com/rag/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          message: currentMessage,
          session_id: 'user_session_1'
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.reply || 'No response received',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(`HTTP ${response.status}: ${data.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(`Error: ${error.message || 'Failed to connect to AI service'}`);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">PDF Chat Assistant</h1>
          <p className="text-slate-400">Upload PDFs and chat with AI about their content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Side - PDF Upload */}
          <Card className="bg-slate-800 border-slate-700 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-4 hover:border-slate-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-lg mb-2">Drop PDF files here or click to upload</p>
                <p className="text-slate-400 text-sm">Supports PDF files up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              <div className="flex-1">
                <h3 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <FileText className="w-8 h-8 text-red-500 mt-1" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{file.name}</p>
                              <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
                              <Badge variant="secondary" className="mt-2">
                                PDF Document
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {uploadedFiles.length === 0 && (
                      <div className="text-center py-8 text-slate-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No files uploaded yet</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Chat Interface */}
          <Card className="bg-slate-800 border-slate-700 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Chat Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' ? 'bg-cyan-600' : 'bg-slate-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user' 
                            ? 'bg-cyan-600 text-white' 
                            : 'bg-slate-700 text-slate-100'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-slate-700 p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={uploadedFiles.length > 0 ? "Ask questions about your PDF..." : "Upload a PDF first to start chatting"}
                    className="bg-slate-700 border-slate-600 flex-1"
                    disabled={uploadedFiles.length === 0 || isLoading}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || uploadedFiles.length === 0 || isLoading}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {uploadedFiles.length === 0 && (
                  <p className="text-slate-400 text-xs mt-2">
                    Upload a PDF document to start asking questions
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
