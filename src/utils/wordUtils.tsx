const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

export const checkWord = async (word: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${word}`)
    return response.ok
  } catch (error) {
    console.error("Error checking word:", error)
    return false
  }
}

