import React, { useState } from 'react';

export default function DocumentEditor() {
  const [activeTab, setActiveTab] = useState('Tab 1');

  let chapterOne = `The Detective 
The room stank of cheap beer, smoke and leather. The sun had gone down moments before the litter market next to the hotel I was in came alive with chattering and hustling gun-slingers. This was no ordinary town, the air was tense, disdain, dark and disease-infested.  When I arrived at this godforsaken town earlier this afternoon, I saw the alleyways hiding vigilant eyes, a faction of mobs spread out scouring every corner watching my wagon pull up to the hotel. I am certain that my news of arrival sent out words to all parties in town and let's say crime investigators are not as preferable here. On this not-so fortunate opportunity, I wrote to my supervisor in New York about my assignment to the homicide case. This was rather a death certificate, signed and agreed upon that I had it coming if things went south. Why agree to such a task? I would question it if this was my first time. 
I had to meet a raven at the hotel. Ravens are informants who, for the most parts, worked for the federal police. Trusting them, well that is something out of the question. Ravens often play on both sides, feeding information where they see fit and profitable. I had to still meet him, wrong or right the information would give me a direction. It is easier to find a way when you know you are the wrong one, getting a lead from this informant would be a misleading one is that is what I am starting with. It was about time, I waited for a knock but it never did. It was past time – two hours late. He wasn’t here, he was probably stabbed to death for agreeing to meet me, abducted, buried in the desert or he was just playing at it. Nonetheless, I sat and I waited. Quarter to three in the morning, I heard muffled footsteps and it stopped at the doorstep. The door knob turned and the door opened revealing a short heighted figure with a long-overcoat, belt tied on the waist and a revolver underneath it which was clearly visible. He carefully walked in.
“Took you long enough” I sighed.
“You have the whole town watching your ass, don’t go around blaming me for watching mine.” the raven replied, “ Least you could do was wear a disguise, sneak in without all the fuss!”. 
He was right. I could have been more careful, like him. Only way to live to see another day. “I only sent out the word before my arrival because I knew it. I knew the parties involved in the homicide would come to know. And with you here, I know this too that you are now part of the game. So, with all things considered, we all know whose cards are on the table.” It wasn’t an answer he expected but he nodded. 
“Everything you need to know is in this parchment.” he handed it out, “The only suspect you need to question is the victim's mistress. Dr. Pettinson. She was seen last with Mr. Folias before he was murdered.”
Knowing how he was murdered I asked, “how was he killed?”.
“Shot through the heart, eyes picked out and face smashed in” the raven answered, studying my face. “Hell of a job if you ask me, seems extra. A bullet through the heart suffices.”
“Indeed!” I knew he was stirring it in a particular direction. “I will see you when I have met with the mistress”.

“I hope not.” 

he left.
`;

let chapterTwo =   `Holding her soft hands, the slender fingers curled around his and dripping blood made its way through his hands onto the floor. The mistress was dying in his hands, and for once the detective had sought to reverse time. Only for his despair, it was a mere wish.

There was much to look for in this situation he had found himself in. A repeated event, a recurring mistake on his watch and another guilt to haunt him. There is a strange feeling boiling in his gut, it could be the smell of blood or the overwhelming sense of rising tension. He now had a dead body, a  situation and a heart for which he had control less over. The detective found himself falling for her, falling a thousand folds into the fabric of love and despair. There was a keen force to which he was drawn. Her eyes, weakening, with the dying light in them, left a void in his purpose for life. For a moment, the world shifted beneath his feet as he stumbled upon another lost battle. And just like that, the detective found himself in Love. In love, with the dead women lying in his arms. A woman of convicted murder. A woman he had to investigate,
Years prior to this incident, another woman had died in his arms. Though not of an inflicted wound but a rare disease. That was his wife, for 10 years, and he almost felt ashamed when he recalled no feeling as such for his wife. During this time, he could nearly forget she ever existed. Why this strange sensation for a stranger?
`;


  return (
    <div style={styles.container}>
     
     

      {/* Main Workspace Area */}
      <main style={styles.workspace}>
        {/* The Page Document */}
        <div style={styles.documentPage}>
          {/* Editor Insertion Pills / Floating Chips */}
          <div style={styles.chipRow}>
        The Flower Dream

1900s - Crime romance
The fourteen petals of a Rose 
       
          </div>
          
        </div>

           <div style={styles.documentPage}>
          {/* Editor Insertion Pills / Floating Chips */}
          <div style={styles.chipRow}>
        {chapterOne}
       
          </div>
          
        </div>

         <div style={styles.documentPage}>
          {/* Editor Insertion Pills / Floating Chips */}
          <div style={styles.chipRow}>
        {chapterTwo}
       
          </div>
          
        </div>
      </main>
    </div>
  );
}

// Inline Styles Object
const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f9fbfd',
    color: '#1f1f1f',
    overflow: 'scroll',
    margin: 0,
    boxSizing: 'border-box',
  },
  workspace: {
 
    padding: '24px',
    margin: 'auto',
    justifyContent: 'center',
    overflowY: 'scroll',
  },
  documentPage: {
    width: '100%',
    maxWidth: '816px', // Standard letter width equivalent 
    minHeight: '1056px',
   
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    padding: '72px 96px', // Standard 1-inch margins
    boxSizing: 'border-box',
  },
  chipRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cursor: {
    width: '1.5px',
    height: '22px',
    backgroundColor: '#000000',
    animation: 'blink 1s step-end infinite',
    marginRight: '12px',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    border: '1px solid transparent',
    borderRadius: '100px',
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#3c4043',
    cursor: 'pointer',
    transition: 'background-color 0.15s, box-shadow 0.15s',
    outline: 'none',
  },
};