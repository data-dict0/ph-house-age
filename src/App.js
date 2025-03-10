import './App.css';
import './index.css';
import Headline from './components/Headline';
import HorizontalScroll from './components/HorizontalScroll';
import BySex from './components/BySex';
import ByMunicipality from './components/ByMunicipality';
import Parliament from './components/Parliament';
import ChartHead from './components/ChartHead';
import PoliticalDynasty from './components/PoliticalDynasty';

function App() {
  return (
    <div>
      <Headline title="Does age matter in Philippine elections?" dek="Over half of the candidates for Philippines' House of Representatives are over 55 years old, the median age. Analysts say it's a reflection of the grip political dynasties in politics." />


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
          <p>The median age of candidates for district representatives this year is at 55 years old, higher than the current median age of 51 for the current members of the House, our analysis showed. These numbers are generally comparable to most countries in the region, including Indonesia (51.6 years) and Thailand (50.9 years), according to Geneva-based Inter-Parliamentary Union that tracks parliaments and congresses.</p>
        </div>

      </section>



        <ChartHead ChartHeader="Philippine House lawmakers are in the middle of the pack in the region" ChartSubhead="Average age of lawmakers of current lower houses of congress and unicameral parliaments" />

      <Parliament
      />
      <div id='CaptionContainer'>
          <p>Note: Data as of February 2025.<br></br>Source: Inter-Parliamentary Union</p>
      </div>

      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>

        <div className='BodyText'>
          <p>Broken down however, some discrepancies across locations can be seen. For instance, Mindanao tends to have slightly younger candidates for representatives than most of the archipelago, at 51.7 years old. However, part of why this is the case, is many candidates running unopposed, helping pull down the median age.</p>
        </div>

        <div className='BodyText'>
          <p>At the very basic level, areas with more congressional districts tend to have a larger pool of candidates coming from various ages. Bulacan, where there are six districts, have candidates aged between 25 and 83. Cavite, with eight districts, have candidates aged 26 to 74.</p>
        </div>

        <div className='BodyText'>
          <p>In cases when the field is more competitive however, the question becomes who the competition is. Yusingco said a candidate's age alone barely have any bearing on its own, especially when candidates from various ages come from the same political family.</p>
        </div>

        <div className='BodyText'>
          <p>"I think if it's non-dynastic young candidates who are running for office, then I would say that is a good development for our politics and governance. But if it's a young dynastic candidate running, then it's probably not a good thing," he said.</p>
        </div>

        <div className='BodyText'>
          <p>"Dynastic youth candidates running for office just cements the domination of political dynasties over politics and governance," he added.</p>
        </div>


      </section>


<ChartHead ChartHeader="More candidates for the House, but not necessarily younger" ChartSubhead="Number of candidates for district representatives and their median age in select provinces for 2025 elections" />


      <ByMunicipality
      />
        <div id='CaptionContainer'>
          <div className='Caption'>
          <p>Note: Data based on all legislative districts of each province or city.<br></br>Source: Author's analysis of Comelec data</p>
      </div>
      </div>

      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>

        <div className='BodyText'>
          <p>Political dynasties are a fixture of Philippine politics even if the Constitution prohibits it. Part of the problem is the Supreme Court had consistently ruled that the charter provision is not enforceable without an enabling law. Bills to define and enforce the ban against political dynasties have languished in Congress for decades, and under the current congress, fewer bills had been filed to that effect.</p>
        </div>

        <div className='BodyText'>
          <p>In a report last January, the Philippine Center for Investigative Journalism has found that <a href="https://pcij.org/2025/01/26/113-out-of-149-philippine-cities-also-ruled-by-political-dynasties/" target="_blank">113 of 149 Philippine cities</a> are ruled by a political dynasty, which they defined as when relatives of current public officials run for public office in the same location.</p>
        </div>

        <div className='BodyText'>
          <p>At the House race this year, many examples stand out. In Davao, Augusto Javier Campos III, 32, of the Garcia clan and Omar Vincent Duterte, 30, grandson of former president Rodrigo Duterte, are both running for representation of the second district.</p>
        </div>

      </section>


<ChartHead ChartHeader="The number of anti-political dynasty bills in Congress has declined" ChartSubhead="Numerous measures to ban political dynasties have been filed and refiled at the House of Representatives through the years. None have gone beyond the first approval. " />

      <PoliticalDynasty />

      <div id='CaptionContainer'>
          <p>Note: Data includes individual bills filed against political dynasties. Bills that were substituted from the original or combined as one are counted separately.<br></br>Source: House of Representatives </p>
      </div>

      <section style={{
        position: 'relative',
        padding: '0.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
        zIndex: 2
      }}>

        <div className='BodyText'>
          <p>These familial relationships, in turn, dilute what anecdotally is a more liberal sway that younger politicians may have on policymaking, Anthony Lawrence Borja, a political scientist at De La Salle University. Bills meant to expand reproductive health, prohibit gender discrimination and institutionalize marriage equality have all struggled to gain traction in Congress.</p>
        </div>

        <div className='BodyText'>
          <p>"Old people in legislative positions ensure that conservatism of all sorts (may it be right-wing or left-wing) would rule policy making. They can easily outvote and dominate younger representatives in the same way that they can easily dismiss movements that offend their crystallized opinions," Borja explained.</p>
        </div>

        <div className='BodyText'>
          <p>"We can't teach old dogs new tricks and it's difficult to make old legislators advocate for radically new policies even if such are necessary for public welfare," he added.</p>
        </div>
      </section>


<ChartHead ChartHeader="More male than female candidates for the House of Representatives" ChartSubhead="Age distribution, by sex" />

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
          <p>By sex, Comelec data showed the median age of male and female candidates does not differ that much at 56 and 51 years, respectively. Most women candidates, including six of the 10 youngest candidates, are based in Mindanao.</p>
        </div>

        <div className='BodyText'>
          <p>Yusingco said an “non-dynastic” politician is an exception rather than the rule and so far, he can only think of one that epitomizes that in local politics.</p>
        </div>

        <div className='BodyText'>
          <p>"[Pasig] Mayor Vico Sotto is the only exception to this rule that I'm aware of," he said. <strong><em>Prinz Magtulis</em></strong></p>
        </div>
        <br></br>


        <div className='BodyText'>
        <p><strong>Sources</strong></p>
        <p>Author's research, Inter-Parliamentary Union, Philippine House of Representatives</p>
        <br></br>
        <em> Copyright 2025 - The
          <a href="https://www.data-dict.com" target="_blank"
            > Data Dictionary</a> Project
        </em>
      </div>


      </section>



    </div>
  );
}

export default App;
