export const ROUND_SECONDS = 600;
import {createTeamChat,roleOutcomes} from './team.js';
export const STORAGE_KEY = 'little-red-dot-v2';
export const RESOURCES = [
  {id:'housing',label:'Housing',icon:'housing',importable:false},
  {id:'commerce',label:'Commercial services',icon:'commerce',importable:false},
  {id:'industry',label:'Essential goods',icon:'industry',importable:true},
  {id:'food',label:'Food',icon:'food',importable:true},
  {id:'water',label:'Water',icon:'water',importable:true}
];
export const ROUNDS = [
  {
    "name": "Lay the foundations",
    "short": "Foundations",
    "instructions": [
      "Click \"Start 10-minute round\" to begin.",
      "Select an empty plot, then choose a building to provide housing, commercial services, essential goods, food or water. Imports are unavailable in this round.",
      "Use City insights to check shortages and adjust your buildings. When ready, click \"Reflect & finish round\" and choose a reflection response."
    ],
    "label": "Can your island meet its own needs?",
    "description": "You have 10 minutes. Allocate land to provide housing, services, essential goods, food and water. Only local production is available this round.",
    "question": "Which resource constraint did your first-round plan reveal?",
    "choices": [
      "Farms and catchments competed with homes and industry for limited land",
      "Food production needed land and water as well as a budget",
      "Local production alone could not meet every essential need",
      "Providing more of one resource left less space for another"
    ],
    "lesson": "The shortage is not a personal failure. The classroom island deliberately has too little land to meet every first-round need locally. Singapore faces land and freshwater constraints: food imports complement local farms, while the Four National Taps combine catchment water, imported water, NEWater and desalinated water.",
    "feedback": [
      "This is a land-use trade-off: Singapore has to fit homes, industry, food production and water infrastructure into limited space.",
      "Farming requires land, freshwater, energy and workers. More money alone cannot remove all of these constraints.",
      "Local food and water resources are limited. Imports and other supply strategies complement local production.",
      "Every plot has an opportunity cost. A farm or catchment occupies space that could serve another essential need."
    ]
  },
  {
    "name": "Connect your island",
    "short": "Trading connections",
    "instructions": [
      "Start with an empty island. Build from scratch to meet the increased demand for all five essentials.",
      "Imports are now available for food, water and essential goods. Turn them on in City insights where needed, so you can focus more land on housing, commercial services and community spaces.",
      "Check the remaining shortages, then click \"Reflect & finish round\" and choose a reflection response."
    ],
    "label": "Look beyond the coastline",
    "description": "Imports are now available for food, water and essential goods. Keep housing and commercial services local, and use trade to close supply gaps.",
    "question": "What should your city consider after using imports to meet its needs?",
    "choices": [
      "Diversify suppliers because drought or export restrictions can affect a source",
      "Keep local production as a buffer during overseas disruptions",
      "Prepare for transport, disease and supply-chain disruptions as well as drought",
      "Combine local supply and imports instead of depending on a single source"
    ],
    "lesson": "Imports help meet demand, but do not eliminate insecurity. The next lesson uses drought at Linggiu Reservoir to explore supply risks and explains how the Four National Taps and food-source diversification strengthen resilience.",
    "feedback": [
      "A drought can affect water availability and farm output. Diversifying supply reduces dependence on an affected source.",
      "Local farms can provide a buffer, but storms, disease and equipment failures can disrupt them too. Local production is part of a wider strategy.",
      "Food insecurity has several causes. Export bans, disease outbreaks and logistics problems can interrupt supplies even when food is being produced.",
      "A mix of sources spreads risk. The Linggiu case illustrates why access to imports does not guarantee an uninterrupted supply."
    ]
  },
  {
    "name": "Make more of each plot",
    "short": "Efficient production",
    "instructions": [
      "Review City insights: farms, factories and water catchments now produce 50% more per plot.",
      "Imports are also vulnerable: droughts, floods and other natural disasters in supplier countries can disrupt the food, water and goods Singapore imports. Balance imports with local production rather than relying on a single source.",
      "Build from scratch on your cleared island and adjust imports to meet essential needs. Reserve land for nature or recreation.",
      "Compare your new supply and liveability, then click \"Reflect & finish round\" and choose a reflection response."
    ],
    "label": "Small island. Smarter systems.",
    "description": "Imports helped meet demand in Round 2, but drought can put overseas supplies at risk. Farms, factories and water catchments now produce 50% more per plot. Build a balance of efficient local production and imports to reduce reliance on any one source.",
    "question": "How can technology help a land-scarce city strengthen food and water resilience?",
    "choices": [
      "Produce more locally from limited land using space-efficient farming",
      "Use closed-containment systems and monitoring to manage farming conditions",
      "Reuse water and improve treatment efficiency while considering energy needs",
      "Combine productive local systems with diverse imports and conservation"
    ],
    "lesson": "The game models technology with a 50% productivity boost. Real examples include vertical farming, closed-containment aquaculture and water-treatment research. These approaches have land, energy, investment and operating trade-offs; they complement imports rather than remove every risk.",
    "feedback": [
      "Vertical and automated farming can use space efficiently. Higher output still needs suitable infrastructure, skilled workers and resources.",
      "Closed-containment aquaculture and monitoring can help manage exposure to environmental hazards. They still need reliable equipment and management.",
      "NEWater reuses treated water, and desalination uses seawater. Both need energy, so efficiency and renewable energy matter.",
      "Technology works alongside diversification and conservation. It cannot make every source immune to drought, disease or equipment failure."
    ]
  },
  {
    "name": "Build for the long term",
    "short": "Resilient city",
    "instructions": [
      "Review your city with its new 10-point liveability boost and increased essential demand.",
      "Build from scratch on your cleared island and adjust imports to balance housing, commercial services, essential goods, food, water and liveability.",
      "Click \"Reflect & finish round\", choose a reflection response and open your final city report to compare all four rounds."
    ],
    "label": "A balanced place to live",
    "description": "Community wellbeing now receives a 10-point boost. Use your final 10 minutes to balance essential needs, imports, nature and recreation.",
    "question": "Which combination would help your city remain resilient over the long term?",
    "choices": [
      "Diversify food imports, grow locally and develop overseas supply options",
      "Combine the Four National Taps with water conservation and efficient treatment",
      "Prepare for drought, storms, disease and supply-chain disruptions",
      "Balance food and water security with homes, industry, nature and wellbeing"
    ],
    "lesson": "There is no single solution to food and water insecurity. Combine diverse supply sources, efficient local production, water reuse, conservation and contingency planning. Balance these with land for homes, industry and community wellbeing. The Three Food Baskets and earlier 30 by 30 target in the notes are historical policy context; the lesson also links to the refreshed Singapore Food Story 2.",
    "feedback": [
      "These are the Three Food Baskets described in the notes. Overseas farms expand options, but their produce still needs to be imported and can face overseas disruptions.",
      "The Four National Taps spread water-supply risk. Conservation reduces demand, while efficient treatment helps address energy costs.",
      "Resilience includes preparation and alternatives. Neither local production nor imports are completely protected from disruption.",
      "Food and water security share limited land and resources with other city needs. A long-term plan considers both reliable supplies and a liveable environment."
    ]
  }
];
export const TYPES = [
  {id:'housing',name:'HDB neighbourhood',category:'housing',essential:true,cost:12,round:1,color:'#e9d3b1',effect:'+180 housing capacity',housing:180},
  {id:'commercial',name:'Commercial building',category:'commerce',essential:true,cost:12,round:1,color:'#c6cbd5',effect:'+120 commercial services',commerce:120},
  {id:'factory',name:'Factory',category:'industry',essential:true,cost:14,round:1,color:'#c6bbb0',effect:'+100 essential goods',industry:100},
  {id:'shopping',name:'Shopping Centre',category:'community',essential:false,cost:10,round:1,color:'#e5c7bb',effect:'+6 liveability',green:6},
  {id:'sports',name:'Sports & Recreational Hub',category:'community',essential:false,cost:10,round:1,color:'#b6d0c3',effect:'+8 liveability',green:8},
  {id:'park',name:'Nature Reserve',category:'nature',essential:false,cost:8,round:1,color:'#9dbd9b',effect:'+10 liveability',green:10},
  {id:'farm',name:'Farm',category:'food',essential:true,cost:10,round:1,color:'#ccd8a0',effect:'+30 food supply',food:30},
  {id:'water',name:'Water Catchment',category:'water',essential:true,cost:10,round:1,color:'#a6cbd4',effect:'+40 water supply',water:40}
];
const ranges = [[4,7],[2,9],[0,10],[1,9],[3,6]];
export const TILES = ranges.flatMap(([a,b],r)=>Array.from({length:b-a+1},(_,i)=>({id:`${r}-${a+i}`,x:85+(a+i)*64+(r%2?32:0),y:160+r*55.4,r,q:a+i})));
export const INITIAL_BOARD = {};
export const INITIAL = {version:2,round:1,board:INITIAL_BOARD,budget:600,snapshots:[],imports:{water:false,food:false,industry:false},complete:false,deadline:null,checkpoint:false,teacherPause:false,activeRole:'housing',teamMembers:[],chat:createTeamChat()};
export function productionMultiplier(round){return round>=3?1.5:1;}
export function secondsRemaining(state,now=Date.now()){
  return state.deadline===null?ROUND_SECONDS:Math.max(0,Math.ceil((state.deadline-now)/1000));
}
export function canEdit(state,now=Date.now()){
  return !state.complete&&!state.checkpoint&&!state.teacherPause&&!state.waterLessonPending&&!state.roundFourLessonPending&&Number.isFinite(state.deadline)&&secondsRemaining(state,now)>0;
}
export function startRound(state,now=Date.now()){
  if(state.complete||state.teacherPause||state.waterLessonPending||state.roundFourLessonPending||state.deadline!==null)return state;
  return {...state,board:{},plotCosts:{},budget:INITIAL.budget+(state.round-1)*65,deadline:now+ROUND_SECONDS*1000,roundDurationSeconds:ROUND_SECONDS,checkpoint:false};
}
export function checkpointRound(state){
  if(state.complete||state.deadline===null)return state;
  return {...state,checkpoint:true};
}
export function acknowledgeTeacher(state){
  if(!state.teacherPause)return state;
  return {...state,teacherPause:false,teacherLessonSlide:null};
}
export function stats(board,round,imports={}){
  const demand=600+(round-1)*120;
  const supply={housing:0,commerce:0,industry:0,food:0,water:0,green:0};
  Object.entries(board).filter(([tile])=>TILES.some(t=>t.id===tile)).forEach(([,id])=>{
    const t=TYPES.find(t=>t.id===id);
    if(t)Object.keys(supply).forEach(k=>supply[k]+=(t[k]||0)*(['food','water','industry'].includes(k)?productionMultiplier(round):1));
  });
  const coverage=Object.fromEntries(RESOURCES.map(({id})=>[id,Math.min(100,Math.floor(supply[id]/demand*100))]));
  const imported=Object.fromEntries(RESOURCES.map(({id,importable})=>[id,round>1&&importable&&imports[id]?Math.max(0,demand-supply[id]):0]));
  const unmet=Object.fromEntries(RESOURCES.map(({id})=>[id,Math.max(0,demand-supply[id]-imported[id])]));
  const totalCoverage=Object.fromEntries(RESOURCES.map(({id})=>[id,Math.min(100,Math.floor((supply[id]+imported[id])/demand*100))]));
  const liveability=Math.min(100,35+supply.green+(round>=4?10:0));
  const score=Math.round((RESOURCES.reduce((n,{id})=>n+coverage[id],0)+liveability)/6);
  return {demand,supply,coverage,totalCoverage,liveability,score,imported,unmet,allEssentialsMet:RESOURCES.every(({id})=>unmet[id]===0),plots:Object.keys(board).length};
}
export function build(state,tile,type,now=Date.now()){
  const item=TYPES.find(t=>t.id===type);
  if(!canEdit(state,now)||!item||state.budget<item.cost||state.board[tile]||!TILES.some(t=>t.id===tile))return state;
  return {...state,board:{...state.board,[tile]:type},plotCosts:{...state.plotCosts,[tile]:item.cost},budget:state.budget-item.cost};
}
export function setImport(state,resource,allowed,now=Date.now()){
  if(state.round===1||!canEdit(state,now)||!RESOURCES.some(r=>r.id===resource&&r.importable))return state;
  return {...state,imports:{...state.imports,[resource]:!!allowed}};
}
export function undoBuild(state,previous,now=Date.now()){
  if(!canEdit(state,now)||!previous||previous.round!==state.round)return state;
  return {...state,board:{...previous.board},plotCosts:{...previous.plotCosts},budget:previous.budget};
}
export function plotRefund(state,tile){
  const item=TYPES.find(t=>t.id===state.board[tile]);
  if(!item)return 0;
  const paid=state.plotCosts?.[tile]??(INITIAL_BOARD[tile]===item.id?0:item.cost);
  return Math.max(0,Math.min(paid,item.cost,INITIAL.budget+(state.round-1)*65-state.budget));
}
export function removePlot(state,tile,now=Date.now()){
  if(!canEdit(state,now)||!state.board[tile]||!TILES.some(t=>t.id===tile))return state;
  const refund=plotRefund(state,tile);
  const board={...state.board},plotCosts={...state.plotCosts};
  delete board[tile];delete plotCosts[tile];
  return {...state,board,plotCosts,budget:state.budget+refund};
}
export function resetMap(state,now=Date.now()){
  if(state.complete||state.teacherPause||state.waterLessonPending||state.roundFourLessonPending||state.checkpoint||(state.deadline!==null&&!canEdit(state,now)))return state;
  return {...state,board:{},plotCosts:{},budget:INITIAL.budget+(state.round-1)*65};
}
export function endRound(state,answer,now=Date.now()){
  if(state.complete||state.deadline===null||!state.checkpoint||!ROUNDS[state.round-1].choices.includes(answer))return state;
  const imports=state.round===1?{water:false,food:false,industry:false}:{...state.imports};
  const city=stats(state.board,state.round,imports);
  const snapshot={round:state.round,board:{...state.board},budget:state.budget,imports,answer,activeRole:state.activeRole||'housing',teamMembers:(state.teamMembers||[]).map(m=>({...m})),roleResults:roleOutcomes(city),timedOut:secondsRemaining(state,now)===0,stats:city};
  return {...state,snapshots:[...state.snapshots,snapshot],round:Math.min(4,state.round+1),board:state.round<4?{}:state.board,plotCosts:state.round<4?{}:state.plotCosts,budget:state.round<4?INITIAL.budget+state.round*65:state.budget,complete:state.round===4,deadline:null,checkpoint:false,teacherPause:state.round===1,waterLessonPending:state.round===2,roundFourLessonPending:state.round===3,imports};
}

export function completeWaterLesson(state){
 if(!state.waterLessonPending||state.roundFourLessonPending||state.round!==3)return state;
 return {...state,waterLessonPending:false};
}

export function completeRoundFourLesson(state){
 if(!state.roundFourLessonPending||state.round!==4)return state;
 return {...state,roundFourLessonPending:false};
}
