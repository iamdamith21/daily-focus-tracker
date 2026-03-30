# 🎯 Daily Focus Tracker

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Dark_Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**A personal productivity app to track your daily tasks, streaks, and weekly progress.**

[View Demo](#) · [Report Bug](https://github.com/iamdamith21/daily-focus-tracker/issues) · [Request Feature](https://github.com/iamdamith21/daily-focus-tracker/issues)

---

## ✨ Features

- **📝 Task Management** — Add, complete, and delete daily tasks
- **🎯 Daily Goal** — Set a task goal for the day and track progress
- **📊 Progress Bar** — Visual indicator that fills as you complete tasks
- **🔥 Streak Counter** — Tracks consecutive days of goal completion
- **📈 Week Summary** — Bar chart showing your productivity over the past 7 days
- **💾 Persistent Storage** — All data saved to localStorage — survives page refresh
- **📤 CSV Export** — Export tasks and history to Excel-compatible CSV
- **✨ Smooth Animations** — Slide-in and fade-out transitions for tasks
- **🌑 Dark Theme** — Modern dark UI with purple accents

---

## 🖥️ Preview

```
┌─────────────────────────────────┐
│  🎯 Daily Focus Tracker         │
│  අද දවසේ focus කරන්න           │
│                                 │
│  🔥 5  day streak               │
│                                 │
│  Goal: [5] tasks                │
│  ████████░░  3/5 (60%)         │
│                                 │
│  [This Week Bar Chart]          │
│                                 │
│  [↓ Export CSV          ]       │
│  [Add a new task...] [Add]      │
│                                 │
│  ✓  Book කියවනවා    ✓  ✕       │
│  ✓  Gym යනවා        ✓  ✕       │
│     Market යනවා     ✓  ✕       │
└─────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/iamdamith21/daily-focus-tracker.git

# 2. Navigate to the project folder
cd daily-focus-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Project Structure

```
daily-focus-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── TaskInput.jsx       # Task input form
│   │   ├── TaskInput.css
│   │   ├── TaskList.jsx        # Task list container
│   │   ├── TaskList.css
│   │   ├── TaskItem.jsx        # Individual task card
│   │   ├── TaskItem.css
│   │   ├── ProgressBar.jsx     # Goal progress bar
│   │   ├── ProgressBar.css
│   │   ├── StreakCounter.jsx   # Daily streak display
│   │   ├── StreakCounter.css
│   │   ├── WeekSummary.jsx     # Weekly bar chart
│   │   ├── WeekSummary.css
│   │   ├── ExportButton.jsx    # CSV export
│   │   └── ExportButton.css
│   ├── App.jsx                 # Main component + state
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🧠 React Concepts Used

| Concept | Where Used |
|---|---|
| `useState` | Task list, goal, streak, input value |
| `useEffect` | localStorage sync, streak logic |
| `props` | Passing data & functions between components |
| Derived state | `completedCount`, `isGoalComplete` |
| Conditional rendering | Empty state, streak messages, goal complete |
| Array methods | `.map()`, `.filter()`, `.find()` |
| Spread operator | `[...tasks, newTask]` |
| CSS Animations | Task slide-in, fade-out, button pulse |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^18 | UI library |
| react-dom | ^18 | DOM rendering |
| vite | ^5 | Build tool & dev server |
| recharts | ^2 | Week summary bar chart |

---

## 🛠️ Built With

This project was built as a **30-day React learning challenge** — 30 minutes per day, one feature at a time.

**Day-by-day breakdown:**

| Days | Focus |
|---|---|
| 1 | Project setup — Vite + Git |
| 2–3 | TaskInput + TaskList components |
| 4 | localStorage + useEffect |
| 5 | Daily goal + Progress bar |
| 6 | Dark modern CSS styling |
| 7 | Streak counter |
| 8 | Week summary chart (Recharts) |
| 9 | CSV export |
| 10 | Smooth animations |

---

## 📄 License

Distributed under the MIT License.

---

![Daily Focus Tracker](./assets/daily-focus-tracker.png)

Made with ❤️ by [Damith Tharanga](https://github.com/iamdamith21)

</div>
