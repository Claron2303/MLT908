export const ROLES = [
  {id:'housing',name:'Housing expert',short:'Housing',icon:'housing',resources:['housing'],responsibility:'Housing capacity',room:'Housing room'},
  {id:'food',name:'Food expert',short:'Food',icon:'food',resources:['food'],responsibility:'Food supply',room:'Food room'},
  {id:'water',name:'Water expert',short:'Water',icon:'water',resources:['water'],responsibility:'Water supply',room:'Water room'},
  {id:'trade',name:'Trade and industry expert',short:'Trade & industry',icon:'industry',resources:['commerce','industry'],responsibility:'Commercial services + essential goods',room:'Trade & industry room'}
];
export const RESOURCE_NAMES={housing:'Housing',food:'Food',water:'Water',commerce:'Commercial services',industry:'Essential goods'};
export function validateTeam(members){
  if(!Array.isArray(members)||members.length!==4)return {error:'Add all four players to your team.'};
  const cleaned=members.map(m=>({name:typeof m?.name==='string'?m.name.trim().replace(/\s+/g,' '):'',role:m?.role}));
  if(cleaned.some(m=>!m.name||m.name.length>40))return {error:'Enter a name of 1–40 characters for every player.'};
  if(cleaned.some(m=>!ROLES.some(r=>r.id===m.role)))return {error:'Choose an expert role for every player.'};
  if(new Set(cleaned.map(m=>m.role)).size!==4)return {error:'Each player needs a different role. Choose each expert role once.'};
  return {members:cleaned,error:''};
}
export function expertName(members,role){
  const name=Array.isArray(members)?members.find(m=>m?.role===role)?.name:null;
  return typeof name==='string'&&name.trim()?name.trim().slice(0,40):ROLES.find(r=>r.id===role)?.name||'Expert';
}
export function roleOutcomes(city){
  return ROLES.map(role=>{
    const resources=role.resources.map(id=>({id,label:RESOURCE_NAMES[id],shortfall:Math.max(0,city.unmet?.[id]??city.demand-(city.supply[id]||0)-(city.imported[id]||0))}));
    return {...role,resources,passed:resources.every(r=>r.shortfall===0)};
  });
}
export function createTeamChat(){return {nextId:1,rooms:Object.fromEntries(ROLES.map(r=>[r.id,[]]))};}
export function normaliseChat(chat){
  const fresh=createTeamChat();
  for(const role of ROLES){
    fresh.rooms[role.id]=(Array.isArray(chat?.rooms?.[role.id])?chat.rooms[role.id]:[]).filter(m=>m&&typeof m.id==='string'&&ROLES.some(r=>r.id===m.author)&&typeof m.text==='string'&&Number.isFinite(m.timestamp)&&Number.isInteger(m.round)&&['student','mock'].includes(m.kind)).slice(-100).map(m=>({...m,text:m.text.slice(0,500)}));
  }
  const largest=Object.values(fresh.rooms).flat().reduce((max,m)=>Math.max(max,Number(m.id.replace('msg-',''))||0),0);
  fresh.nextId=Math.max(Number.isSafeInteger(chat?.nextId)?chat.nextId:1,largest+1);
  return fresh;
}
function mockReply(room,author,text,round,city){
  const expert=room===author?ROLES.find(r=>r.id!==author&&(r.id==='trade'||author==='trade')).id:room;
  const role=ROLES.find(r=>r.id===expert);
  const request=text.toLowerCase();
  const shortage=role.resources.map(id=>`${RESOURCE_NAMES[id].toLowerCase()}: ${Math.max(0,city.unmet[id])} units short`).join('; ');
  const greeting=/thank|great|good idea|agree|nice/.test(request)?'Thanks — let’s keep checking everyone’s targets. ': /help|\?|need|short|struggl/.test(request)?'Let’s work through this together. ':'Got it. Let’s coordinate our land choices. ';
  if(/drought|disaster|storm|climate|export ban|disruption/.test(request))return {author:expert,text:greeting+(round===1?'Drought can affect rainfall and overseas supplies; storms can damage local farms. Imports are unavailable in this round. Plan within the local land limit, then discuss why diverse sources matter.':'Imports can fill gaps here, but real suppliers face drought, export restrictions, disease and transport disruptions. Local farms can face storms too. Combine local capacity, diverse suppliers and conservation. The game does not simulate these disruptions.')};
  if(/national taps|newater|desalin/.test(request))return {author:expert,text:greeting+'The Four National Taps are local catchment water, imported water, NEWater and desalinated water. NEWater reuses treated water; desalination removes salt from seawater. Treatment needs energy, so efficiency matters. The map represents catchments and imports; it has no separate NEWater or desalination plants.'};
  if(/food baskets|30 by 30|30-by-30|vertical|aquaculture/.test(request))return {author:expert,text:greeting+'The notes describe Three Food Baskets: diversify imports, grow locally and grow overseas. Vertical farming and closed-containment aquaculture can support local production but need energy, investment and reliable systems. The earlier 30 by 30 target is historical; the lesson links to the refreshed food strategy.'+(round===1?' Imports remain unavailable in this round.':'')};
  if(/import|trade|overseas/.test(request))return {author:expert,text:greeting+(round===1?'Imports are unavailable this round, so we can only coordinate local production. Tell us which need has the biggest gap.':'Imports can fill food, water and essential-goods gaps in City insights. Housing and commercial services still need local land. Real imports can face drought or other disruptions, so discuss local buffers and diverse suppliers too.')};
  const advice={
    housing:'Each HDB neighbourhood provides 180 housing capacity. Could we agree on enough plots for homes while leaving room for food and water?',
    food:`Each farm provides ${round>=3?45:30} food units. ${round===1?'Can we agree on more farming plots without crowding out housing and water?':'We can combine farms with food imports rather than use every plot for farming.'}`,
    water:`Each water catchment provides ${round>=3?60:40} water units. ${round===1?'Could the group reserve some plots for water while keeping the other needs in view?':'Water imports can fill a gap while catchments provide local capacity.'}`,
    trade:`Commercial buildings provide 120 service units and factories provide ${round>=3?150:100} goods units. ${round===1?'I’ll coordinate these needs with your land requests; imports are unavailable.':'We can import essential goods, but commercial services still need local buildings.'}`
  };
  return {author:expert,text:`${greeting}${advice[expert]} Current city check — ${shortage}.`};
}
export function postTeamMessage(chat,{room,author,text,round,city,members=[],now=Date.now()}){
  if(!ROLES.some(r=>r.id===room)||!ROLES.some(r=>r.id===author)||typeof text!=='string'||!text.trim()||!Number.isInteger(round)||!city?.unmet)return chat;
  const current=normaliseChat(chat);
  const message=text.trim().slice(0,500);
  const reply=mockReply(room,author,message,round,city);
  const entries=[{id:`msg-${current.nextId}`,author,authorName:expertName(members,author),text:message,kind:'student',round,timestamp:now},{id:`msg-${current.nextId+1}`,...reply,authorName:expertName(members,reply.author),kind:'mock',round,timestamp:now}];
  return {...current,nextId:current.nextId+2,rooms:{...current.rooms,[room]:[...current.rooms[room],...entries].slice(-100)}};
}
