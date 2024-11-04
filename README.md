# Fileferry
# File Transfer App
## Overview

Welcome to the File Transfer App! This web application allows users to easily and securely send files, photos, and videos to others without the hassle of email attachments or large file sizes. Inspired by popular file sharing platforms, our app offers a simple and intuitive interface for transferring files of various sizes.

## Features

- **Easy File Upload**: Users can upload files quickly and effortlessly.
- **File Size Limits**: 
  - Send files up to **250 MB ** available for 3 days without signing in.
  - Send files up to **500 MB** available for 15 days when signed in.
  - Premium users can send files up to **1 GB** available for 1 month.
- **Secure Transfers**: Files are securely stored using AWS S3(implemented but not in use currently) and Cloudinary(in use).
- **User Accounts**: Create an account to access additional features and manage your transfers.
- **Premium Membership**: Upgrade to a premium account for increased file size limits and additional perks.

## Getting Started

To get started with the File Transfer App, follow these steps:

1. **Visit the Website**: [willAddLaterWhenDeployed.com](#)
2. **Upload Your Files**: Click on the upload button or drop you files and select the files you want to send.
3. **Send the Link**: Once the upload is complete, you'll receive a link to share with the recipient.

## Installation

If you want to run the app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jskrn-1911/Fileferry.git
   cd Fileferry
   npm install
   npm run dev
