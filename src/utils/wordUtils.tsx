const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

export const checkWord = async (word: string): Promise<boolean> => {
  // Don't make API call if word is not 5 letters
  if (word.length !== 5) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_BASE_URL}/${word.toLowerCase()}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Any non-200 response means the word is not valid
    // This includes 404 (word not found) and any other status
    return response.ok;

  } catch (error) {
    // Silently handle any errors (network issues, timeouts, aborts)
    return false;
  }
}