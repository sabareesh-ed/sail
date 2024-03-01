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
        toggleDisplay('builder-wrapper', 'flex');
    });

    // Event listeners for back and next/skip buttons
    const controlWrappers = document.querySelectorAll('.controls-wrapper .controls');
    controlWrappers.forEach((wrapper, index) => {
        const nextButton = wrapper.querySelector('.button:not(.is-skip)');
        const backButton = wrapper.querySelector('.back-button');
        const skipButton = wrapper.querySelector('.button.is-skip');

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                saveFormData(wrapper.id); // Save data for the current section
                if(index < controlWrappers.length - 1) {
                    controlWrappers[index].style.display = 'none';
                    controlWrappers[index + 1].style.display = 'flex';
                } else {
                    alert('All sections completed.');
                }
            });
        }

        // Event listener for Skip button
        if (skipButton) {
            skipButton.addEventListener('click', function() {
                if(index < controlWrappers.length - 1) {
                    controlWrappers[index].style.display = 'none';
                    controlWrappers[index + 1].style.display = 'flex';
                } else {
                    alert('All sections completed.');
                }
            });
        }

        backButton.addEventListener('click', function() {
            if(index === 0) {
                toggleDisplay('builder-wrapper', 'none');
            } else {
                controlWrappers[index].style.display = 'none';
                controlWrappers[index - 1].style.display = 'flex';
            }
        });
    });

    const perDiemCheckboxes = document.querySelectorAll('.w-checkbox-input.checkbox');

    perDiemCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const associatedInput = this.closest('.input').querySelector('.text-field');
            console.log("change", associatedInput)

            if (this.checked) {
                associatedInput.disabled = true;
                associatedInput.value = '';
            } else {
                associatedInput.disabled = false;
            }
        });
    });

    const backButtonAllDone = document.getElementById('back-button-alldone');
    if (backButtonAllDone) {
        backButtonAllDone.addEventListener('click', function() {
            document.querySelector('.builder-wrapper').style.display = 'none';
        });
    } else {
        console.log('back-button-alldone not found');
    }


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
