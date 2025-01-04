import { Transfer } from '../models/Transfer'; // Adjust the path based on your file structure

export const saveTransferDocument = async (
    title: string,
    userId: string | null, // Pass null if the user is not logged in
    fileLinks: string[],
    senderEmail: string,
    receiverEmail: string,
) => {
    try {
        // Create a unique name for the transfer
        const uniqueName = `${userId || 'guest'}-${Date.now()}`;

        const newTransfer = new Transfer({
            title,
            userId,
            uniqueName,
            fileLinks,
            senderEmail,
            receiverEmail,
        });

        await newTransfer.save();

        console.log('Transfer document saved:', newTransfer);
        return newTransfer;
    } catch (error) {
        console.error('Error saving transfer document:', error);
        throw error;
    }
};
