-- Seed data: migrates the 50 books that used to be hand-typed into both
-- books.html and the bookData array in js/script.js into the `books`
-- table. Run this once, after schema.sql, in the Supabase SQL Editor.
--
-- Most affiliate_link values are still the placeholder "https://amazon.com"
-- from the original site — replace them with real Amazon Associate links
-- (or other retailer links) from the Table Editor once you have them.

insert into books (title, author, image_url, description, genre, affiliate_link) values
-- Romance
('Does It Hurt', 'Carlton', 'images/download (5).jfif', 'A steamy romance that explores the complexities of love, desire, and the pain that sometimes comes with both.', 'Romance', 'https://www.amazon.com/Does-Hurt-H-D-Carlton-ebook/dp/B09PKTYKGZ'),
('November 9', 'Colleen Hoover', 'images/download (6).jfif', 'A heart-wrenching story about Fallon and Ben who meet on the same day every year, exploring themes of love, loss, and second chances.', 'Romance', 'https://amazon.com'),
('Throne of Glass', 'Sarah J. Maas', 'images/download (7).jfif', 'An epic fantasy romance following Celaena Sardothien, an assassin who must compete in a deadly tournament to win her freedom.', 'Romance', 'https://amazon.com'),
('Ugly Love', 'Colleen Hoover', 'images/download (8).jfif', 'A raw and emotional story about Tate Collins and Miles Archer, exploring the complexities of love, pain, and healing.', 'Romance', 'https://amazon.com'),
('Pretend You''re Mine', 'Lucy Score', 'images/download (9).jfif', 'A charming small-town romance about Harper and Luke, who enter into a fake relationship that becomes all too real.', 'Romance', 'https://amazon.com'),

-- Fantasy
('Fourth Wing', 'Rebecca Yarros', 'images/download (10).jfif', 'An epic fantasy about Violet Sorrengail who must survive the deadly war college for dragon riders, where only the strongest survive.', 'Fantasy', 'https://amazon.com'),
('A Court of Thorns and Roses', 'Sarah J. Maas', 'images/download (11).jfif', 'A captivating fantasy romance following Feyre Archeron as she''s drawn into the dangerous world of the Fae courts.', 'Fantasy', 'https://amazon.com'),
('One Dark Window', 'Rachel Gillig', 'images/download (13).jfif', 'A dark fantasy about Elspeth Spindle who must use her dangerous magic to save her kingdom from a mysterious plague.', 'Fantasy', 'https://amazon.com'),
('Red Rising', 'Pierce Brown', 'images/download (14).jfif', 'A science fiction fantasy about Darrow, a Red miner who infiltrates the Gold ruling class to bring down their oppressive society.', 'Fantasy', 'https://amazon.com'),
('Crescent City', 'Sarah J. Maas', 'images/download (15).jfif', 'A modern fantasy about Bryce Quinlan who must solve her best friend''s murder in a world where humans and supernatural beings coexist.', 'Fantasy', 'https://amazon.com'),

-- Young Adult
('Cinder', 'Marissa Meyer', 'images/download (16).jfif', 'A futuristic retelling of Cinderella featuring Cinder, a cyborg mechanic who becomes entangled in an intergalactic struggle.', 'Young Adult', 'https://amazon.com'),
('A Good Girl''s Guide to Murder', 'Holly Jackson', 'images/download (17).jfif', 'Pip Fitz-Amobi investigates a closed murder case for her senior project, uncovering secrets that someone wants to keep hidden.', 'Young Adult', 'https://amazon.com'),
('Ash Princess', 'Laura Sebastian', 'images/download (18).jfif', 'Theodosia, the Ash Princess, must reclaim her throne and free her people from the Kaiser''s brutal rule.', 'Young Adult', 'https://amazon.com'),
('Better Than the Movies', 'Lynn Painter', 'images/download (19).jfif', 'Liz Buxbaum enlists her annoying neighbor Wes to help her get the attention of her longtime crush in this charming rom-com.', 'Young Adult', 'https://amazon.com'),
('The Book Thief', 'Markus Zusak', 'images/the-book-thief.jpg', 'Set in Nazi Germany, this novel follows Liesel Meminger, a young girl who steals books and shares them with others during World War II.', 'Young Adult', 'https://amazon.com'),

