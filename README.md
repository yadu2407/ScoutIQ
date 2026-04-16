# ScoutIQ - Sports Talent Scouting App

A React Native mobile application for sports talent scouts to discover, evaluate, and shortlist athletes.

## 📱 Features

### 1. Athlete Discovery Feed (30 pts)
- Scrollable feed of athlete cards
- Each card shows: name, sport, position, age, and Score (0-100)
- Filter chips to filter by sport (Football, Basketball, Soccer)
- FlatList with proper keyExtractor
- Empty state when no athletes match

### 2. Athlete Profile Screen (25 pts)
- Full mock stats (speed, stamina, accuracy, strength, agility)
- Readiness Score progress bar (built from scratch - no external libs)
- Add to Shortlist / Remove from Shortlist button
- Clean back navigation with no stale state

### 3. Shortlist Screen (25 pts)
- Dedicated tab for shortlisted athletes
- AsyncStorage persistence - survives app restarts ✅
- Remove athlete via button
- Total count and average score at top
- Polished empty state

### 4. Search (10 pts)
- Search bar on Discovery screen
- Real-time filtering as user types
- 300ms debounce
- Result count below search bar

### 5. Navigation & App Shell (10 pts)
- Bottom tab navigator: Discover + Shortlist
- Stack navigator inside Discover for Profile screen
- Consistent header styling across all screens

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs + Stack)
- **Storage:** AsyncStorage
- **Styling:** StyleSheet API (No UI kits as required)

## 📦 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yadu2407/ScoutIQ.git
cd ScoutIQ

# 2. Install dependencies
npm install

# 3. Install Expo packages
npx expo install react-native-screens react-native-safe-area-context

# 4. Start the development server
npx expo start --clear

# 5. Run on device
# - Scan QR code with Expo Go app (Android) or Camera (iOS)
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator
