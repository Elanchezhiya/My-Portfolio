# My Portfolio

Personal portfolio website for Elanchezhiyan Somasundaram showcasing profile, skills, experience, projects, certifications, education, and contact details.

## Features
- Responsive layout with Tailwind utility classes and custom CSS
- Dark/Light mode with localStorage persistence
- Sleek Dark Neon theme (cyan/violet accents) with animated sections
- Accessible navigation, smooth scrolling, and mobile menu
- Project cards with tech badges and links to demos/repos

## Tech Stack
- HTML5, CSS3 (custom + variables), JavaScript (vanilla)
- Tailwind CDN, Font Awesome icons

## Getting Started
1. Clone the repo
   - `git clone https://github.com/Elanchezhiya/My-Portfolio.git`
   - `cd My-Portfolio`
2. Preview locally
   - Double‑click `index.html`, or
   - `python -m http.server 5500` then open `http://localhost:5500/`, or
   - `npx --yes serve . -l 5500` then open `http://localhost:5500/`

## Customize
- Profile image: replace `images/DSC_4772.JPG` and update the path in `index.html` if needed.
- Colors/theme: edit CSS variables in `style.css` under `:root` (light) and `.dark-mode` (dark).
- Content: update the text sections in `index.html` (Profile, Skills, Projects, etc.).

## Deploy (GitHub Pages)
1. Push changes to `main`.
2. In the repository Settings → Pages → Source: “Deploy from a branch”.
3. Select branch `main`, folder `/ (root)`, Save.
4. After it builds, open the provided Pages URL.

## Project Structure
```
My-Portfolio/
  index.html      # Main page markup
  style.css       # Styles and theme variables
  script.js       # Mode toggle, animations, interactions
  images/         # Assets (profile photo, etc.)
```

## License
This repository is open for learning and portfolio use. If you reuse parts, please give attribution.

## Contact
- Email: elanchezhiyan954@gmail.com
- LinkedIn: linkedin.com/in/elanchezhiyan-s-b25365191