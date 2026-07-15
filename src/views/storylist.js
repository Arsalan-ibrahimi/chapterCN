import React, { useState } from 'react';

// Mock data representing the books available in our bookshelf
const BOOK_DATABASE = {
  debt: {
    id: 'debt',
    title: 'Debt — The First\n5,000 Years',
    author: 'by David Graeber',
    coverBg: '#e64a33',
    coverLabelBg: '#e8e6e3',
    textColor: '#333',
    italicIntro: 'Diminutive rooms, grand possibilities. Small Homes, Grand Living shows how to make use of a limited space and turn a small apartment into a design marvel.',
    description: 'Here anthropologist David Graeber presents a stunning reversal of conventional wisdom: he shows that before there was money, there was debt. For more than 5,000 years, since the beginnings of the first agrarian empires, humans have used elaborate credit systems to buy and sell goods—that is, long before the invention of coins or cash.',
    specs: {
      editors: 'Gestalten',
      features: 'Full color, 256 pages',
      releaseDate: 'May 2017',
      language: 'English',
      format: '21 x 26 cm',
      isbn: '978-3-89955-698-8'
    },
    review: {
      initials: 'CR',
      reviewer: 'Christopher Reath',
      quote: '"I didn\'t really finish reading this book. I\'m not qualified to review this shit"'
    }
  },
  philosopher: {
    id: 'philosopher',
    title: "Harry Potter\nand the Philosopher's Stone",
    author: 'by J.K. Rowling',
    coverBg: '#5c1414',
    coverLabelBg: '#dfa32b',
    textColor: '#dfa32b',
    italicIntro: 'The boy who lived. Under the stairs, a magical journey begins that captivates minds and opens doors to a world hidden in plain sight.',
    description: 'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry\'s eleventh birthday, a great beetle-eyed giant of a man bursts in...',
    specs: {
      editors: 'Bloomsbury',
      features: 'Hardcover, 223 pages',
      releaseDate: 'June 1997',
      language: 'English',
      format: '13 x 20 cm',
      isbn: '978-0-7475-3269-9'
    },
    review: {
      initials: 'HP',
      reviewer: 'Harry Potter Enthusiast',
      quote: '"An absolute masterpiece of modern fantasy that defined a whole generation of readers."'
    }
  },
  chamber: {
    id: 'chamber',
    title: "Harry Potter\nand the Chamber of Secrets",
    author: 'by J.K. Rowling',
    coverBg: '#133930',
    coverLabelBg: '#95af97',
    textColor: '#95af97',
    italicIntro: 'Spiders, basilisks, and a diary of dark secrets. The sophomore year at Hogwarts brings whispers of ancient terror.',
    description: 'Harry Potter\'s summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and a rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors...',
    specs: {
      editors: 'Bloomsbury',
      features: 'Hardcover, 251 pages',
      releaseDate: 'July 1998',
      language: 'English',
      format: '13 x 20 cm',
      isbn: '978-0-7475-3849-3'
    },
    review: {
      initials: 'AD',
      reviewer: 'Albus D.',
      quote: '"It is our choices, Harry, that show what we truly are, far more than our abilities."'
    }
  },
  prisoner: {
    id: 'prisoner',
    title: "Harry Potter\nand the Prisoner of Azkaban",
    author: 'by J.K. Rowling',
    coverBg: '#0b203a',
    coverLabelBg: '#b2c8d2',
    textColor: '#b2c8d2',
    italicIntro: 'A fugitive on the loose, dementors at the gates, and secrets from the past waiting to be unleashed.',
    description: 'For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort. Now he has escaped, leaving only two clues as to where he might be headed...',
    specs: {
      editors: 'Bloomsbury',
      features: 'Hardcover, 317 pages',
      releaseDate: 'July 1999',
      language: 'English',
      format: '13 x 20 cm',
      isbn: '978-0-7475-4215-5'
    },
    review: {
      initials: 'SB',
      reviewer: 'Sirius Black',
      quote: '"The ones that love us never really leave us. You can always find them, in here."'
    }
  }
};

