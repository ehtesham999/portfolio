document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio frontend initialized.");
    
    // API Base URL
    const API_BASE_URL = 'http://127.0.0.1:8000/api';

    // 1. Fetch and display Skills
    fetch(`${API_BASE_URL}/skills/`)
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');
            if (data.length === 0) {
                skillsContainer.innerHTML = '<p>No skills added yet. Log into the Django admin to add some!</p>';
                return;
            }
            data.forEach(skill => {
                const skillEl = document.createElement('div');
                skillEl.classList.add('skill-card');
                
                // You updated max level to 10 in models.py, so we calculate percentage based on 10
                const widthPercentage = (skill.level / 10) * 100;
                
                skillEl.innerHTML = `
                    <h3>${skill.name}</h3>
                    <div class="skill-bar-bg">
                        <div class="skill-bar-fill" style="width: ${widthPercentage}%"></div>
                    </div>
                `;
                skillsContainer.appendChild(skillEl);
            });
        })
        .catch(err => console.error("Error fetching skills:", err));

    // 2. Fetch and display Projects
    fetch(`${API_BASE_URL}/projects/`)
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            if (data.length === 0) {
                projectsContainer.innerHTML = '<p>No projects added yet. Log into the Django admin to add some!</p>';
                return;
            }
            data.forEach(project => {
                const projectEl = document.createElement('div');
                projectEl.classList.add('project-card');
                
                let linksHtml = '';
                if (project.live_link) linksHtml += `<a href="${project.live_link}" target="_blank" class="btn secondary-btn">Live Demo</a> `;
                if (project.github_link) linksHtml += `<a href="${project.github_link}" target="_blank" class="btn secondary-btn">GitHub</a>`;

                projectEl.innerHTML = `
                    ${project.image_url ? `<img src="${project.image_url}" alt="${project.title}" class="project-img">` : ''}
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">${linksHtml}</div>
                    </div>
                `;
                projectsContainer.appendChild(projectEl);
            });
        })
        .catch(err => console.error("Error fetching projects:", err));

    // 3. Handle Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#cbd5e1';

        fetch(`${API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        })
        .then(response => {
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#4ade80'; // Success green
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(err => {
            console.error("Error submitting contact form:", err);
            formStatus.textContent = 'Oops! Something went wrong. Ensure Python server is running.';
            formStatus.style.color = '#f87171'; // Error red
        });
    });
});
