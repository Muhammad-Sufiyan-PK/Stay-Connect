import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  primary: "#0F4C81",
  primaryLight: "#1a5f9e",
  secondary: "#0EA5E9",
  accent: "#10B981",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
};

const LOGO_URL = "data:image/webp;base64,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";

const UNIVERSITIES = [
  "KSBL", "LUMS", "IBA", "NUST", "FAST", "COMSATS",
  "SZABIST", "Bahria University", "University of Karachi",
  "Punjab University", "UCP", "GIKI",
];

const CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi",
  "Multan", "Faisalabad", "Hyderabad", "Peshawar",
];

const AMENITIES_LIST = [
  { icon: "📶", label: "WiFi" }, { icon: "🧺", label: "Laundry" },
  { icon: "📹", label: "CCTV" }, { icon: "👮", label: "Security" },
  { icon: "🍽️", label: "Meals" }, { icon: "⚡", label: "Generator" },
  { icon: "📚", label: "Study Room" }, { icon: "💧", label: "Water Filter" },
  { icon: "🅿️", label: "Parking" },
];

const INTERESTS = [
  "Sports", "Reading", "Fitness", "Gaming", "Photography",
  "Travel", "Entrepreneurship", "Technology", "Music",
  "Movies", "Content Creation", "Event Management", "Startups",
];

const SAMPLE_STUDENTS = [
  { id: 1, name: "Ayesha Khan", uni: "LUMS", degree: "BBA", sem: "3rd", city: "Lahore", gender: "Female", match: 98, budget: "Rs. 12,000–15,000", bio: "Focused student who loves early mornings and organized spaces. Looking for a like-minded roommate near campus.", interests: ["Reading", "Entrepreneurship", "Fitness"], avatar: "AK", study: "Early Riser", clean: "Very Tidy", personality: "Ambivert", sleep: "Before 11 PM", smoking: "Non-Smoker", verified: true },
  { id: 2, name: "Maham Ahmed", uni: "UCP", degree: "BS CS", sem: "5th", city: "Lahore", gender: "Female", match: 91, budget: "Rs. 10,000–14,000", bio: "Tech enthusiast and night coder. I keep things clean but I'm flexible with schedules.", interests: ["Technology", "Gaming", "Movies"], avatar: "MA", study: "Night Owl", clean: "Average", personality: "Introvert", sleep: "11 PM–1 AM", smoking: "Non-Smoker", verified: true },
  { id: 3, name: "Ali Raza", uni: "FAST", degree: "BS SE", sem: "4th", city: "Karachi", gender: "Male", match: 95, budget: "Rs. 8,000–12,000", bio: "Sports lover and startup enthusiast. Looking for a roommate who is driven and active.", interests: ["Sports", "Startups", "Photography"], avatar: "AR", study: "Flexible", clean: "Very Tidy", personality: "Extrovert", sleep: "11 PM–1 AM", smoking: "Non-Smoker", verified: true },
  { id: 4, name: "Fatima Siddiqui", uni: "IBA", degree: "BS Econ", sem: "2nd", city: "Karachi", gender: "Female", match: 87, budget: "Rs. 15,000–20,000", bio: "Creative thinker who enjoys quiet study sessions and weekend adventures.", interests: ["Travel", "Music", "Content Creation"], avatar: "FS", study: "Early Riser", clean: "Very Tidy", personality: "Ambivert", sleep: "Before 11 PM", smoking: "Non-Smoker", verified: true },
  { id: 5, name: "Hamza Sheikh", uni: "NUST", degree: "BS EE", sem: "6th", city: "Islamabad", gender: "Male", match: 89, budget: "Rs. 10,000–15,000", bio: "Engineering student passionate about robotics and fitness. Early riser, keeps a clean space.", interests: ["Technology", "Fitness", "Entrepreneurship"], avatar: "HS", study: "Early Riser", clean: "Very Tidy", personality: "Extrovert", sleep: "Before 11 PM", smoking: "Non-Smoker", verified: true },
  { id: 6, name: "Hira Tariq", uni: "COMSATS", degree: "BS BBA", sem: "3rd", city: "Islamabad", gender: "Female", match: 84, budget: "Rs. 8,000–11,000", bio: "Friendly and organized. I love event planning and making new friends at university.", interests: ["Event Management", "Music", "Reading"], avatar: "HT", study: "Flexible", clean: "Average", personality: "Extrovert", sleep: "11 PM–1 AM", smoking: "Non-Smoker", verified: false },
  { id: 7, name: "Hassan Siddiqui", uni: "SZABIST", degree: "BS Media", sem: "4th", city: "Karachi", gender: "Male", match: 82, budget: "Rs. 9,000–13,000", bio: "Media student and content creator. Night owl who values personal space.", interests: ["Content Creation", "Movies", "Photography"], avatar: "HS2", study: "Night Owl", clean: "Average", personality: "Introvert", sleep: "After 1 AM", smoking: "Occasionally", verified: true },
  { id: 8, name: "Zainab Ali", uni: "Bahria University", degree: "BS Psychology", sem: "5th", city: "Islamabad", gender: "Female", match: 90, budget: "Rs. 11,000–16,000", bio: "Psychology student with a love for books and meaningful conversations.", interests: ["Reading", "Travel", "Music"], avatar: "ZA", study: "Early Riser", clean: "Very Tidy", personality: "Ambivert", sleep: "Before 11 PM", smoking: "Non-Smoker", verified: true },
];

const SAMPLE_HOSTELS = [
  { id: 1, name: "Al-Noor Girls Hostel", area: "Gulberg", city: "Lahore", single: 15000, double: 10000, triple: 8000, rating: 4.7, reviews: 89, verified: true, available: 5, amenities: ["WiFi", "CCTV", "Meals", "Laundry", "Generator", "Water Filter"], gender: "Girls", desc: "Premium girls-only hostel near LUMS with 24/7 security, home-cooked meals, and a dedicated study area. Trusted by parents across Pakistan.", rules: ["No visitors after 9 PM", "Quiet hours 10 PM–7 AM", "Meals served 3 times daily"], owner: "Mrs. Nasreen Akhtar" },
  { id: 2, name: "Scholar's Den", area: "Blue Area", city: "Islamabad", single: 18000, double: 12500, triple: 9500, rating: 4.8, reviews: 124, verified: true, available: 3, amenities: ["WiFi", "CCTV", "Security", "Study Room", "Generator", "Parking", "Water Filter"], gender: "Boys", desc: "Modern boys hostel in the heart of Islamabad. Walking distance to NUST shuttle point. Fully furnished rooms with AC.", rules: ["No smoking indoors", "Gate closes at 11 PM", "Guest registration required"], owner: "Mr. Bilal Mehmood" },
  { id: 3, name: "Campus View Hostel", area: "Johar Town", city: "Lahore", single: 12000, double: 8500, triple: 6500, rating: 4.5, reviews: 67, verified: true, available: 8, amenities: ["WiFi", "Meals", "Laundry", "Generator", "Water Filter"], gender: "Girls", desc: "Affordable and clean girls hostel in Johar Town, just 5 minutes from UCP. Great for students on a budget.", rules: ["Curfew at 10 PM", "No male visitors", "Kitchen access till 9 PM"], owner: "Mrs. Saba Javed" },
  { id: 4, name: "Elite Student Living", area: "Clifton", city: "Karachi", single: 20000, double: 14000, triple: 11000, rating: 4.9, reviews: 156, verified: true, available: 2, amenities: ["WiFi", "CCTV", "Security", "Meals", "Laundry", "Generator", "Study Room", "Water Filter", "Parking"], gender: "Boys", desc: "Premium student accommodation in Clifton, Karachi. Near IBA and SZABIST. Full-service hostel with gym access.", rules: ["ID card mandatory", "Quiet hours after 11 PM", "Laundry days: Mon, Wed, Fri"], owner: "Mr. Imran Qureshi" },
  { id: 5, name: "Pak Student Home", area: "Saddar", city: "Rawalpindi", single: 9000, double: 6500, triple: 5000, rating: 4.2, reviews: 43, verified: false, available: 12, amenities: ["WiFi", "Meals", "Water Filter"], gender: "Boys", desc: "Budget-friendly hostel for students. Basic but clean rooms. Close to Rawalpindi public transport.", rules: ["No overnight guests", "Rent due by 5th of month"], owner: "Mr. Rashid Ali" },
  { id: 6, name: "Fatimah Girls Residence", area: "Garden Town", city: "Lahore", single: 14000, double: 9500, triple: 7500, rating: 4.6, reviews: 78, verified: true, available: 4, amenities: ["WiFi", "CCTV", "Meals", "Laundry", "Generator", "Security"], gender: "Girls", desc: "Safe and homely girls hostel in Garden Town. Known for excellent food and caring management.", rules: ["Parents must visit during admission", "Gate closes at 9:30 PM", "Meals included in rent"], owner: "Mrs. Fatima Zahra" },
];

const COMMUNITIES = [
  { id: 1, name: "LUMS Freshmen 2027", members: 342, posts: 89, icon: "🎓" },
  { id: 2, name: "KSBL Students in Lahore", members: 128, posts: 34, icon: "🏫" },
  { id: 3, name: "Girls Hostel Community", members: 567, posts: 203, icon: "🏠" },
  { id: 4, name: "FAST Karachi Students", members: 231, posts: 76, icon: "💻" },
  { id: 5, name: "IBA Student Housing Group", members: 189, posts: 52, icon: "🏢" },
  { id: 6, name: "NUST Islamabad Housing", members: 412, posts: 145, icon: "🏛️" },
];

