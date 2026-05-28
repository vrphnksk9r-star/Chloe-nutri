
const KEY="chloe_fit_v51";const kcal={shake1:120,shakeComp:190,proteinWater:80,bowl:280,topping:170};const labels={pierna:"Pierna",espalda:"Espalda + Bíceps",pecho:"Pecho + Hombro + Tríceps",descanso:"Descanso activo"};const targets={pierna:1500,espalda:1550,pecho:1500,descanso:1480};const solids={pierna:["Res 93/7 220–250 g + papa 350 g + caldo 250 ml + blueberries 90 g. Vit C + Omega 3.",800],espalda:["Sardinas Guaymex + papa 350 g + caldo 250 ml + blueberries 90 g. Vit C + Omega 3.",735],pecho:["Pollo 250 g + papa 350 g + caldo 250 ml + blueberries 90 g. Vit C + Omega 3.",805],descanso:["Sardinas Guaymex + papa 350 g + caldo 250 ml + blueberries 90 g. Vit C + Omega 3.",735]};let state=load(),date=today(),showWorkout=true;function $(x){return document.getElementById(x)}function today(){let d=new Date(),o=d.getTimezoneOffset();return new Date(d-o*60000).toISOString().slice(0,10)}function load(){try{return JSON.parse(localStorage.getItem(KEY))||{settings:{cycleStart:today()},days:{}}}catch{return{settings:{cycleStart:today()},days:{}}}}function persist(){localStorage.setItem(KEY,JSON.stringify(state))}function addMin(t,m){let[h,mi]=(t||"07:00").split(":").map(Number);let d=new Date(2000,0,1,h,mi+m);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}function nowTime(){let d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}function diffDays(a,b){return Math.floor((new Date(a+"T00:00")-new Date(b+"T00:00"))/86400000)}function autoType(day=date){let n=((diffDays(day,state.settings.cycleStart||today())%4)+4)%4;return["pierna","espalda","pecho","descanso"][n]}function defDay(type=autoType()){let rest=type==="descanso";return{type,target:targets[type],carb:"Papa 350 g",proteinWaterMode:"Según plan",workoutStart:rest?"":"07:00",workoutEnd:rest?"":"08:15",mealStates:{},workoutStates:{},extras:[],energy:"",hunger:"",notes:"",closed:false}}function day(){if(!state.days[date])state.days[date]=defDay();return state.days[date]}function status(x){$("status").textContent=x;setTimeout(()=>$("status").textContent="",2500)}function meals(d=day()){let rest=d.type==="descanso",start=d.workoutStart||"07:00",end=d.workoutEnd||"08:15";let arr=[["shake1",rest?"08:00":addMin(start,-75),"Shake 1 con café","Café + 1 scoop proteína.",120]];if(!rest)arr.push(["pre",addMin(start,-35),"Pre-entreno","Citrulina + L-theanina.",0]);arr.push(["shakeComp",rest?"Post caminata":addMin(end,15),"Shake compuesto","1 scoop proteína + 20 g collagen peptides.",190]);let pw=(d.proteinWaterMode==="Tomada")||(d.proteinWaterMode==="Según plan"&&!rest),pwo=rest&&d.proteinWaterMode==="Según plan";if(pw)arr.push(["proteinWater","17:00","Protein water","Protein water.",80]);if(pwo)arr.push(["proteinWater","Opcional","Protein water opcional","Solo si hambre o comida se retrasa.",80]);let desc=solids[d.type][0];if(d.carb.includes("Arroz"))desc=desc.replace("papa 350 g","arroz 250 g estratégico");arr.push(["solid",rest?"14:00":addMin(end,180),"Comida sólida",desc,solids[d.type][1]]);if(d.type==="espalda"||d.type==="descanso")arr.push(["topping",rest?"14:00":addMin(end,180),"Topping sardinas","Huevo cocido + aguacate 50 g + yogur natural 50 g.",170]);arr.push(["bowl","18:30","Bowl fijo","Yogur 170 g + 1 scoop proteína + blueberries 90 g.",280]);arr.push(["sleep","19:00","Sueño","Magnesio + melatonina.",0]);return arr.map(x=>({id:x[0],time:x[1],name:x[2],desc:x[3],kcal:x[4]}))}function mstate(id){let d=day();if(!d.mealStates[id])d.mealStates[id]={checked:false,omitted:false,kcal:null};return d.mealStates[id]}function calc(d=day()){let base=0,omit=0,chk=0,cnt=0;meals(d).forEach(m=>{let s=d.mealStates[m.id]||{},v=s.kcal??m.kcal;if(s.omitted)omit+=v;else base+=v;if(s.checked)chk++;cnt++});let ex=d.extras.reduce((a,b)=>a+Number(b.kcal||0),0);return{base,omit,extras:ex,total:base+ex,chk,cnt}}
const routineBase={
pierna:[
["Calentamiento","Caminata o bici suave","","5 min","—","Solo elevar temperatura"],
["Calentamiento","Sentadilla al aire","","2×15","30–45 s","Rodillas siguen pies"],
["Calentamiento","Puente glúteo","","2×15","30–45 s","Aprieta arriba"],
["Calentamiento","Balanceos de pierna","","10 por pierna","—","Controlados"],
["Calentamiento","Serie ligera hack/prensa","","1×15","—","Preparación, no fatiga"],
["Pierna","Hack Squat","Base + 2 discos de 10 lb","4×10","2:00–2:30","Trípode del pie, baja controlado, no bloquees rodillas fuerte"],
["Pierna","Hip Thrust","230 lb","4×12","2:00","Pausa 1–2 s arriba, costillas abajo, no hiperextender espalda"],
["Pierna","Prensa","Base + 2 discos de 10 lb","3×12","2:00","Cadera pegada, rodillas no colapsan, no bloquear rodillas"],
["Pierna","Seated Leg Curl","130 lb","3×15","1:30","Controla bajada, aprieta femoral, sin rebote"],
["Pierna","Split Squat estático","25 lb por mancuerna","3×10 por pierna","1:30–2:00","Mirada fija, torso leve inclinado, pie firme"],
["Pierna","Abducción","190 lb","3×20","1:00–1:15","Pausa abierto, regreso controlado"],
["Pierna","Pull-through","42.5 lb","3×15","1:15","Bisagra de cadera, no brazos, aprieta glúteo"],
["Pierna","Pantorrilla sentado o de pie","Peso inicial cómodo","3×15–20","1:00","Baja completo, pausa abajo, sube fuerte, pausa arriba"],
["Core","Crunch pesado","170 lb","3×15","1:00","Costillas hacia pelvis, no jalar con brazos"],
["Core","Plank","BW","3×60 s","45–60 s","Glúteos apretados, costillas abajo"],
["Core","Vacío abdominal","BW","3×60 s","45–60 s","Exhala, ombligo hacia columna"],
["Cardio","Caminata inclinada","12%, 5.5 km/h","20 min + 5 opcional","—",""]
],
espalda:[
["Calentamiento","Dominadas escapulares","","3×10","45–60 s","Solo escápulas, brazos casi rectos"],
["Calentamiento","Band pull-aparts","","2×15","30–45 s","Abre pecho, no subas trapecio"],
["Calentamiento","Jalón amplio ligero","","1×15","—","Activación, no fatiga"],
["Dominadas rotativas","Set 1 prono","BW","reps limpias","2:00–2:30","Prono: palmas hacia afuera/abajo, nudillos arriba"],
["Dominadas rotativas","Set 2 prono","BW","reps limpias","2:00–2:30","Prono: palmas hacia afuera/abajo, nudillos arriba"],
["Dominadas rotativas","Set 3 rotativo A/B","BW","reps limpias","2:00–2:30","A = neutro, palmas enfrentadas. B = supino, palmas hacia ti"],
["Dominadas rotativas","Set 4 asistido","Asistencia editable","1×8–12","2:00","Agarre que peor salió ese día"],
["Espalda","Jalón amplio","70 lb","4×10","1:45–2:00","Prono: palmas hacia afuera/abajo. Pecho arriba, codos a costillas"],
["Espalda","Hammer Strength ISO-Lateral LOW ROW","4 discos de 45 lb + 2 discos de 25 lb registrados","4×10","2:00","Neutro: palmas enfrentadas. Peso editable como discos usados"],
["Espalda","Hammer Strength ISO-Lateral ROW","4 discos de 45 lb + 2 discos de 25 lb registrados","3×12 por lado","1:30–1:45","Neutro: palmas enfrentadas. Un brazo primero, luego el otro, no girar torso"],
["Espalda","Pullover en polea","70 lb","3×15","1:15–1:30","Brazos semi-extendidos, jala hacia muslos, dorsal manda"],
["Espalda","Rear Delt Machine / Reverse Pec Deck","Peso inicial cómodo","3×15–20","1:00","Deltoide posterior. No encoger trapecio, abre con codos suaves"],
["Bíceps","Curl Z","60 lb","3×12","1:30","Codos quietos, sin balanceo, RIR 2"],
["Bíceps","Curl inclinado","27.5 lb","3×12","1:15","Estira abajo, no adelantes codos"],
["Bíceps","Martillo","27.5 lb","3×12","1:15","Neutro: palmas enfrentadas, posición martillo"],
["Core","Elevaciones colgado en barra","BW","2×8–15","45–60 s","Sin columpio, pelvis al final"],
["Core","Elevaciones en silla romana","BW","1×15–20","45–60 s","Espalda pegada, sube rodillas y redondea"],
["Core","Plank","BW","3×60 s","45–60 s","Abdomen activo"],
["Cardio","Caminata inclinada","12%, 5.5 km/h","20 min + 5 opcional","—",""]
],
pecho:[
["Calentamiento","Band pull-aparts","","2×15","30–45 s","Abre pecho, no trapecio"],
["Calentamiento","Rotación externa con banda","","2×12–15 por lado","30–45 s","Hombro estable"],
["Calentamiento","Push-ups inclinadas","","1×12–15","—","Activación"],
["Calentamiento","Press banca DB ligero","","1×15","—","Preparación"],
["Pecho","Press banca DB","60 lb","4×8–10","2:00–2:30","Escápulas atrás/abajo, pies firmes, no chocar mancuernas"],
["Pecho","Press inclinado DB","50 lb","4×10","2:00","Banco moderado, no convertir en hombro"],
["Pecho","Pec Fly máquina","100 lb","3×12–15","1:15–1:30","No abrir demasiado, aprieta al centro"],
["Pecho","High-to-low Cable Fly","15 lb por lado","2×15","1:00–1:15","Poleas arriba, manos bajan hacia abdomen/cadera, pecho bajo"],
["Hombro","Press hombro DB","35 lb","3×10","1:45–2:00","Abdomen firme, no arquear espalda"],
["Hombro","Elevaciones laterales","25 lb","4×15","1:00–1:15","No impulso, no trapecio, hombros anchos"],
["Tríceps","Fondos máquina","160 lb","3×12","1:30–2:00","Hombros abajo, empuja con tríceps"],
["Tríceps","Extensión overhead en polea con cuerda","35–42.5 lb","3×12–15","1:15–1:30","Cabeza larga. Codos quietos, brazos arriba, abdomen firme"],
["Tríceps","Extensión cuerda normal","57.5 lb","2×12–15","1:15","Neutro: palmas enfrentadas en cuerda. Abre cuerda al final"],
["Tríceps","Fondos asistidos","40–55 lb asistencia","2×8–10 opcional","1:30","Solo si energía buena. No dejar hombros subir"],
["Core","Crunch pesado","150–170 lb","3×15","1:00","170 si energía alta, 150 si fatiga"],
["Core","Plank","BW","3×60 s","45–60 s","Costillas abajo"],
["Core","Vacío abdominal","BW","3×60 s","45–60 s","Ombligo hacia columna"],
["Core","Elevaciones opcionales","BW","2×15","45–60 s","Solo si energía 9–10"],
["Cardio","Caminata inclinada","12%, 5.5 km/h","20 min + 5 opcional","—",""]
],
descanso:[
["Descanso activo","Caminata","","60 min","Suave / zona 2","Respiración cómoda"],
["Descanso activo","Nado suave opcional","","10–20 min","Técnica, no competir","Relajado"],
["Descanso activo","Movilidad suave","","5–10 min","Ligera","Cadera, espalda, hombros"]
]
};
function exercises(d=day()){return routineBase[d.type].map((r,i)=>({id:d.type+"_"+i,section:r[0],name:r[1],suggested:r[2],sets:r[3],rest:r[4],cue:r[5]}))}function wstate(ex){let d=day();if(!d.workoutStates[ex.id])d.workoutStates[ex.id]={checked:false,used:ex.suggested,series:defaultSeries(ex.sets||ex.target),reps:'',pain:false,nextUp:false};if(d.workoutStates[ex.id].series===undefined)d.workoutStates[ex.id].series=defaultSeries(ex.sets||ex.target);if(d.workoutStates[ex.id].reps===undefined)d.workoutStates[ex.id].reps='';return d.workoutStates[ex.id]}
function defaultSeries(target){let m=String(target||"").match(/^(\d+)/);return m?m[1]:"";}
function parseReps(str){return String(str||"").split(/[\/, ]+/).map(x=>parseInt(x,10)).filter(n=>!isNaN(n));}
function progressionLabel(ex,st){
 if(st.pain)return["Molestia: mantener","warn"];
 let reps=parseReps(st.reps);
 if(!reps.length)return["Sin reps reales",""];
 let min=Math.min(...reps), sets=Number(st.series||reps.length||0);
 if(st.nextUp)return["Marcado para subir","good"];
 if(sets && reps.length>=sets && min>=10)return["Candidato a subir","good"];
 if(min<8)return["Validar fatiga/técnica","warn"];
 return["Mantener",""];
}

