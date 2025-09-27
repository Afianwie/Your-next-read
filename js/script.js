// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Reading progress indicator for article pages
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    
    if (progressBar) {
        function updateProgress() {
            const articleContent = document.querySelector('.article-page');
            if (!articleContent) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    }
});

// Enhanced horizontal scrolling for books
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainers = document.querySelectorAll('.books-scroll-container');
    
    scrollContainers.forEach(container => {
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;
        
        // Touch events for mobile
        container.addEventListener('touchstart', function(e) {
            isScrolling = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', function(e) {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        container.addEventListener('touchend', function() {
            isScrolling = false;
        });
        
        // Mouse events for desktop
        container.addEventListener('mousedown', function(e) {
            isScrolling = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });
        
        container.addEventListener('mousemove', function(e) {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        container.addEventListener('mouseup', function() {
            isScrolling = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseleave', function() {
            isScrolling = false;
            container.style.cursor = 'grab';
        });
        
        // Add grab cursor
        container.style.cursor = 'grab';
    });
});

// Smooth scroll to sections
document.addEventListener('DOMContentLoaded', function() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Book of the Week System
class BookOfTheWeekManager {
    constructor() {
        this.storageKey = 'bookOfTheWeek';
        this.weekKey = 'bookOfTheWeekWeek';
        this.usedBooksKey = 'bookOfTheWeekUsed';
        this.books = this.extractBooksFromPage();
        this.currentWeek = this.getCurrentWeek();
        this.initializeBookOfTheWeek();
    }

    // Extract all books from the books page
    extractBooksFromPage() {
        const books = [];
        
        // Define all books with their details
        const bookData = [
            // Romance
            { title: "Does It Hurt", author: "Carlton", image: "images/download (5).jfif", description: "A steamy romance that explores the complexities of love, desire, and the pain that sometimes comes with both.", link: "https://www.amazon.com/Does-Hurt-H-D-Carlton-ebook/dp/B09PKTYKGZ", genre: "Romance" },
            { title: "November 9", author: "Colleen Hoover", image: "images/download (6).jfif", description: "A heart-wrenching story about Fallon and Ben who meet on the same day every year, exploring themes of love, loss, and second chances.", link: "https://amazon.com", genre: "Romance" },
            { title: "Throne of Glass", author: "Sarah J. Maas", image: "images/download (7).jfif", description: "An epic fantasy romance following Celaena Sardothien, an assassin who must compete in a deadly tournament to win her freedom.", link: "https://amazon.com", genre: "Romance" },
            { title: "Ugly Love", author: "Colleen Hoover", image: "images/download (8).jfif", description: "A raw and emotional story about Tate Collins and Miles Archer, exploring the complexities of love, pain, and healing.", link: "https://amazon.com", genre: "Romance" },
            { title: "Pretend You're Mine", author: "Lucy Score", image: "images/download (9).jfif", description: "A charming small-town romance about Harper and Luke, who enter into a fake relationship that becomes all too real.", link: "https://amazon.com", genre: "Romance" },
            
            // Fantasy
            { title: "Fourth Wing", author: "Rebecca Yarros", image: "images/download (10).jfif", description: "An epic fantasy about Violet Sorrengail who must survive the deadly war college for dragon riders, where only the strongest survive.", link: "https://amazon.com", genre: "Fantasy" },
            { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", image: "images/download (11).jfif", description: "A captivating fantasy romance following Feyre Archeron as she's drawn into the dangerous world of the Fae courts.", link: "https://amazon.com", genre: "Fantasy" },
            { title: "One Dark Window", author: "Rachel Gillig", image: "images/download (13).jfif", description: "A dark fantasy about Elspeth Spindle who must use her dangerous magic to save her kingdom from a mysterious plague.", link: "https://amazon.com", genre: "Fantasy" },
            { title: "Red Rising", author: "Pierce Brown", image: "images/download (14).jfif", description: "A science fiction fantasy about Darrow, a Red miner who infiltrates the Gold ruling class to bring down their oppressive society.", link: "https://amazon.com", genre: "Fantasy" },
            { title: "Crescent City", author: "Sarah J. Maas", image: "images/download (15).jfif", description: "A modern fantasy about Bryce Quinlan who must solve her best friend's murder in a world where humans and supernatural beings coexist.", link: "https://amazon.com", genre: "Fantasy" },
            
            // Young Adult
            { title: "Cinder", author: "Marissa Meyer", image: "images/download (16).jfif", description: "A futuristic retelling of Cinderella featuring Cinder, a cyborg mechanic who becomes entangled in an intergalactic struggle.", link: "https://amazon.com", genre: "Young Adult" },
            { title: "A Good Girl's Guide to Murder", author: "Holly Jackson", image: "images/download (17).jfif", description: "Pip Fitz-Amobi investigates a closed murder case for her senior project, uncovering secrets that someone wants to keep hidden.", link: "https://amazon.com", genre: "Young Adult" },
            { title: "Ash Princess", author: "Laura Sebastian", image: "images/download (18).jfif", description: "Theodosia, the Ash Princess, must reclaim her throne and free her people from the Kaiser's brutal rule.", link: "https://amazon.com", genre: "Young Adult" },
            { title: "Better Than the Movies", author: "Lynn Painter", image: "images/download (19).jfif", description: "Liz Buxbaum enlists her annoying neighbor Wes to help her get the attention of her longtime crush in this charming rom-com.", link: "https://amazon.com", genre: "Young Adult" },
            { title: "The Book Thief", author: "Markus Zusak", image: "images/the-book-thief.jpg", description: "Set in Nazi Germany, this novel follows Liesel Meminger, a young girl who steals books and shares them with others during World War II.", link: "https://amazon.com", genre: "Young Adult" },
            
            // Mystery
            { title: "One of the Girls", author: "Lucy Clarke", image: "images/download (21).jfif", description: "A gripping mystery about a group of friends on a hen weekend that takes a dark turn when one of them goes missing.", link: "https://amazon.com", genre: "Mystery" },
            { title: "The Housemaid", author: "Freida McFadden", image: "images/download (22).jfif", description: "A psychological thriller about a housemaid who discovers dark secrets about the family she works for, leading to a web of lies and deception.", link: "https://amazon.com", genre: "Mystery" },
            { title: "The Collective", author: "Alison Gaylin", image: "images/download (23).jfif", description: "A chilling mystery about a secret group of mothers who take justice into their own hands when the system fails their children.", link: "https://amazon.com", genre: "Mystery" },
            { title: "Behind Her Eyes", author: "Sarah Pinborough", image: "images/download (24).jfif", description: "A twisted psychological thriller about a single mother who becomes entangled in a dangerous relationship with her boss and his wife.", link: "https://amazon.com", genre: "Mystery" },
            { title: "The Guest List", author: "Lucy Foley", image: "images/download (25).jfif", description: "A murder mystery set on a remote island during a wedding celebration, where everyone has secrets and someone is willing to kill to keep them.", link: "https://amazon.com", genre: "Mystery" },
            
            // Thriller
            { title: "Rock, Paper, Scissors", author: "Alice Feeney", image: "images/download (26).jfif", description: "A psychological thriller about a couple's anniversary trip that turns deadly when they discover they don't know each other as well as they thought.", link: "https://amazon.com", genre: "Thriller" },
            { title: "Never Lie", author: "Freida McFadden", image: "images/download (27).jfif", description: "A gripping thriller about a couple who buy a house with a dark past, only to discover that the previous owner's secrets are still very much alive.", link: "https://amazon.com", genre: "Thriller" },
            { title: "Where the Crawdads Sing", author: "Delia Owens", image: "images/download (28).jfif", description: "A haunting mystery about Kya Clark, the 'Marsh Girl,' who becomes the prime suspect in a murder case in her small North Carolina town.", link: "https://amazon.com", genre: "Thriller" },
            { title: "The Silent Patient", author: "Alex Michaelides", image: "images/download (29).jfif", description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband, and the psychotherapist determined to understand why.", link: "https://amazon.com", genre: "Thriller" },
            { title: "Gone Girl", author: "Gillian Flynn", image: "images/download (30).jfif", description: "On the morning of their fifth wedding anniversary, Nick's wife Amy disappears. Under mounting pressure from the police and the media, Nick begins to lie and behave strangely.", link: "https://amazon.com", genre: "Thriller" },
            
            // Science Fiction
            { title: "The Space Between Worlds", author: "M. Johnson", image: "images/download (31).jfif", description: "A multiverse thriller about Cara, who can travel between parallel worlds but only to versions of Earth where she's already dead.", link: "https://amazon.com", genre: "Science Fiction" },
            { title: "The Three Body Problem", author: "Liu Cixin", image: "images/download (32).jfif", description: "A groundbreaking science fiction novel about humanity's first contact with an alien civilization and the complex physics that govern their world.", link: "https://amazon.com", genre: "Science Fiction" },
            { title: "The Sparrow", author: "Mary Doria Russell", image: "images/download (33).jfif", description: "A profound exploration of first contact, faith, and the consequences of cultural misunderstanding when humans encounter an alien civilization.", link: "https://amazon.com", genre: "Science Fiction" },
            { title: "Good Morning, Midnight", author: "Lily Brooks-Dalton", image: "images/download (34).jfif", description: "A post-apocalyptic novel about an aging astronomer and a young woman who may be the last people on Earth, exploring themes of isolation and connection.", link: "https://amazon.com", genre: "Science Fiction" },
            { title: "Project Hail Mary", author: "Andy Weir", image: "images/download (35).jfif", description: "A thrilling space adventure about a lone astronaut who must save humanity from extinction using science, ingenuity, and an unlikely friendship.", link: "https://amazon.com", genre: "Science Fiction" },
            
            // Historical Fiction
            { title: "Outlander", author: "Diana Gabaldon", image: "images/download (36).jfif", description: "An epic time-travel romance following Claire Randall, a WWII nurse who is mysteriously transported to 18th-century Scotland.", link: "https://amazon.com", genre: "Historical Fiction" },
            { title: "The Book of Lost Names", author: "Kristin Harmel", image: "images/download (37).jfif", description: "A moving story about a woman who helped forge documents for Jewish children during WWII and must confront her past decades later.", link: "https://amazon.com", genre: "Historical Fiction" },
            { title: "The Winemaker's Wife", author: "Kristin Harmel", image: "images/download (38).jfif", description: "A dual-timeline story set in Champagne, France, exploring love, betrayal, and survival during WWII and its aftermath.", link: "https://amazon.com", genre: "Historical Fiction" },
            { title: "The Island of Sea Women", author: "Lisa See", image: "images/download (39).jfif", description: "A powerful novel about the haenyeo, the diving women of Jeju Island, and their friendship that spans decades of Korean history.", link: "https://amazon.com", genre: "Historical Fiction" },
            { title: "The Four Winds", author: "Kristin Hannah", image: "images/download (40).jfif", description: "A sweeping story of one woman's courage during the Great Depression and the Dust Bowl, exploring themes of family, survival, and hope.", link: "https://amazon.com", genre: "Historical Fiction" },
            
            // Self-Help
            { title: "The New Psycho-Cybernetics", author: "Maxwell Maltz", image: "images/download (41).jfif", description: "A classic guide to self-image psychology and how to program your mind for success, happiness, and personal achievement.", link: "https://amazon.com", genre: "Self-Help" },
            { title: "The Way of Integrity", author: "Martha Beck", image: "images/download (42).jfif", description: "A transformative guide to finding your authentic self and living a life aligned with your deepest values and purpose.", link: "https://amazon.com", genre: "Self-Help" },
            { title: "The Power of Your Subconscious Mind", author: "Joseph Murphy", image: "images/download (43).jfif", description: "An exploration of how to harness the incredible power of your subconscious mind to achieve your goals and transform your life.", link: "https://amazon.com", genre: "Self-Help" },
            { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", image: "images/download (44).jfif", description: "A counterintuitive approach to living a good life, focusing on what truly matters and letting go of what doesn't.", link: "https://amazon.com", genre: "Self-Help" },
            { title: "How to Win Friends and Influence People", author: "Dale Carnegie", image: "images/download (45).jfif", description: "The timeless classic on human relations, offering practical advice for building meaningful connections and achieving success through others.", link: "https://amazon.com", genre: "Self-Help" },
            
            // African Literature
            { title: "No Longer at Ease", author: "Chinua Achebe", image: "images/download (46).jfif", description: "A powerful novel about Obi Okonkwo, a young Nigerian who returns from England to face the challenges of corruption and cultural conflict in post-colonial Nigeria.", link: "https://amazon.com", genre: "African Literature" },
            { title: "Beasts Made of Night", author: "Tochi Onyebuchi", image: "images/download (47).jfif", description: "A young adult fantasy about Taj, a sin-eater who consumes the sins of others, and his journey to uncover the truth about his world.", link: "https://amazon.com", genre: "African Literature" },
            { title: "Second Class Citizen", author: "Buchi Emecheta", image: "images/download (48).jfif", description: "A powerful story about Adah, a Nigerian woman who immigrates to London and faces the challenges of racism, sexism, and cultural displacement.", link: "https://amazon.com", genre: "African Literature" },
            { title: "Children of Anguish and Anarchy", author: "Tomi Adeyemi", image: "images/download (49).jfif", description: "The final book in the Legacy of Orïsha trilogy, following Zélie as she fights to restore magic to her kingdom and save her people.", link: "https://amazon.com", genre: "African Literature" },
            { title: "Crooked Seeds", author: "Karen Jennings", image: "images/download (50).jfif", description: "A haunting novel about Deidre van Deventer, who returns to her family farm in South Africa to confront the ghosts of apartheid and her own past.", link: "https://amazon.com", genre: "African Literature" },
            
            // Christian Fiction
            { title: "Redeeming Love", author: "Francine Rivers", image: "images/download (51).jfif", description: "A powerful retelling of the biblical story of Hosea, set in California's gold country, exploring themes of love, forgiveness, and redemption.", link: "https://amazon.com", genre: "Christian Fiction" },
            { title: "At Home in Mitford", author: "Jan Karon", image: "images/download (52).jfif", description: "The first book in the beloved Mitford series, following Father Tim, a small-town priest, and the charming residents of Mitford.", link: "https://amazon.com", genre: "Christian Fiction" },
            { title: "When Crickets Cry", author: "Charles Martin", image: "images/download (53).jfif", description: "A touching story about a heart surgeon and a young girl in need of a transplant, exploring themes of faith, hope, and second chances.", link: "https://amazon.com", genre: "Christian Fiction" },
            { title: "The Mark of the Lion", author: "Francine Rivers", image: "images/download (54).jfif", description: "An epic historical novel set in ancient Rome, following Hadassah, a young Christian slave, and her journey of faith and courage.", link: "https://amazon.com", genre: "Christian Fiction" },
            { title: "There You'll Find Me", author: "Jenny B. Jones", image: "images/download (55).jfif", description: "A contemporary young adult novel about Finley, who travels to Ireland to find herself and discovers love, faith, and healing along the way.", link: "https://amazon.com", genre: "Christian Fiction" }
        ];
        
        return bookData;
    }

    // Get current week number
    getCurrentWeek() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    }

    // Initialize or update Book of the Week
    initializeBookOfTheWeek() {
        const storedWeek = localStorage.getItem(this.weekKey);
        const storedUsedBooks = JSON.parse(localStorage.getItem(this.usedBooksKey) || '[]');
        
        // Check if it's a new week or first time
        if (storedWeek !== this.currentWeek.toString() || !storedWeek) {
            this.selectNewBookOfTheWeek(storedUsedBooks);
        } else {
            this.displayCurrentBookOfTheWeek();
        }
    }

    // Select a new book for the week
    selectNewBookOfTheWeek(usedBooks) {
        // Get available books (not used yet)
        const availableBooks = this.books.filter(book => !usedBooks.includes(book.title));
        
        // If all books have been used, reset the used books list
        if (availableBooks.length === 0) {
            localStorage.removeItem(this.usedBooksKey);
            availableBooks = [...this.books];
        }
        
        // Select random book from available books
        const randomIndex = Math.floor(Math.random() * availableBooks.length);
        const selectedBook = availableBooks[randomIndex];
        
        // Store the selection
        localStorage.setItem(this.storageKey, JSON.stringify(selectedBook));
        localStorage.setItem(this.weekKey, this.currentWeek.toString());
        
        // Add to used books
        const updatedUsedBooks = [...usedBooks, selectedBook.title];
        localStorage.setItem(this.usedBooksKey, JSON.stringify(updatedUsedBooks));
        
        // Display the book
        this.displayBookOfTheWeek(selectedBook);
    }

    // Display current book of the week
    displayCurrentBookOfTheWeek() {
        const storedBook = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        if (storedBook.title) {
            this.displayBookOfTheWeek(storedBook);
        }
    }

    // Display the book of the week on the page
    displayBookOfTheWeek(book) {
        // Find or create the book of the week section
        let bookOfWeekSection = document.querySelector('.book-of-week');
        
        if (!bookOfWeekSection) {
            // Create the section if it doesn't exist
            bookOfWeekSection = this.createBookOfWeekSection();
            
            // Insert it at the top of the main content
            const mainContent = document.querySelector('section') || document.body;
            mainContent.insertBefore(bookOfWeekSection, mainContent.firstChild);
        }
        
        // Update the content
        this.updateBookOfWeekContent(bookOfWeekSection, book);
    }

    // Create the book of the week section
    createBookOfWeekSection() {
        const section = document.createElement('div');
        section.className = 'book-of-week';
        section.innerHTML = `
            <div class="book-of-week-content">
                <div class="book-of-week-image">
                    <img src="" alt="" class="book-cover">
                    <div class="book-of-week-badge">📚 Book of the Week</div>
                </div>
                <div class="book-of-week-details">
                    <h2 class="book-title"></h2>
                    <p class="book-author"></p>
                    <div class="book-meta">
                        <span class="book-genre"></span>
                        <span class="book-week">Week ${this.currentWeek}</span>
                    </div>
                    <div class="admin-comment">
                        <h4>Why This Book?</h4>
                        <p class="book-description"></p>
                        <p class="admin-signature">- Your Next Read Team</p>
                    </div>
                    <a href="" class="find-book-btn" target="_blank">Find This Book</a>
                </div>
            </div>
        `;
        return section;
    }

    // Update the book of the week content
    updateBookOfWeekContent(section, book) {
        const img = section.querySelector('.book-cover');
        const title = section.querySelector('.book-title');
        const author = section.querySelector('.book-author');
        const genre = section.querySelector('.book-genre');
        const description = section.querySelector('.book-description');
        const link = section.querySelector('.find-book-btn');
        
        if (img) img.src = book.image;
        if (img) img.alt = book.title;
        if (title) title.textContent = book.title;
        if (author) author.textContent = `by ${book.author}`;
        if (genre) genre.textContent = book.genre;
        if (description) description.textContent = book.description;
        if (link) {
            link.href = book.link;
            link.textContent = 'Find This Book';
        }
    }
}

// Initialize Book of the Week when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on the main pages (not article pages)
    if (!document.querySelector('.article-page')) {
        new BookOfTheWeekManager();
    }
});

// Comment System
class CommentManager {
    constructor() {
        this.currentArticle = this.getCurrentArticle();
        this.storageKey = `comments_${this.currentArticle}`;
        this.init();
    }

    getCurrentArticle() {
        const path = window.location.pathname;
        if (path.includes('audiobooks-so-good')) return 'audiobooks-so-good';
        if (path.includes('spicy-mature-romance')) return 'spicy-mature-romance';
        return 'unknown';
    }

    init() {
        this.loadComments();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('commentForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addComment();
            });
        }
    }

    addComment() {
        const nameInput = document.getElementById('commenterName');
        const commentInput = document.getElementById('commentText');
        
        if (!nameInput || !commentInput) return;

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment) {
            alert('Please fill in both name and comment fields.');
            return;
        }

        const newComment = {
            id: Date.now(),
            name: name,
            comment: comment,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        this.saveComment(newComment);
        this.displayComments();
        
        // Clear form
        nameInput.value = '';
        commentInput.value = '';
        
        // Show success message
        this.showMessage('Comment posted successfully!', 'success');
    }

    saveComment(comment) {
        const comments = this.getComments();
        comments.push(comment);
        localStorage.setItem(this.storageKey, JSON.stringify(comments));
    }

    getComments() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    loadComments() {
        this.displayComments();
    }

    displayComments() {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        const comments = this.getComments();
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        // Sort comments by date (newest first)
        comments.sort((a, b) => b.timestamp - a.timestamp);

        commentsList.innerHTML = comments.map(comment => this.createCommentHTML(comment)).join('');
    }

    createCommentHTML(comment) {
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="comment-item" data-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-author">
                        <span class="author-name">${this.escapeHtml(comment.name)}</span>
                        <span class="comment-date">${formattedDate}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${this.escapeHtml(comment.comment)}</p>
                </div>
                <div class="comment-actions">
                    <button class="reply-btn" onclick="commentManager.replyToComment(${comment.id})">Reply</button>
                    <button class="like-btn" onclick="commentManager.likeComment(${comment.id})">
                        👍 <span class="like-count">0</span>
                    </button>
                </div>
            </div>
        `;
    }

    replyToComment(commentId) {
        const commentElement = document.querySelector(`[data-id="${commentId}"]`);
        if (!commentElement) return;

        // Simple reply functionality - could be enhanced
        const nameInput = document.getElementById('commenterName');
        if (nameInput) {
            nameInput.focus();
        }
    }

    likeComment(commentId) {
        // Simple like functionality - could be enhanced with persistent likes
        const likeBtn = document.querySelector(`[data-id="${commentId}"] .like-btn`);
        if (likeBtn) {
            likeBtn.classList.toggle('liked');
            const countSpan = likeBtn.querySelector('.like-count');
            if (countSpan) {
                const currentCount = parseInt(countSpan.textContent) || 0;
                countSpan.textContent = likeBtn.classList.contains('liked') ? currentCount + 1 : currentCount - 1;
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, type = 'info') {
        // Create and show a temporary message
        const messageDiv = document.createElement('div');
        messageDiv.className = `comment-message comment-message-${type}`;
        messageDiv.textContent = message;
        
        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.insertBefore(messageDiv, commentsSection.firstChild);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 3000);
        }
    }
}

// Initialize comment system on article pages
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.article-page')) {
        window.commentManager = new CommentManager();
    }
});

