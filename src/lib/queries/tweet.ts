export const createTweet = async (content: string, mediaURLs: string[]) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/tweets', {
      method: 'POST',
      body: JSON.stringify({ content, mediaURLs }),
      credentials: 'include',
    })
    if (!res.ok) return null
    const tweet = await res.json()
    return tweet
  } catch (error) {
    console.error('Error creating tweet', error)
    return null
  }
}
