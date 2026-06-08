```react
import React, { useState, useMemo } from 'react';
import { Heart, Info, Sparkles, ChevronRight, Calculator } from 'lucide-react';

// --- 資料定義 ---
const pikminTypes = [
  { id: 'red', label: '紅', value: 4, color: 'bg-[#ff4b4b]', shadow: 'shadow-[#ff4b4b]/40', text: 'text-white' },
  { id: 'yellow', label: '黃', value: 3, color: 'bg-[#ffc107]', shadow: 'shadow-[#ffc107]/40', text: 'text-yellow-900' },
  { id: 'blue', label: '藍', value: 3, color: 'bg-[#3b82f6]', shadow: 'shadow-[#3b82f6]/40', text: 'text-white' },
  { id: 'purple', label: '紫', value: 6, color: 'bg-[#8b5cf6]', shadow: 'shadow-[#8b5cf6]/40', text: 'text-white' },
  { id: 'white', label: '白', value: 2, color: 'bg-[#f8fafc]', shadow: 'shadow-slate-200/50', text: 'text-slate-700' },
  { id: 'pink', label: '粉', value: 2, color: 'bg-[#f472b6]', shadow: 'shadow-[#f472b6]/40', text: 'text-white' },
  { id: 'rock', label: '灰', value: 5, color: 'bg-[#64748b]', shadow: 'shadow-[#64748b]/40', text: 'text-white' }
];

const decorOptions = [
  { id: 'none', label: '無飾品', value: 0, tag: '0' },
  { id: 'normal', label: '一般飾品', value: 4, tag: '+4' },
  { id: 'newEvent', label: '當月新活動', value: 4, tag: '+4 (打活動菇 +300)' },
  { id: 'returningEvent', label: '回歸活動', value: 4, tag: '+4 (自訂活動加成)' }
];

const headStatuses = [
  { id: 'bald', label: '🪨 禿頭', value: 0 },
  { id: 'leaf', label: '🌱 葉子', value: 1 },
  { id: 'bud', label: '🌷 花苞', value: 2 },
  { id: 'normal', label: '🌸 普通花', value: 3 },
  { id: 'sub', label: '🌺 副花', value: 4 },
  { id: 'main', label: '🌼 主花', value: 5 }
];

const friendships = [
  { id: 0, label: '< 1', value: 0, r: 0, y: 0 },
  { id: 1, label: '1', value: 1, r: 1, y: 0 },
  { id: 2, label: '2', value: 2, r: 2, y: 0 },
  { id: 3, label: '3', value: 3, r: 3, y: 0 },
  { id: 4, label: '4', value: 4, r: 4, y: 0 },
  { id: 8, label: '5', value: 8, r: 4, y: 1 },
  { id: 12, label: '6', value: 12, r: 4, y: 2 },
  { id: 16, label: '7', value: 16, r: 4, y: 3 },
  { id: 20, label: '8', value: 20, r: 4, y: 4 },
];

const mushroomTypes = [
  { id: 'event', label: '🍄 活動菇', theme: 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white border-transparent shadow-purple-500/30' },
  { id: 'red', label: '紅菇', theme: 'bg-[#ff4b4b] text-white border-transparent' },
  { id: 'yellow', label: '黃菇', theme: 'bg-[#ffc107] text-yellow-900 border-transparent' },
  { id: 'blue', label: '藍菇', theme: 'bg-[#3b82f6] text-white border-transparent' },
  { id: 'purple', label: '紫菇', theme: 'bg-[#8b5cf6] text-white border-transparent' },
  { id: 'white', label: '白菇', theme: 'bg-white text-slate-700 border-slate-200' },
  { id: 'pink', label: '粉菇', theme: 'bg-[#f472b6] text-white border-transparent' },
  { id: 'rock', label: '灰菇', theme: 'bg-[#64748b] text-white border-transparent' },
  { id: 'fire', label: '🔥 火菇', theme: 'bg-orange-500 text-white border-transparent' },
  { id: 'electric', label: '⚡ 閃電', theme: 'bg-yellow-400 text-yellow-900 border-transparent' },
  { id: 'water', label: '💧 水菇', theme: 'bg-cyan-500 text-white border-transparent' },
  { id: 'poison', label: '☠️ 毒菇', theme: 'bg-green-500 text-white border-transparent' },
  { id: 'crystal', label: '💎 水晶', theme: 'bg-slate-300 text-slate-800 border-transparent' }
];

const mushroomMatrix = {
  red:    { event:0, red:12, yellow:3,  blue:0,  purple:3,  white:0,  pink:3,  rock:0,  fire:100, electric:0,   water:0,   poison:0,   crystal:0 },
  yellow: { event:0, red:0,  yellow:12, blue:0,  purple:3,  white:0,  pink:3,  rock:3,  fire:0,   electric:100, water:0,   poison:0,   crystal:0 },
  blue:   { event:0, red:0,  yellow:3,  blue:12, purple:3,  white:0,  pink:3,  rock:3,  fire:0,   electric:0,   water:100, poison:0,   crystal:0 },
  purple: { event:0, red:0,  yellow:3,  blue:3,  purple:12, white:0,  pink:3,  rock:3,  fire:0,   electric:0,   water:0,   poison:0,   crystal:0 },
  white:  { event:0, red:0,  yellow:3,  blue:3,  purple:3,  white:12, pink:3,  rock:0,  fire:0,   electric:0,   water:0,   poison:100, crystal:0 },
  pink:   { event:0, red:0,  yellow:3,  blue:3,  purple:3,  white:0,  pink:12, rock:0,  fire:0,   electric:0,   water:0,   poison:0,   crystal:0 },
  rock:   { event:0, red:0,  yellow:3,  blue:3,  purple:3,  white:0,  pink:3,  rock:12, fire:0,   electric:0,   water:0,   poison:0,   crystal:100 }
};

// --- 共用小元件 ---
const SectionTitle = ({ num, title }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-black">
      {num}
    </div>
    <h2 className="text-[17px] font-bold text-slate-800">{title}</h2>
  </div>
);

const HeartDisplay = ({ r, y }) => {
  if (r === 0 && y === 0) return <div className="text-[10px] text-slate-400 font-bold tracking-tighter">無愛心</div>;
  return (
    <div className="flex gap-0.5 justify-center">
      {[...Array(r)].map((_, i) => <Heart key={`r${i}`} className="w-3 h-3 fill-rose-500 text-rose-500" />)}
      {[...Array(y)].map((_, i) => <Heart key={`y${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
    </div>
  );
};

