/* GridScope V7 Reference Lab. PUBLIC FICTITIOUS DATA ONLY. */
(()=>{'use strict';
const $=s=>document.querySelector(s),safe=s=>String(s??'').replace(/[&<>"']/g,a=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]));
const PROV='SYNTHETIC_DEMONSTRATION_NOT_MEASURED';
const els=Array.from({length:12},(_,i)=>{const k=i+1,id='DEMO-TX-'+String(k).padStart(3,'0'),kva=[25,50,100,200,315,400,630,100,50,200,100,25][i],feeder='DEMO-FDR-'+String(Math.floor(i/4)+1).padStart(2,'0');return {id,feeder,kva,consumers:Math.round(kva*.35+i*3),i}});
const keyinfo={
electrical:['Electrical: transformer losses, PF/LF','Sample Z%, copper/core W, peak utilisation, PF, LF','Certified vendor test sheets, measured peak load and PF/LF'],
loading:['Electrical: load/current','Sample loading, demand kW and LV current','Transformer monitors and 15-minute loading data'],
commercial:['Commercial, population & AMI','Synthetic meters, households, persons, billed kWh and anomaly %','Official MDM/billing plus spatial WorldPop/Census analysis'],
conductor:['Conductor master','Illustrative ohm/km, reactance and ampacity','Approved temperature-rated DISCO conductor master'],
switches:['Network source/switch','Assumed source and switching status','Operations single-line, SCADA switch states and alternate supplies'],
hazards:['Flood, heat & faults','Fictional depth, foundation, heat, condition, faults, access','Observed floods/DEM, foundations and OMS/field inspections'],
cim:['CIM identifiers/connectivity','Fictitious mRID/terminal/node relationships','Approved CIM version, stable IDs and validated electrical topology'],
inspection:['Field verification/closure','Fictional inspection outcomes and dates','Signed reports, photos, dates and audit logs']
};
const tables={};
tables.electrical=els.map(e=>({asset_id:e.id,feeder_id:e.feeder,sample_kva:e.kva,model_impedance_pct:e.kva<200?4:5,model_core_loss_w:Math.round(90+e.kva*1.5),model_full_load_copper_loss_w:Math.round(300+e.kva*11),model_peak_loading_pct:55+(e.i*7)%35,model_pf:(.82+(e.i%7)*.016).toFixed(2),model_load_factor:(.45+(e.i%5)*.04).toFixed(2),value_provenance:PROV}));
tables.loading=els.map(e=>({asset_id:e.id,feeder_id:e.feeder,sample_peak_kva:Math.round(e.kva*(55+(e.i*7)%35)/100),sample_lv_amps:Math.round(e.kva*1000*(.55+(e.i*7)%35/100)/(Math.sqrt(3)*415)),sample_month:'2026-09',value_provenance:PROV}));
tables.commercial=els.map(e=>({asset_id:e.id,month:'2026-09',sample_active_meters:Math.round(e.consumers*.85),sample_households:Math.round(e.consumers*1.2),sample_population:Math.round(e.consumers*5.2),sample_billed_kwh:Math.round(e.consumers*.85*135),sample_ami_anomaly_pct:(3+e.i*1.2).toFixed(1),value_provenance:PROV}));
tables.conductor=['Rabbit','Dog','Osprey','Weasel'].map((n,i)=>({conductor_name:n,sample_R_ohm_per_km:[.55,.28,.17,.9][i],sample_X_ohm_per_km:[.38,.35,.33,.4][i],sample_ampacity_A:[180,310,475,120][i],value_provenance:PROV}));
tables.switches=['DEMO-FDR-01','DEMO-FDR-02','DEMO-FDR-03'].map(n=>({feeder_id:n,sample_source_node:'DEMO_SOURCE_'+n,sample_switch_id:'DEMO_SW_'+n,sample_status:'UNVERIFIED_CLOSED',sample_alternative_supply:'NOT_MODELLED',value_provenance:PROV}));
tables.hazards=els.map(e=>({asset_id:e.id,sample_flood_depth_m:(.1+(e.i%5)*.25).toFixed(2),sample_ground_elevation_m:181+(e.i%9),sample_foundation_height_m:(.2+(e.i%4)*.2).toFixed(2),sample_heat_c:35+e.i%8,sample_faults_24m:e.i%3,sample_condition:['Good','Fair','Needs checking'][e.i%3],sample_access:['Accessible','Restricted'][e.i%2],value_provenance:PROV}));
tables.cim=els.map(e=>({asset_id:e.id,sample_mRID:'DEMO-PT-'+e.id,sample_cim_class:'PowerTransformer',sample_terminal_HT:'DEMO-TERM-H-'+e.id,sample_terminal_LT:'DEMO-TERM-L-'+e.id,sample_connectivity_node:'DEMO-CN-'+e.id,sample_cim_profile:'UNSELECTED_DEMO',value_provenance:PROV}));
tables.inspection=els.map(e=>({asset_id:e.id,sample_inspection_date:'2026-09-15',sample_status:['Pending','Scheduled','Reviewed DEMO'][e.i%3],sample_outcome:'NOT_VERIFIED',sample_note:'No field visit undertaken',value_provenance:PROV}));
const imported=new Set;
function csvText(rows){if(!rows.length)return'';const cols=Object.keys(rows[0]),enc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return [cols.map(enc).join(','),...rows.map(r=>cols.map(k=>enc(r[k])).join(','))].join('\r\n')}
function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),800)}
function chosen(){return $('#ref7Type').value}
function render(){const cat=chosen(),rows=tables[cat],query=$('#ref7Search').value.toLowerCase(),filtered=rows.filter(x=>Object.values(x).some(v=>String(v).toLowerCase().includes(query))),fields=Object.keys(rows[0]||{});
$('#ref7Table').innerHTML='<thead><tr>'+fields.map(x=>'<th>'+safe(x)+'</th>').join('')+'</tr></thead><tbody>'+filtered.slice(0,35).map(r=>'<tr>'+fields.map(k=>'<td>'+safe(r[k])+'</td>').join('')+'</tr>').join('')+'</tbody>';
$('#ref7Count').textContent=filtered.length+' matching rows, '+rows.length+' total. Displaying up to 35; download includes the selected table.';
$('#ref7Status').textContent=imported.has(cat)?'USER-IMPORTED / NOT VERIFIED':'SYNTHETIC EXAMPLE';
if(cat==='electrical'){$('#ref7Transformer').innerHTML=rows.map(r=>'<option value="'+safe(r.asset_id)+'">'+safe(r.asset_id)+'</option>').join('')}
}
function calculate(){const id=$('#ref7Transformer').value,r=tables.electrical.find(x=>String(x.asset_id)===id);if(!r)return $('#ref7Calculation').textContent='Select an electrical reference row first.';
let lf=Number(r.model_load_factor),load=Number(r.model_peak_loading_pct)/100,core=Number(r.model_core_loss_w)*8.76,cu=Number(r.model_full_load_copper_loss_w)*load*load*(.3*lf+.7*lf*lf)*8.76,total=core+cu;
if(![core,cu,total].every(Number.isFinite)){return $('#ref7Calculation').textContent='Imported values are incomplete or invalid for this demonstration.'}
$('#ref7Calculation').innerHTML='<div class="pair"><div>Core loss / yr<strong>'+Math.round(core).toLocaleString()+' kWh</strong></div><div>Copper loss / yr<strong>'+Math.round(cu).toLocaleString()+' kWh</strong></div><div>Combined model loss<strong>'+Math.round(total).toLocaleString()+' kWh</strong></div><div>Load factor<strong>'+lf.toFixed(2)+'</strong></div></div><p class="muted">Demonstration only. Fixed core loss; assumed full-load copper loss × peak utilisation² × model LF factor. This is not a measured or regulatory transformer-loss result.</p>'}
function parseCSV(s){let rows=[],row=[],cell='',quoted=false;for(let i=0;i<s.length;i++){let c=s[i];if(c==='"'){if(quoted&&s[i+1]==='"'){cell+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){row.push(cell.trim());cell=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&s[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell=''}else cell+=c}if(quoted)throw Error('Unclosed CSV quotation');row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows}
async function importFile(){try{const file=$('#ref7Import').files?.[0];if(!file)throw Error('Choose CSV first');if(file.size>1000000)throw Error('File exceeds 1 MB demo limit');const rows=parseCSV(await file.text());if(rows.length<2)throw Error('No data rows');const head=rows.shift().map(x=>x.toLowerCase().replace(/^\ufeff/,'')),cat=chosen(),expected=Object.keys(tables[cat][0]),missing=expected.filter(k=>!head.includes(k.toLowerCase()));if(missing.length)throw Error('Missing required fields: '+missing.join(', '));let recs=rows.map(row=>Object.fromEntries(expected.map(k=>[k,row[head.indexOf(k.toLowerCase())]??''])));if(recs.length>500)throw Error('Max 500 rows');if(recs.some(x=>!Object.keys(x).length))throw Error('Invalid row');tables[cat]=recs;imported.add(cat);$('#ref7ImportResult').textContent='Imported '+recs.length+' reference rows. User-provided and NOT independently verified. Browser-session only.';render();if(cat==='electrical')calculate()}catch(err){$('#ref7ImportResult').textContent='Import rejected: '+err.message}}
function init(){if(!$('#ref7Type'))return;$('#ref7Type').innerHTML=Object.entries(keyinfo).map(([k,x])=>'<option value="'+k+'">'+safe(x[0])+'</option>').join('');
$('#ref7SourceRows').innerHTML=Object.entries(keyinfo).map(([k,x])=>'<tr><td>'+safe(x[0])+'</td><td>'+safe(x[1])+'</td><td>'+safe(x[2])+'</td></tr>').join('');
$('#ref7Type').onchange=()=>{$('#ref7Search').value='';render();calculate()};$('#ref7Search').oninput=render;$('#ref7Download').onclick=()=>download('GridScope_V7_'+chosen()+'_'+(imported.has(chosen())?'USER_IMPORT':'SYNTHETIC')+'.csv',csvText(tables[chosen()]));$('#ref7Load').onclick=importFile;$('#ref7Calculate').onclick=calculate;render();calculate();
document.querySelectorAll('.navbtn[data-page="reference"]').forEach(x=>x.addEventListener('click',()=>{render();calculate()}));
}
document.addEventListener('DOMContentLoaded',init);
})();