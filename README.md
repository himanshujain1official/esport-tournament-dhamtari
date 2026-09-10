# 🎮 Dhamtari Esports Tournament Website
**BCS Govt. PG College Dhamtari — Free Fire & BGMI Annual Championship**

A modern, responsive esports landing and tournament registration website built with React 19, TypeScript, Tailwind CSS, and Motion.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have **Node.js** (version 18 or higher) installed on your computer.
- Download Node.js from [https://nodejs.org](https://nodejs.org) if not already installed.

---

### Step-by-Step Instructions

#### 1. Open Terminal / Command Prompt
Navigate to the project folder:
```bash
cd "c:\Users\himan\Downloads\esport-tournament-dhamtari"
```

#### 2. Install Dependencies
Run the following command to download and install all necessary packages:
```bash
npm install
```

#### 3. Start the Development Server
Run the local dev server:
```bash
npm run dev
```

#### 4. Open in Your Web Browser
Once the server starts, open your browser and visit:
```
http://localhost:3000
```
*(Or the URL shown in your terminal, such as `http://localhost:5173` if port 3000 is occupied).*

---

## 📊 How to Connect "Register Now" to Google Sheets

You can automatically send all registrations directly into a live Google Sheet:

### Step 1: Create a Google Apps Script
1. Open Google Sheets ([sheets.new](https://sheets.new)).
2. Go to **Extensions** > **Apps Script**.
3. Replace the code in the editor with the code in [`google-apps-script.js`](./google-apps-script.js).
4. Click **Save** (disk icon).

### Step 2: Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial so the form can send data without login)*
4. Click **Deploy** and authorize permissions with your Google Account.
5. Copy the **Web App URL** (ends in `/exec`).

### Step 3: Connect to Website
- Click **Organizer Login** at the bottom of the registration section on your website.
- Enter passcode `admin123`.
- Paste the copied Web App URL into the **Google Sheet Webhook URL** bar and click **Save Sheet URL**.
*(Or add `VITE_GOOGLE_SHEETS_URL="https://script.google.com/..."` in your `.env` file).*

Now, every time a squad registers, a new row with all player details and UIDs is automatically added to your Google Sheet!

---

## 🔒 Organizer / Admin Security

- The participant list is protected by a passcode.
- Default Admin Passcode: `admin123` *(Can be changed via `VITE_ADMIN_PIN` in `.env`)*.
- **Organizer Dashboard Features**:
  - Live search by Squad, Captain, UID, or Phone number.
  - Game category filters (All / Free Fire / BGMI).
  - One-click WhatsApp link to contact squad captains.
  - One-click **Export CSV** download for match brackets.
  - Google Sheet Webhook management.
