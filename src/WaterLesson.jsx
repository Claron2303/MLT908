import React from 'react';
import './food-slides.css';
import './water-lesson.css';
import {WaterResilienceLearning} from './ResilienceLearning.jsx';

const VIDEO_URL='https://www.facebook.com/TheStraitsTimes/videos/10152927487352115/';
const EMBED_URL='https://www.facebook.com/plugins/video.php?height=420&href=https%3A%2F%2Fwww.facebook.com%2FTheStraitsTimes%2Fvideos%2F10152927487352115%2F&show_text=true&width=560&t=0';
export default function WaterLesson({Icon,onComplete}){
 return <div className="water-lesson">
  <div className="lesson-topline"><span className="eyebrow">ROUND 2 COMPLETE - CAN WE RELY ON IMPORTS?</span><span className="lesson-paused"><Icon name="clock" size={13}/>Activity paused</span></div>
  <h2 id="modal-title">Imports help. But are supplies always secure?</h2>
  <p>In Round 2, you could import food and water to meet your city needs. But being able to import a resource does not guarantee that its supply will always be reliable. Watch the video, then explore the Linggiu Reservoir case below.</p>
  <div className="water-video"><iframe src={EMBED_URL} width="560" height="535" title="The Straits Times video learning content" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen/></div>
  <p className="water-source">If the player does not load, <a href={VIDEO_URL} target="_blank" rel="noreferrer">open the video on Facebook</a>.</p>
  <section className="water-case" aria-labelledby="water-case-title">
   <span className="eyebrow">SEPTEMBER 2019 CASE STUDY</span>
   <h3 id="water-case-title">When dry weather puts water supplies under pressure</h3>
   <p>The Straits Times reported that dry weather pushed Linggiu Reservoir below half capacity in September 2019.</p>
   <ul>
    <li><strong>A falling reserve:</strong> Water levels fell from 72% at the start of 2019 to below 50% that September.</li>
    <li><strong>Why it matters:</strong> Linggiu releases water into the Johor River to support reliable water collection. Both Singapore and Johor draw water from the river.</li>
    <li><strong>Pressure during drought:</strong> Dry spells require more reservoir water to support river flows. If Linggiu runs too low, Singapore may be unable to draw its full water entitlement.</li>
   </ul>
   <p className="water-source">Read the <a href="https://www.straitstimes.com/singapore/environment/water-level-at-linggiu-reservoir-in-johor-falls-below-50-per-cent-due-to-dry" target="_blank" rel="noreferrer">Straits Times article</a> and <a href="https://isomer-user-content.by.gov.sg/23/7334ea9b-4f8d-437b-8ae5-188cd2fe6698/resources-parliamentary-replies-2017-2020.pdf" target="_blank" rel="noreferrer">official parliamentary context</a>. These figures describe the 2019 event.</p>
  </section>
  <WaterResilienceLearning/>
  <aside className="lesson-key-message"><Icon name="water" size={25}/><div><strong>KEY LEARNING: IMPORTS STILL LEAVE US VULNERABLE</strong><p>Importing food and water is feasible and helps us meet our needs. However, natural hazards such as drought can affect the places supplying those resources. The Linggiu Reservoir case shows how dry weather in Johor can put an important source of imported water under pressure. Food supplies can also be affected by drought, export restrictions, disease and supply-chain disruptions. Local farms remain vulnerable to extreme weather too.</p></div></aside>
  <section className="water-case" aria-labelledby="round-three-preparation"><h3 id="round-three-preparation">Take this thinking into Round 3</h3><p>How could you meet your city needs while reducing dependence on any one source? Discuss these questions with your group:</p><ul><li>Which resources did your city rely on imports for in Round 2?</li><li>What might happen if drought affected an overseas supplier?</li><li>How could local production, using resources efficiently and having different supply sources help your city prepare?</li></ul><p>In Round 3, farms, factories and water catchments produce 50% more per plot. Use this improvement to explore a balance of local supply and imports that makes better use of your limited land.</p></section>
  <button className="primary full" onClick={onComplete}>Continue to round 3 briefing<Icon name="arrow" size={17}/></button>
 </div>;
}
