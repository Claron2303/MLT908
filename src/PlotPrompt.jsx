import React from 'react';
import {TYPES,plotRefund} from './game.js';
import './plot-prompt.css';

export default function PlotPrompt({plot,game,editable,onRemove,onClose,Icon}){
  const item=TYPES.find(t=>t.id===game.board[plot?.id]);
  if(!item)return null;
  const refund=plotRefund(game,plot.id);
  return <div className="plot-prompt" role="group" aria-labelledby="plot-prompt-title" style={{left:plot.x,top:plot.y}} onPointerDown={e=>e.stopPropagation()}>
    <div className="plot-prompt-header"><span className="eyebrow">PLOT {plot.id.replace('-',' · ')}</span><button className="plot-prompt-close" onClick={onClose} aria-label="Close plot details"><Icon name="close" size={14}/></button></div>
    <strong id="plot-prompt-title">{item.name}</strong><p id="plot-prompt-description">{editable?refund>0?`Clear this plot and recover ${refund} credits.`:'Clear this starter plot to choose a different land type.':game.deadline===null?'Start the round to change this land type.':'Land changes are locked until the next planning round.'}</p>
    <button className="plot-remove" disabled={!editable} onClick={()=>onRemove(plot.id)}><Icon name="undo" size={15}/>Undo this land type{refund>0&&<span>+{refund} credits</span>}</button>
  </div>;
}