-- Mystery
('One of the Girls', 'Lucy Clarke', 'images/download (21).jfif', 'A gripping mystery about a group of friends on a hen weekend that takes a dark turn when one of them goes missing.', 'Mystery', 'https://amazon.com'),
('The Housemaid', 'Freida McFadden', 'images/download (22).jfif', 'A psychological thriller about a housemaid who discovers dark secrets about the family she works for, leading to a web of lies and deception.', 'Mystery', 'https://amazon.com'),
('The Collective', 'Alison Gaylin', 'images/download (23).jfif', 'A chilling mystery about a secret group of mothers who take justice into their own hands when the system fails their children.', 'Mystery', 'https://amazon.com'),
('Behind Her Eyes', 'Sarah Pinborough', 'images/download (24).jfif', 'A twisted psychological thriller about a single mother who becomes entangled in a dangerous relationship with her boss and his wife.', 'Mystery', 'https://amazon.com'),
('The Guest List', 'Lucy Foley', 'images/download (25).jfif', 'A murder mystery set on a remote island during a wedding celebration, where everyone has secrets and someone is willing to kill to keep them.', 'Mystery', 'https://amazon.com'),

-- Thriller
('Rock, Paper, Scissors', 'Alice Feeney', 'images/download (26).jfif', 'A psychological thriller about a couple''s anniversary trip that turns deadly when they discover they don''t know each other as well as they thought.', 'Thriller', 'https://amazon.com'),
('Never Lie', 'Freida McFadden', 'images/download (27).jfif', 'A gripping thriller about a couple who buy a house with a dark past, only to discover that the previous owner''s secrets are still very much alive.', 'Thriller', 'https://amazon.com'),
('Where the Crawdads Sing', 'Delia Owens', 'images/download (28).jfif', 'A haunting mystery about Kya Clark, the ''Marsh Girl,'' who becomes the prime suspect in a murder case in her small North Carolina town.', 'Thriller', 'https://amazon.com'),
('The Silent Patient', 'Alex Michaelides', 'images/download (29).jfif', 'A psychological thriller about a woman who refuses to speak after allegedly murdering her husband, and the psychotherapist determined to understand why.', 'Thriller', 'https://amazon.com'),
('Gone Girl', 'Gillian Flynn', 'images/download (30).jfif', 'On the morning of their fifth wedding anniversary, Nick''s wife Amy disappears. Under mounting pressure from the police and the media, Nick begins to lie and behave strangely.', 'Thriller', 'https://amazon.com'),

-- Science Fiction
('The Space Between Worlds', 'M. Johnson', 'images/download (31).jfif', 'A multiverse thriller about Cara, who can travel between parallel worlds but only to versions of Earth where she''s already dead.', 'Science Fiction', 'https://amazon.com'),
('The Three Body Problem', 'Liu Cixin', 'images/download (32).jfif', 'A groundbreaking science fiction novel about humanity''s first contact with an alien civilization and the complex physics that govern their world.', 'Science Fiction', 'https://amazon.com'),
('The Sparrow', 'Mary Doria Russell', 'images/download (33).jfif', 'A profound exploration of first contact, faith, and the consequences of cultural misunderstanding when humans encounter an alien civilization.', 'Science Fiction', 'https://amazon.com'),
('Good Morning, Midnight', 'Lily Brooks-Dalton', 'images/download (34).jfif', 'A post-apocalyptic novel about an aging astronomer and a young woman who may be the last people on Earth, exploring themes of isolation and connection.', 'Science Fiction', 'https://amazon.com'),
('Project Hail Mary', 'Andy Weir', 'images/download (35).jfif', 'A thrilling space adventure about a lone astronaut who must save humanity from extinction using science, ingenuity, and an unlikely friendship.', 'Science Fiction', 'https://amazon.com'),

-- Historical Fiction
('Outlander', 'Diana Gabaldon', 'images/download (36).jfif', 'An epic time-travel romance following Claire Randall, a WWII nurse who is mysteriously transported to 18th-century Scotland.', 'Historical Fiction', 'https://amazon.com'),
('The Book of Lost Names', 'Kristin Harmel', 'images/download (37).jfif', 'A moving story about a woman who helped forge documents for Jewish children during WWII and must confront her past decades later.', 'Historical Fiction', 'https://amazon.com'),
('The Winemaker''s Wife', 'Kristin Harmel', 'images/download (38).jfif', 'A dual-timeline story set in Champagne, France, exploring love, betrayal, and survival during WWII and its aftermath.', 'Historical Fiction', 'https://amazon.com'),
('The Island of Sea Women', 'Lisa See', 'images/download (39).jfif', 'A powerful novel about the haenyeo, the diving women of Jeju Island, and their friendship that spans decades of Korean history.', 'Historical Fiction', 'https://amazon.com'),
('The Four Winds', 'Kristin Hannah', 'images/download (40).jfif', 'A sweeping story of one woman''s courage during the Great Depression and the Dust Bowl, exploring themes of family, survival, and hope.', 'Historical Fiction', 'https://amazon.com'),

