document.addEventListener('DOMContentLoaded', function() {
    console.log("code works")
    populatePolicyDetails();

    const allSections = document.querySelectorAll('.controls');
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    const toggleDisplay = (className, displayStyle) => {
        const elements = document.querySelectorAll('.' + className);
        elements.forEach(element => {
            element.style.display = displayStyle;
        });
    };

    if(allSections.length > 0) {
        allSections[0].style.display = 'flex';
    }

    
    const saveFormData = (section) => {
        const inputs = document.querySelectorAll('#' + section + ' .w-input');
        const checkboxes = document.querySelectorAll('#' + section + ' .w-checkbox-input');
        const data = {};

        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        checkboxes.forEach(checkbox => {
            data[checkbox.id] = checkbox.checked;
        });

        const currentData = JSON.parse(localStorage.getItem('form-data')) || {};
        currentData[section] = data;
        localStorage.setItem('form-data', JSON.stringify(currentData));
    };

    const loadCompanyName = () => {
        const companyName = JSON.parse(localStorage.getItem('welcome'));

        if (companyName) {
            document.getElementById('companyName').value = companyName;
        }
    };
    

    function populateInputsFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('form-data')) || {};
    
        Object.keys(storedData).forEach(section => {
            const sectionData = storedData[section];
            Object.keys(sectionData).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = sectionData[key];
                    } else {
                        input.value = sectionData[key];
                    }
                }
            });
        });
    }

    // Initial load
    loadCompanyName();
    populateInputsFromLocalStorage();
    toggleDisplay('builder-wrapper', 'none');

    function populatePolicyDetails() {
        const formData = JSON.parse(localStorage.getItem('form-data')) || {};
        const companyName = JSON.parse(localStorage.getItem('welcome'));
    
        // Update company name
        if (companyName) {
            document.querySelector('.policy-title-bold').innerText = companyName;
        }
    
        // Iterate over each key in formData to populate details
        Object.keys(formData).forEach(section => {
            const sectionData = formData[section];
            Object.keys(sectionData).forEach(key => {
                const valueElement = document.getElementById(key + 'Span');
                if (valueElement) {
                    valueElement.innerText = sectionData[key];
                    // Only display the sentence if relevant data exists
                    valueElement.closest('.detail-description').style.display = sectionData[key] ? 'block' : 'none';
                }
            });
        });
    }

    let lastFormData = JSON.stringify(localStorage.getItem('form-data'));
    let lastWelcomeData = JSON.stringify(localStorage.getItem('welcome'));

    setInterval(() => {
        const currentFormData = JSON.stringify(localStorage.getItem('form-data'));
        const currentWelcomeData = JSON.stringify(localStorage.getItem('welcome'));
        if (lastFormData !== currentFormData || lastWelcomeData !== currentWelcomeData) {
            populatePolicyDetails(); // Re-populate if data has changed
            lastFormData = currentFormData;
            lastWelcomeData = currentWelcomeData;
        }
    }, 500);

    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', function() {
        const companyName = document.getElementById('companyName').value;
        console.log("companyName", companyName)
        localStorage.setItem('welcome', JSON.stringify(companyName));
        
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        if(allSections.length > 0) {
            allSections[0].style.display = 'flex';
        }
        
        toggleDisplay('builder-wrapper', 'flex');
    });


    // Event listeners for back and next/skip buttons
    const controlWrappers = document.querySelectorAll('.controls-wrapper .controls');
    controlWrappers.forEach((wrapper, index) => {
        const nextButton = wrapper.querySelector('.button:not(.is-skip)');
        const backButton = wrapper.querySelector('.back-button');
        const skipButton = wrapper.querySelector('.button.is-skip');
        const backButtonAllDone = wrapper.querySelector('.back-button-alldone');

        function navigateToNextSection(index, controlWrappers) {
            if (index < controlWrappers.length - 1) {
                controlWrappers[index].style.display = 'none'; // Hide current section
                controlWrappers[index + 1].style.display = 'flex'; // Show next section
            } else {
                alert('All sections completed.');
            }
        }        

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                // Check if at least one input is filled in the current section
                const inputs = wrapper.querySelectorAll('.w-input');
                const isAnyInputFilled = Array.from(inputs).some(input => input.value.trim() !== '');

                if (isAnyInputFilled) {
                    saveFormData(wrapper.id); // Save data for the current section
                    navigateToNextSection(index, controlWrappers);
                } else {
                    alert('Please fill in at least one field before proceeding.');
                }
            });
        }


        if (skipButton) {
            skipButton.addEventListener('click', function() {
                // Clear all input fields in the current section
                const inputs = wrapper.querySelectorAll('.w-input');
                inputs.forEach(input => {
                    input.value = ''; // Clear the input
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false; // Uncheck if it's a checkbox or radio button
                    }
                });
        
                // Clear the corresponding section's data from localStorage
                const currentData = JSON.parse(localStorage.getItem('form-data')) || {};
                if (currentData[wrapper.id]) {
                    delete currentData[wrapper.id]; // Delete the section's data
                    localStorage.setItem('form-data', JSON.stringify(currentData)); // Update localStorage
                }
        
                navigateToNextSection(index, controlWrappers);
            });
        }


        console.log("back button", backButton)
        
        if (backButton) {
            backButton.addEventListener('click', function() {
                if(index === 0) {
                    toggleDisplay('builder-wrapper', 'none');
                } else {
                    controlWrappers[index].style.display = 'none';
                    controlWrappers[index - 1].style.display = 'flex';
                }
            });
        }
    });

    const backButtonAllDone = document.getElementById('back-8');
    console.log(backButtonAllDone, "backButtonAllDone")
    if (backButtonAllDone) {
        backButtonAllDone.addEventListener('click', function() {
            document.querySelector('.builder-wrapper').style.display = 'none';
        });
    } else {
        console.log('back-button-alldone not found');
    }

    const perDiemCheckboxes = document.querySelectorAll('.w-checkbox-input.checkbox');

    perDiemCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!this.closest('.controls').id.includes('all-done')) {
                const associatedInput = this.closest('.input').querySelector('.text-field');
                console.log("change", associatedInput);
    
                if (this.checked) {
                    associatedInput.disabled = true;
                    associatedInput.value = '';
                } else {
                    associatedInput.disabled = false;
                }
            }
        });
    });
    

    document.querySelectorAll('.w-input').forEach(input => {
        input.addEventListener('input', function() {
            const section = this.closest('.controls').id;
            saveFormData(section);
        });
    });

    // Attach event listeners to all checkboxes
    document.querySelectorAll('.w-checkbox-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const section = this.closest('.controls').id;
            saveFormData(section);
        });
    });
});
