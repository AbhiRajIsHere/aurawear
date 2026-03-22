# AURAWEAR — Smart Wardrobe Manager

> AI-powered wardrobe intelligence app that suggests daily outfits, analyzes shopping decisions, and identifies wardrobe gaps.

## 🚀 Deploy in 5 Minutes (Free)

### Option 1: Vercel (Recommended — Fastest)

**Step 1: Push to GitHub**
```bash
# Create a new repo on github.com, then:
cd aurawear-app
git init
git add .
git commit -m "Initial commit: AURAWEAR prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aurawear.git
git push -u origin main
```

**Step 2: Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `aurawear` repository
4. Vercel auto-detects Vite — just click **"Deploy"**
5. Done! You'll get a URL like `aurawear-abc123.vercel.app`

**Step 3: Custom Domain (Optional)**
- In Vercel dashboard → Settings → Domains
- Add your domain or use the free `.vercel.app` URL

---

### Option 2: Netlify (Also Free)

1. Go to [netlify.com](https://netlify.com) → Sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your GitHub repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

---

### Option 3: Deploy Manually (No GitHub needed)

```bash
# Build the project locally
cd aurawear-app
npm install
npm run build

# This creates a 'dist' folder — upload it anywhere:
# - Netlify: drag-drop dist/ folder at app.netlify.com/drop
# - Surge: npx surge dist/ aurawear.surge.sh
# - Any static host: just upload the dist/ folder
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Opens at http://localhost:5173
```

---

## 📱 Share with People

Once deployed, share the URL and ask people to:
1. **Browse all 5 tabs** (Today, Closet, Advisor, Gaps, Stats)
2. **Try the outfit shuffler** on the Today tab
3. **Test the Link Analyzer** on the Advisor tab
4. **Tap the 💬 button** to submit their feedback

The feedback form collects:
- Name
- Star rating (1-5)
- Most useful features (multi-select)
- Open text suggestions

> **Note:** In this prototype, feedback is logged to browser console. To collect real feedback, integrate with Google Sheets, Firebase, or any backend. See "Collecting Feedback" below.

---

## 📊 Collecting Real Feedback (Free Options)

### Option A: Google Sheets (Easiest)

1. Create a Google Sheet with columns: `Timestamp | Name | Rating | Features | Feedback`
2. Go to **Extensions → Apps Script** and paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.rating, data.features.join(', '), data.feedback]);
  return ContentService.createTextOutput('OK');
}
```

3. Deploy as Web App (Execute as: Me, Access: Anyone)
4. Copy the web app URL and replace the `submitFeedback` function in `App.jsx`:

```javascript
const submitFeedback = async () => {
  const data = { name: fbName, rating: fbRating, features: fbFeatures, feedback: fbText };
  await fetch('YOUR_GOOGLE_SHEETS_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  setFbSubmitted(true);
};
```

### Option B: Firebase (More Robust)

1. Create a Firebase project → Enable Firestore
2. Add Firebase SDK to the project
3. Store feedback documents in a `feedback` collection

### Option C: Formspree (Zero Code)

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month)
2. Create a form → get your endpoint URL
3. POST feedback data to that URL

---

## 📁 Project Structure

```
aurawear-app/
├── index.html          # Entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React mount
│   └── App.jsx         # Full application (single file)
└── README.md
```

---

## 🎨 Features in Prototype

| Tab | Features |
|-----|----------|
| **Today** | Weather-aware outfit suggestions, occasion selector, 7-day outfit calendar, quick stats |
| **Closet** | Search, filter, sort, color distribution, smart import from shopping links, dormant alerts |
| **Advisor** | AI shopping scores, buy/skip verdicts, link analyzer with outfit combo predictions |
| **Gaps** | Wardrobe completeness score, gap severity cards, fix suggestions with combo unlocks |
| **Stats** | Wardrobe value, cost/wear, utilization %, category bars, color palette, most/least worn |

---

## 🔜 Roadmap for Production

- [ ] User authentication (Firebase Auth / Supabase)
- [ ] Real photo upload + AI auto-tagging (Google Vision API)
- [ ] Gmail integration for order email parsing
- [ ] Weather API integration (OpenWeatherMap)
- [ ] Affiliate links for shopping recommendations
- [ ] Push notifications for daily outfit suggestions
- [ ] Social sharing of outfits
- [ ] React Native mobile app

---

Built with React + Vite | Designed for mobile-first experience
