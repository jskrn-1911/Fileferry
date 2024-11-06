export const fetchDailyBackgrounds = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=nature&orientation=landscape`)
    const data = await response.json();
    return data?.urls?.full || ''
}