const MESSAGES = [
  { id: 1, name: "Ayesha Khan", avatar: "AK", lastMsg: "Would you like to visit together this weekend?", time: "2:30 PM", unread: 2 },
  { id: 2, name: "Al-Noor Hostel", avatar: "AN", lastMsg: "Your visit is confirmed for Saturday 10 AM", time: "11:15 AM", unread: 1 },
  { id: 3, name: "Hamza Sheikh", avatar: "HS", lastMsg: "Thanks for connecting! Which area are you looking in?", time: "Yesterday", unread: 0 },
  { id: 4, name: "Maham Ahmed", avatar: "MA", lastMsg: "I found a great hostel nearby 🏠", time: "Yesterday", unread: 0 },
];

// ─── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --primary: ${COLORS.primary};
    --primary-light: ${COLORS.primaryLight};
    --secondary: ${COLORS.secondary};
    --accent: ${COLORS.accent};
    --bg: ${COLORS.bg};
    --card: ${COLORS.card};
    --text: ${COLORS.text};
    --text-light: ${COLORS.textLight};
    --text-muted: ${COLORS.textMuted};
    --success: ${COLORS.success};
    --warning: ${COLORS.warning};
    --danger: ${COLORS.danger};
    --border: ${COLORS.border};
    --border-light: ${COLORS.borderLight};
    --font: 'Plus Jakarta Sans', -apple-system, sans-serif;
    --shadow-sm: 0 1px 2px rgba(15,76,129,0.05);
    --shadow: 0 2px 8px rgba(15,76,129,0.08);
    --shadow-md: 0 4px 16px rgba(15,76,129,0.1);
    --shadow-lg: 0 8px 32px rgba(15,76,129,0.12);
    --radius: 14px;
    --radius-sm: 10px;
    --radius-xs: 6px;
  }

  body { font-family: var(--font); background: var(--bg); color: var(--text); }

  .app-shell {
    max-width: 430px; margin: 0 auto; min-height: 100vh;
    background: var(--bg); position: relative; overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .scale-in { animation: scaleIn 0.4s ease forwards; }

  /* ── Splash Screen ── */
  .splash {
    min-height: 100vh; display: flex; flex-direction: column;
    background: linear-gradient(160deg, #0a3a66 0%, #0F4C81 40%, #1265a8 70%, #0EA5E9 100%);
    background-size: 200% 200%; animation: gradientShift 8s ease infinite;
    color: white; position: relative; overflow: hidden;
  }
  .splash::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 20% 80%, rgba(16,185,129,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(14,165,233,0.2) 0%, transparent 50%);
  }
  .splash-content { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 24px; position: relative; z-index: 1; }
  .splash-logo { font-size: 42px; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px; }
  .splash-logo span { color: #10B981; }
  .splash-tagline { font-size: 16px; opacity: 0.85; font-weight: 400; letter-spacing: 0.3px; margin-bottom: 48px; }
  .splash-illustration {
    width: 280px; height: 200px; border-radius: 20px; margin-bottom: 48px;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; font-size: 80px;
    border: 1px solid rgba(255,255,255,0.12);
    animation: float 4s ease-in-out infinite;
  }
  .splash-btns { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 12px; }
  .btn-primary-splash {
    width: 100%; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 700;
    border: none; cursor: pointer; background: white; color: var(--primary);
    font-family: var(--font); transition: all 0.2s;
  }
  .btn-primary-splash:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
  .btn-outline-splash {
    width: 100%; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 600;
    border: 1.5px solid rgba(255,255,255,0.4); cursor: pointer;
    background: rgba(255,255,255,0.06); color: white;
    font-family: var(--font); transition: all 0.2s;
  }
  .btn-outline-splash:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); }
  .splash-footer { padding: 24px; text-align: center; font-size: 13px; opacity: 0.6; position: relative; z-index: 1; }
  .splash-footer span { color: #10B981; font-weight: 600; }

  /* ── Auth ── */
  .auth-screen { min-height: 100vh; background: var(--bg); }
  .auth-header {
    padding: 20px 20px 16px; background: var(--primary); color: white;
    border-radius: 0 0 24px 24px; position: sticky; top: 0; z-index: 10;
  }
  .auth-back { background: none; border: none; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; font-family: var(--font); margin-bottom: 12px; display: flex; align-items: center; gap: 4px; }
  .auth-title { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .auth-subtitle { font-size: 13px; opacity: 0.7; }
  .progress-bar { height: 4px; background: rgba(255,255,255,0.2); border-radius: 4px; margin-top: 16px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--accent); border-radius: 4px; transition: width 0.4s ease; }
  .auth-body { padding: 24px 20px 100px; }

  .field-group { margin-bottom: 18px; }
  .field-label { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 6px; display: block; }
  .field-input {
    width: 100%; padding: 14px 16px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    font-size: 15px; font-family: var(--font); background: white; color: var(--text);
    transition: border-color 0.2s, box-shadow 0.2s; outline: none;
  }
  .field-input:focus { border-color: var(--secondary); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
  .field-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }

  .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 10px 16px; border-radius: 100px; font-size: 13px; font-weight: 500;
    border: 1.5px solid var(--border); background: white; cursor: pointer;
    font-family: var(--font); transition: all 0.2s; color: var(--text-light);
  }
  .chip.active { background: var(--primary); color: white; border-color: var(--primary); }
  .chip:hover:not(.active) { border-color: var(--secondary); color: var(--text); }

  .btn-next {
    width: 100%; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 700;
    border: none; cursor: pointer; background: var(--primary); color: white;
    font-family: var(--font); transition: all 0.2s; margin-top: 8px;
  }
  .btn-next:hover { background: var(--primary-light); transform: translateY(-1px); }
  .btn-next:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .budget-slider-container { padding: 8px 0; }
  .budget-display { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--primary); }
  .budget-slider {
    width: 100%; appearance: none; height: 6px; border-radius: 6px;
    background: linear-gradient(to right, var(--primary) 0%, var(--secondary) 100%);
    outline: none;
  }
  .budget-slider::-webkit-slider-thumb {
    appearance: none; width: 22px; height: 22px; border-radius: 50%;
    background: white; border: 3px solid var(--primary); cursor: pointer;
    box-shadow: var(--shadow);
  }

  .verify-upload {
    border: 2px dashed var(--border); border-radius: var(--radius); padding: 24px;
    text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 12px;
    background: white;
  }
  .verify-upload:hover { border-color: var(--secondary); background: rgba(14,165,233,0.02); }
  .verify-upload.uploaded { border-color: var(--success); background: rgba(34,197,94,0.04); }
  .verify-icon { font-size: 32px; margin-bottom: 8px; }
  .verify-label { font-size: 13px; color: var(--text-light); font-weight: 500; }
  .security-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0; }
  .security-badge {
    display: flex; align-items: center; gap: 6px; padding: 8px 14px;
    background: rgba(16,185,129,0.06); border-radius: 100px; font-size: 12px;
    color: var(--accent); font-weight: 600;
  }

  /* ── Login ── */
  .login-tabs { display: flex; gap: 0; background: var(--border-light); border-radius: var(--radius-sm); padding: 3px; margin-bottom: 24px; }
  .login-tab {
    flex: 1; padding: 10px; text-align: center; border-radius: 8px; font-size: 13px;
    font-weight: 600; cursor: pointer; border: none; background: transparent;
    font-family: var(--font); color: var(--text-light); transition: all 0.2s;
  }
  .login-tab.active { background: white; color: var(--primary); box-shadow: var(--shadow-sm); }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-text { font-size: 12px; color: var(--text-muted); font-weight: 500; }
  .btn-google {
    width: 100%; padding: 14px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 600;
    border: 1.5px solid var(--border); background: white; cursor: pointer;
    font-family: var(--font); display: flex; align-items: center; justify-content: center; gap: 8px;
    color: var(--text); transition: all 0.2s;
  }
  .btn-google:hover { background: var(--border-light); }
  .forgot-link { text-align: right; margin-top: -8px; margin-bottom: 16px; }
  .forgot-link a { font-size: 13px; color: var(--secondary); text-decoration: none; font-weight: 500; }

  /* ── Main App ── */
  .main-app { padding-bottom: 80px; }
  .top-bar {
    padding: 16px 20px; background: white; border-bottom: 1px solid var(--border-light);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 20;
  }
  .top-greeting h2 { font-size: 18px; font-weight: 700; color: var(--text); }
  .top-greeting p { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
  .top-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 40px; height: 40px; border-radius: 12px; border: 1px solid var(--border);
    background: white; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 18px; position: relative; transition: all 0.2s;
  }
  .icon-btn:hover { background: var(--border-light); }
  .notif-dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: var(--danger); border-radius: 50%; border: 2px solid white; }

  .search-wrap { padding: 12px 20px 6px; }
  .search-box {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px;
    background: white; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    transition: border-color 0.2s;
  }
  .search-box:focus-within { border-color: var(--secondary); }
  .search-box input {
    flex: 1; border: none; outline: none; font-size: 14px; font-family: var(--font);
    color: var(--text); background: transparent;
  }
  .search-box input::placeholder { color: var(--text-muted); }

  .filter-scroll { display: flex; gap: 8px; padding: 12px 20px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .filter-scroll::-webkit-scrollbar { display: none; }
  .filter-chip {
    flex-shrink: 0; padding: 8px 16px; border-radius: 100px; font-size: 12px;
    font-weight: 600; border: 1.5px solid var(--border); background: white;
    cursor: pointer; font-family: var(--font); white-space: nowrap;
    color: var(--text-light); transition: all 0.2s;
  }
  .filter-chip.active { background: var(--primary); color: white; border-color: var(--primary); }

  .section { padding: 20px 20px 4px; }
  .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .section-title { font-size: 17px; font-weight: 700; color: var(--text); }
  .section-link { font-size: 13px; color: var(--secondary); font-weight: 600; cursor: pointer; border: none; background: none; font-family: var(--font); }

  /* ── Hostel Cards ── */
  .hostel-scroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
  .hostel-scroll::-webkit-scrollbar { display: none; }
  .hostel-card {
    flex-shrink: 0; width: 260px; background: white; border-radius: var(--radius);
    overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--border-light);
    cursor: pointer; transition: all 0.25s;
  }
  .hostel-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .hostel-card-img {
    height: 140px; position: relative; overflow: hidden;
  }
  .hostel-card-img-bg {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }
  .hostel-badge {
    position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: 6px;
    font-size: 11px; font-weight: 700; color: white; background: var(--accent);
  }
  .hostel-gender-badge {
    position: absolute; top: 10px; right: 10px; padding: 4px 10px; border-radius: 6px;
    font-size: 11px; font-weight: 600; color: white; background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
  }
  .hostel-save {
    position: absolute; bottom: 10px; right: 10px; width: 32px; height: 32px;
    border-radius: 50%; background: rgba(255,255,255,0.9); border: none;
    cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); transition: all 0.2s;
  }
  .hostel-save:hover { background: white; transform: scale(1.1); }
  .hostel-card-body { padding: 14px; }
  .hostel-card-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
  .hostel-card-loc { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
  .hostel-card-footer { display: flex; justify-content: space-between; align-items: center; }
  .hostel-price { font-size: 15px; font-weight: 700; color: var(--primary); }
  .hostel-price span { font-size: 11px; font-weight: 400; color: var(--text-muted); }
  .hostel-rating { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: var(--warning); }
  .hostel-rooms { font-size: 11px; color: var(--accent); font-weight: 600; margin-top: 6px; }

  /* ── Hostel List Card (vertical) ── */
  .hostel-list-card {
    display: flex; gap: 14px; background: white; border-radius: var(--radius);
    padding: 14px; margin-bottom: 12px; box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s;
  }
  .hostel-list-card:hover { box-shadow: var(--shadow); }
  .hostel-list-img {
    width: 100px; height: 100px; border-radius: var(--radius-sm); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 36px;
    position: relative; overflow: hidden;
  }
  .hostel-list-info { flex: 1; min-width: 0; }
  .hostel-list-name { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
  .hostel-list-loc { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .hostel-list-amen { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; }
  .hostel-list-amen span { font-size: 11px; background: var(--border-light); padding: 2px 8px; border-radius: 4px; color: var(--text-light); }
  .hostel-list-bottom { display: flex; justify-content: space-between; align-items: center; }
  .hostel-list-price { font-size: 14px; font-weight: 700; color: var(--primary); }

  /* ── Hostel Detail ── */
  .detail-screen { background: var(--bg); min-height: 100vh; }
  .detail-hero {
    height: 240px; position: relative; display: flex; align-items: center; justify-content: center;
    font-size: 72px;
  }
  .detail-back-btn {
    position: absolute; top: 16px; left: 16px; width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.9); border: none; cursor: pointer; font-size: 20px;
    display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);
    z-index: 5; transition: all 0.2s;
  }
  .detail-back-btn:hover { background: white; }
  .detail-body { padding: 20px; margin-top: -24px; position: relative; z-index: 2; }
  .detail-main-card {
    background: white; border-radius: var(--radius); padding: 20px;
    box-shadow: var(--shadow); border: 1px solid var(--border-light); margin-bottom: 16px;
  }
  .detail-name { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
  .detail-loc { font-size: 14px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
  .detail-badges { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .detail-badge {
    padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;
  }
  .detail-pricing { display: flex; gap: 10px; margin-bottom: 4px; }
  .price-card {
    flex: 1; padding: 14px; border-radius: var(--radius-sm); text-align: center;
    background: var(--border-light);
  }
  .price-type { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .price-val { font-size: 16px; font-weight: 800; color: var(--primary); }
  .price-val small { font-size: 10px; font-weight: 400; color: var(--text-muted); }

  .detail-section { margin-top: 16px; }
  .detail-section-title { font-size: 15px; font-weight: 700; margin-bottom: 10px; color: var(--text); }
  .amenity-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .amenity-chip {
    display: flex; align-items: center; gap: 6px; padding: 8px 14px;
    background: var(--border-light); border-radius: 100px; font-size: 12px;
    font-weight: 500; color: var(--text-light);
  }
  .detail-desc { font-size: 14px; line-height: 1.6; color: var(--text-light); }
  .rule-item { display: flex; align-items: center; gap: 8px; padding: 8px 0; font-size: 13px; color: var(--text-light); }
  .detail-actions { display: flex; gap: 10px; margin-top: 20px; }
  .btn-action {
    flex: 1; padding: 14px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 700;
    border: none; cursor: pointer; font-family: var(--font); transition: all 0.2s;
  }
  .btn-action.primary { background: var(--primary); color: white; }
  .btn-action.primary:hover { background: var(--primary-light); }
  .btn-action.outline { background: white; color: var(--primary); border: 1.5px solid var(--primary); }

  /* ── Roommate Cards ── */
  .match-card {
    background: white; border-radius: var(--radius); padding: 16px;
    box-shadow: var(--shadow-sm); border: 1px solid var(--border-light);
    margin-bottom: 12px; cursor: pointer; transition: all 0.2s;
  }
  .match-card:hover { box-shadow: var(--shadow); }
  .match-top { display: flex; gap: 14px; align-items: flex-start; }
  .match-avatar {
    width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center;
    justify-content: center; font-size: 18px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .match-info { flex: 1; min-width: 0; }
  .match-name-row { display: flex; align-items: center; gap: 6px; margin-bottom: 2px; }
  .match-name { font-size: 15px; font-weight: 700; }
  .match-verified { font-size: 14px; }
  .match-uni { font-size: 12px; color: var(--text-muted); }
  .match-score {
    padding: 4px 12px; border-radius: 100px; font-size: 13px; font-weight: 700;
    white-space: nowrap;
  }
  .match-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .match-tag {
    padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500;
    background: var(--border-light); color: var(--text-light);
  }
  .match-budget { margin-top: 8px; font-size: 13px; color: var(--text-light); font-weight: 500; }

  /* ── Roommate Profile Detail ── */
  .profile-detail-header {
    text-align: center; padding: 30px 20px 20px; background: white;
    border-radius: 0 0 24px 24px; margin-bottom: 16px;
  }
  .profile-avatar-large {
    width: 88px; height: 88px; border-radius: 24px; margin: 0 auto 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 800; color: white;
  }
  .profile-name-large { font-size: 22px; font-weight: 800; margin-bottom: 2px; }
  .profile-uni-large { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
  .profile-match-badge {
    display: inline-flex; padding: 6px 18px; border-radius: 100px;
    font-size: 14px; font-weight: 700;
  }
  .profile-section-card {
    background: white; border-radius: var(--radius); padding: 18px;
    margin: 0 20px 14px; box-shadow: var(--shadow-sm);
  }
  .pref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .pref-item { }
  .pref-label { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .pref-val { font-size: 14px; font-weight: 600; color: var(--text); }
  .profile-bio { font-size: 14px; line-height: 1.6; color: var(--text-light); }
  .profile-actions { display: flex; gap: 10px; padding: 0 20px; margin-top: 8px; }

  /* ── Messages ── */
  .msg-list { padding: 0 20px; }
  .msg-item {
    display: flex; gap: 12px; align-items: center; padding: 14px 0;
    border-bottom: 1px solid var(--border-light); cursor: pointer; transition: all 0.15s;
  }
  .msg-item:hover { background: var(--border-light); margin: 0 -20px; padding: 14px 20px; border-radius: var(--radius-sm); }
  .msg-avatar {
    width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center;
    justify-content: center; font-size: 16px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .msg-content { flex: 1; min-width: 0; }
  .msg-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
  .msg-preview { font-size: 13px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .msg-meta { text-align: right; flex-shrink: 0; }
  .msg-time { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .msg-unread {
    width: 20px; height: 20px; border-radius: 50%; background: var(--secondary);
    color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center;
    justify-content: center; margin-left: auto;
  }

  .chat-screen { display: flex; flex-direction: column; min-height: 100vh; background: var(--bg); }
  .chat-header {
    display: flex; align-items: center; gap: 12px; padding: 14px 20px;
    background: white; border-bottom: 1px solid var(--border-light);
    position: sticky; top: 0; z-index: 10;
  }
  .chat-header-name { font-size: 16px; font-weight: 700; }
  .chat-header-status { font-size: 11px; color: var(--accent); font-weight: 500; }
  .chat-body { flex: 1; padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; }
  .chat-bubble {
    max-width: 78%; padding: 12px 16px; border-radius: 16px; font-size: 14px;
    line-height: 1.5;
  }
  .chat-bubble.sent { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .chat-bubble.received { background: white; color: var(--text); align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: var(--shadow-sm); }
  .chat-bubble-time { font-size: 10px; opacity: 0.6; margin-top: 4px; text-align: right; }
  .chat-input-bar {
    display: flex; gap: 10px; padding: 12px 20px 28px; background: white;
    border-top: 1px solid var(--border-light); position: sticky; bottom: 0;
  }
  .chat-input {
    flex: 1; padding: 12px 16px; border-radius: 100px; border: 1.5px solid var(--border);
    font-size: 14px; font-family: var(--font); outline: none; background: var(--bg);
  }
  .chat-input:focus { border-color: var(--secondary); }
  .chat-send {
    width: 44px; height: 44px; border-radius: 50%; background: var(--primary); border: none;
    color: white; font-size: 18px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; transition: all 0.2s;
  }
  .chat-send:hover { background: var(--primary-light); }

  /* ── Saved ── */
  .saved-tabs { display: flex; gap: 0; padding: 0 20px; margin-bottom: 16px; }
  .saved-tab {
    flex: 1; padding: 10px; text-align: center; font-size: 13px; font-weight: 600;
    cursor: pointer; border: none; background: none; font-family: var(--font);
    color: var(--text-muted); border-bottom: 2px solid transparent; transition: all 0.2s;
  }
  .saved-tab.active { color: var(--primary); border-bottom-color: var(--primary); }

  /* ── Profile ── */
  .profile-header-card {
    background: white; margin: 0 20px; border-radius: var(--radius); padding: 24px;
    text-align: center; box-shadow: var(--shadow-sm); margin-bottom: 16px;
  }
  .profile-avatar-main {
    width: 80px; height: 80px; border-radius: 24px; margin: 0 auto 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; font-weight: 800; color: white;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
  }
  .profile-name-main { font-size: 20px; font-weight: 800; margin-bottom: 2px; }
  .profile-uni-main { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }
  .profile-completion {
    display: flex; align-items: center; gap: 10px; padding: 10px 16px;
    background: rgba(16,185,129,0.06); border-radius: var(--radius-sm);
  }
  .completion-bar { flex: 1; height: 6px; background: var(--border); border-radius: 6px; overflow: hidden; }
  .completion-fill { height: 100%; background: var(--accent); border-radius: 6px; }
  .completion-text { font-size: 12px; font-weight: 700; color: var(--accent); white-space: nowrap; }

  .profile-menu { margin: 0 20px; }
  .profile-menu-item {
    display: flex; align-items: center; gap: 14px; padding: 16px;
    background: white; border-radius: var(--radius-sm); margin-bottom: 8px;
    cursor: pointer; transition: all 0.2s; border: 1px solid var(--border-light);
  }
  .profile-menu-item:hover { background: var(--border-light); }
  .profile-menu-icon { font-size: 20px; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--border-light); }
  .profile-menu-label { font-size: 14px; font-weight: 600; color: var(--text); flex: 1; }
  .profile-menu-arrow { font-size: 14px; color: var(--text-muted); }

  /* ── Communities ── */
  .community-card {
    display: flex; gap: 14px; align-items: center; padding: 16px;
    background: white; border-radius: var(--radius); margin-bottom: 10px;
    box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.2s;
    border: 1px solid var(--border-light);
  }
  .community-card:hover { box-shadow: var(--shadow); }
  .community-icon {
    width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center;
    justify-content: center; font-size: 24px; background: var(--border-light);
  }
  .community-info { flex: 1; }
  .community-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
  .community-meta { font-size: 12px; color: var(--text-muted); }
  .btn-join {
    padding: 8px 16px; border-radius: 100px; font-size: 12px; font-weight: 700;
    border: 1.5px solid var(--primary); color: var(--primary); background: white;
    cursor: pointer; font-family: var(--font); transition: all 0.2s;
  }
  .btn-join:hover { background: var(--primary); color: white; }

  /* ── Bottom Nav ── */
  .bottom-nav {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 430px; background: white;
    border-top: 1px solid var(--border-light); display: flex;
    padding: 6px 0 env(safe-area-inset-bottom, 8px); z-index: 50;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 8px 0; cursor: pointer; border: none; background: none;
    font-family: var(--font); transition: all 0.2s;
  }
  .nav-icon { font-size: 22px; }
  .nav-label { font-size: 10px; font-weight: 600; color: var(--text-muted); }
  .nav-item.active .nav-label { color: var(--primary); }
  .nav-item.active .nav-icon { transform: scale(1.1); }

  /* ── Page header ── */
  .page-header {
    padding: 20px; display: flex; align-items: center; gap: 12px;
    background: white; border-bottom: 1px solid var(--border-light);
    position: sticky; top: 0; z-index: 20;
  }
  .page-back {
    width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border);
    background: white; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s;
  }
  .page-back:hover { background: var(--border-light); }
  .page-title { font-size: 18px; font-weight: 700; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: var(--text); color: white; padding: 12px 24px; border-radius: 100px;
    font-size: 13px; font-weight: 600; z-index: 100; animation: fadeUp 0.3s ease;
    box-shadow: var(--shadow-lg); white-space: nowrap;
  }

  /* ── Color utils ── */
  .bg-gradient-1 { background: linear-gradient(135deg, #0F4C81, #0EA5E9); }
  .bg-gradient-2 { background: linear-gradient(135deg, #10B981, #0EA5E9); }
  .bg-gradient-3 { background: linear-gradient(135deg, #F59E0B, #EF4444); }
  .bg-gradient-4 { background: linear-gradient(135deg, #8B5CF6, #EC4899); }
  .bg-gradient-5 { background: linear-gradient(135deg, #0F4C81, #10B981); }
  .bg-gradient-6 { background: linear-gradient(135deg, #0EA5E9, #8B5CF6); }

  .hostel-bg-1 { background: linear-gradient(135deg, #e0f2fe, #bfdbfe); }
  .hostel-bg-2 { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }
  .hostel-bg-3 { background: linear-gradient(135deg, #fef3c7, #fde68a); }
  .hostel-bg-4 { background: linear-gradient(135deg, #fce7f3, #fbcfe8); }
  .hostel-bg-5 { background: linear-gradient(135deg, #e0e7ff, #c7d2fe); }
  .hostel-bg-6 { background: linear-gradient(135deg, #ccfbf1, #99f6e4); }

  /* ── Empty state ── */
  .empty-state { text-align: center; padding: 48px 24px; }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .empty-text { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

  /* ── Reviews ── */
  .review-item { padding: 12px 0; border-bottom: 1px solid var(--border-light); }
  .review-top { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .review-avatar { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; }
  .review-name { font-size: 13px; font-weight: 600; }
  .review-stars { font-size: 12px; color: var(--warning); margin-left: auto; }
  .review-text { font-size: 13px; color: var(--text-light); line-height: 1.5; }

  /* ── Responsive (wider screens) ── */
  @media (min-width: 431px) {
    .app-shell { border-left: 1px solid var(--border); border-right: 1px solid var(--border); box-shadow: var(--shadow-lg); }
  }
`;

// ─── Utility ──────────────────────────────────────────────────────────────────
const gradientClasses = ["bg-gradient-1","bg-gradient-2","bg-gradient-3","bg-gradient-4","bg-gradient-5","bg-gradient-6"];
const hostelBgClasses = ["hostel-bg-1","hostel-bg-2","hostel-bg-3","hostel-bg-4","hostel-bg-5","hostel-bg-6"];
const hostelEmojis = ["🏠","🏢","🏫","🏘️","🏗️","🏡"];

function getGradient(i) { return gradientClasses[i % gradientClasses.length]; }
function getHostelBg(i) { return hostelBgClasses[i % hostelBgClasses.length]; }
function formatPrice(p) { return `Rs. ${p.toLocaleString()}`; }

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function StayConnect() {
  const [screen, setScreen] = useState("splash");
  const [authStep, setAuthStep] = useState(1);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [savedHostels, setSavedHostels] = useState(new Set());
  const [savedMatches, setSavedMatches] = useState(new Set());
  const [savedTab, setSavedTab] = useState("hostels");
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [signupData, setSignupData] = useState({ gender: "", uni: "", city: "", movingTo: "", study: "", clean: "", personality: "", smoking: "", guests: "", sleep: "", budget: 15000, interests: new Set(), uploads: new Set() });
  const [loginTab, setLoginTab] = useState("email");

  const showToast = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); }, []);

  const toggleSaveHostel = (id, e) => {
    e?.stopPropagation();
    setSavedHostels(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    showToast(savedHostels.has(id) ? "Removed from saved" : "Hostel saved ✓");
  };

  const toggleSaveMatch = (id) => {
    setSavedMatches(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    showToast(savedMatches.has(id) ? "Removed from saved" : "Profile saved ✓");
  };

  const toggleFilter = (f) => setActiveFilters(prev => { const s = new Set(prev); s.has(f) ? s.delete(f) : s.add(f); return s; });

  const navigate = (scr, data) => {
    if (scr === "hostelDetail") setSelectedHostel(data);
    if (scr === "matchDetail") setSelectedMatch(data);
    if (scr === "chat") setActiveChat(data);
    setScreen(scr);
  };

  const goMain = (tab) => { setScreen("main"); setActiveTab(tab || "home"); };

  // ── Render ──
  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        {screen === "splash" && <SplashScreen onGetStarted={() => setScreen("signup")} onLogin={() => setScreen("login")} />}
        {screen === "signup" && <SignupFlow step={authStep} setStep={setAuthStep} data={signupData} setData={setSignupData} onComplete={() => goMain("home")} onBack={() => authStep === 1 ? setScreen("splash") : setAuthStep(authStep - 1)} />}
        {screen === "login" && <LoginScreen tab={loginTab} setTab={setLoginTab} onLogin={() => goMain("home")} onBack={() => setScreen("splash")} onSignup={() => { setAuthStep(1); setScreen("signup"); }} />}
        {screen === "main" && (
          <>
            {activeTab === "home" && <HomeScreen onHostelClick={(h) => navigate("hostelDetail", h)} onMatchClick={(m) => navigate("matchDetail", m)} savedHostels={savedHostels} toggleSave={toggleSaveHostel} searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeFilters={activeFilters} toggleFilter={toggleFilter} />}
            {activeTab === "search" && <SearchScreen onHostelClick={(h) => navigate("hostelDetail", h)} savedHostels={savedHostels} toggleSave={toggleSaveHostel} />}
            {activeTab === "matches" && <MatchesScreen onMatchClick={(m) => navigate("matchDetail", m)} />}
            {activeTab === "messages" && <MessagesScreen onChatClick={(m) => navigate("chat", m)} />}
            {activeTab === "saved" && <SavedScreen savedHostels={savedHostels} savedMatches={savedMatches} toggleSaveHostel={toggleSaveHostel} tab={savedTab} setTab={setSavedTab} onHostelClick={(h) => navigate("hostelDetail", h)} onMatchClick={(m) => navigate("matchDetail", m)} />}
            {activeTab === "profile" && <ProfileScreen onLogout={() => setScreen("splash")} />}
            <BottomNav active={activeTab} onNav={setActiveTab} />
          </>
        )}
        {screen === "hostelDetail" && selectedHostel && <HostelDetailScreen hostel={selectedHostel} onBack={() => goMain()} savedHostels={savedHostels} toggleSave={toggleSaveHostel} showToast={showToast} />}
        {screen === "matchDetail" && selectedMatch && <MatchDetailScreen match={selectedMatch} onBack={() => goMain("matches")} savedMatches={savedMatches} toggleSave={toggleSaveMatch} onMessage={() => navigate("chat", { id: selectedMatch.id, name: selectedMatch.name, avatar: selectedMatch.avatar })} showToast={showToast} />}
        {screen === "chat" && activeChat && <ChatScreen chat={activeChat} onBack={() => goMain("messages")} />}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

function SplashScreen({ onGetStarted, onLogin }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div className="splash">
      <div className="splash-content" style={{ opacity: show ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <div className="splash-illustration" style={{ background: "transparent", border: "none" }}>
          <img src={LOGO_URL} alt="StayConnect" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className="splash-logo">Stay<span>Connect</span></div>
        <div className="splash-tagline">Find Home. Find Your People.</div>
        <div className="splash-btns" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.3s" }}>
          <button className="btn-primary-splash" onClick={onGetStarted}>Get Started</button>
          <button className="btn-outline-splash" onClick={onLogin}>Already Have Account</button>
        </div>
      </div>
      <div className="splash-footer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 12, opacity: 0.8 }}>
          <span>🛡️ Verified Hostels</span>
          <span>|</span>
          <span>👥 Compatible Roommates</span>
          <span>|</span>
          <span>📍 Across Pakistan</span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.6 }}>Trusted by <span>2,000+</span> Students Across Pakistan 🇵🇰</div>
      </div>
    </div>
  );
}

// ── Signup ──
function SignupFlow({ step, setStep, data, setData, onComplete, onBack }) {
  const updateField = (k, v) => setData(prev => ({ ...prev, [k]: v }));
  const toggleInterest = (i) => setData(prev => { const s = new Set(prev.interests); s.has(i) ? s.delete(i) : s.add(i); return { ...prev, interests: s }; });
  const toggleUpload = (i) => setData(prev => { const s = new Set(prev.uploads); s.has(i) ? s.add(i) : s.add(i); return { ...prev, uploads: s }; });

  const titles = ["Basic Information", "Lifestyle & Preferences", "Verification", "Account Setup"];
  const subtitles = ["Tell us about yourself", "Help us find your perfect match", "Verify your identity for safety", "Secure your account"];

  return (
    <div className="auth-screen fade-in">
      <div className="auth-header">
        <button className="auth-back" onClick={onBack}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <img src={LOGO_URL} alt="StayConnect" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8, background: "rgba(255,255,255,0.15)", padding: 2 }} />
          <div className="auth-title">{titles[step - 1]}</div>
        </div>
        <div className="auth-subtitle">{subtitles[step - 1]}</div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${step * 25}%` }} /></div>
      </div>
      <div className="auth-body">
        {step === 1 && <SignupStep1 data={data} update={updateField} onNext={() => setStep(2)} />}
        {step === 2 && <SignupStep2 data={data} update={updateField} toggleInterest={toggleInterest} onNext={() => setStep(3)} />}
        {step === 3 && <SignupStep3 data={data} toggleUpload={toggleUpload} onNext={() => setStep(4)} />}
        {step === 4 && <SignupStep4 onComplete={onComplete} />}
      </div>
    </div>
  );
}

function SignupStep1({ data, update, onNext }) {
  return (
    <div className="fade-up">
      {[["Full Name","text","name"],["Email Address","email","email"],["Phone Number","tel","phone"],["CNIC Number","text","cnic"]].map(([label, type, key]) => (
        <div className="field-group" key={key}>
          <label className="field-label">{label}</label>
          <input className="field-input" type={type} placeholder={`Enter your ${label.toLowerCase()}`} />
        </div>
      ))}
      <div className="field-group">
        <label className="field-label">Gender</label>
        <div className="chip-group">
          {["Male", "Female"].map(g => <button key={g} className={`chip ${data.gender === g ? "active" : ""}`} onClick={() => update("gender", g)}>{g}</button>)}
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Date of Birth</label>
        <input className="field-input" type="date" />
      </div>
      <div className="field-group">
        <label className="field-label">University</label>
        <select className="field-input field-select" value={data.uni} onChange={e => update("uni", e.target.value)}>
          <option value="">Select University</option>
          {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      {[["Degree Program","text"],["Semester / Year","text"]].map(([label, type]) => (
        <div className="field-group" key={label}>
          <label className="field-label">{label}</label>
          <input className="field-input" type={type} placeholder={`Enter ${label.toLowerCase()}`} />
        </div>
      ))}
      <div className="field-group">
        <label className="field-label">Current City</label>
        <select className="field-input field-select" value={data.city} onChange={e => update("city", e.target.value)}>
          <option value="">Select City</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="field-group">
        <label className="field-label">City Moving To</label>
        <select className="field-input field-select" value={data.movingTo} onChange={e => update("movingTo", e.target.value)}>
          <option value="">Select City</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button className="btn-next" onClick={onNext}>Next →</button>
    </div>
  );
}

function SignupStep2({ data, update, toggleInterest, onNext }) {
  const prefs = [
    { label: "Study Schedule", key: "study", opts: ["Early Riser", "Night Owl", "Flexible"] },
    { label: "Cleanliness", key: "clean", opts: ["Very Tidy", "Average", "Relaxed"] },
    { label: "Personality", key: "personality", opts: ["Introvert", "Extrovert", "Ambivert"] },
    { label: "Smoking", key: "smoking", opts: ["Non-Smoker", "Occasionally", "Okay With It"] },
    { label: "Guest Preference", key: "guests", opts: ["No Guests", "Occasionally", "Flexible"] },
    { label: "Sleep Schedule", key: "sleep", opts: ["Before 11 PM", "11 PM–1 AM", "After 1 AM"] },
  ];
  return (
    <div className="fade-up">
      {prefs.map(p => (
        <div className="field-group" key={p.key}>
          <label className="field-label">{p.label}</label>
          <div className="chip-group">
            {p.opts.map(o => <button key={o} className={`chip ${data[p.key] === o ? "active" : ""}`} onClick={() => update(p.key, o)}>{o}</button>)}
          </div>
        </div>
      ))}
      <div className="field-group">
        <label className="field-label">Monthly Budget</label>
        <div className="budget-slider-container">
          <div className="budget-display"><span>Rs. 5,000</span><span>{formatPrice(data.budget)}</span></div>
          <input type="range" className="budget-slider" min={5000} max={50000} step={1000} value={data.budget} onChange={e => update("budget", +e.target.value)} />
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Interests (select all that apply)</label>
        <div className="chip-group">
          {INTERESTS.map(i => <button key={i} className={`chip ${data.interests.has(i) ? "active" : ""}`} onClick={() => toggleInterest(i)}>{i}</button>)}
        </div>
      </div>
      <button className="btn-next" onClick={onNext}>Next →</button>
    </div>
  );
}

function SignupStep3({ data, toggleUpload, onNext }) {
  const docs = [
    { icon: "🪪", label: "CNIC Front", key: "cnic-front" },
    { icon: "🪪", label: "CNIC Back", key: "cnic-back" },
    { icon: "🎓", label: "University Student Card", key: "student-card" },
    { icon: "📄", label: "Admission Letter", key: "admission" },
    { icon: "🤳", label: "Selfie Verification", key: "selfie" },
  ];
  return (
    <div className="fade-up">
      {docs.map(d => (
        <div key={d.key} className={`verify-upload ${data.uploads.has(d.key) ? "uploaded" : ""}`} onClick={() => toggleUpload(d.key)}>
          <div className="verify-icon">{d.icon}</div>
          <div className="verify-label">{data.uploads.has(d.key) ? `${d.label} ✓ Uploaded` : `Upload ${d.label}`}</div>
        </div>
      ))}
      <div className="security-badges">
        {["Documents Encrypted", "Student Verification", "Identity Protection", "Safe Community"].map(b => (
          <div className="security-badge" key={b}>✓ {b}</div>
        ))}
      </div>
      <button className="btn-next" onClick={onNext}>Verify & Continue →</button>
    </div>
  );
}

function SignupStep4({ onComplete }) {
  return (
    <div className="fade-up">
      <div className="field-group">
        <label className="field-label">Password</label>
        <input className="field-input" type="password" placeholder="Create a strong password" />
      </div>
      <div className="field-group">
        <label className="field-label">Confirm Password</label>
        <input className="field-input" type="password" placeholder="Confirm your password" />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, margin: "16px 0 24px" }}>
        <input type="checkbox" id="terms" style={{ marginTop: 3, accentColor: COLORS.primary }} />
        <label htmlFor="terms" style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.5 }}>
          I agree to StayConnect's <span style={{ color: COLORS.secondary, fontWeight: 600, cursor: "pointer" }}>Terms & Conditions</span> and <span style={{ color: COLORS.secondary, fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
        </label>
      </div>
      <button className="btn-next" onClick={onComplete}>Complete Registration ✓</button>
    </div>
  );
}

// ── Login ──
function LoginScreen({ tab, setTab, onLogin, onBack, onSignup }) {
  return (
    <div className="auth-screen fade-in">
      <div className="auth-header">
        <button className="auth-back" onClick={onBack}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <img src={LOGO_URL} alt="StayConnect" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8, background: "rgba(255,255,255,0.15)", padding: 2 }} />
          <div className="auth-title">Welcome Back</div>
        </div>
        <div className="auth-subtitle">Sign in to continue</div>
      </div>
      <div className="auth-body">
        <div className="login-tabs">
          {["email", "phone"].map(t => (
            <button key={t} className={`login-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t === "email" ? "📧 Email" : "📱 Phone"}
            </button>
          ))}
        </div>
        {tab === "email" ? (
          <>
            <div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" placeholder="your@email.com" /></div>
            <div className="field-group"><label className="field-label">Password</label><input className="field-input" type="password" placeholder="Enter password" /></div>
            <div className="forgot-link"><a href="#">Forgot Password?</a></div>
          </>
        ) : (
          <div className="field-group"><label className="field-label">Phone Number</label><input className="field-input" type="tel" placeholder="+92 3XX XXXXXXX" /></div>
        )}
        <button className="btn-next" onClick={onLogin}>Sign In</button>
        <div className="divider"><div className="divider-line" /><span className="divider-text">OR</span><div className="divider-line" /></div>
        <button className="btn-google">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Continue with Google
        </button>
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: COLORS.textLight }}>
          Don't have an account? <span style={{ color: COLORS.secondary, fontWeight: 700, cursor: "pointer" }} onClick={onSignup}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

// ── Home ──
function HomeScreen({ onHostelClick, onMatchClick, savedHostels, toggleSave, searchQuery, setSearchQuery, activeFilters, toggleFilter }) {
  const filters = ["Girls Only", "Boys Only", "Verified", "WiFi", "Meals", "CCTV", "Laundry", "Near University"];
  return (
    <div className="main-app fade-in">
      <div className="top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URL} alt="StayConnect" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 10 }} />
          <div className="top-greeting">
            <h2>Good Morning, Ayesha 👋</h2>
            <p>Find your perfect stay</p>
          </div>
        </div>
        <div className="top-actions">
          <button className="icon-btn">🔔<span className="notif-dot" /></button>
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <span>🔍</span>
          <input placeholder="Search hostels, universities, cities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="filter-scroll">
        {filters.map(f => <button key={f} className={`filter-chip ${activeFilters.has(f) ? "active" : ""}`} onClick={() => toggleFilter(f)}>{f}</button>)}
      </div>

      <div className="section">
        <div className="section-head"><span className="section-title">Recommended Hostels</span><button className="section-link">See All</button></div>
        <div className="hostel-scroll">
          {SAMPLE_HOSTELS.slice(0, 4).map((h, i) => (
            <div key={h.id} className="hostel-card" onClick={() => onHostelClick(h)} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="hostel-card-img">
                <div className={`hostel-card-img-bg ${getHostelBg(i)}`}>{hostelEmojis[i % hostelEmojis.length]}</div>
                {h.verified && <div className="hostel-badge">✓ Verified</div>}
                <div className="hostel-gender-badge">{h.gender}</div>
                <button className="hostel-save" onClick={(e) => toggleSave(h.id, e)}>{savedHostels.has(h.id) ? "❤️" : "🤍"}</button>
              </div>
              <div className="hostel-card-body">
                <div className="hostel-card-name">{h.name}</div>
                <div className="hostel-card-loc">📍 {h.area}, {h.city}</div>
                <div className="hostel-card-footer">
                  <div className="hostel-price">{formatPrice(h.double)}<span>/mo</span></div>
                  <div className="hostel-rating">⭐ {h.rating}</div>
                </div>
                <div className="hostel-rooms">{h.available} rooms available</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head"><span className="section-title">Top Roommate Matches</span><button className="section-link">See All</button></div>
        {SAMPLE_STUDENTS.slice(0, 3).map((m, i) => (
          <div key={m.id} className="match-card" onClick={() => onMatchClick(m)} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="match-top">
              <div className={`match-avatar ${getGradient(i)}`}>{m.avatar.slice(0, 2)}</div>
              <div className="match-info">
                <div className="match-name-row">
                  <span className="match-name">{m.name}</span>
                  {m.verified && <span className="match-verified">✓</span>}
                </div>
                <div className="match-uni">{m.uni} · {m.degree} · {m.sem} Semester</div>
              </div>
              <div className="match-score" style={{ background: m.match >= 90 ? "rgba(16,185,129,0.1)" : "rgba(14,165,233,0.1)", color: m.match >= 90 ? COLORS.accent : COLORS.secondary }}>{m.match}%</div>
            </div>
            <div className="match-tags">{m.interests.slice(0, 4).map(t => <span key={t} className="match-tag">{t}</span>)}</div>
            <div className="match-budget">💰 {m.budget}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-head"><span className="section-title">Student Communities</span><button className="section-link">See All</button></div>
        {COMMUNITIES.slice(0, 3).map(c => (
          <div key={c.id} className="community-card">
            <div className="community-icon">{c.icon}</div>
            <div className="community-info">
              <div className="community-name">{c.name}</div>
              <div className="community-meta">{c.members} members · {c.posts} posts</div>
            </div>
            <button className="btn-join">Join</button>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-head"><span className="section-title">Popular Hostels</span><button className="section-link">See All</button></div>
        <div className="hostel-scroll">
          {SAMPLE_HOSTELS.slice(2).map((h, i) => (
            <div key={h.id} className="hostel-card" onClick={() => onHostelClick(h)}>
              <div className="hostel-card-img">
                <div className={`hostel-card-img-bg ${getHostelBg(i + 2)}`}>{hostelEmojis[(i + 2) % hostelEmojis.length]}</div>
                {h.verified && <div className="hostel-badge">✓ Verified</div>}
                <div className="hostel-gender-badge">{h.gender}</div>
                <button className="hostel-save" onClick={(e) => toggleSave(h.id, e)}>{savedHostels.has(h.id) ? "❤️" : "🤍"}</button>
              </div>
              <div className="hostel-card-body">
                <div className="hostel-card-name">{h.name}</div>
                <div className="hostel-card-loc">📍 {h.area}, {h.city}</div>
                <div className="hostel-card-footer">
                  <div className="hostel-price">{formatPrice(h.double)}<span>/mo</span></div>
                  <div className="hostel-rating">⭐ {h.rating}</div>
                </div>
                <div className="hostel-rooms">{h.available} rooms available</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

// ── Search ──
function SearchScreen({ onHostelClick, savedHostels, toggleSave }) {
  const [sort, setSort] = useState("rating");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  let filtered = [...SAMPLE_HOSTELS];
  if (city) filtered = filtered.filter(h => h.city === city);
  if (gender) filtered = filtered.filter(h => h.gender === gender);
  if (sort === "price") filtered.sort((a, b) => a.double - b.double);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="main-app fade-in">
      <div className="page-header" style={{ flexDirection: "column", alignItems: "stretch", gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Search Hostels</div>
        <div className="search-box">
          <span>🔍</span>
          <input placeholder="Search by name, area, city..." />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "12px 20px", flexWrap: "wrap" }}>
        <select className="field-input field-select" style={{ flex: 1, minWidth: 100, padding: "10px 36px 10px 12px", fontSize: 13 }} value={city} onChange={e => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="field-input field-select" style={{ flex: 1, minWidth: 100, padding: "10px 36px 10px 12px", fontSize: 13 }} value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">All Types</option>
          <option value="Girls">Girls Only</option>
          <option value="Boys">Boys Only</option>
        </select>
        <select className="field-input field-select" style={{ width: 120, padding: "10px 36px 10px 12px", fontSize: 13 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="price">Lowest Price</option>
        </select>
      </div>
      <div style={{ padding: "4px 20px 0", fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>{filtered.length} hostels found</div>
      <div style={{ padding: "0 20px" }}>
        {filtered.map((h, i) => (
          <div key={h.id} className="hostel-list-card" onClick={() => onHostelClick(h)}>
            <div className={`hostel-list-img ${getHostelBg(i)}`}>
              <span style={{ fontSize: 36 }}>{hostelEmojis[i % hostelEmojis.length]}</span>
              {h.verified && <div style={{ position: "absolute", top: 6, left: 6, background: COLORS.accent, color: "white", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>✓</div>}
            </div>
            <div className="hostel-list-info">
              <div className="hostel-list-name">{h.name}</div>
              <div className="hostel-list-loc">📍 {h.area}, {h.city} · {h.gender}</div>
              <div className="hostel-list-amen">{h.amenities.slice(0, 3).map(a => <span key={a}>{a}</span>)}</div>
              <div className="hostel-list-bottom">
                <span className="hostel-list-price">{formatPrice(h.double)}/mo</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.warning }}>⭐ {h.rating} ({h.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hostel Detail ──
function HostelDetailScreen({ hostel, onBack, savedHostels, toggleSave, showToast }) {
  const h = hostel;
  const reviews = [
    { name: "Iqra Malik", text: "Great hostel! Clean rooms, friendly warden, and the food is amazing. Highly recommended for girls.", stars: 5 },
    { name: "Abdullah Tariq", text: "Good value for money. WiFi could be better but everything else is solid.", stars: 4 },
    { name: "Zainab Ali", text: "I've been here for two semesters. Safe environment and close to campus. Love it!", stars: 5 },
  ];
  return (
    <div className="detail-screen fade-in">
      <div className={`detail-hero ${getHostelBg(h.id - 1)}`}>
        <button className="detail-back-btn" onClick={onBack}>←</button>
        {hostelEmojis[(h.id - 1) % hostelEmojis.length]}
      </div>
      <div className="detail-body">
        <div className="detail-main-card">
          <div className="detail-name">{h.name}</div>
          <div className="detail-loc">📍 {h.area}, {h.city}</div>
          <div className="detail-badges">
            {h.verified && <span className="detail-badge" style={{ background: "rgba(16,185,129,0.1)", color: COLORS.accent }}>✓ Verified</span>}
            <span className="detail-badge" style={{ background: "rgba(14,165,233,0.1)", color: COLORS.secondary }}>{h.gender}</span>
            <span className="detail-badge" style={{ background: "rgba(245,158,11,0.1)", color: COLORS.warning }}>⭐ {h.rating} ({h.reviews})</span>
            <span className="detail-badge" style={{ background: "rgba(16,185,129,0.1)", color: COLORS.accent }}>{h.available} rooms</span>
          </div>
          <div className="detail-pricing">
            <div className="price-card"><div className="price-type">Single</div><div className="price-val">{formatPrice(h.single)}<small>/mo</small></div></div>
            <div className="price-card"><div className="price-type">Double</div><div className="price-val">{formatPrice(h.double)}<small>/mo</small></div></div>
            <div className="price-card"><div className="price-type">Triple</div><div className="price-val">{formatPrice(h.triple)}<small>/mo</small></div></div>
          </div>
        </div>

        <div className="detail-main-card">
          <div className="detail-section-title">Amenities</div>
          <div className="amenity-grid">
            {h.amenities.map(a => { const am = AMENITIES_LIST.find(x => x.label === a); return <div key={a} className="amenity-chip">{am?.icon || "✓"} {a}</div>; })}
          </div>
        </div>

        <div className="detail-main-card">
          <div className="detail-section-title">About</div>
          <p className="detail-desc">{h.desc}</p>
        </div>

        <div className="detail-main-card">
          <div className="detail-section-title">Hostel Rules</div>
          {h.rules.map((r, i) => <div key={i} className="rule-item">📋 {r}</div>)}
        </div>

        <div className="detail-main-card">
          <div className="detail-section-title">Owner</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className={`review-avatar ${getGradient(h.id)}`} style={{ width: 40, height: 40, fontSize: 14 }}>{h.owner.split(" ").map(w => w[0]).join("")}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{h.owner}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Hostel Manager</div>
            </div>
          </div>
        </div>

        <div className="detail-main-card">
          <div className="detail-section-title">Reviews</div>
          {reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-top">
                <div className={`review-avatar ${getGradient(i)}`}>{r.name.split(" ").map(w => w[0]).join("")}</div>
                <span className="review-name">{r.name}</span>
                <span className="review-stars">{"⭐".repeat(r.stars)}</span>
              </div>
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="detail-actions">
          <button className="btn-action primary" onClick={() => showToast("Visit booked ✓")}>📅 Book Visit</button>
          <button className="btn-action outline" onClick={() => showToast("Message sent ✓")}>💬 Contact</button>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button className="btn-action outline" style={{ flex: 1 }} onClick={(e) => toggleSave(h.id, e)}>
            {savedHostels.has(h.id) ? "❤️ Saved" : "🤍 Save"}
          </button>
          <button className="btn-action outline" style={{ flex: 1, color: COLORS.danger, borderColor: COLORS.danger }}>⚠️ Report</button>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ── Matches ──
function MatchesScreen({ onMatchClick }) {
  const [filter, setFilter] = useState("all");
  let filtered = SAMPLE_STUDENTS;
  if (filter === "female") filtered = filtered.filter(m => m.gender === "Female");
  if (filter === "male") filtered = filtered.filter(m => m.gender === "Male");
  if (filter === "90+") filtered = filtered.filter(m => m.match >= 90);
  return (
    <div className="main-app fade-in">
      <div className="page-header" style={{ justifyContent: "space-between" }}>
        <span className="page-title">Roommate Matches</span>
      </div>
      <div className="filter-scroll">
        {[["all", "All"], ["90+", "90%+ Match"], ["female", "Female"], ["male", "Male"]].map(([k, l]) => (
          <button key={k} className={`filter-chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>
      <div style={{ padding: "4px 20px" }}>
        {filtered.map((m, i) => (
          <div key={m.id} className="match-card" onClick={() => onMatchClick(m)}>
            <div className="match-top">
              <div className={`match-avatar ${getGradient(i)}`}>{m.avatar.slice(0, 2)}</div>
              <div className="match-info">
                <div className="match-name-row">
                  <span className="match-name">{m.name}</span>
                  {m.verified && <span className="match-verified">✓</span>}
                </div>
                <div className="match-uni">{m.uni} · {m.degree} · {m.sem} Semester</div>
              </div>
              <div className="match-score" style={{ background: m.match >= 90 ? "rgba(16,185,129,0.1)" : "rgba(14,165,233,0.1)", color: m.match >= 90 ? COLORS.accent : COLORS.secondary }}>{m.match}%</div>
            </div>
            <div className="match-tags">{m.interests.map(t => <span key={t} className="match-tag">{t}</span>)}</div>
            <div className="match-budget">💰 {m.budget} · {m.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Match Detail ──
function MatchDetailScreen({ match, onBack, savedMatches, toggleSave, onMessage, showToast }) {
  const m = match;
  const idx = SAMPLE_STUDENTS.findIndex(s => s.id === m.id);
  return (
    <div className="detail-screen fade-in">
      <div className="page-header">
        <button className="page-back" onClick={onBack}>←</button>
        <span className="page-title">Profile</span>
      </div>
      <div className="profile-detail-header">
        <div className={`profile-avatar-large ${getGradient(idx)}`}>{m.avatar.slice(0, 2)}</div>
        <div className="profile-name-large">
          {m.name} {m.verified && <span style={{ fontSize: 18 }}>✓</span>}
        </div>
        <div className="profile-uni-large">{m.uni} · {m.degree} · {m.sem} Semester</div>
        <div className="profile-match-badge" style={{ background: m.match >= 90 ? "rgba(16,185,129,0.1)" : "rgba(14,165,233,0.1)", color: m.match >= 90 ? COLORS.accent : COLORS.secondary }}>
          {m.match}% Compatible
        </div>
      </div>

      <div className="profile-section-card">
        <div className="detail-section-title">About</div>
        <p className="profile-bio">{m.bio}</p>
      </div>

      <div className="profile-section-card">
        <div className="detail-section-title">Lifestyle Preferences</div>
        <div className="pref-grid">
          <div className="pref-item"><div className="pref-label">Study</div><div className="pref-val">{m.study}</div></div>
          <div className="pref-item"><div className="pref-label">Sleep</div><div className="pref-val">{m.sleep}</div></div>
          <div className="pref-item"><div className="pref-label">Cleanliness</div><div className="pref-val">{m.clean}</div></div>
          <div className="pref-item"><div className="pref-label">Personality</div><div className="pref-val">{m.personality}</div></div>
          <div className="pref-item"><div className="pref-label">Smoking</div><div className="pref-val">{m.smoking}</div></div>
          <div className="pref-item"><div className="pref-label">Budget</div><div className="pref-val">{m.budget}</div></div>
        </div>
      </div>

      <div className="profile-section-card">
        <div className="detail-section-title">Interests</div>
        <div className="chip-group">{m.interests.map(i => <span key={i} className="chip active" style={{ cursor: "default", fontSize: 12, padding: "6px 12px" }}>{i}</span>)}</div>
      </div>

      <div className="profile-actions">
        <button className="btn-action primary" style={{ flex: 1 }} onClick={onMessage}>💬 Message</button>
        <button className="btn-action outline" style={{ flex: 1 }} onClick={() => toggleSave(m.id)}>
          {savedMatches.has(m.id) ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 10, padding: "10px 20px" }}>
        <button className="btn-action outline" style={{ flex: 1, fontSize: 12, color: COLORS.danger, borderColor: COLORS.danger }}>⚠️ Report</button>
        <button className="btn-action outline" style={{ flex: 1, fontSize: 12, color: COLORS.textMuted, borderColor: COLORS.border }}>🚫 Block</button>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ── Messages ──
function MessagesScreen({ onChatClick }) {
  return (
    <div className="main-app fade-in">
      <div className="page-header"><span className="page-title">Messages</span></div>
      <div className="msg-list">
        {MESSAGES.map((m, i) => (
          <div key={m.id} className="msg-item" onClick={() => onChatClick(m)}>
            <div className={`msg-avatar ${getGradient(i)}`}>{m.avatar.slice(0, 2)}</div>
            <div className="msg-content">
              <div className="msg-name">{m.name}</div>
              <div className="msg-preview">{m.lastMsg}</div>
            </div>
            <div className="msg-meta">
              <div className="msg-time">{m.time}</div>
              {m.unread > 0 && <div className="msg-unread">{m.unread}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Chat ──
function ChatScreen({ chat, onBack }) {
  const [msgs, setMsgs] = useState([
    { text: "Hi! I noticed we're both looking in Gulberg. Have you found any good hostels?", sent: false, time: "2:25 PM" },
    { text: "Yes! I found a great one near LUMS. It's called Al-Noor Girls Hostel. Very clean and safe.", sent: true, time: "2:27 PM" },
    { text: "That sounds amazing! What's the rent like?", sent: false, time: "2:28 PM" },
    { text: "Rs. 10,000 for double sharing. They include meals and WiFi too!", sent: true, time: "2:29 PM" },
    { text: "Would you like to visit together this weekend?", sent: false, time: "2:30 PM" },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => { bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { text: input.trim(), sent: true, time: "Now" }]);
    setInput("");
  };

  return (
    <div className="chat-screen fade-in">
      <div className="chat-header">
        <button className="page-back" onClick={onBack}>←</button>
        <div className={`msg-avatar ${getGradient(chat.id)}`} style={{ width: 38, height: 38, fontSize: 13 }}>{chat.avatar.slice(0, 2)}</div>
        <div>
          <div className="chat-header-name">{chat.name}</div>
          <div className="chat-header-status">● Online</div>
        </div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.sent ? "sent" : "received"}`}>
            {m.text}
            <div className="chat-bubble-time">{m.time} {m.sent && "✓✓"}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <input className="chat-input" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button className="chat-send" onClick={send}>➤</button>
      </div>
    </div>
  );
}

// ── Saved ──
function SavedScreen({ savedHostels, savedMatches, toggleSaveHostel, tab, setTab, onHostelClick, onMatchClick }) {
  const hostels = SAMPLE_HOSTELS.filter(h => savedHostels.has(h.id));
  const matches = SAMPLE_STUDENTS.filter(m => savedMatches.has(m.id));
  return (
    <div className="main-app fade-in">
      <div className="page-header"><span className="page-title">Saved</span></div>
      <div className="saved-tabs">
        {[["hostels", "Hostels"], ["roommates", "Roommates"], ["communities", "Communities"]].map(([k, l]) => (
          <button key={k} className={`saved-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <div style={{ padding: "0 20px" }}>
        {tab === "hostels" && (hostels.length ? hostels.map((h, i) => (
          <div key={h.id} className="hostel-list-card" onClick={() => onHostelClick(h)}>
            <div className={`hostel-list-img ${getHostelBg(i)}`}><span style={{ fontSize: 36 }}>{hostelEmojis[i % hostelEmojis.length]}</span></div>
            <div className="hostel-list-info">
              <div className="hostel-list-name">{h.name}</div>
              <div className="hostel-list-loc">📍 {h.area}, {h.city}</div>
              <div className="hostel-list-bottom">
                <span className="hostel-list-price">{formatPrice(h.double)}/mo</span>
                <span style={{ fontSize: 13, color: COLORS.warning }}>⭐ {h.rating}</span>
              </div>
            </div>
          </div>
        )) : <div className="empty-state"><div className="empty-icon">🏠</div><div className="empty-title">No Saved Hostels</div><div className="empty-text">Save hostels you like and they'll appear here</div></div>)}

        {tab === "roommates" && (matches.length ? matches.map((m, i) => (
          <div key={m.id} className="match-card" onClick={() => onMatchClick(m)}>
            <div className="match-top">
              <div className={`match-avatar ${getGradient(i)}`}>{m.avatar.slice(0, 2)}</div>
              <div className="match-info"><div className="match-name">{m.name}</div><div className="match-uni">{m.uni}</div></div>
              <div className="match-score" style={{ background: "rgba(16,185,129,0.1)", color: COLORS.accent }}>{m.match}%</div>
            </div>
          </div>
        )) : <div className="empty-state"><div className="empty-icon">👥</div><div className="empty-title">No Saved Profiles</div><div className="empty-text">Save roommate profiles you're interested in</div></div>)}

        {tab === "communities" && <div className="empty-state"><div className="empty-icon">🏘️</div><div className="empty-title">No Saved Communities</div><div className="empty-text">Join communities to connect with students</div></div>}
      </div>
    </div>
  );
}

// ── Profile ──
function ProfileScreen({ onLogout }) {
  const menuItems = [
    { icon: "✏️", label: "Edit Profile" },
    { icon: "🎯", label: "Change Preferences" },
    { icon: "🔔", label: "Notifications" },
    { icon: "🔒", label: "Privacy Settings" },
    { icon: "🛡️", label: "Security" },
    { icon: "📞", label: "Emergency Contact" },
    { icon: "❓", label: "Help & Support" },
    { icon: "📜", label: "Terms & Conditions" },
  ];
  return (
    <div className="main-app fade-in">
      <div className="page-header"><span className="page-title">Profile</span></div>
      <div className="profile-header-card">
        <div className="profile-avatar-main">AK</div>
        <div className="profile-name-main">Ayesha Khan</div>
        <div className="profile-uni-main">LUMS · BBA · 3rd Semester</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14 }}>
          <span className="detail-badge" style={{ background: "rgba(16,185,129,0.1)", color: COLORS.accent, fontSize: 11 }}>✓ Verified Student</span>
          <span className="detail-badge" style={{ background: "rgba(14,165,233,0.1)", color: COLORS.secondary, fontSize: 11 }}>📍 Lahore</span>
        </div>
        <div className="profile-completion">
          <div className="completion-bar"><div className="completion-fill" style={{ width: "85%" }} /></div>
          <span className="completion-text">85%</span>
        </div>
      </div>
      <div className="profile-menu">
        {menuItems.map(item => (
          <div key={item.label} className="profile-menu-item">
            <div className="profile-menu-icon">{item.icon}</div>
            <span className="profile-menu-label">{item.label}</span>
            <span className="profile-menu-arrow">›</span>
          </div>
        ))}
        <div className="profile-menu-item" onClick={onLogout} style={{ marginTop: 8 }}>
          <div className="profile-menu-icon" style={{ background: "rgba(239,68,68,0.1)" }}>🚪</div>
          <span className="profile-menu-label" style={{ color: COLORS.danger }}>Logout</span>
          <span className="profile-menu-arrow">›</span>
        </div>
        <div className="profile-menu-item" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
          <div className="profile-menu-icon" style={{ background: "rgba(239,68,68,0.1)" }}>🗑️</div>
          <span className="profile-menu-label" style={{ color: COLORS.danger }}>Delete Account</span>
          <span className="profile-menu-arrow">›</span>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ── Bottom Navigation ──
function BottomNav({ active, onNav }) {
  const items = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "search", icon: "🔍", label: "Search" },
    { id: "matches", icon: "👥", label: "Matches" },
    { id: "messages", icon: "💬", label: "Messages" },
    { id: "saved", icon: "❤️", label: "Saved" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div className="bottom-nav">
      {items.map(item => (
        <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => onNav(item.id)}>
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
