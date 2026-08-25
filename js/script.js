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

// Enhanced horizontal scrolling for books.
// Exposed as a function (not just a DOMContentLoaded listener) because
// BooksPageRenderer injects new .books-scroll-container elements after
// the page has already loaded, once the Supabase fetch resolves.
function setupBooksScrollContainer(container) {
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

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

    container.style.cursor = 'grab';
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.books-scroll-container').forEach(setupBooksScrollContainer);
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Builds the outbound buy link for a book.
//
// Most rows carry the placeholder "https://amazon.com" inherited from the
// original hardcoded markup, which just dumps the reader on Amazon's
// homepage. When a row has no real product URL we search Amazon for the
// title and author instead, so every link actually lands on the book.
// The Associates tag from supabase-config.js is appended when set.
function buildAffiliateUrl(book) {
    const link = book.affiliate_link || '';
    const isProductUrl = /amazon\.[a-z.]+\/.*\/(dp|gp)\//.test(link);

    let url = isProductUrl
        ? link
        : 'https://www.amazon.com/s?k=' + encodeURIComponent(`${book.title} ${book.author}`);

    const tag = typeof AMAZON_ASSOCIATE_TAG !== 'undefined' ? AMAZON_ASSOCIATE_TAG : '';
    if (tag) {
        url += (url.includes('?') ? '&' : '?') + 'tag=' + encodeURIComponent(tag);
    }
    return url;
}

// Renders the book catalog on books.html from the Supabase `books` table,
// grouped by genre. Replaces the old approach of hand-typing every book
// twice (once in books.html markup, once in a JS array).
class BooksPageRenderer {
    constructor() {
        this.container = document.getElementById('books-container');
        if (this.container) {
            this.render();
        }
    }

    async render() {
        const { data: books, error } = await supabaseClient
            .from('books')
            .select('*')
            .order('genre', { ascending: true })
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Failed to load books:', error);
            this.container.innerHTML = '<p class="books-loading">Could not load books right now. Please try again later.</p>';
            return;
        }

        if (!books || books.length === 0) {
            this.container.innerHTML = '<p class="books-loading">No books yet — check back soon!</p>';
            return;
        }

        const byGenre = new Map();
        books.forEach(book => {
            if (!byGenre.has(book.genre)) byGenre.set(book.genre, []);
            byGenre.get(book.genre).push(book);
        });

        this.container.innerHTML = Array.from(byGenre.entries()).map(([genre, list]) => `
            <div class="genre-section" id="${slugify(genre)}">
                <h3>${escapeHtml(genre)}</h3>
                <div class="books-scroll-container">
                    <div class="books-scroll">
                        ${list.map(book => this.bookCardHtml(book)).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        this.container.querySelectorAll('.books-scroll-container').forEach(setupBooksScrollContainer);
    }

    bookCardHtml(book) {
        return `
            <div class="book-card">
                <img src="${escapeHtml(book.image_url)}" alt="${escapeHtml(book.title)}" loading="lazy">
                <h3>${escapeHtml(book.title)}</h3>
                <p>by ${escapeHtml(book.author)}</p>
                <p>${escapeHtml(book.description)}</p>
                <a href="${escapeHtml(buildAffiliateUrl(book))}" target="_blank" rel="noopener noreferrer sponsored">Buy on Amazon</a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new BooksPageRenderer();
});

// Book of the Week System
// Reads a curated pick from the `book_of_week` table (joined with `books`)
// so every visitor sees the same book, instead of each browser picking its
// own random book via localStorage.
class BookOfTheWeekManager {
    constructor() {
        this.init();
    }

    getCurrentWeek() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    }

    async init() {
        const book = await this.fetchBookOfWeek();
        if (book) {
            this.displayBookOfTheWeek(book);
        }
    }

    async fetchBookOfWeek() {
        const todayIso = new Date().toISOString().slice(0, 10);

        // Prefer an admin-curated pick for the current (or most recent past) week.
        const { data: curated, error: curatedError } = await supabaseClient
            .from('book_of_week')
            .select('admin_note, week_start, books(*)')
            .lte('week_start', todayIso)
            .order('week_start', { ascending: false })
            .limit(1);

        if (!curatedError && curated && curated.length > 0 && curated[0].books) {
            return { ...curated[0].books, adminNote: curated[0].admin_note, week: this.getCurrentWeek() };
        }

        // Fall back to a deterministic pick from the catalog so the section
        // still shows something sensible before any week has been curated.
        const { data: books, error: booksError } = await supabaseClient
            .from('books')
            .select('*')
            .order('created_at', { ascending: true });

        if (booksError || !books || books.length === 0) return null;

        const index = this.getCurrentWeek() % books.length;
        return { ...books[index], adminNote: null, week: this.getCurrentWeek() };
    }

    displayBookOfTheWeek(book) {
        let section = document.querySelector('.book-of-week');

        if (!section) {
            section = this.createBookOfWeekSection();
            const mainContent = document.querySelector('section') || document.body;
            mainContent.insertBefore(section, mainContent.firstChild);
        }

        this.updateBookOfWeekContent(section, book);
    }

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
                        <span class="book-week"></span>
                    </div>
                    <div class="admin-comment">
                        <h4>Why This Book?</h4>
                        <p class="book-description"></p>
                        <p class="admin-signature">- Your Next Read Team</p>
                    </div>
                    <a href="" class="find-book-btn" target="_blank" rel="noopener noreferrer">Find This Book</a>
                </div>
            </div>
        `;
        return section;
    }

    updateBookOfWeekContent(section, book) {
        const img = section.querySelector('.book-cover');
        const title = section.querySelector('.book-title');
        const author = section.querySelector('.book-author');
        const genre = section.querySelector('.book-genre');
        const week = section.querySelector('.book-week');
        const description = section.querySelector('.book-description');
        const link = section.querySelector('.find-book-btn');

        if (img) { img.src = book.image_url; img.alt = book.title; }
        if (title) title.textContent = book.title;
        if (author) author.textContent = `by ${book.author}`;
        if (genre) genre.textContent = book.genre;
        if (week) week.textContent = `Week ${book.week}`;
        if (description) description.textContent = book.adminNote || book.description;
        if (link) { link.href = buildAffiliateUrl(book); link.textContent = 'Find This Book'; }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on the main pages (not article pages)
    if (!document.querySelector('.article-page')) {
        new BookOfTheWeekManager();
    }
});

// Comment System
// Comments are stored in Supabase so every visitor sees the same list,
// instead of the old localStorage version where each browser only saw
// its own comments. New comments start unapproved and become visible
// once approved from the Supabase Table Editor.
class CommentManager {
    constructor() {
        this.articleSlug = this.getArticleSlug();
        this.init();
    }

    getArticleSlug() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1);
        return file.replace(/\.html?$/, '') || 'unknown';
    }

    async init() {
        await this.displayComments();
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

    async addComment() {
        const nameInput = document.getElementById('commenterName');
        const commentInput = document.getElementById('commentText');

        if (!nameInput || !commentInput) return;

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment) {
            this.showMessage('Please fill in both name and comment fields.', 'error');
            return;
        }

        const { error } = await supabaseClient
            .from('comments')
            .insert({ article_slug: this.articleSlug, name, comment });

        if (error) {
            console.error('Failed to submit comment:', error);
            this.showMessage('Something went wrong posting your comment. Please try again.', 'error');
            return;
        }

        nameInput.value = '';
        commentInput.value = '';

        this.showMessage('Comment submitted! It will appear after a quick review.', 'success');
    }

    async displayComments() {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        const { data: comments, error } = await supabaseClient
            .from('comments')
            .select('*')
            .eq('article_slug', this.articleSlug)
            .eq('approved', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Failed to load comments:', error);
            commentsList.innerHTML = '<p class="no-comments">Could not load comments right now.</p>';
            return;
        }

        if (!comments || comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        commentsList.innerHTML = comments.map(comment => this.createCommentHTML(comment)).join('');
    }

    createCommentHTML(comment) {
        const date = new Date(comment.created_at);
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
                        <span class="author-name">${escapeHtml(comment.name)}</span>
                        <span class="comment-date">${formattedDate}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${escapeHtml(comment.comment)}</p>
                </div>
            </div>
        `;
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `comment-message comment-message-${type}`;
        messageDiv.textContent = message;

        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.insertBefore(messageDiv, commentsSection.firstChild);

            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.article-page')) {
        window.commentManager = new CommentManager();
    }
});

