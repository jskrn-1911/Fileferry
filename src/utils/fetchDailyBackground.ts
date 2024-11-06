import { cloudinaryImages } from "@/assets/cloudinaryUmages";

export const fetchDailyBackgrounds = async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=nature&orientation=landscape`)
        const data = await response.json();
        if (response.ok && data.length > 0) {
            return data[0]?.urls?.full || "";
        } else {
            throw new Error('Unsplash API rate limit exceeded');
        }
    } catch (error) {
        const randomImage = cloudinaryImages[Math.floor(Math.random() * cloudinaryImages.length)];
        return randomImage; 
    }
}