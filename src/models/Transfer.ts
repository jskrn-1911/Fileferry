import mongoose, { Schema, Document } from 'mongoose';

export interface ITransfer extends Document {
    title: string;
    userId?: string; // Optional, for non-logged-in users
    uniqueName: string;
    fileLinks: string[];
    senderEmail: string;
    receiverEmail: string;
    createdAt: Date;
}

const TransferSchema: Schema = new Schema<ITransfer>({
    title: { type: String, required: true },
    userId: { type: String, default: null }, // Only for logged-in users
    uniqueName: { type: String, required: true, unique: true },
    fileLinks: { type: [String], required: true },
    senderEmail: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Transfer = mongoose.models.Transfer || mongoose.model<ITransfer>('Transfer', TransferSchema);
