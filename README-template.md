# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**

Below is a formatted version of the code review summary, tailored for inclusion in a README.md file. It’s written in Markdown for proper rendering on platforms like GitHub, with clear headings and concise explanations. You can copy and paste this directly into your project’s README.md.

by Grok ai:

Frontend Mentor Challenge: Browser Extensions Manager UI
Code Review Summary
Overview
This project is a browser extensions manager UI built for a Frontend Mentor challenge. It features a responsive interface with theme switching (dark/light) and filtering (All, Active, Inactive) for extension cards. The code is well-structured, using HTML for structure, CSS for styling, and JavaScript for interactivity, with good practices like semantic HTML and CSS variables. Below is a summary of identified issues and improvements to enhance maintainability, accessibility, and performance.

Last Reviewed: July 16, 2025

Problems and Improvements

1. HTML Issues
   Hardcoded Duplicate Cards
   Problem: The HTML includes four identical <div class="card"> elements for "Devlens," redundant since JavaScript dynamically renders cards from data.json.
   Improvement: Remove hardcoded cards, keeping only <div id="extensionsCardsContainer">, and let JavaScript handle rendering.
   Why: Reduces HTML size and avoids duplication.
   Duplicate IDs
   Problem: Multiple cards use id="removeExtensionBtn" and id="extensionStatusBtn", violating HTML’s unique ID rule, which can break JavaScript and accessibility.
   Improvement: Remove IDs, use data-card-id and classes (e.g., .removeExtensionBtn) with event delegation.
   Why: Ensures reliable event handling and accessibility.
   Theme Icon Accessibility
   Problem: Theme toggle icons (sunIconBtn, moonIconBtn) have vague alt attributes, reducing screen reader usability.
   Improvement: Add descriptive alt text (e.g., alt="Switch to light theme") or aria-label.
   Why: Improves accessibility for screen reader users.
   Empty Toggle <span>
   Problem: The <span> in .extensionStatus lacks semantic meaning, affecting accessibility.
   Improvement: Add role="switch" and aria-checked="true/false" to toggles.
   Why: Makes toggles interpretable by assistive technologies.

2. CSS Issues
   Repetitive Theme Classes
   Problem: .whiteTheme is applied to multiple elements (e.g., .header .container.whiteTheme), creating repetitive rules.
   Improvement: Apply .whiteTheme to <body> and use descendant selectors (e.g., body.whiteTheme .card).
   Why: Simplifies CSS and reduces maintenance.
   Overly Specific Selectors
   Problem: Selectors like .mainContent .container .head-content .filterWraper button.whiteTheme:not(.clicked):hover are too complex.
   Improvement: Simplify to .filterWraper button:not(.clicked):hover.
   Why: Reduces specificity conflicts and improves readability.
   Unnecessary Vendor Prefixes
   Problem: Vendor prefixes (e.g., -webkit-box-sizing) are used but not needed for modern browsers.
   Improvement: Use box-sizing: border-box; without prefixes.
   Why: Simplifies CSS and removes outdated code.
   Hardcoded Colors
   Problem: Colors like orangered are hardcoded instead of using CSS variables.
   Improvement: Define colors in :root (e.g., --status-active: orangered;) and reuse them.
   Why: Enhances theme consistency and maintainability.
   Font Fallback Clarity
   Problem: Two font families (Noto Sans, Noto Sans Static) may cause confusion if used inconsistently.
   Improvement: Use one font family (e.g., Noto Sans) unless variable fonts are required.
   Why: Simplifies font management.

3. JavaScript Issues
   Hardcoded HTML Strings
   Problem: renderingcards uses repetitive string concatenation for card HTML, with separate logic for filters.
   Improvement: Create a createCardElement function and use a filter parameter for active/inactive/all.
   Why: Reduces duplication and improves maintainability.
   Inline Event Handlers
   Problem: Inline onclick="removeCard(${data.id}, 'active')" attributes are error-prone and pose security risks.
   Improvement: Use event delegation on extensionsCardsContainer for .removeExtensionBtn and .extensionStatus.
   Why: Enhances security and performance.
   ID-Based Selectors
   Problem: Using IDs (removeExtensionBtn, extensionStatusBtn) fails with duplicate IDs in dynamic cards.
   Improvement: Use querySelectorAll for classes and event delegation.
   Why: Ensures correct targeting of dynamic elements.
   Repetitive Theme Functions
   Problem: changeThemeToDark and changeThemeToWhite repeat similar logic.
   Improvement: Create a single toggleTheme function to toggle whiteTheme on <body>.
   Why: Simplifies theme management.
   Inefficient Rendering
   Problem: renderingcards re-renders all cards for every action, slowing performance.
   Improvement: Update only the affected card’s DOM for toggles or removals.
   Why: Improves performance for large datasets.
   No Data Persistence
   Problem: Changes to extensionData are lost on page reload.
   Improvement: Save extensionData to localStorage after changes.
   Why: Preserves user actions across sessions.
   General Recommendations
   Use Linters: Run ESLint (JavaScript) and Stylelint (CSS) to catch errors like duplicate IDs.
   Improve Error Handling: Show a user-friendly message if data.json fails to load.
   Enhance Accessibility: Add ARIA attributes (e.g., aria-label, aria-checked) and ensure color contrast.
   Optimize Performance: Minify CSS/JS files and avoid full re-renders.
   Test Across Browsers: Verify on Chrome, Firefox, Safari, and mobile devices.
   Add Documentation: Include setup instructions and dependencies (e.g., Font Awesome, normalize.css)
