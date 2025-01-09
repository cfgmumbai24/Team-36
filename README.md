# Team-36 DOMination Squad
# Automated Digital Catalogue and Inventory Management System

## Overview

### Current Challenges
1. **Manual Process of Photographing New Products and Updating PDF Catalog**:
   - **Solution**: Automated system for image uploading and SKU ID generation.

2. **Manual Assignment of SKU Codes**:
   - **Solution**: Automatic SKU ID generation based on image classification (color, shape, type).

3. **Manual Inventory Management**:
   - **Solution**: Automated tracking and alerts for low stock using SKU IDs.

### Our Solution
- **Automated System for Digital Catalogue**: Simplifies the process of cataloging new products by automating image uploading and SKU ID generation.
- **Assigning of Unique Code to SKU**: Automatic generation of SKU IDs based on image classification, ensuring unique identification for each product.
- **Automatic Inventory Management**: Tracks inventory levels and sends alerts for low stock, streamlining inventory control.
- **Display of Available Products to the Buyer**: Provides a user-friendly interface where buyers can view available products and their quantities.
- **Query Generation by the Buyer**: Enables buyers to generate queries directly through an online interface, facilitating communication.

## Key Features

1. **Automated SKU ID Generation**
   - **Method**: Uses image classification to extract data such as color, shape, and type.
   - **Advantage**: Ensures each product gets a unique SKU ID automatically.

2. **Multilingual Chatbot**
   - **Capability**: Supports 22 Indian languages for customer assistance.
   - **Advantage**: Enhances accessibility for diverse user backgrounds, especially in rural India.

3. **Automated Image Rejection and Approval Based on Quality**
   - **Functionality**: Image classification verifies image quality and adherence to guidelines.
   - **Advantage**: Reduces manual effort for sub-admins and improves efficiency.

## Future Enhancements

1. **Enhanced Chatbot with NLP Integration**
   - **Feature**: Introduce Natural Language Processing (NLP) for improved user interaction.
   - **Advantage**: Enables voice-based communication in addition to text, enhancing accessibility for rural users.

2. **Enhanced Mobile App Accessibility**
   - **Future Enhancement**: Develop a mobile app for seamless product browsing and purchasing.
   - **Benefit**: Increases user convenience and expands market reach.

3. **Graphical User Interface (UI) Enhancement**
   - **User-Friendly Design**: Intuitive layout for easy navigation and product browsing.
   - **Dashboard Overview**: Clear display of product categories, inventory status, and pending approvals.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Processing**: Custom algorithms for image classification
- **Chatbot**: Multilingual support with planned NLP integration

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cfgmumbai24/Team-36.git
   cd your-repo
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install

### Usage

1. Start the backend server
   ```bash
   npm start
2. Start the frontend server:
   ```bash
   npm run dev

## Features
- **Image Uploading**: Navigate to the image upload section to add new products.

- **Inventory Management**: View and manage inventory levels from the dashboard.

- **Customer Interaction**: Use the multilingual chatbot for customer support and query resolution.

 <br /> <br /> The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC"). JPMC did not create or contribute to the development of the Code. This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code, including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.