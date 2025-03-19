import { config } from './config';

export interface WaitlistFormData {
  name: string;
  email: string;
  industry: string;
  currentRole: string;
}

export async function submitToWaitlist(data: WaitlistFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Create a URL object to handle the script URL
    const scriptUrl = new URL(config.googleScriptUrl);
    
    // Add form data as query parameters
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        scriptUrl.searchParams.append(key, value);
      }
    });
    
    return new Promise((resolve, reject) => {
      // Create a unique callback name
      const callbackName = `googleScript_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Add the callback parameter to the URL
      scriptUrl.searchParams.append('callback', callbackName);
      
      // Create global callback function
      (window as any)[callbackName] = (response: any) => {
        // Clean up
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        clearTimeout(timeout);
        
        if (response && response.success) {
          resolve({ success: true });
        } else {
          reject(new Error(response?.error || 'Submission failed'));
        }
      };
      
      // Create script element
      const script = document.createElement('script');
      script.src = scriptUrl.toString();
      script.async = true;
      
      // Handle load errors
      script.onerror = () => {
        // Clean up
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        clearTimeout(timeout);
        reject(new Error('Failed to contact the server'));
      };
      
      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        // Clean up
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        reject(new Error('Request timed out'));
      }, 15000); // 15 second timeout
      
      // Add the script to the document
      document.body.appendChild(script);
    });
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}