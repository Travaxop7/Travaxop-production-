# To-Do List Application with Local Storage

## 📋 Overview

A modern, responsive to-do list application built with vanilla JavaScript that persists all tasks to browser local storage. No backend or database required!

## ✨ Features

✅ **Add Tasks** - Simple input with Enter key support  
✅ **Complete Tasks** - Mark items as done with visual feedback  
✅ **Delete Tasks** - Remove individual or all tasks  
✅ **Filter Tasks** - View All, Active, or Completed items  
✅ **Live Statistics** - Real-time count of total, completed, pending  
✅ **Local Storage** - Tasks persist across browser sessions  
✅ **XSS Protection** - Safe HTML escaping for task input  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Beautiful UI** - Modern gradient design with smooth animations  
✅ **No Dependencies** - Pure vanilla JavaScript  

## 📂 Project Structure

```
todo/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── script.js       # Core functionality
└── README.md       # Documentation
```

## 🚀 Getting Started

1. **Open in Browser**
   - Simply open `index.html` in any modern web browser

2. **Or Use a Local Server**
   ```bash
   python -m http.server 8000
   # Then visit: http://localhost:8000/todo/
   ```

## 💾 Local Storage Details

All tasks are stored in browser localStorage under the key `todos`:

```javascript
{
  "todos": [
    {
      "id": 1234567890,
      "text": "Buy groceries",
      "completed": false,
      "createdAt": "5/15/2026, 10:30:45 AM"
    }
  ]
}
```

## 🎯 How to Use

### Adding Tasks
1. Type your task in the input field
2. Press **Enter** or click **+ Add**
3. Task appears in the list and is auto-saved

### Completing Tasks
1. Click the **checkbox** next to a task
2. Task text becomes crossed out

### Filtering Tasks
- **All** - View all tasks (default)
- **Active** - Show only incomplete tasks
- **Completed** - Show only completed tasks

### Managing Tasks
- Hover over task → Delete button appears
- **Clear Completed** - Remove all completed items
- **Delete All** - Remove all tasks (with confirmation)

## 🎨 Design

- **Color Scheme**: Purple gradient (`#667eea → #764ba2`)
- **Responsive**: Mobile, tablet, desktop optimized
- **Animations**: Smooth transitions and hover effects

## 🔒 Security

- XSS Protection through HTML escaping
- Safe rendering of all user input

## 🛠️ Architecture

Uses OOP with `TodoManager` class for:
- Task management
- Storage operations
- UI rendering
- Event handling

## 📱 Browser Support

- Chrome 30+
- Firefox 25+
- Safari 7+
- Edge 12+
- All modern mobile browsers

---

**Built with ❤️ using vanilla JavaScript**