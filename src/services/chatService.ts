// Mock API service - replace with actual API calls
export const sendMessage = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response - replace with actual API call
  return `This is a response to: "${message}"`;
};