function wstats(d=day()){let list=exercises(d),done=0;list.forEach(e=>{if((d.workoutStates[e.id]||{}).checked)done++});return{done,total:list.length}}
function render(){let d=day(),c=calc(d),w=wstats(d);$("date").value=date;$("cycleStart").value=state.settings.cycleStart||today();$("autoDay").value=labels[autoType()];$("target").value=d.target;$("carb").value=d.carb;$("proteinWaterMode").value=d.proteinWaterMode;$("workoutStart").value=d.workoutStart;$("workoutEnd").value=d.workoutEnd;$("energy").value=d.energy;$("hunger").value=d.hunger;$("notes").value=d.notes||"";document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===d.type));$("total").textContent=c.total;$("basePill").textContent="Base: "+c.base+" kcal";$("omitPill").textContent="Omitidas: -"+c.omit+" kcal";$("checkPill").textContent=`Comidas ${c.chk}/${c.cnt} · Rutina ${w.done}/${w.total}`;$("lockPill").textContent=d.closed?"Día cerrado":"Día abierto";let diff=d.target-c.total;$("targetHint").textContent=diff>=0?`Te quedan ${diff} kcal.`:`Vas ${Math.abs(diff)} kcal arriba.`;$("bar").style.width=Math.min(100,c.total/d.target*100)+"%";renderMeals();renderExtras();renderWorkout();renderWeek();draw();persist()}function renderMeals(){let box=$("meals"),d=day();box.innerHTML="";meals(d).forEach(m=>{let s=mstate(m.id),v=s.kcal??m.kcal,el=document.createElement("div");el.className="meal"+(s.checked?" done":"")+(s.omitted?" omitted":"");el.innerHTML=`<input type="checkbox" ${s.checked?"checked":""}><input type="checkbox" ${s.omitted?"checked":""}><div><div class="title">${m.time} · ${m.name}</div><div class="desc">${m.desc}</div><div class="tiny">✓ completada · 🚫 no contar</div></div><input type="number" value="${v}">`;let ins=el.querySelectorAll("input");ins[0].onchange=e=>{if(d.closed)return;s.checked=e.target.checked;save()};ins[1].onchange=e=>{if(d.closed)return;s.omitted=e.target.checked;save()};ins[2].onchange=e=>{if(d.closed)return;s.kcal=Number(e.target.value||0);save()};box.appendChild(el)})}function renderExtras(){let d=day(),box=$("extras");box.innerHTML=d.extras.length?"":'<div class="hint" style="margin-top:10px">Sin adicionales.</div>';d.extras.forEach((e,i)=>{let el=document.createElement("div");el.className="extra";el.innerHTML=`<div><b>${e.name}</b></div><div class="kcal">${e.kcal} kcal</div><button class="btnDanger">Quitar</button>`;el.querySelector("button").onclick=()=>{if(d.closed)return;d.extras.splice(i,1);save()};box.appendChild(el)})}function renderWorkout(){
 let box=$("workout"),d=day();
 if(!showWorkout){box.innerHTML="";return}
 box.innerHTML="";
 let last="";
 exercises(d).forEach(ex=>{
  let s=wstate(ex), prog=progressionLabel(ex,s);
  let targetText=ex.sets || ex.target || "";
  if(ex.section!==last){
    let h=document.createElement("div");h.className="sectionTitle";h.textContent=ex.section;box.appendChild(h);last=ex.section;
  }
  let el=document.createElement("div");
  el.className="exercise"+(s.checked?" done":"");
  el.innerHTML=`<div class="exerciseTop"><input type="checkbox" ${s.checked?"checked":""}><div><div class="title">${ex.name}</div><div class="desc">Objetivo: ${targetText} · descanso ${ex.rest}<br>${ex.cue}</div><span class="badge ${prog[1]}">${prog[0]}</span></div></div><div class="exerciseFields3"><div><label>Peso usado</label><input value="${s.used||""}"></div><div><label>Series hechas</label><input value="${s.series||""}" inputmode="numeric"></div><div><label>Reps reales</label><input value="${s.reps||""}" placeholder="10/10/9/8"></div></div><div class="exerciseFlags"><label><input type="checkbox" ${s.pain?"checked":""}> Molestia</label><label><input type="checkbox" ${s.nextUp?"checked":""}> Subir próxima</label></div>`;
  let ins=el.querySelectorAll("input");
  ins[0].onchange=e=>{if(d.closed)return;s.checked=e.target.checked;save()};
  ins[1].onchange=e=>{if(d.closed)return;s.used=e.target.value;save()};
  ins[2].onchange=e=>{if(d.closed)return;s.series=e.target.value;save()};
  ins[3].onchange=e=>{if(d.closed)return;s.reps=e.target.value;save()};
  ins[4].onchange=e=>{if(d.closed)return;s.pain=e.target.checked;save()};
  ins[5].onchange=e=>{if(d.closed)return;s.nextUp=e.target.checked;save()};
  box.appendChild(el);
 });
}
function renderWeek(){let box=$("week");box.innerHTML="";for(let i=-3;i<=3;i++){let dd=new Date(date+"T00:00");dd.setDate(dd.getDate()+i);let iso=dd.toISOString().slice(0,10),d=state.days[iso],t=d?calc(d).total:0;let el=document.createElement("div");el.className="miniDay";el.innerHTML=`<b>${iso}</b> · ${labels[d?d.type:autoType(iso)]}<br><span class="tiny">${t?t+" kcal":"sin registro"} ${d?.closed?"· cerrado":""}</span>`;box.appendChild(el)}}function draw(){let cv=$("chart"),ctx=cv.getContext("2d"),w=cv.width,h=cv.height,p=40;ctx.clearRect(0,0,w,h);let rows=Object.keys(state.days).sort().map(k=>({date:k,total:calc(state.days[k]).total})).filter(x=>x.total);if(!rows.length){ctx.fillStyle="rgba(255,255,255,.7)";ctx.font="18px system-ui";ctx.fillText("Sin datos aún.",30,55);return}let max=Math.max(1600,...rows.map(r=>r.total)),x=i=>rows.length===1?w/2:p+i*((w-p*2)/(rows.length-1)),y=v=>h-p-v/max*(h-p*2);ctx.strokeStyle="rgba(124,199,255,.95)";ctx.lineWidth=4;ctx.beginPath();rows.forEach((r,i)=>i?ctx.lineTo(x(i),y(r.total)):ctx.moveTo(x(i),y(r.total)));ctx.stroke()}function save(){persist();render()}function setType(t){if(day().closed)return;state.days[date]=defDay(t);save()}document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>setType(b.dataset.tab));$("date").onchange=()=>{date=$("date").value||today();render()};$("cycleStart").onchange=()=>{state.settings.cycleStart=$("cycleStart").value;save()};$("useAuto").onclick=()=>setType(autoType());$("modeDecide").onclick=()=>setType(autoType());$("closeDay").onclick=()=>{day().closed=true;save()};$("reopenDay").onclick=()=>{day().closed=false;save()};$("gymNow").onclick=()=>{let d=day();if(d.closed)return;d.workoutStart=nowTime();d.workoutEnd=addMin(d.workoutStart,75);save()};$("replan").onclick=()=>save();["target","carb","proteinWaterMode","workoutStart","workoutEnd","energy","hunger"].forEach(id=>$(id).onchange=()=>{let d=day();if(d.closed)return;d[id]=id==="target"?Number($(id).value||0):$(id).value;save()});$("notes").oninput=()=>{let d=day();if(d.closed)return;d.notes=$("notes").value;persist()};$("addExtra").onclick=()=>{let d=day();if(d.closed)return;let n=$("extraName").value.trim(),k=Number($("extraKcal").value||0);if(!n)return;d.extras.push({name:n,kcal:k});$("extraName").value="";$("extraKcal").value="";save()};$("toggleWorkout").onclick=()=>{showWorkout=!showWorkout;render()};$("completeWorkout").onclick=()=>{if(day().closed)return;exercises().forEach(ex=>wstate(ex).checked=true);save()};$("deleteDay").onclick=()=>{delete state.days[date];persist();render()};$("export").onclick=()=>{let b=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="chloe_fit_backup.json";a.click();URL.revokeObjectURL(u)};$("importBtn").onclick=()=>$("importFile").click();$("importFile").onchange=async e=>{let f=e.target.files[0];if(!f)return;state=JSON.parse(await f.text());persist();render()};function summaryDay(d=day(),iso=date){let c=calc(d),w=wstats(d);return `${iso} · ${labels[d.type]} · ${c.total} kcal · omitidas ${c.omit} · comidas ${c.chk}/${c.cnt} · rutina ${w.done}/${w.total} · energía ${d.energy||"?"} · hambre ${d.hunger||"?"} · ${d.closed?"cerrado":"abierto"}`}$("copyDay").onclick=async()=>{
 let d=day();
 let exLines=exercises(d).map(ex=>{
   let s=d.workoutStates[ex.id]||{};
   return `- ${s.checked?"✅":"⬜"} ${ex.name}: peso ${s.used||""}; series ${s.series||""}; reps ${s.reps||""}; molestia ${s.pain?"sí":"no"}; subir ${s.nextUp?"sí":"no"}`;
 }).join("\n");
 await navigator.clipboard.writeText("Chloe analiza mi día:\n"+summaryDay()+"\n\nRutina:\n"+exLines+"\n\nNotas: "+(d.notes||"Sin notas"));
 status("Día copiado.");
};
$("weeklySummary").onclick=async()=>{
 let lines=[];
 Object.keys(state.days).sort().slice(-7).forEach(k=>lines.push(summaryDay(state.days[k],k)));
 let prog=[];
 Object.keys(state.days).sort().slice(-14).forEach(k=>{
   let d=state.days[k];
   exercises(d).forEach(ex=>{
     let s=d.workoutStates[ex.id];
     if(s?.checked){
       let p=progressionLabel(ex,s)[0];
       prog.push(`${k} · ${ex.name}: peso ${s.used||""}; series ${s.series||""}; reps ${s.reps||""}; molestia ${s.pain?"sí":"no"}; subir ${s.nextUp?"sí":"no"}; app: ${p}`);
     }
   });
 });
 await navigator.clipboard.writeText(`Chloe, resumen semanal:\n\n${lines.join("\n")}\n\nEjercicios/progresión:\n${prog.slice(-100).join("\n")}\n\nAnaliza kcal, adherencia, fatiga, progresión de pesos/reps y qué subir/mantener.`);
 status("Resumen semanal copiado.");
};

render();
