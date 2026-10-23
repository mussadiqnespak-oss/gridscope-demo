
/* Extra GridScope V6 engineering modules. Public synthetic/demo tools only. */
(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const safe=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const f=(n,d=0)=>Number.isFinite(Number(n))?Number(n).toLocaleString('en-GB',{maximumFractionDigits:d}):'—';
function csvDownload(name,txt,mime='text/csv;charset=utf-8'){const u=URL.createObjectURL(new Blob([txt],{type:mime})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),700)}
const titleMap={network:'HT / LT network intelligence',asset:'Asset & transformer intelligence',qc:'GIS engineering quality control',loss:'Load flow & technical losses',ami:'Smart Meter / AMI intelligence',energy:'Energy reconciliation',resilience:'Network resilience',cim:'CIM / model interoperability'};
let edges=[],selectedEdge=0,qcRows=[['Schema','Not run','Choose a file']];
const cimRows=[
['FeederID / FeederCode','Feeder / EquipmentContainer','GIS candidate','Reconcile permanent feeder identifier'],
['HT_Lines.SectionID','ACLineSegment / IdentifiedObject','GIS candidate','Ensure uniquely stable asset mRID'],
['HT_Lines.LengthKM','ACLineSegment / length','GIS measured','Validate length units and section splitting'],
['HT_Poles geometry','ConnectivityNode / Location','Geometric candidate','Verify actual electrical junction and topology'],
['ConductorN','WireInfo / impedance reference','Partial','Add conductor master R, X, capacity, phase'],
['HT / LT line endpoints','Terminal → ConnectivityNode','Missing electrical terminals','Validate phase and device terminal connections'],
['LT_Poles.EquipmentI','PowerTransformer candidate','Provisional','Confirm official transformer asset and KVA'],
['Consumers.EquipmentI','EnergyConsumer / UsagePoint candidate','Provisional','Validate consumer, transformer and service-point link'],
['Consumers.Phase','EnergyConsumer phase attributes','Mostly missing','Field-verified phase and voltage'],
['Switch device inventory','Breaker / Disconnector / Switch','Not supplied','Device IDs and normally open/closed state'],
['Grid feeder source','Substation / feeder topology','Not verified','Source terminals, voltage and operating state'],
['Meter reading / serial master','Meter / UsagePoint + readings','Not supplied','Approved meter ID and measured interval values'],
['Transformer losses / impedance','PowerTransformerEnd / parameters','Not supplied','Rated voltage, impedance, copper and core loss']
];
function num(id,min=0,max=Infinity){let x=Number($(id).value);if(!Number.isFinite(x)||x<min||x>max)throw Error('Invalid value for '+id.replace('#','')+' (expected '+min+' to '+max+')');return x}
function networkInit(){
 const base=[[0,1],[1,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[4,5],[8,9]];
 edges=base.map((pair,i)=>({name:'SPAN-'+String(i+1).padStart(2,'0'),u:pair[0],v:pair[1]}));
 $('#enSpan').innerHTML=edges.map((e,i)=>'<option value="'+i+'">'+e.name+' (N'+e.u+' → N'+e.v+')</option>').join('');
 networkScenario();
 $('#enSpan').onchange=networkScenario;$('#enFeeder').onchange=networkScenario;$('#enSimulate').onclick=networkScenario;
 $('#enExport').onclick=()=>csvDownload('GridScope_Sample_HT_Graph.csv','span_id,from_node,to_node,source\n'+edges.map(e=>[e.name,'N'+e.u,'N'+e.v,'SYNTHETIC'].join(',')).join('\n'));
}
function reachable(block){let seen=new Set([0]),queue=[0];while(queue.length){let x=queue.shift();for(let i=0;i<edges.length;i++){if(i===block)continue;let e=edges[i],n=e.u===x?e.v:e.v===x?e.u:null;if(n!=null&&!seen.has(n)){seen.add(n);queue.push(n)}}}return seen}
function networkScenario(){let cut=Number($('#enSpan').value||0),s=reachable(cut),bridges=edges.filter((e,i)=>reachable(i).size<12);$('#enNodes').textContent='12';$('#enSpans').textContent=String(edges.length);$('#enBridges').textContent=String(bridges.length);$('#enDownstream').textContent=String(12-s.size);let positions=[[68,153],[180,153],[284,78],[284,229],[394,77],[394,223],[505,60],[505,239],[616,60],[616,230],[704,60],[704,230]];
 let color=['#398aa7','#45baa3','#e4a45c'];let line=edges.map((e,i)=>{let a=positions[e.u],b=positions[e.v],removed=i===cut;return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+(removed?'#d35f55':color[0])+'" stroke-width="'+(removed?5:3.5)+'" stroke-dasharray="'+(removed?'7 6':'none')+'" />'}).join('');
 let nodes=positions.map((p,i)=>'<g><circle cx="'+p[0]+'" cy="'+p[1]+'" r="14" stroke="#fff" stroke-width="3" fill="'+(s.has(i)?color[i===0?1:0]:'#de9a59')+'"/><text x="'+p[0]+'" y="'+(p[1]+4)+'" fill="#fff" font-size="10" font-weight="700" text-anchor="middle">'+i+'</text></g>').join('');
 $('#enTopology').innerHTML='<text x="18" y="22" fill="#62829a" font-size="12">Demonstration topology — blue: source-connected; orange: unreachable; red dotted: disconnected span</text>'+line+nodes+'<text x="50" y="192" fill="#416379" font-size="10">Source</text>';
 $('#enMessage').textContent='Removing '+edges[cut].name+' leaves '+s.size+' of 12 example nodes connected to the source. '+(12-s.size)+' would become geometrically unreachable. This does not calculate live outages or switching alternatives.';
}
function assetInit(){ $('#enAssetTemplate').onclick=()=>csvDownload('Transformer_Master_Template.csv','asset_id,feeder_code,pole_id,equipment_id,kva,hv_kv,lv_kv,phases,impedance_pct,core_loss_w,copper_loss_w,switching_status,effective_date\n');}
function parseCSV(txt){let rows=[],row=[],val='',q=false;for(let i=0;i<txt.length;i++){let ch=txt[i];if(ch==='"'){if(q&&txt[i+1]==='"'){val+='"';i++}else q=!q}else if(ch===','&&!q){row.push(val.trim());val=''}else if((ch==='\n'||ch==='\r')&&!q){if(ch==='\r'&&txt[i+1]==='\n')i++;row.push(val.trim());if(row.some(x=>x!==''))rows.push(row);row=[];val=''}else val+=ch}if(q)throw Error('CSV unclosed quoted text');row.push(val.trim());if(row.some(x=>x!==''))rows.push(row);return rows}
function qcInit(){
$('#enQCCheck').onclick=async()=>{try{let file=$('#enQCFile').files[0];if(!file)throw Error('Select a CSV file first');if(file.size>2500000)throw Error('Use a CSV below 2.5 MB');let rows=parseCSV(await file.text());if(rows.length<2)throw Error('File has no data rows');let h=rows.shift().map(x=>x.toLowerCase()),kind=$('#enQCType').value,fields={lines:['sectionid','feederid'],poles:['poleid','feederid'],equipment:['asset_id','feeder_code','kva']}[kind],missing=fields.filter(x=>!h.includes(x));qcRows=[];qcRows.push(['Required fields',missing.length?'FAIL':'PASS',missing.length?'Missing: '+missing.join(', '):'Expected columns present']);let idcol=h.indexOf(kind==='lines'?'sectionid':kind==='poles'?'poleid':'asset_id'),feedercol=h.indexOf(kind==='equipment'?'feeder_code':'feederid'),records=rows.filter(r=>r.some(Boolean));let keys=new Set(),duplicates=0,empty=0;
for(let row of records){if(feedercol>=0&&!row[feedercol])empty++;if(idcol>=0){let key=(feedercol>=0?row[feedercol]+'|':'')+row[idcol];if(!row[idcol])empty++;else if(keys.has(key))duplicates++;else keys.add(key)}}qcRows.push(['Duplicate ID + feeder',duplicates?'REVIEW':'PASS',duplicates+' duplicate combinations found']);qcRows.push(['Missing identity / feeder',empty?'REVIEW':'PASS',empty+' blank references']);qcRows.push(['Total source rows','COUNT',String(records.length)]);
$('#enQCResult').textContent='Completed basic schema and ID checks on '+records.length+' rows. Spatial topology and field correctness still require GIS processing.';qcTable()}catch(err){$('#enQCResult').textContent='QC failed: '+err.message}};
$('#enQCExport').onclick=()=>csvDownload('GridScope_Local_QC_Findings.csv','check,result,explanation\n'+qcRows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'));
}
function qcTable(){$('#enQCTable').innerHTML=qcRows.map(r=>'<tr><td>'+safe(r[0])+'</td><td><b>'+safe(r[1])+'</b></td><td>'+safe(r[2])+'</td></tr>').join('')}
let lossLast=null;
function lossCalc(){try{let lf=num('#enLF',0,1),pf=num('#enPF',.001,1),amp=num('#enAmp'),v=num('#enVolt',.001),tae=num('#enTAE',.001),peakLoss=num('#enPeakLoss');let factor=.3*lf+.7*lf*lf,peakMW=Math.sqrt(3)*v*amp*pf/1000,yearLoss=peakLoss*factor*8760,pct=100*yearLoss/tae;lossLast={lf,pf,amp,v,tae,peakLoss,factor,peakMW,yearLoss,pct};$('#enLossFactor').textContent=f(factor,3);$('#enPeakMW').textContent=f(peakMW,3);$('#enAnnualLoss').textContent=f(yearLoss,0)+' kWh';$('#enLossPct').textContent=f(pct,2)+'%';$('#enLossExplanation').textContent='Illustrative annual loss = assumed peak conductor loss '+f(peakLoss)+' kW × model loss factor '+f(factor,3)+' × 8,760 hours. Peak demand = √3 × kV × A × PF / 1000. This is a sensitivity, not actual FESCO audited losses.'}catch(e){$('#enLossExplanation').textContent='Invalid input: '+e.message}}
function lossInit(){$('#enLossCalc').onclick=lossCalc;$('#enLossExport').onclick=()=>{if(!lossLast)lossCalc();if(!lossLast)return;csvDownload('GridScope_LF_PF_Sensitivity.csv','LF,PF,CurrentA,VoltageKV,TAE_kWh,PeakLossKW,LossFactor,PeakMW,AnnualLossKWh,LossPct,provenance\n'+Object.values(lossLast).join(',')+',ILLUSTRATIVE\n')};lossCalc()}
function amiInit(){$('#enAMIHelp').onclick=()=>csvDownload('AMI_Aggregate_Template.csv','zone_id,month,ami_anomaly_pct\nS-01-01,2025-01,7.5\n');}
let energyLast=null;
function energyCalc(){try{let input=num('#enGridInput',.001),billed=num('#enBilled'),technical=num('#enTechnical'),coverage=num('#enCoverage',0,100),gap=input-billed,residual=gap-technical;energyLast={input,billed,technical,coverage,gap,residual,percent:100*gap/input};$('#enDifference').textContent=f(gap,0)+' kWh';$('#enResidual').textContent=f(residual,0)+' kWh';$('#enDifferencePct').textContent=f(energyLast.percent,2)+'%';$('#enEnergyCoverage').textContent=f(coverage,1)+'%';$('#enEnergyWarning').textContent=(coverage<100?'WARNING: incomplete meter data coverage ('+f(coverage,1)+'%). ':'')+(residual>=0?'Unreconciled example difference '+f(residual,0)+' kWh.':'Technical-loss input exceeds the observed example difference. ')+ 'Residual is NOT a theft estimate; check data alignment, supply mapping and losses.'}catch(e){$('#enEnergyWarning').textContent='Check inputs: '+e.message}}
function energyInit(){$('#enEnergyCalc').onclick=energyCalc;$('#enEnergyExport').onclick=()=>{if(!energyLast)energyCalc();if(energyLast)csvDownload('GridScope_Energy_Balance_Sample.csv','grid_kwh,billed_kwh,technical_kwh,meter_coverage_pct,energy_difference_kwh,unreconciled_kwh,difference_pct,status\n'+Object.values(energyLast).join(',')+',ILLUSTRATIVE\n')};energyCalc()}
function resilienceInit(){$('#enResCalc').onclick=resilienceCalc;resilienceCalc()}
function resilienceCalc(){try{let meters=num('#enAffectedMeters'),people=num('#enResPerMeter'),damaged=num('#enDamagedPoles'),capacity=num('#enCrewCapacity',.001);$('#enResidents').textContent=f(Math.round(meters*people));$('#enCrewDays').textContent=f(Math.ceil(damaged/capacity))+' crew-day(s)'}catch(e){$('#enResidents').textContent='Invalid';$('#enCrewDays').textContent='Invalid'}}
function cimInit(){
$('#enCIMRows').innerHTML=cimRows.map(r=>'<tr>'+r.map(x=>'<td>'+safe(x)+'</td>').join('')+'</tr>').join('');
let checks=[['Geometric features and feeder IDs','Available as mapping candidates'],['HT node-to-node geometry','Derived; electrical topology unconfirmed'],['Unique stable asset identifiers','Require official master mapping'],['Transformer KVA/impedance/phases','Not provided'],['Switch status and source terminals','Not provided'],['Conductor impedance master','Not provided'],['Authorised meter and usage point data','Not provided'],['CIM profile and exchange conformance','Not configured']];
$('#enCIMStatus').innerHTML=checks.map(r=>'<div class="dataflag"><b>'+safe(r[0])+'</b>'+safe(r[1])+'</div>').join('');
$('#enCIMExport').onclick=()=>csvDownload('GridScope_CIM_Crosswalk_DRAFT.csv','source_layer_field,cim_concept,availability,validation_needed\n'+cimRows.map(r=>r.map(x=>'"'+x.replace(/"/g,'""')+'"').join(',')).join('\n'));
$('#enCIMJSON').onclick=()=>{let obj={note:'DRAFT mapping concept only. NOT a conformant CIM export or network model.',standards:['IEC 61970-301','IEC 61968-11','IEC 61968-9'],mapping:cimRows.map(r=>({source:r[0],cim_concept:r[1],readiness:r[2],validation:r[3]}))};csvDownload('GridScope_CIM_Concept_DRAFT.json',JSON.stringify(obj,null,2),'application/json')};
}
function wire(){
for(let x of $$('.navbtn'))if(titleMap[x.dataset.page])x.addEventListener('click',()=>{$('#pagetitle').textContent=titleMap[x.dataset.page]});
for(let x of $$('[data-private-link]'))x.addEventListener('click',()=>{$('.navbtn[data-page="private"]').click();$('#privateStatus').textContent='To access the actual 14-module FESCO private portal, choose its V5 HTML file below. Then select CIM or the required module in its own sidebar.'});
networkInit();assetInit();qcInit();lossInit();amiInit();energyInit();resilienceInit();cimInit();
}
document.addEventListener('DOMContentLoaded',wire);
})();