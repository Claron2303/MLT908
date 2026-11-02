import React, {useEffect,useRef} from 'react';
import './food-slides.css';

const SLIDES = [
  {
    title: "Why Can’t Singapore Rely Fully on Local Food Production?",
    subtitle: 'Food and water compete with homes, industry and other essential land uses.',
    sections: [
      {title:'Limited Land Space',icon:'grid',points:['Singapore is a small country with limited land available for farming.','Land is also needed for housing, schools, roads, industry and water catchments. Expanding one use leaves less space for another.']},
      {title:'Limited Natural Resources',icon:'water',points:['Singapore has limited agricultural land and freshwater resources.','Farming also needs water, energy and workers. Local production faces resource constraints as well as limited land.']},
      {title:'Limited Food Production',icon:'food',points:['Local farms produce vegetables, eggs and fish and provide a buffer during overseas supply disruptions. They cannot meet all food needs alone.','Local farms can also be disrupted by storms, disease and equipment failures. Technology and contingency plans help manage these risks.']}
    ],
    message:'Limited land, water and farming capacity mean local production alone cannot meet all food needs. Food resilience combines local production with reliable, diverse supply sources.'
  },
  {
    title:'Why Does Singapore Need to Import Food?',
    videoId:'ymnKixyz3-c',
    subtitle:'Local production and global connections work together.',
    sections: [
      {title:'Ensure Sufficient Food Supply',icon:'food',points:['Singapore imports more than 90% of its food from overseas.','Imports complement local production, but export restrictions, disease outbreaks and transport disruptions can affect availability and prices.']},
      {title:'Provide a Greater Variety of Food',icon:'globe',points:['Importing allows Singaporeans to enjoy different types of food, including rice, meat, fruits and vegetables.','Some foods cannot be grown or produced locally in sufficient quantities.']},
      {title:'Strengthen Food Security',icon:'leaf',points:['Importing food from different countries reduces Singapore’s dependence on any single source.','Diversify sources and maintain local production so a disruption in one country does not leave Singapore dependent on that source alone.']}
    ],
    message:'By combining local food production with imports from different countries, Singapore can maintain a stable, sufficient and diverse food supply.'
  }
];

export default function FoodSlides({slide=0,onNavigate,onComplete,Icon}){
  const index=Math.max(0,Math.min(SLIDES.length-1,slide));
  const content=SLIDES[index];
  const heading=useRef(null);
  useEffect(()=>{heading.current?.focus();heading.current?.closest('.modal')?.scrollTo({top:0});},[index]);
  return <div className="food-slides" onKeyDown={e=>{
    if(e.key==='ArrowLeft'&&index>0){e.preventDefault();onNavigate(index-1);}
    if(e.key==='ArrowRight'&&index<SLIDES.length-1){e.preventDefault();onNavigate(index+1);}
  }}>
    <div className="lesson-topline"><span className="eyebrow"><Icon name="book" size={15}/>THE SINGAPORE FOOD STORY</span><span className="lesson-paused"><Icon name="clock" size={13}/>Activity paused</span></div>
    <div className="lesson-heading"><span className="lesson-number" aria-hidden="true">0{index+1}</span><div><h2 id="modal-title" ref={heading} tabIndex={-1}>{content.title}</h2><p>{content.subtitle}</p></div></div>
    {content.videoId&&<section className="food-lesson-video" aria-label="Food imports learning video"><div className="food-lesson-player"><iframe key={content.videoId} width="560" height="315" src={`https://www.youtube.com/embed/${content.videoId}`} title="Learning video: why Singapore imports food" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div><p>If the player does not load, <a href={`https://www.youtube.com/watch?v=${content.videoId}`} target="_blank" rel="noreferrer">watch the video on YouTube</a>.</p></section>}
    <div className="lesson-cards">{content.sections.map((section,i)=><section className="lesson-card" key={section.title}><div className="lesson-card-icon"><Icon name={section.icon} size={26}/><span>0{i+1}</span></div><h3>{section.title}</h3><ul>{section.points.map(point=><li key={point}>{point}</li>)}</ul></section>)}</div>
    <aside className="lesson-key-message"><span className="lesson-key-icon"><Icon name="spark" size={25}/></span><div><strong>KEY MESSAGE</strong><p>{content.message}</p></div></aside>
    <nav className="lesson-navigation" aria-label="Lesson slides"><button className="secondary" disabled={index===0} onClick={()=>onNavigate(index-1)}><span className="previous-arrow"><Icon name="arrow" size={16}/></span>Previous</button><div className="lesson-position"><span aria-live="polite" aria-atomic="true">Slide {index+1} of {SLIDES.length}</span><div className="lesson-dots">{SLIDES.map((s,i)=><button key={s.title} aria-label={`Go to slide ${i+1}`} aria-current={index===i?'step':undefined} className={index===i?'active':''} onClick={()=>onNavigate(i)}/>)}</div></div>{index<SLIDES.length-1?<button className="primary" onClick={()=>onNavigate(index+1)}>Next slide<Icon name="arrow" size={16}/></button>:<button className="primary" onClick={onComplete}>Continue to round 2 briefing<Icon name="arrow" size={16}/></button>}</nav>
    <p className="lesson-keyboard-hint">Use Previous / Next or your left and right arrow keys to navigate.</p>
  </div>;
}
