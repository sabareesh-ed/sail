document.addEventListener('DOMContentLoaded', function() {
    console.log("code works")

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
        const storedData = JSON.parse(localStorage.getItem('form-data'));
        if (storedData && storedData.welcome && storedData.welcome.companyName) {
            document.getElementById('companyName').value = storedData.welcome.companyName;
        }
    };

    // Initial load
    loadCompanyName();
    toggleDisplay('builder-wrapper', 'none');

    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', function() {
        const companyName = document.getElementById('companyName').value;
        saveFormData('welcome', { companyName: companyName });
        
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
                    // associatedInput.value = '';
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
