# Disney Characters Explorer 🏰

A beautiful and interactive **[web application](https://thomaslorenzo.github.io/disney-characters-explorer/)** for browsing Disney characters with real-time search and pagination. Built with vanilla HTML, CSS, and JavaScript to reinforce fundamental web development concepts.

<video src="https://github.com/user-attachments/assets/a8d01eba-b2f2-44b6-92db-917e7b7b8a82" controls preload></video>

## ✨ Features

- **Character Grid Display**: Browse Disney characters in a responsive card layout.
- **Real-time Search**: Filter characters by name with instant results.
- **Pagination**: Navigate through multiple pages of characters.
- **Interactive Cards**: Click on characters to view their wiki pages.
- **Modern UI**: Gradient backgrounds with smooth animations and transitions.
- **Loading States**: Skeleton cards during loading for better user experience.

## 🛠️ Technologies

- **HTML5**: Semantic structure and accessibility.
- **CSS3**: Modern styling with Grid, Flexbox, and animations.
- **Vanilla JavaScript**: ES6+ features and async/await for API calls.

### External Resources

- **[Disney API](https://disneyapi.dev/)**: Fan-made API for character data.
- **Google Fonts**: Nunito and Fredoka font families.
- **Material Symbols**: Navigation icons.

## 📡 About the API

This project uses a fan-made Disney API created by [Manu Castrillon](https://github.com/ManuCastrillonM). The API provides character data including names, images, films, series, and wiki links.

### API Limitations

- **Image Quality**: Some character images may appear broken or have poor resolution due to the nature of the data source.
- **Search Scope**: Character search is limited to the current page only, as the API doesn't provide a global character search endpoint.
- **Reliability**: Being a fan-made service, occasional downtime or data inconsistencies may occur.

## 🎯 Learning Objectives

This project was created with the following learning goals in mind:

- **DOM Manipulation**: Dynamic content creation and event handling.
- **API Integration**: Fetch API usage with proper error handling.
- **Responsive Design**: CSS Grid and Flexbox for modern layouts.
- **User Experience**: Loading states, animations, and interactive feedback.
- **Code Organization**: Clean, maintainable JavaScript architecture.

## 🔧 Implementation Highlights

### API Integration
- Asynchronous data fetching with error handling.
- Pagination system (96 characters per page).
- Skeleton loading states during API calls.

### Search Functionality
- Client-side filtering for real-time results.
- Case-insensitive character name matching.
- Empty state handling with "No results found" message.

### User Experience
- Smooth hover animations and transitions.
- Sticky header with backdrop blur effect.
- Fallback images for broken character images.

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to clone, fork, or submit pull requests to help improve the project.

---

Built with ❤️ for learning!
