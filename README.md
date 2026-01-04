# Body Mass Index Calculator

![Design preview for the Body Mass Index Calculator](./preview.jpg)

A beautiful and functional BMI calculator built with vanilla JavaScript that supports both metric and imperial unit systems. This calculator provides instant BMI results with personalized weight classifications and ideal weight range recommendations.

## 🌟 Features

- **Dual Unit System**: Switch seamlessly between metric (cm, kg) and imperial (ft, in, st, lbs) units
- **Real-time Calculation**: Debounced input handling for smooth, responsive calculations
- **Smart Classification**: Dynamic BMI categories (Underweight, Healthy, Overweight, Obese)
- **Personalized Recommendations**: Calculates ideal weight range based on user's height
- **Responsive Design**: Beautiful UI that works across all device sizes
- **Input Validation**: Handles edge cases and validates user inputs
- **Smooth UX**: 1.7-second debounce prevents excessive calculations while typing

## 🎯 BMI Classifications

The calculator uses the standard BMI ranges:

- **Underweight**: BMI less than 18.5
- **Healthy weight**: BMI 18.5 to 24.9
- **Overweight**: BMI 25 to 29.9
- **Obese**: BMI 30 or greater

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone the repository or download the files
2. Navigate to the `starter-code` directory
3. Open `index.html` in your browser

```bash
cd starter-code
# Open index.html in your browser
```

### Running Locally

Simply open the `index.html` file in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 💻 Technologies Used

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom styling with Flexbox layout
- **Vanilla JavaScript**: No frameworks or libraries
- **Custom Fonts**: Inter variable font for modern typography

## 🏗️ Project Structure

```
bmi-calculator/
├── starter-code/
│   ├── assets/
│   │   ├── fonts/          # Inter font family
│   │   └── images/         # Icons and images
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # All styles and responsive design
│   └── script.js           # BMI calculation logic
├── preview.jpg             # Project preview image
└── README.md              # This file
```

## 🎨 Key Features Implementation

### Debouncing

The calculator uses a custom debounce function to prevent excessive calculations while users are typing:

```javascript
function debounce(func, delay = 1700) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### Dynamic Classification

BMI results are classified in real-time with personalized messages:

```javascript
function getBMIClassification(bmi, heightInCm) {
  // Calculates ideal weight range based on height
  // Provides category-specific feedback
  // Adjusts units based on metric/imperial selection
}
```

### Unit Conversion

Accurate conversion between metric and imperial systems:

- **Height**: ft & in → cm (1 inch = 2.54 cm)
- **Weight**: st & lbs → kg (1 lb = 0.453592 kg)

## 📱 Responsive Design

The calculator is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile devices

## 🎓 What I Learned

Building this project helped reinforce:

1. **Event handling optimization** with debouncing
2. **Dynamic DOM manipulation** for real-time updates
3. **Form validation** and error handling
4. **Unit conversion** mathematics
5. **Responsive CSS** layouts with Flexbox
6. **Accessible HTML** structure

## 🔄 Future Enhancements

Potential improvements for future versions:

- [ ] Add metric/imperial automatic detection based on user location
- [ ] Store user preferences in localStorage
- [ ] Add BMI history tracking
- [ ] Include BMI chart visualization
- [ ] Add age and gender-specific BMI recommendations
- [ ] Support for more unit systems
- [ ] Progressive Web App (PWA) features
- [ ] Dark mode toggle

## 🐛 Known Issues

None currently! The application has been tested and all major issues have been resolved.

## 📄 License

This project is part of a Frontend Mentor challenge. Feel free to use it for learning purposes.

## 🙏 Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- BMI calculation standards from WHO (World Health Organization)
- Inter font family by Rasmus Andersson

---

**Built with ❤️ using vanilla JavaScript**
