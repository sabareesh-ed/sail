// Function to calculate reading time
function calculateReadingTime(text) {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Split by whitespace and count
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}
// Function to update all blog posts
function updateReadingTimes() {
    // Select all blog posts (assuming they have a class 'blog_card-content-wrapper')
    const blogPosts = document.querySelectorAll('.blog_card-content-wrapper');
    blogPosts.forEach(post => {
        // Find the text content of the post (assuming it's inside a <div class="hide w-richtext">)
        const textElement = post.querySelector('.hide.w-richtext');
        // Check if the textElement is not null before accessing its text content
        if (textElement) {
            const text = textElement.textContent;
            // Calculate reading time
            const readingTime = calculateReadingTime(text);
            // Update the post with reading time (assuming you have a div with class 'read_time-wrapper')
            const timeDisplay = post.querySelector('.read_time-wrapper p');
            timeDisplay.textContent = readingTime;
        }
    });
}
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
    // Call the function on page load
    processCardTags();
		updateReadingTimes();
    console.log("function called");
    // Attach click event listener to the 'load-more' anchor tag
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