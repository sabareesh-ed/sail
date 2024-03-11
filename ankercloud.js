 // Function to calculate reading time
 function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

function updateReadingTimes() {
    // Select all blog posts with class '.timer'
    const blogPosts = document.querySelectorAll('.timer');
    console.log("updateReadingTimes: Blog Posts Found", blogPosts.length);

    blogPosts.forEach((post, index) => {
        console.log(`Processing Post ${index + 1}`);

        // Select the text content of the post
        const text = post.querySelector('.w-richtext').textContent;
        console.log(`Post ${index + 1} Text: `, text);

        // Calculate the reading time based on the text
        const readingTime = calculateReadingTime(text);
        console.log(`Post ${index + 1} Reading Time: `, readingTime);

        // Find the element where the reading time should be displayed
        const timeDisplay = post.querySelector('.reading-time');

        if (timeDisplay) {
            // Update the text content of the display element with the calculated reading time
            timeDisplay.textContent = readingTime ? readingTime : "1 min read";
            console.log(`Post ${index + 1} Updated With Reading Time: `, readingTime);
        } else {
            // Log a warning if the .reading-time element does not exist in the post
            console.warn(`Warning: Reading time display element not found for Post ${index + 1}.`);
        }
    });
}

// Assuming calculateReadingTime is defined elsewhere


// Define the function to process card tags
function processCardTags() {
    var cardTagsList = document.querySelectorAll('.card__tags');
    cardTagsList.forEach(function (cardTags) {
        var cardTagsListContainer = cardTags.closest('.card__tags-list');
        if (cardTagsListContainer) {
            var tags = cardTags.textContent.split(", ");
            tags.forEach(function (tag) {
                if (!isTagAlreadyPresent(cardTagsListContainer, tag)) {
                    var newTagDiv = document.createElement("div");
                    newTagDiv.classList.add("card__tag", "text-xxs");
                    newTagDiv.textContent = tag;
                    cardTagsListContainer.appendChild(newTagDiv);
                }
            });
        }
    });
}

// Function to check if a tag is already present in the container
function isTagAlreadyPresent(container, tag) {
    var existingTags = container.querySelectorAll('.card__tag');
    for (var i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent.trim() === tag.trim()) {
            return true;
        }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    processCardTags();
	updateReadingTimes();
    console.log("function called");
    var loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function () {
            setTimeout(function () {
                processCardTags();
                updateReadingTimes();
            }, 200);
        });
    }
});