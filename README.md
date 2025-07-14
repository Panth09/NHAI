# 🛣️ NHAI NSV Monitor

A real-time web-based dashboard built with **React** and **Tailwind CSS** to monitor highway conditions using Network Survey Vehicle (NSV) data. Built for the **NHAI Hackathon 2025**.

## 🚀 Features

- 📍 Real-time location tracking (chainage, GPS, lane info)
- 📊 Live statistics: IRI, Rut Depth, Cracks/km, Survey Progress
- 🧠 AI-powered distress classification (High / Medium / Low)
- 📹 Video indicators for critical issues
- 📈 Graphs and analytics for road maintenance trends
- 🧰 System settings (refresh rate, thresholds, etc.)

---

## 🧱 Tech Stack

| Layer             | Tools / Libraries                                  |
|------------------|-----------------------------------------------------|
| Frontend         | React.js, Tailwind CSS                              |
| Icons            | [Lucide React](https://lucide.dev/icons/)           |
| Real-Time Logic  | useState + useEffect (simulated survey updates)     |

---

## 📁 Folder Structure

nhai-frontend/
│
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ └── NSVDashboard.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js



---

## 🛠️ Setup Instructions

1. **Clone the repository / Extract zip**
2. Navigate into the project folder:

   ```bash
   cd nhai-frontend


🖼️ UI Preview
<img src="./screenshot.png" alt="Dashboard Preview" width="600"/>
🤖 Future Enhancements
✅ Integration with Google Maps for actual geo overlays

🔔 Notification system for alerts

🧪 LLM integration for maintenance summary generation

📥 Data export (PDF, Excel)

📜 License
This project is developed for educational and hackathon purposes. Please credit the author if reused.