-- Self-Help
('The New Psycho-Cybernetics', 'Maxwell Maltz', 'images/download (41).jfif', 'A classic guide to self-image psychology and how to program your mind for success, happiness, and personal achievement.', 'Self-Help', 'https://amazon.com'),
('The Way of Integrity', 'Martha Beck', 'images/download (42).jfif', 'A transformative guide to finding your authentic self and living a life aligned with your deepest values and purpose.', 'Self-Help', 'https://amazon.com'),
('The Power of Your Subconscious Mind', 'Joseph Murphy', 'images/download (43).jfif', 'An exploration of how to harness the incredible power of your subconscious mind to achieve your goals and transform your life.', 'Self-Help', 'https://amazon.com'),
('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'images/download (44).jfif', 'A counterintuitive approach to living a good life, focusing on what truly matters and letting go of what doesn''t.', 'Self-Help', 'https://amazon.com'),
('How to Win Friends and Influence People', 'Dale Carnegie', 'images/download (45).jfif', 'The timeless classic on human relations, offering practical advice for building meaningful connections and achieving success through others.', 'Self-Help', 'https://amazon.com'),

-- African Literature
('No Longer at Ease', 'Chinua Achebe', 'images/download (46).jfif', 'A powerful novel about Obi Okonkwo, a young Nigerian who returns from England to face the challenges of corruption and cultural conflict in post-colonial Nigeria.', 'African Literature', 'https://amazon.com'),
('Beasts Made of Night', 'Tochi Onyebuchi', 'images/download (47).jfif', 'A young adult fantasy about Taj, a sin-eater who consumes the sins of others, and his journey to uncover the truth about his world.', 'African Literature', 'https://amazon.com'),
('Second Class Citizen', 'Buchi Emecheta', 'images/download (48).jfif', 'A powerful story about Adah, a Nigerian woman who immigrates to London and faces the challenges of racism, sexism, and cultural displacement.', 'African Literature', 'https://amazon.com'),
('Children of Anguish and Anarchy', 'Tomi Adeyemi', 'images/download (49).jfif', 'The final book in the Legacy of Orisha trilogy, following Zelie as she fights to restore magic to her kingdom and save her people.', 'African Literature', 'https://amazon.com'),
('Crooked Seeds', 'Karen Jennings', 'images/download (50).jfif', 'A haunting novel about Deidre van Deventer, who returns to her family farm in South Africa to confront the ghosts of apartheid and her own past.', 'African Literature', 'https://amazon.com'),

-- Christian Fiction
('Redeeming Love', 'Francine Rivers', 'images/download (51).jfif', 'A powerful retelling of the biblical story of Hosea, set in California''s gold country, exploring themes of love, forgiveness, and redemption.', 'Christian Fiction', 'https://amazon.com'),
('At Home in Mitford', 'Jan Karon', 'images/download (52).jfif', 'The first book in the beloved Mitford series, following Father Tim, a small-town priest, and the charming residents of Mitford.', 'Christian Fiction', 'https://amazon.com'),
('When Crickets Cry', 'Charles Martin', 'images/download (53).jfif', 'A touching story about a heart surgeon and a young girl in need of a transplant, exploring themes of faith, hope, and second chances.', 'Christian Fiction', 'https://amazon.com'),
('The Mark of the Lion', 'Francine Rivers', 'images/download (54).jfif', 'An epic historical novel set in ancient Rome, following Hadassah, a young Christian slave, and her journey of faith and courage.', 'Christian Fiction', 'https://amazon.com'),
('There You''ll Find Me', 'Jenny B. Jones', 'images/download (55).jfif', 'A contemporary young adult novel about Finley, who travels to Ireland to find herself and discovers love, faith, and healing along the way.', 'Christian Fiction', 'https://amazon.com');
