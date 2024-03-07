document.addEventListener('DOMContentLoaded', function() {
    console.log("code works")
    updatePolicyDetails();

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

    function updatePolicyDetails() {
        const formData = JSON.parse(localStorage.getItem('form-data')) || {};
        const companyName = JSON.parse(localStorage.getItem('welcome')) || "Your Company Name";

        const companySpan = document.querySelector('.policy-title-bold');
        if (companySpan) companySpan.innerText = companyName;

        function updateSpanTextById(id, text) {
            const span = document.getElementById(id);
            if (span) span.innerText = text;
        }

        // Accommodation
        if (formData.accomodation) {
            document.getElementById('accomodationWrap').style.display = 'flex';
            if (formData.accomodation.howToBookTrips) {
                updateSpanTextById('howToBookTripsSpan', formData.accomodation.howToBookTrips || '');
                document.getElementById('accomodation-1').style.display = 'block';
            } else {
                document.getElementById('accomodation-1').style.display = 'none';
            }
            if (formData.accomodation.accomodationPerDiem === true) {
                console.log("1")
                updateSpanTextById('budgetPerDiemSpan', 'Maximum budget per person per night is set by your per diem policy.');
                document.getElementById('accomodation-2').style.display = 'block';
            } else if (formData.accomodation.budgetPerNight) {
                console.log("2")
                updateSpanTextById('budgetPerNightSpan', formData.accomodation.budgetPerNight || '');
                document.getElementById('accomodation-2').style.display = 'block';
            } else {
                document.getElementById('accomodation-2').style.display = 'none';
                console.log("3")
            }
            updateSpanTextById('accomodationExtraSpan', formData.accomodation.accomodationExtra || '');
        } else {
            document.getElementById('accomodationWrap').style.display = 'none';
        }

        // Food
        if (formData.food) {
            updateSpanTextById('breakfastSpan', formData.food.breakfast || '');
            updateSpanTextById('lunchSpan', formData.food.lunch || '');
            updateSpanTextById('dinnerSpan', formData.food.dinner || '');
            updateSpanTextById('extraFoodSpan', formData.food.extraFood || '');
        }

        // Transport
        if (formData.transport) {
            updateSpanTextById('airTravelPolicySpan', formData.transport.airTravelPolicy || '');
            updateSpanTextById('cityTravelPolicySpan', formData.transport.cityTravelPolicy || '');
            updateSpanTextById('mileageAmountSpan', formData.transport.mileageAmount || '');
            updateSpanTextById('extraTransportSpan', formData.transport.extraTransport || '');
        }

        // Conferences & Events
        if (formData.conferences) {
            updateSpanTextById('conferenceAmountSpan', formData.conferences.conferenceAmount || '');
            updateSpanTextById('extraConferencesSpan', formData.conferences.extraConferences || '');
        }

        // Remote Work
        if (formData.remote) {
            updateSpanTextById('softwareAmountSpan', formData.remote.softwareAmount || '');
            updateSpanTextById('hardwareAmountSpan', formData.remote.hardwareAmount || '');
            updateSpanTextById('extraRemoteSpan', formData.remote.extraRemote || '');
        }

        // Gifts & Flowers
        if (formData['gifts-and-flowers']) {
            updateSpanTextById('clientAmountSpan', formData['gifts-and-flowers'].clientAmount || '');
            updateSpanTextById('employeeAmountSpan', formData['gifts-and-flowers'].employeeAmount || '');
            updateSpanTextById('extraGiftsSpan', formData['gifts-and-flowers'].extraGifts || '');
        }

        // Details
        if (formData.details) {
            updateSpanTextById('detailDaysSpan', formData.details.detailDays || '');
            updateSpanTextById('detailsReimbursementSpan', formData.details.detailsReimbursement || '');
            if (formData.details) {
                let contactInfo = '';
                if (formData.details.contactName) {
                    contactInfo += formData.details.contactName;
                }
                if (formData.details.contactEmail) {
                    contactInfo += (contactInfo ? ` (${formData.details.contactEmail})` : formData.details.contactEmail);
                }
                if (contactInfo) {
                    document.getElementById('contactNameandEmailSpan').innerText = extraDetails;
                }
            }            
            updateSpanTextById('extraDetailsSpan', formData.details.extraTransport || '');
        }
    }
    

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

    setInterval(updatePolicyDetails, 100);

});
