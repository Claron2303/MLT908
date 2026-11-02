import React from 'react';
import './food-slides.css';
import './round-four-lesson.css';
import {FoodResilienceLearning} from './ResilienceLearning.jsx';

export default function RoundFourLesson({Icon,onComplete}){
 return <div className="round-four-lesson">
  <div className="lesson-topline"><span className="eyebrow">ROUND 3 COMPLETE - VIDEO LEARNING</span><span className="lesson-paused"><Icon name="clock" size={13}/>Activity paused</span></div>
  <h2 id="modal-title">Watch and reflect before your final round</h2>
  <p>Watch the video with your group. Choose one idea you would like to consider when planning your final city.</p>
  <div className="round-four-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/Wdc0y27Kk0o?si=KkMcxCyRkk5ktmR3" title="Learning video before Round 4" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>
  <p className="round-four-video-source">If the player does not load, <a href="https://www.youtube.com/watch?v=Wdc0y27Kk0o" target="_blank" rel="noreferrer">watch the video on YouTube</a>.</p>
  <section className="smart-farm-learning" aria-labelledby="smart-farm-title">
   <span className="eyebrow">LOCAL EXAMPLES - SMART FARMING</span>
   <h3 id="smart-farm-title">Growing more with limited space</h3>
   <p>The Straits Times features Singapore Aquaculture Technologies and Green Harvest, showing how technology supports local fish and vegetable production.</p>
   <div className="smart-farm-examples">
    <section><h4>Fish farming: use data to improve decisions</h4><p>Singapore Aquaculture Technologies combines digital systems, artificial intelligence and cloud-based data analysis to improve farming processes. Its approach also includes solar energy and closed-loop farming.</p></section>
    <section><h4>Vegetable farming: make better use of space</h4><p>Green Harvest uses an automated system that moves growing channels as vegetables develop. This helps use greenhouse space efficiently. Its irrigation system recirculates water and collects rainwater.</p></section>
   </div>
   <div className="smart-farm-connection"><h4>Connect this to your final city</h4><p>In Round 3, you explored producing more from each plot. These real farms show ways technology can support efficient local production. For Round 4, consider how to balance essential supply and imports with nature, recreation and community wellbeing.</p><p>Discuss: if you can meet more needs on less land, what would you use the remaining space for, and why?</p></div>
   <p className="smart-farm-sources">Read the <a href="https://www.straitstimes.com/singapore/sat-green-harvest-smart-farms-in-singapore-growing-fresher-fish-crunchy-vegetables" target="_blank" rel="noreferrer">Straits Times feature (branded content)</a>. Supporting sources: <a href="https://sat.com.sg/" target="_blank" rel="noreferrer">Singapore Aquaculture Technologies</a> and <a href="https://www.sfa.gov.sg/fromSGtoSG/farms/farm/Detail/green-harvest" target="_blank" rel="noreferrer">SFA on Green Harvest</a>.</p>
  </section>
  <FoodResilienceLearning/>
  <aside className="lesson-key-message"><Icon name="book" size={25}/><div><strong>DISCUSS WITH YOUR GROUP</strong><p>How would you combine the Three Food Baskets and Four National Taps to prepare for disruptions? Which ideas can you represent with farms, catchments and imports in Round 4, while leaving room for homes and community wellbeing?</p></div></aside>
  <button className="primary full" onClick={onComplete}>Continue to round 4 briefing<Icon name="arrow" size={17}/></button>
 </div>;
}
