# 📝 Notes app

A modern, fast, and responsive Note-taking and Task management application built with Expo and React Native. FluxNotes offers a seamless experience across mobile and tablet devices with a focus on clean UI/UX and system-integrated theming.

## ✨ Features

### 🗒️ Advanced Note Management

- **Efficient Grid Layout**: Browse your notes in a clean, responsive grid that adapts to your screen size.
- **Rich Note Editor**: Auto-saving capabilities with a focus on distraction-free writing.
- **Selection Mode**: Long-press to select multiple notes for bulk deletion.

### ⚡ Smart Task Tracking

- **Unified Workflow**: Manage your to-dos alongside your notes.
- **Quick Entry**: Add tasks instantly via a sleek modal interface.
- **Auto-Sorting**: Completed tasks automatically move to the bottom to keep your focus on pending items.

### 🎨 Premium UI/UX

- **Dynamic Theming**: Full support for Light and Dark modes.
- **Custom Theme Toggle**: A unique, custom-animated toggle with integrated Sun/Moon indicators inside the slider.
- **System-Aware**: Automatically detects and switches themes based on your OS settings.
- **Pressable Feedback**: Modern interaction patterns using `Pressable` for consistent haptic-like visual feedback.

### 📱 Fully Responsive

- **Device Optimized**: Custom layouts tailored for both small-screen phones and large-screen tablets using `useWindowDimensions`.
- **Adaptive Spacing**: Perfectly consistent grid margins and paddings across all resolutions.

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/d189a95e-6a48-407d-8399-fd90a9a9af58" width="250" alt="Notes Screen" /><br/><sub>Notes Grid</sub></td>
      <td><img src="https://github.com/user-attachments/assets/7fc1ae2e-bd3f-4367-a40c-dbb3092cf290" width="250" alt="Tasks Screen" /><br/><sub>Task List</sub></td>
      <td><img src="https://github.com/user-attachments/assets/1b492110-6186-4f13-b89a-837e51beb14d" width="250" alt="Light Mode" /><br/><sub>Light Mode</sub></td>
    </tr>
  </table>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- Expo Go app on your physical device or an Emulator (Android Studio / Xcode)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fluxnotes.git
   cd fluxnotes
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) / [React Native](https://reactnative.dev)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (Link-based)
- **Styling**: Creative `StyleSheet` with dynamic Design Tokens
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: Custom React Hooks & Context API

## 🧹 Project Structure

- `src/app/` - File-based routing configuration
- `src/components/` - Reusable UI components (NoteCard, TaskItem, ThemeToggle)
- `src/hooks/` - Logical layer (useNotes, useTasks, useTheme)
- `src/screen/` - Main screen implementations
- `src/themes/` - Palette, Spacing, and Typography definitions

