import { backend } from "declarations/backend";

// Sample portfolio data
const sampleProjects = [
    {
        title: "Modern Minimalist Apartment",
        description: "A clean, contemporary design for urban living",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        category: "Residential"
    },
    {
        title: "Luxury Penthouse",
        description: "Elegant interior design for high-end living",
        imageUrl: "https://images.unsplash.com/photo-1616137466211-f939a420be84",
        category: "Residential"
    },
    {
        title: "Boutique Hotel Lobby",
        description: "Sophisticated commercial space design",
        imageUrl: "https://images.unsplash.com/photo-1616137466211-f939a420be84",
        category: "Commercial"
    }
];

// Initialize the portfolio
async function initializePortfolio() {
    try {
        const projects = await backend.getProjects();
        if (projects.length === 0) {
            // Add sample projects if none exist
            for (const project of sampleProjects) {
                await backend.addProject(
                    project.title,
                    project.description,
                    project.imageUrl,
                    project.category
                );
            }
        }
        displayProjects();
    } catch (error) {
        console.error("Error initializing portfolio:", error);
    }
}

// Display projects in the portfolio grid
async function displayProjects() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const projects = await backend.getProjects();
    
    portfolioGrid.innerHTML = projects.map(project => `
        <div class="col-md-4 mb-4">
            <div class="portfolio-item">
                <img src="${project.imageUrl}" alt="${project.title}" class="img-fluid">
                <div class="portfolio-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="category">${project.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        await backend.submitContact(name, email, message);
        alert('Message sent successfully!');
        e.target.reset();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Error sending message. Please try again.');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize the portfolio when the page loads
window.addEventListener('load', initializePortfolio);
