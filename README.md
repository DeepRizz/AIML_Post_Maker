# Meet Our AIML TEAM - Instagram Post Designer

A sleek, modern web application for creating Instagram posts to showcase your AI/ML Club team members. This tool helps you create professional, tech-inspired designs that are perfectly sized for Instagram (1080px x 1080px).

## Features

- **Customizable Team Position**: Add your specific team name (e.g., "Media Club", "Web Team")
- **Team Member Showcase**: Add up to 4 team members with photos, names, and positions
- **Improved Layout**: Images are displayed in portrait orientation with custom layouts based on member count:
  - 1 member: Centered large image
  - 2 members: Two side-by-side images
  - 3 members: Three side-by-side images
  - 4 members: 2×2 grid layout
- **Larger Images**: Photos are displayed prominently for better visibility
- **Preserved Image Proportions**: Images maintain their original aspect ratio to prevent distortion
- **Multiple AI/ML Themes**: Choose from 6 unique tech-inspired themes:
  - Neural Network: Blue/purple gradient with neural connection patterns
  - Quantum Computing: Teal and pink with quantum-inspired elements
  - Data Visualization: Clean design with data chart aesthetics
  - Cybernetic: Orange and yellow with circuit-like patterns
  - Deep Learning: Purple and teal with modern geometric designs
  - Circuit: Green electric circuit pattern with tech-inspired grid
- **Custom Logo Support**: Use your own AIML Club logos in the top corners
- **Export Functionality**: Download your design as a high-quality PNG image

## How to Use

1. **Open index.html** in a web browser (Chrome, Firefox, or Edge recommended)
2. **Select a Theme**: Choose from 5 different AI/ML-inspired themes
3. **Enter Team Position**: Type your team's position in the input field (e.g., "Media Club")
4. **Add Team Members**:
   - Click "Add Team Member" to upload team member photos
   - Enter name and position for each member
   - Images are automatically displayed in portrait orientation for better visibility
5. **Remove Team Members** if needed by hovering over their card and clicking the "✕" button
6. **Preview Your Design**: The layout will automatically adjust based on member count
7. **Download Your Design**: Click "Download Post" to save as PNG
8. **Reset**: Start over by clicking the "Reset" button

## Technical Notes

- The application runs entirely in the browser - no server required
- Uses HTML5 Canvas for creating downloadable images
- Custom logos can be easily integrated by replacing the image references
- Responsive design adjusts for different screen sizes
- Images are not uploaded to any server - all processing happens locally
- Image aspect ratios are preserved to avoid distortion

## Requirements

- Modern web browser (Chrome, Firefox, Edge recommended)
- JavaScript enabled
- For best results, use photos with good resolution

## Customization

You can customize the design further by editing the CSS in styles.css:
- Add new themes by following the existing theme structure
- Modify fonts by changing the font-family properties
- Adjust spacing by editing margin and padding values 