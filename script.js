// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const generateResumeBtn = document.getElementById('generate-resume');
    let currentTabIndex = 0;

    // Resume Form
    const resumeForm = document.getElementById('resume-form');
    const resumePreview = document.getElementById('resume-preview');
    const backToEditBtn = document.getElementById('back-to-edit');
    const printResumeBtn = document.getElementById('print-resume');
    const downloadResumeBtn = document.getElementById('download-resume');

    // Profile Photo Upload
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('form-pfp');
    const previewImg = document.getElementById('preview-img');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    
    // Skills Input
    const skillInput = document.getElementById('skill-input');
    const skillsContainer = document.getElementById('skills-container');
    const skills = new Set();

    // Template & Color Selection
    const templateOptions = document.querySelectorAll('.template-option');
    const colorOptions = document.querySelectorAll('.color-option');
    let currentTemplate = 'modern';
    let currentColor = 'blue';

    // Experience & Education
    const addExperienceBtn = document.getElementById('add-experience');
    const addEducationBtn = document.getElementById('add-education');
    const experienceContainer = document.getElementById('experience-container');
    const educationContainer = document.getElementById('education-container');

    // Initialize the application
    initializeApp();

    // ------ INITIALIZATION ------
    function initializeApp() {
        setupTabNavigation();
        setupFormActions();
        setupImageUpload();
        setupSkillsInput();
        setupTemplateAndColorSelection();
        setupExperienceAndEducation();
    }

    // ------ TAB NAVIGATION ------
    function setupTabNavigation() {
        // Tab button clicks
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                switchToTab(index);
            });
        });

        // Previous & Next buttons
        prevBtn.addEventListener('click', () => {
            if (currentTabIndex > 0) {
                switchToTab(currentTabIndex - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentTabIndex < tabBtns.length - 1) {
                switchToTab(currentTabIndex + 1);
            } else {
                generateResume();
            }
        });

        // Initial state
        updateNavigationButtons();
    }

    function switchToTab(index) {
        // Update active tab button
        tabBtns.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update active tab pane
        tabPanes.forEach((pane, i) => {
            if (i === index) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        // Update current index and navigation buttons
        currentTabIndex = index;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        // Show/hide previous button
        if (currentTabIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        // Update next button label
        if (currentTabIndex === tabBtns.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate Resume';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    // ------ FORM ACTIONS ------
    function setupFormActions() {
        generateResumeBtn.addEventListener('click', generateResume);
        backToEditBtn.addEventListener('click', () => {
            resumePreview.classList.add('hidden');
            resumeForm.classList.remove('hidden');
        });
        printResumeBtn.addEventListener('click', printResume);
        downloadResumeBtn.addEventListener('click', downloadResume);
    }

    // ------ IMAGE UPLOAD ------
    function setupImageUpload() {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length) {
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleImageUpload(fileInput.files[0]);
            }
        });
    }

    function handleImageUpload(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.classList.remove('hidden');
            uploadPlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    // ------ SKILLS INPUT ------
    function setupSkillsInput() {
        skillInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(skillInput.value.trim());
                skillInput.value = '';
            }
        });
    }

    function addSkill(skill) {
        if (!skill || skills.has(skill)) return;
        
        // Add to skills set
        skills.add(skill);
        
        // Create skill tag
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skill}
            <button class="remove-skill" data-skill="${skill}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add remove event
        skillTag.querySelector('.remove-skill').addEventListener('click', function() {
            const skillToRemove = this.dataset.skill;
            skills.delete(skillToRemove);
            this.parentElement.remove();
        });
        
        // Add to container
        skillsContainer.appendChild(skillTag);
    }

    // ------ TEMPLATE & COLOR SELECTION ------
    function setupTemplateAndColorSelection() {
        // Template selection
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                templateOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                currentTemplate = option.dataset.template;
            });
        });

        // Color selection
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                currentColor = option.dataset.color;
            });
        });
    }

    // ------ EXPERIENCE & EDUCATION ------
    function setupExperienceAndEducation() {
        addExperienceBtn.addEventListener('click', addExperienceItem);
        addEducationBtn.addEventListener('click', addEducationItem);
    }

    function addExperienceItem() {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <button type="button" class="remove-item">
                <i class="fas fa-times"></i>
            </button>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" placeholder="e.g. Senior Developer">
            </div>
            
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" placeholder="e.g. Tech Solutions Inc.">
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="exp-start">
                </div>
                
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="exp-end">
                    <div class="checkbox-group">
                        <input type="checkbox" class="exp-current" id="current-job-${Date.now()}">
                        <label for="current-job-${Date.now()}">I currently work here</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>Job Description</label>
                <textarea class="exp-desc" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        `;

        // Add remove event
        experienceItem.querySelector('.remove-item').addEventListener('click', function() {
            this.parentElement.remove();
        });

        // Add current job checkbox event
        const currentJobCheckbox = experienceItem.querySelector('.exp-current');
        const endDateInput = experienceItem.querySelector('.exp-end');
        
        currentJobCheckbox.addEventListener('change', function() {
            if (this.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            } else {
                endDateInput.disabled = false;
            }
        });

        experienceContainer.appendChild(experienceItem);
    }

    function addEducationItem() {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <button type="button" class="remove-item">
                <i class="fas fa-times"></i>
            </button>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="e.g. Bachelor of Science in Computer Science">
            </div>
            
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" placeholder="e.g. University of Technology">
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Start Year</label>
                    <input type="month" class="edu-start">
                </div>
                
                <div class="form-group">
                    <label>End Year</label>
                    <input type="month" class="edu-end">
                    <div class="checkbox-group">
                        <input type="checkbox" class="edu-current" id="current-edu-${Date.now()}">
                        <label for="current-edu-${Date.now()}">I'm currently studying here</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <textarea class="edu-desc" placeholder="Describe your academic achievements, GPA, relevant coursework, etc."></textarea>
            </div>
        `;

        // Add remove event
        educationItem.querySelector('.remove-item').addEventListener('click', function() {
            this.parentElement.remove();
        });

        // Add current education checkbox event
        const currentEduCheckbox = educationItem.querySelector('.edu-current');
        const endDateInput = educationItem.querySelector('.edu-end');
        
        currentEduCheckbox.addEventListener('change', function() {
            if (this.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            } else {
                endDateInput.disabled = false;
            }
        });

        educationContainer.appendChild(educationItem);
    }

    // ------ GENERATE RESUME ------
    function generateResume() {
        // Get resume data
        const resumeData = collectResumeData();
        
        // Update resume preview
        updateResumePreview(resumeData);
        
        // Show resume preview section
        resumeForm.classList.add('hidden');
        resumePreview.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function collectResumeData() {
        // Personal info
        const personalInfo = {
            name: document.getElementById('form-name').value || 'Your Name',
            title: document.getElementById('form-title').value || 'Professional Title',
            phone: document.getElementById('form-contact').value || 'Phone Number',
            email: document.getElementById('form-email').value || 'Email Address',
            location: document.getElementById('form-location').value || 'Location',
            website: document.getElementById('form-website').value || 'Website',
            summary: document.getElementById('form-summary').value || 'Professional summary goes here...',
            photo: previewImg.src || '/api/placeholder/200/200'
        };
        
        // Experience
        const experience = [];
        document.querySelectorAll('.experience-item').forEach(item => {
            const isCurrent = item.querySelector('.exp-current').checked;
            const startDate = formatDate(item.querySelector('.exp-start').value);
            const endDate = isCurrent ? 'Present' : formatDate(item.querySelector('.exp-end').value);
            
            experience.push({
                title: item.querySelector('.exp-title').value || 'Job Title',
                company: item.querySelector('.exp-company').value || 'Company Name',
                startDate: startDate || 'Start Date',
                endDate: endDate || 'End Date',
                description: item.querySelector('.exp-desc').value || 'Job description goes here...',
                isCurrent: isCurrent
            });
        });
        
        // Education
        const education = [];
        document.querySelectorAll('.education-item').forEach(item => {
            const isCurrent = item.querySelector('.edu-current').checked;
            const startDate = formatDate(item.querySelector('.edu-start').value);
            const endDate = isCurrent ? 'Present' : formatDate(item.querySelector('.edu-end').value);
            
            education.push({
                degree: item.querySelector('.edu-degree').value || 'Degree',
                institution: item.querySelector('.edu-institution').value || 'Institution',
                startDate: startDate || 'Start Date',
                endDate: endDate || 'End Date',
                description: item.querySelector('.edu-desc').value || 'Education details go here...',
                isCurrent: isCurrent
            });
        });
        
        return {
            personal: personalInfo,
            experience: experience,
            education: education,
            skills: Array.from(skills),
            template: currentTemplate,
            color: currentColor
        };
    }

    function updateResumePreview(data) {
        const resumeDoc = document.getElementById('resume-document');
        
        // Apply template and color
        resumeDoc.className = `resume-template ${data.template}-template ${data.color}-theme`;
        
        // Update personal info
        document.getElementById('resume-name').textContent = data.personal.name;
        document.getElementById('resume-title').textContent = data.personal.title;
        document.getElementById('resume-email').textContent = data.personal.email;
        document.getElementById('resume-phone').textContent = data.personal.phone;
        document.getElementById('resume-location').textContent = data.personal.location;
        document.getElementById('resume-website').textContent = data.personal.website;
        document.getElementById('resume-img').src = data.personal.photo;
        document.getElementById('resume-summary').textContent = data.personal.summary;
        
        // Update experience
        const experienceSection = document.getElementById('resume-experience');
        experienceSection.innerHTML = '';
        
        data.experience.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job-item';
            
            if (data.template === 'minimal') {
                jobElement.innerHTML = `
                    <div class="job-meta">
                        <div class="job-date">${job.startDate} - ${job.endDate}</div>
                        <div class="company-name">${job.company}</div>
                    </div>
                    <div class="job-content">
                        <div class="job-title">${job.title}</div>
                        <div class="job-description">${job.description}</div>
                    </div>
                `;
            } else {
                jobElement.innerHTML = `
                    <div class="job-title">${job.title}</div>
                    <div class="company-name">${job.company}</div>
                    <div class="job-date">
                        <i class="fas fa-calendar-alt"></i> ${job.startDate} - ${job.endDate}
                    </div>
                    <div class="job-description">${job.description}</div>
                `;
            }
            
            experienceSection.appendChild(jobElement);
        });
        
        // Update education
        const educationSection = document.getElementById('resume-education');
        educationSection.innerHTML = '';
        
        data.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item';
            
            if (data.template === 'minimal') {
                eduElement.innerHTML = `
                    <div class="edu-meta">
                        <div class="edu-date">${edu.startDate} - ${edu.endDate}</div>
                        <div class="institution">${edu.institution}</div>
                    </div>
                    <div class="edu-content">
                        <div class="degree">${edu.degree}</div>
                        <div class="education-description">${edu.description}</div>
                    </div>
                `;
            } else {
                eduElement.innerHTML = `
                    <div class="degree">${edu.degree}</div>
                    <div class="institution">${edu.institution}</div>
                    <div class="edu-date">
                        <i class="fas fa-calendar-alt"></i> ${edu.startDate} - ${edu.endDate}
                    </div>
                    <div class="education-description">${edu.description}</div>
                `;
            }
            
            educationSection.appendChild(eduElement);
        });
        
        // Update skills
        const skillsSection = document.getElementById('resume-skills');
        skillsSection.innerHTML = '';
        
        data.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            skillsSection.appendChild(skillElement);
        });
        
        // Show/hide sections based on content
        document.getElementById('summary-section').style.display = data.personal.summary ? 'block' : 'none';
        document.getElementById('experience-section').style.display = data.experience.length ? 'block' : 'none';
        document.getElementById('education-section').style.display = data.education.length ? 'block' : 'none';
        document.getElementById('skills-section').style.display = data.skills.length ? 'block' : 'none';
    }

    // ------ UTILITY FUNCTIONS ------
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        return `${month} ${year}`;
    }

    function printResume() {
        window.print();
    }
});