// Newsletter signup — wires up the form already present on about.html
// (previously decorative, with no submit handling at all) to insert
// into the `newsletter_signups` table.
class NewsletterManager {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.input = this.form.querySelector('.newsletter-input');
        this.button = this.form.querySelector('.newsletter-btn');
        if (!this.input || !this.button) return;

        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.subscribe();
        });

        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.subscribe();
            }
        });
    }

    async subscribe() {
        const email = this.input.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        this.button.disabled = true;

        const { error } = await supabaseClient
            .from('newsletter_signups')
            .insert({ email });

        this.button.disabled = false;

        if (error) {
            if (error.code === '23505') {
                this.showMessage("You're already subscribed!", 'success');
            } else {
                console.error('Newsletter signup failed:', error);
                this.showMessage('Something went wrong. Please try again.', 'error');
            }
            return;
        }

        this.input.value = '';
        this.showMessage('Subscribed! Thanks for joining.', 'success');
    }

    showMessage(message, type) {
        let messageEl = this.form.parentElement.querySelector('.newsletter-message');
        if (!messageEl) {
            messageEl = document.createElement('p');
            messageEl.className = 'newsletter-message';
            this.form.insertAdjacentElement('afterend', messageEl);
        }
        messageEl.textContent = message;
        messageEl.style.color = type === 'error' ? '#e53e3e' : '#38a169';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new NewsletterManager();
});
