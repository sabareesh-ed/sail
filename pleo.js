document.addEventListener('DOMContentLoaded', function() {
    console.log("code works")
    // Utility function to show/hide elements by class
    const toggleDisplay = (className, displayStyle) => {
        const elements = document.querySelectorAll('.' + className);
        elements.forEach(element => {
            element.style.display = displayStyle;
        });
    };

    // Store form data in local storage
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

    // Load company name from local storage and set it to the company name field
    const loadCompanyName = () => {
        const storedData = JSON.parse(localStorage.getItem('form-data'));
        if (storedData && storedData.welcome && storedData.welcome.companyName) {
            document.getElementById('companyName').value = storedData.welcome.companyName;
        }
    };

    // Initial load
    loadCompanyName();
    toggleDisplay('builder-wrapper', 'none'); // Hide builder wrapper initially

    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', function() {
        const companyName = document.getElementById('companyName').value;
        saveFormData('welcome', { companyName: companyName });
        toggleDisplay('builder-wrapper', 'flex'); // Show builder wrapper
    });

    // Event listeners for back and next/skip buttons
    const controlWrappers = document.querySelectorAll('.controls-wrapper .controls');
    controlWrappers.forEach((wrapper, index) => {
        const nextButton = wrapper.querySelector('.button:not(.is-skip)');
        const backButton = wrapper.querySelector('.back-button');
        const skipButton = wrapper.querySelector('.button.is-skip');

        // Next/Skip button click handler
        [nextButton, skipButton].forEach(button => {
            button.addEventListener('click', function() {
                saveFormData(wrapper.id); // Save current section data
                if(index < controlWrappers.length - 1) {
                    controlWrappers[index].style.display = 'none'; // Hide current
                    controlWrappers[index + 1].style.display = 'flex'; // Show next
                } else {
                    alert('All sections completed.');
                }
            });
        });

        // Back button click handler
        backButton.addEventListener('click', function() {
            if(index === 0) {
                toggleDisplay('builder-wrapper', 'none');
            } else {
                controlWrappers[index].style.display = 'none'; // Hide current
                controlWrappers[index - 1].style.display = 'flex'; // Show previous
            }
        });
    });

    // Attach event listeners to all text fields for live update
    document.querySelectorAll('.w-input').forEach(input => {
        input.addEventListener('input', function() {
            const section = this.closest('.controls').id;
            saveFormData(section); // Save data on input change
        });
    });

    // Attach event listeners to all checkboxes
    document.querySelectorAll('.w-checkbox-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const section = this.closest('.controls').id;
            saveFormData(section); // Save data on checkbox change
        });
    });
});