export default function App() {
  const [type, setType] = useState('red');
  const [decorStatus, setDecorStatus] = useState('newEvent');
  const [head, setHead] = useState('main');
  const [friendship, setFriendship] = useState(20);
  const [mushroom, setMushroom] = useState('event');
  const [customBonus, setCustomBonus] = useState('');

  // 戰力計算邏輯
  const activePikmin = pikminTypes.find(p => p.id === type);
  const score1 = activePikmin.value;
  const score2 = decorOptions.find(d => d.id === decorStatus)?.value || 0;
  const score3 = headStatuses.find(h => h.id === head)?.value || 0;
  const score4 = friendship;
  const score5 = mushroomMatrix[type][mushroom] || 0;
  
  let eventBonusScore = 0;
  if (mushroom === 'event') {
    if (decorStatus === 'newEvent') eventBonusScore = 300;
    if (decorStatus === 'returningEvent') eventBonusScore = parseInt(customBonus) || 0;
  }

  const totalScore = score1 + score2 + score3 + score4 + score5 + eventBonusScore;

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex justify-center font-sans selection:bg-emerald-200">
      {/* 限制最大寬度，模擬手機版型 */}
      <div className="w-full max-w-[480px] bg-white min-h-screen relative shadow-2xl shadow-slate-200/50 pb-[140px] flex flex-col">
        
        {/* Header - iOS 質感 */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-xl">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 leading-tight">Pikmin Bloom</h1>
              <p className="text-xs text-emerald-600 font-bold">戰力計算機</p>
            </div>
          </div>
        </header>

        <main className="p-5 space-y-8 overflow-y-auto">
          
          {/* 1. 皮克敏種類 */}
          <section>
            <SectionTitle num="1" title="皮克敏種類" />
            <div className="flex gap-3 overflow-x-auto pb-2 px-1 -mx-1 scrollbar-hide">
              {pikminTypes.map((p) => {
                const isSelected = type === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setType(p.id)}
                    className={`shrink-0 w-16 h-16 rounded-[20px] transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-1 border-2 relative
                      ${isSelected ? `${p.color} ${p.text} border-transparent shadow-lg ${p.shadow}` : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                  >
                    <span className="font-bold text-lg">{p.label}</span>
                    {isSelected && (
                       <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                         {p.value}
                       </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. 飾品狀態 */}
          <section>
            <SectionTitle num="2" title="飾品狀態" />
            <div className="grid grid-cols-1 gap-2.5">
              {decorOptions.map((d) => {
                const isSelected = decorStatus === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDecorStatus(d.id)}
                    className={`w-full p-4 rounded-2xl transition-all duration-300 active:scale-[0.98] border-2 flex items-center justify-between
                      ${isSelected ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-emerald-500' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                      </div>
                      <span className={`font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-600'}`}>{d.label}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      {d.tag}
                    </span>
                  </button>
                );
              })}
              
              {/* 回歸活動飾品的自訂輸入區塊 (滑順展開) */}
              <div className={`overflow-hidden transition-all duration-300 ${decorStatus === 'returningEvent' ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <div className="bg-blue-50 rounded-2xl p-3 flex items-center justify-between border border-blue-100">
                  <span className="text-sm font-bold text-blue-800 pl-2">打活動菇額外加成：</span>
                  <div className="bg-white px-3 py-1.5 rounded-xl flex items-center shadow-sm">
                    <span className="text-blue-500 font-bold mr-1">+</span>
                    <input
                      type="number"
                      value={customBonus}
                      onChange={(e) => setCustomBonus(e.target.value)}
                      className="w-16 bg-transparent text-center font-bold text-blue-700 focus:outline-none placeholder-blue-200"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 頭上狀態 */}
          <section>
            <SectionTitle num="3" title="頭部狀態" />
            <div className="grid grid-cols-3 gap-3">
              {headStatuses.map((h) => {
                const isSelected = head === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setHead(h.id)}
                    className={`py-3 px-2 rounded-2xl transition-all duration-300 active:scale-95 border-2 flex flex-col items-center gap-1.5
                      ${isSelected ? 'bg-amber-50 border-amber-400' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                  >
                    <span className={`text-sm font-bold ${isSelected ? 'text-amber-900' : 'text-slate-600'}`}>{h.label}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                      +{h.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. 友好度 */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <SectionTitle num="4" title="友好度 (愛心)" />
               <button className="text-slate-400 hover:text-slate-600 transition-colors">
                 <Info className="w-4 h-4" />
               </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {friendships.map((f) => {
                const isSelected = friendship === f.value;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFriendship(f.value)}
                    className={`p-2.5 rounded-2xl transition-all duration-300 active:scale-95 border-2 flex flex-col items-center justify-center gap-2 min-h-[70px]
                      ${isSelected ? 'bg-rose-50 border-rose-400 shadow-sm shadow-rose-100' : 'bg-white border-slate-100 hover:border-rose-100'}`}
                  >
                    <div className="flex items-center justify-center gap-1 w-full">
                       <span className={`text-sm font-black ${isSelected ? 'text-rose-600' : 'text-slate-500'}`}>{f.label}</span>
                       <span className={`text-[10px] font-bold px-1.5 rounded ${isSelected ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-400'}`}>
                         +{f.value}
                       </span>
                    </div>
                    <HeartDisplay r={f.r} y={f.y} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. 蘑菇類型 */}
          <section>
            <SectionTitle num="5" title="討伐蘑菇類型" />
            <div className="flex flex-wrap gap-2.5 mb-5">
              {mushroomTypes.map((m) => {
                const isSelected = mushroom === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMushroom(m.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 border-2
                      ${isSelected ? `${m.theme} shadow-md scale-105 ring-2 ring-offset-2 ring-emerald-100` : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* 相剋分數小卡 */}
            <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-slate-200">
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs font-bold">基本相剋得分</span>
                <span className="text-white text-sm font-medium flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full ${activePikmin.color}`}></span>
                  {activePikmin.label}皮克敏 <ChevronRight className="w-3 h-3 text-slate-500" /> {mushroomTypes.find(m=>m.id === mushroom)?.label}
                </span>
              </div>
              <span className="text-2xl font-black text-emerald-400">+{score5}</span>
            </div>
          </section>

        </main>

        {/* 浮動結算面板 (固定在底部) */}
        <div className="absolute bottom-0 w-full bg-white rounded-t-[32px] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] border-t border-slate-100 p-6 pt-5 z-40">
          
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                總戰力 (工作力)
              </span>
              {/* 算式明細 */}
              <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span>{score1}</span>+<span>{score2}</span>+<span>{score3}</span>+<span>{score4}</span>+<span>{score5}</span>
                {eventBonusScore > 0 && <span className="text-purple-500">+ {eventBonusScore}</span>}
              </div>
            </div>
            
            <div className="text-[2.5rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600 drop-shadow-sm">
              {totalScore}
            </div>
          </div>
          
          {/* 底部安全區留白 */}
          <div className="h-2 w-1/3 mx-auto bg-slate-200 rounded-full mt-4"></div>
        </div>
        
      </div>
    </div>
  );
}


```
