/**
 * Toothsi Smile Studio Landing Page JavaScript
 * Handles form validation, API submission, smooth scrolling, and modal functionality
 */

// DOM Elements
const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

/**
 * Smooth scroll to contact form when "Book Appointment" button is clicked
 */
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is valid, false otherwise
 */
function isValidPhone(phone) {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

/**
 * Clear all error messages from the form
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(error => {
        error.textContent = '';
    });
}

/**
 * Display error message for a specific field
 * @param {string} fieldId - ID of the field with error
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Validate form fields and return validation result
 * @returns {Object} - Object containing validation status and form data
 */
function validateForm() {
    clearErrors();
    
    const formData = new FormData(appointmentForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    
    let isValid = true;
    const errors = {};
    
    // Validate name
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
        errors.name = 'Name is required';
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
        errors.name = 'Name must be at least 2 characters long';
    }
    
    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
        errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
        errors.phone = 'Phone number is required';
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
        errors.phone = 'Please enter a valid phone number';
    }
    
    return {
        isValid,
        formData: {
            name,
            email,
            phone
        },
        errors
    };
}

/**
 * Disable form submission and show loading state
 */
function setFormLoading(loading) {
    const submitButton = appointmentForm.querySelector('.submit-button');
    const inputs = appointmentForm.querySelectorAll('input');
    
    if (loading) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        inputs.forEach(input => input.disabled = true);
    } else {
        submitButton.disabled = false;
        submitButton.textContent = 'Book Appointment';
        inputs.forEach(input => input.disabled = false);
    }
}

/**
 * Show success modal with confirmation message
 */
function showSuccessModal() {
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Hide success modal
 */
function hideSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

/**
 * Submit form data to the API endpoint
 * @param {Object} formData - Form data to submit
 * @returns {Promise} - Promise that resolves with the API response
 */
async function submitFormData(formData) {
    const apiUrl = 'https://smiledent.app.n8n.cloud/webhook-test/ad7b26c0-33fb-4968-bc2c-63068d0a4600';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

/**
 * Handle form submission
 * @param {Event} event - Form submission event
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate form
    const validation = validateForm();
    
    if (!validation.isValid) {
        console.log('Form validation failed:', validation.errors);
        return;
    }
    
    // Set loading state
    setFormLoading(true);
    
    try {
        // Submit form data to API
        const response = await submitFormData(validation.formData);
        console.log('Form submitted successfully:', response);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        appointmentForm.reset();
        
    } catch (error) {
        console.error('Failed to submit form:', error);
        
        // Show user-friendly error message
        alert('Sorry, there was an error submitting your appointment request. Please try again or contact us directly.');
        
    } finally {
        // Reset loading state
        setFormLoading(false);
    }
}

/**
 * Initialize event listeners and setup functionality
 */
function initializeApp() {
    // Form submission handler
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Modal close handlers
    if (closeModal) {
        closeModal.addEventListener('click', hideSuccessModal);
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                hideSuccessModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && successModal.style.display === 'block') {
            hideSuccessModal();
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log(' Smile Studio landing page initialized successfully');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp); 
