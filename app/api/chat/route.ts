import { NextResponse } from 'next/server';
import {
  type ChatRequest,
  type ChatResponse,
  type ChatResponseAction
} from '@/lib/types';

async function callBackendAPI(chatRequest: ChatRequest): Promise<ChatResponse> {
  try {
    console.log('Calling backend API:', process.env.BACKEND_API_URL);

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend API non-OK response:', response.status, errorData);
      throw new Error(`Backend API error: ${response.status} - ${errorData.detail || errorData.message || 'Unknown error from backend'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling backend API:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body: { message?: string; chatId?: string | null } = await request.json();

    const { message, chatId } = body;

  
    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and cannot be empty' },
        { status: 400 }
      );
    }

    const chatRequest: ChatRequest = {
      chatId: chatId,
      message: message.trim(),
    };

    // Call the backend
    const backendResponse = await callBackendAPI(chatRequest);

    const frontendChatResponse: ChatResponse = {
      message: backendResponse.message,
      chatId: backendResponse.chatId,
      action: backendResponse.action,
    };

    return NextResponse.json(frontendChatResponse);

  } catch (error) {
    console.error('Error in chat API route:', error);

    // Fallback response
    const fallbackAction: ChatResponseAction = {
      action_type: 'show_contact',
      data: {},
    };

    return NextResponse.json(
      {
        message: 'Sorry, I have encountered a technical problem. Retry later or contact Lorenzo directly using the form',
        error: 'Error communicating with LorenzoBot',
        action: fallbackAction,
      },
      { status: 500 }
    );
  }
}