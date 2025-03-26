# SECGPT - AI-Powered SEC Document Analysis Tool

SECGPT is a powerful SEC document analysis tool that leverages advanced AI technology to help investors quickly understand and analyze SEC filings.

## Key Features

### 1. SEC Document Retrieval

- Automatically fetch the latest 10-K, 10-Q, 8-K, and other documents from the SEC official website
- Support various SEC filing types, including registration statements, periodic reports, proxy statements, etc.
- No need for manual document downloading and organization

### 2. AI-Powered Analysis

- Deep analysis of lengthy SEC documents
- Extract key information, including financial data, risk factors, and management discussion
- Generate clear and comprehensible analysis reports and summaries

### 3. Data Visualization

- Convert financial data into interactive charts
- Intuitively display company financial status and trends
- Support various chart types and data presentation methods

### 4. Real-time Monitoring

- Get the latest SEC filings and analysis for companies at any time
- Stay informed of important information in real-time
- Support automatic updates and notification features

### 5. Security and Privacy Protection

- Strict data encryption and privacy policies
- Ensure the security of user search and analysis data
- Comply with relevant data protection regulations

## Quick Start

### Installation Steps

```sh
# Step 1: Clone the repository using the project's Git URL
git clone https://github.com/MarkLo127/SECGPT.git

# Step 2: Navigate to the project directory
cd SECGPT

# Step 3: Install necessary dependencies
pnpm i

# Step 4: Start the development server with auto-reload and live preview
pnpm run dev
```

### Usage Guide

1. After launching the application, open your browser and visit the local development server (typically [http://localhost:5173](http://localhost:5173))
2. Select the type of SEC document you want to analyze on the main page
3. Enter the company name or stock symbol
4. Wait for the system to automatically retrieve and analyze the documents
5. View the generated analysis reports and data visualizations

## Technical Architecture

This project is built with a modern technology stack:

- **Vite**: Fast frontend build tool
- **TypeScript**: Provides type safety and better development experience
- **React**: JavaScript library for building user interfaces
- **shadcn-ui**: High-quality UI component library
- **Tailwind CSS**: Utility-first CSS framework

## Supported SEC Document Types

- **Registration Statements**: S-1, S-3, S-4, F-1, etc.
- **Periodic Reports**: 10-K, 10-Q, 8-K, 20-F, etc.
- **Proxy Statements**: DEF 14A, PRE 14A, etc.
- **Other Documents**: 13F-HR, Form 3/4/5, etc.