export default function BookListing() {
  const [activeBookId, setActiveBookId] = useState('debt');
  
  // Get the dataset for the currently selected book
  const currentBook = BOOK_DATABASE[activeBookId];

  // Inline styles
  const styles = {
    container: {
      fontFamily: '"Georgia", "Times New Roman", Times, serif',
      color: '#1a1a1a',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: "relative",
      top: "-5rem",
      boxSizing: 'border-box',
      zIndex: "10"
    },
    card: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 2fr 0.8fr',
      width: '100%',
      maxWidth: '90dvw',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden',
    },
    // Top floating nav items
    headerLeft: {
      position: 'absolute',
      top: '30px',
      left: '40px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
    },
    headerCenter: {
      position: 'absolute',
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '12px',
      color: '#666',
      letterSpacing: '1px',
    },
    headerRight: {
      position: 'absolute',
      top: '30px',
      right: '140px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      cursor: 'pointer',
    },
    // Left Column
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 40px 60px 40px',
      position: 'relative',
    },
    circleBackground: {
      position: 'absolute',
      width: '240px',
      height: '240px',
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
      zIndex: 1,
      top: '25%',
    },
    bookCoverLarge: {
      width: '180px',
      height: '270px',
      backgroundColor: currentBook.coverBg,
      color: currentBook.textColor,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      zIndex: 2,
      boxShadow: '15px 15px 30px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      transition: 'background-color 0.4s ease',
    },
    innerLabel: {
      backgroundColor: currentBook.coverLabelBg,
      color: '#333',
      width: '75%',
      height: '140px',
      padding: '12px',
      fontSize: '8px',
      textAlign: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
      transition: 'background-color 0.4s ease',
    },
    previewText: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '8px',
      letterSpacing: '1px',
      color: '#888',
      marginTop: '25px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      zIndex: 2,
    },
    // Center Column
    centerColumn: {
      padding: '100px 40px 60px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '32px',
      lineHeight: '1.15',
      margin: '0 0 8px 0',
      fontWeight: 'normal',
      whiteSpace: 'pre-line', // Allows custom linebreaks \n to render properly
    },
    author: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      color: '#000',
      textTransform: 'uppercase',
      margin: '0 0 30px 0',
    },
    italicIntro: {
      fontSize: '15px',
      lineHeight: '1.5',
      fontStyle: 'italic',
      color: '#333',
      margin: '0 0 20px 0',
    },
    description: {
      fontSize: '13px',
      lineHeight: '1.6',
      color: '#555',
      margin: '0 0 40px 0',
    },
    // Meta Specs Grid
    metaGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '40px',
      rowGap: '12px',
      borderTop: '1px solid #eee',
      borderBottom: '1px solid #eee',
      padding: '20px 0',
      marginBottom: '35px',
    },
    metaRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '11px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    metaLabel: {
      fontWeight: 'bold',
      color: '#111',
    },
    metaValue: {
      color: '#777',
      textAlign: 'right',
    },
    // Review Section
    reviewContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    reviewerProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '10px',
      fontWeight: 'bold',
    },
    reviewerMeta: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '11px',
      lineHeight: '1.3',
    },
    reviewQuote: {
      fontSize: '13px',
      fontStyle: 'italic',
      color: '#444',
      margin: 0,
      lineHeight: '1.4',
    },
    // Sidebar Navigation
    rightSidebar: {
      borderLeft: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    sidebarItemActive: {
      padding: '60px 20px 30px 20px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
    },
    activeIndicator: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '3px',
      backgroundColor: currentBook.coverBg,
      transition: 'background-color 0.4s ease',
    },
    sidebarItemInactive: {
      padding: '30px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderBottom: '1px solid #f0f0f0',
      transition: 'background-color 0.2s',
    },
    sidebarBookMini: {
      width: '55px',
      height: '80px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
    },
    sidebarTextActive: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '7px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '15px',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      lineHeight: '1.3',
    },
    verticalTab: {
      position: 'absolute',
      bottom: '100px',
      right: '15px',
      transform: 'rotate(-90deg)',
      transformOrigin: 'right bottom',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '9px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: '#222',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <article style={styles.card}>
        
        {/* Top Floating Headers */}
        <div style={styles.headerLeft}>gestalten</div>
        <div style={styles.headerCenter}>Book Listing</div>
        <div style={styles.headerRight}>View Cart</div>

        {/* Column 1: Book Visual Preview */}
        <section style={styles.leftColumn}>
          <div style={styles.circleBackground} />
          <div style={styles.bookCoverLarge}>
            <div style={styles.innerLabel}>
              <div style={{ letterSpacing: '1px', fontWeight: 'bold', fontSize: activeBookId === 'debt' ? '8px' : '6px' }}>
                {activeBookId === 'debt' ? 'DEBT' : 'HARRY'}
              </div>
              <div style={{ fontSize: '5px', color: '#666', margin: '4px 0' }}>
                {activeBookId === 'debt' ? 'THE FIRST\n5,000 YEARS' : 'POTTER'}
              </div>
              <div style={{ fontSize: '5px', fontWeight: 'bold', borderTop: '1px solid #aaa', paddingTop: '4px', marginTop: 'auto' }}>
                {activeBookId === 'debt' ? 'DAVID GRAEBER' : 'J.K. ROWLING'}
              </div>
            </div>
          </div>
          <span style={styles.previewText}>Click for Preview</span>
        </section>

        {/* Column 2: Book Editorial & Details */}
        <section style={styles.centerColumn}>
          <h1 style={styles.title}>{currentBook.title}</h1>
          <p style={styles.author}>{currentBook.author}</p>

          <p style={styles.italicIntro}>{currentBook.italicIntro}</p>
          <p style={styles.description}>{currentBook.description}</p>

          {/* Product Specs Table */}
          <div style={styles.metaGrid}>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Editors</span>
              <span style={styles.metaValue}>{currentBook.specs.editors}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Features</span>
              <span style={styles.metaValue}>{currentBook.specs.features}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Release Date</span>
              <span style={styles.metaValue}>{currentBook.specs.releaseDate}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Language</span>
              <span style={styles.metaValue}>{currentBook.specs.language}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Format</span>
              <span style={styles.metaValue}>{currentBook.specs.format}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>ISBN</span>
              <span style={styles.metaValue}>{currentBook.specs.isbn}</span>
            </div>
          </div>

          {/* User Review */}
          <div style={styles.reviewContainer}>
            <div style={styles.reviewerProfile}>
              <div style={styles.avatar}>{currentBook.review.initials}</div>
              <div style={styles.reviewerMeta}>
                <div style={{ fontWeight: 'bold' }}>Reviewed By</div>
                <div style={{ color: '#666' }}>{currentBook.review.reviewer}</div>
              </div>
            </div>
            <p style={styles.reviewQuote}>{currentBook.review.quote}</p>
          </div>
        </section>

        {/* Column 3: Sidebar Bookshelf */}
        <aside style={styles.rightSidebar}>
          
          {Object.keys(BOOK_DATABASE).map((bookId) => {
            const book = BOOK_DATABASE[bookId];
            const isActive = activeBookId === bookId;

            if (isActive) {
              return (
                <div 
                  key={bookId}
                  style={styles.sidebarItemActive}
                  onClick={() => setActiveBookId(bookId)}
                >
                  <div style={styles.activeIndicator} />
                  <div style={{
                    ...styles.sidebarBookMini, 
                    backgroundColor: book.coverBg, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '5px', 
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      backgroundColor: book.coverLabelBg, 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-around', 
                      alignItems: 'center', 
                      padding: '2px'
                    }}>
                      <span style={{fontSize: '3px', fontWeight: 'bold'}}>{bookId === 'debt' ? 'DEBT' : 'HARRY'}</span>
                      <span style={{fontSize: '2px', color: '#666'}}>{bookId === 'debt' ? '5,000 YEARS' : 'POTTER'}</span>
                    </div>
                  </div>
                  <span style={styles.sidebarTextActive}>
                    {bookId === 'debt' ? 'Debt — The First\n5,000 Years' : `HARRY POTTER`}
                  </span>
                </div>
              );
            }

            // Inactive styles
            return (
              <div 
                key={bookId}
                style={styles.sidebarItemInactive}
                onClick={() => setActiveBookId(bookId)}
              >
                <div style={{
                  ...styles.sidebarBookMini, 
                  backgroundColor: book.coverBg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: book.textColor, 
                    fontSize: '6px', 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif', 
                    textAlign: 'center'
                  }}>
                    {bookId === 'debt' ? 'DEBT' : 'HARRY\nPOTTER'}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Vertical Expand Label */}
          <div style={styles.verticalTab}>
            Expand Bookshelf
          </div>
        </aside>

      </article>
    </div>
  );
}