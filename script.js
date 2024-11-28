function saveBookmark() {
    const bookmarkLink = document.getElementById('bookmarkLink').value;
    const bookmarkId = getBookmarkId(bookmarkLink);

    if (bookmarkId) {
        const slotHTML = getSlotHTML(bookmarkId);
        if (slotHTML) {
            document.getElementById('bookmarkedContainer').innerHTML += slotHTML;

            // Save to localStorage
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            bookmarks.push({id: bookmarkId});
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));        
        } else {
            alert('Invalid Bookmark ID!');
        }
    } else {
        alert('Invalid Bookmark link!');
    }
}

function removeBookmark(id) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const index = bookmarks.findIndex(bookmark => bookmark.id == id);
    bookmarks.splice(index,1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    //localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    document.getElementById(id).remove();
}
function getBookmarkId(url) {
    const regExpYouTube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const regExpTikTok = /^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/
    var match = null;
    if ((match = url.match(regExpYouTube)) || 
        (match = url.match(regExpTikTok))) {
        return match[2];
    } else {
        return null;
    }
}

function getSlotHTML(bookmarkId) {
    if (bookmarkId.length == 11) {
        bookmarkIframe = `https://www.youtube.com/embed/${bookmarkId}`;
    } else if (bookmarkId.length == 19) {
        bookmarkIframe = `https://www.tiktok.com/embed/v3/${bookmarkId}`;
    } else {
        return null;
    }
    const slotHTML = `
    <div class="card" id="${bookmarkId}">
        <iframe src="${bookmarkIframe}" width="200" height="150" allowfullscreen></iframe>
        <a href="#" onclick="removeBookmark('${bookmarkId}')" style="color:red;font-weight:bold;">Remove Video</a>
    </div>
    `;
    return slotHTML;
}

// Load bookmarks from localStorage on page load
window.onload = function () {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(bookmark => {
        const slotHTML = getSlotHTML(bookmark.id);
        document.getElementById('bookmarkedContainer').innerHTML += slotHTML;
    });
};


