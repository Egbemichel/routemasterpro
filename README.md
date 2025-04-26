# RouteMasterPro 🚚📍
*A real-time(ish) logistics tracker powered by maps, animations, and childhood dreams.*

---

## ✨ About
RouteMasterPro lets users simulate package deliveries visually on a map.  
Admins can generate tracking numbers tied to fake routes, and users can input these codes to watch a pin travel smoothly from source to destination.

✅ Powered by React, Leaflet, Firebase, and a sprinkle of nostalgia.

---

## 🗺 How It Works
- Admins create a "shipment" by defining source and destination addresses.
- Addresses are geocoded into coordinates (using Nominatim / custom tools).
- A polyline route is generated and drawn onto OpenStreetMap via **react-leaflet**.
- A pin (marker) animates along the route, creating a *real-time movement* effect.
- Firebase is used for admin tools, tracking data storage, and possibly auth.

---

## ⚙️ Built With
- **Frontend:** React + Vite
- **Mapping:** Leaflet, react-leaflet, leaflet-routing-machine
- **Routing / Polyline Handling:** @mapbox/polyline, polyline
- **Backend Services:** Firebase (database/authentication)
- **Other Libraries:** 
  - emailjs (contact forms)
  - framer-motion (animations)
  - react-router-dom (routing)
  - styled-components (styling)
  - whirl (loading spinners)
  - tidio (chatbot)

---

## 🚀 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Egbemichel/routemasterpro
2. **Install dependencies**
     cd routemasterpro
     npm install
3. **Run the development server**
   npm run dev
4. **Create a firebaseConfig.js file for Firebase:**
   input your own keys from firebase
5. **Open your browser**
   Go to http://localhost:5173




🏗 Future Ideas
Real real-time movement using WebSockets or Firebase listeners.

Live traffic overlay.

Admin dashboard improvements (bulk tracking creation).

UI polish with TailwindCSS or Material UI.

📜 License
This project is for learning, nostalgia, and awesomeness.
Feel free to fork, extend, or just admire.

**HomePage**
![Screenshot 2025-04-26 205002](https://github.com/user-attachments/assets/4e70ec03-8f2f-45b4-8d88-7b79d5907d20)
**TrackingPage after inserting a tracking number**
![Screenshot 2025-04-26 212045](https://github.com/user-attachments/assets/e7172569-329c-43f4-8094-893a03523232)
**Admin Dashboard**
![Screenshot 2025-04-26 212347](https://github.com/user-attachments/assets/56ecce9e-c418-4c6e-8b25-0e9ee2abf783)
**Admin Management Page**
![Screenshot 2025-04-26 212414](https://github.com/user-attachments/assets/e0abe3ae-5802-4156-8c92-9a44b218e757)

**Project History**
 - Originally built in Summer of 2024 as a pass-time but decided to take it to Github hope you enjoy it.
PS: These were my very early developer days so my security is not really the best (yes, i don't have a .env file)
# Thank you
