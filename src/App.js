import './App.css';
import './index.css';
import Headline from './components/Headline';
import HorizontalScroll from './components/HorizontalScroll';
import BySex from './components/BySex';
import ByIsland from './components/ByIsland';

function App() {
  return (
    <div>
      <Headline title="Does age really matter?" dek="Over half of the candidates for Philippines' House of Representatives are over 55 years old, the median age. Analysts say it's a reflection of the grip political dynasties in politics." />

      <section style={{ height: '100vh' }}>
        <HorizontalScroll />
      </section>

      {/* Vertical content section */}
      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>
        <div className='BodyText'>
          <p>Either way, analysts said the age composition of those sitting at the current Lower House, and people running to replace them, reveal an inconvenient truth: a limited pool of options for voters and a strong grip of political dynasties in Philippine politics.</p>
        </div>

        <div className='BodyText'>
          <p>"Conventional thinking would point to age as a factor," said Michael Henry Yusingco, a senior research fellow at the Ateneo Policy Center, a think tank. "Public office is generally seen as a job for mature persons. And the default measure for maturity is age."</p>
        </div>

        <div className='BodyText'>
          <p>Topline data show that the median age of candidates for district representatives this year is at 55 years old, higher than the current median age of 51 for the current members of the House.</p>
        </div>

        <div className='BodyText'>
          <p>That said, the data begins to be subject to other influences the moment you drill deeper into it. For instance, in Mindanao, the median age of 51.7 years old is a little lower than the rest of archipelago. A closer look will show, however, that while there are younger House candidates in the island, many of them are running unopposed in their districts, helping pull down the median age.</p>
        </div>

        <div className='BodyText'>
          <p>In cases when the field is more competitive, the question becomes who the competition is. Large cities such as Cebu and Davao, which stand as their own legislative districts, tend to have more candidates for district representatives. But many come from the same political families that used to govern the area.</p>
        </div>

      </section>

      <section style={{
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
      }}>
        <div className='ChartText'>
          <h3>Mindanao House candidates are slightly younger than rest of the country</h3>
          <p>Median age of candidates for district representatives in 2025 elections</p>
        </div>

      </section>
      <ByIsland
      />

      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>

        <div className='BodyText'>
          <p>This is a situation when having younger candidates for public office may "probably not be a good thing," Yusingco said. For instance, Augusto Javier Campos III, 32, of the Garcia clan and Omar Vincent Duterte, 30, grandson of former president Rodrigo Duterte, are both running for the second district of Davao City. The Philippine Center for Investigative Journalism has found that <a href="https://pcij.org/2025/01/26/113-out-of-149-philippine-cities-also-ruled-by-political-dynasties/" target='_blank'>113 of 149 Philippine cities</a> are ruled by a political dynasty.</p>
        </div>

        <div className='BodyText'>
          <p>"Dynastic youth candidates running for office just cements the domination of political dynasties over politics and governance," Yusingco said.</p>
        </div>

        <div className='BodyText'>
          <p>The Constitution prohibits political dynasties, but the Supreme Court, in cases lodged before it to implement the charter provision, had consistently ruled that an enabling law is needed to enforce it. Bills filed to define and enforce the ban against political dynasties have languished in Congress for decades.</p>
        </div>

        <div className='BodyText'>
          <p>Age, therefore, likely only have little influence on policymaking when weighed against familial ties in public office, Anthony Lawrence Borja, a political scientist at De La Salle University, said.</p>
        </div>

        <div className='BodyText'>
          <p>However, that does not mean the impact is nil. For instance, Borja said having young people in politics can help sway government decisions which may tend to "ensure conservatism— may it be right-wing or left-wing" persists. "They can easily outvote and dominate younger representatives in the same way that they can easily dismiss movements that offend their crystallized opinions," he explained.</p>
        </div>


        </section>

      <section style={{
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '930px',
      }}>

        <div className='ChartText'>
          <h3>More male than female candidates for the House of Representatives</h3>
          <p>Age distribution, by sex</p>
        </div>

      </section>
      <BySex />

      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>

        <div className='BodyText'>
          <p>Yusingco cited the case of Pasig Mayor Vico Sotto as an example of a young politician, which successfully branded himself apart from his familial ties in government service. "But [he] is the only exception I'm aware of," he said.</p>
        </div>

        <div className='BodyText'>
          <p>By sex, Comelec data showed the median age of male and female candidates also does not differ that much at 56 and 51 years, respectively.</p>
        </div>

      </section>
    </div>
  );
}

export default App;
