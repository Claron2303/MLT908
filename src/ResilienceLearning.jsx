import React from 'react';
import './resilience-learning.css';

export function WaterResilienceLearning(){
 return <section className="resilience-learning" aria-labelledby="water-resilience-title">
  <span className="eyebrow">FROM RISK TO RESILIENCE</span><h3 id="water-resilience-title">Why Singapore needs four water sources</h3>
  <p>Singapore has limited natural freshwater resources and little land for more reservoirs. Homes, roads and industry compete for space, while population and economic growth increase water demand. Drought can reduce both rainfall collected locally and water available from Johor.</p>
  <div className="resilience-grid">
   <article><h4>Local catchment water</h4><p>Rainwater is collected through drains, rivers and reservoirs. Its supply depends on rainfall and available catchment space.</p></article>
   <article><h4>Imported water</h4><p>Water comes from Johor under agreements. The Linggiu case shows why drought across the border matters to Singapore.</p></article>
   <article><h4>NEWater</h4><p>Used water is treated with advanced membrane filtration and ultraviolet disinfection so it can be reused.</p></article>
   <article><h4>Desalinated water</h4><p>Salt is removed from seawater to produce fresh water. Together with NEWater, it reduces dependence on rainfall.</p></article>
  </div>
  <h4>Every solution has trade-offs</h4><p>NEWater and desalination need energy. Research into more efficient treatment and floating solar panels, such as those at Tengeh Reservoir, helps address the water-energy challenge. Multipurpose infrastructure such as Marina Barrage combines water storage with flood management.</p>
  <p className="resilience-task"><strong>Discuss:</strong> Why would a mix of water sources and water conservation be safer than relying on one reservoir? In the game, compare local catchments with imports; use the Four National Taps to explain real-world options beyond the map.</p>
  <p className="resilience-source">Further reading: <a href="https://www.pub.gov.sg/Public/WaterLoop/OurWaterStory" target="_blank" rel="noreferrer">PUB: Singapore's water story</a>. The map models catchments and imports; it does not model separate NEWater or desalination plants.</p>
 </section>;
}

export function FoodResilienceLearning(){
 return <section className="resilience-learning" aria-labelledby="food-resilience-title">
  <span className="eyebrow">THE THREE FOOD BASKETS IN YOUR LESSON NOTES</span><h3 id="food-resilience-title">Food security needs more than one approach</h3>
  <p>Limited farmland makes imports important. Export restrictions, disease, transport disruptions and extreme weather can interrupt supplies. Local production also faces risks: storms can damage farms and equipment failures can disrupt harvests.</p>
  <div className="resilience-grid">
   <article><h4>1. Diversify imports</h4><p>Buy food from different countries and regions. If one source is disrupted, alternatives can help keep food available.</p></article>
   <article><h4>2. Grow locally</h4><p>Space-efficient farming provides a local buffer during overseas disruptions. Vertical farms such as Citiponics and closed-containment fish farming such as Eco-Ark illustrate approaches described in the lesson notes.</p></article>
   <article><h4>3. Grow overseas</h4><p>Singapore-based businesses can farm abroad where land and resources are available, then bring produce back. This expands supply options, but the food still crosses borders and remains exposed to overseas risks.</p></article>
  </div>
  <h4>Technology helps, but does not remove every risk</h4><p>Vertical farming uses limited space efficiently. Closed-containment aquaculture helps manage growing conditions and exposure to coastal hazards. These approaches still require investment, energy, skilled workers and reliable equipment.</p>
  <p className="resilience-task"><strong>Apply this:</strong> How would you combine efficient local production with diverse import sources? What land, water and energy trade-offs would you consider before expanding farms?</p>
  <details className="policy-context"><summary>Policy context: the notes and today's strategy</summary><p>The notes describe the earlier Three Food Baskets framework and the 2019 "30 by 30" ambition: producing 30% of nutritional needs locally by 2030. These are historical policy context. In November 2025, Singapore Food Story 2 introduced four pillars: diversify imports, grow local, stockpile and global partnerships. Its 2035 goals focus on capacity for 20% of local fibre consumption and 30% of local protein consumption.</p><p><a href="https://www.sfa.gov.sg/about-us/our-singapore-food-story-2" target="_blank" rel="noreferrer">SFA: Singapore Food Story 2</a> ? <a href="https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025" target="_blank" rel="noreferrer">SFA: updated local production goals</a></p></details>
  <p className="resilience-source">The game simplifies these strategies into local farms and imports. Its 50% productivity boost is a classroom rule, not a measured improvement at the real farms.</p>
 </section>;
}
