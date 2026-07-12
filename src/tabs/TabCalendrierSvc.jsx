// === Onglet « calendrier_svc » — extrait de App.jsx (modularisation, forme iife) ===
import { Legend } from 'recharts';

export default function TabCalendrierSvc(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, SERVICES_CONFIG, calAnnee, calMois, crmRd, navEntreprise, navService, setCalAnnee, setCalMois } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const today = new Date('2026-03-13');
          const moisNoms = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
          const joursNoms = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
          const premierJour = new Date(calAnnee, calMois, 1);
          let startDay = premierJour.getDay() - 1; if (startDay < 0) startDay = 6;
          const nbJours = new Date(calAnnee, calMois + 1, 0).getDate();

          // AO Réels (board 6470581185 — extraits le 2026-03-13)
          const AO_DEADLINES_REAL = [
            { date:'2026-03-10', titre:'Théâtre de la Concorde - Rénovation hall', client:'Ville de Paris', statut:'en_attente', color:'#ea580c', prio:'Haute' },
            { date:'2026-03-16', titre:'École Glacière - Étanchéité cour', client:'Ville de Paris', statut:'visite_rdv', color:'#0284c7', prio:'Moyenne' },
            { date:'2026-03-16', titre:'113 logts Champs-sur-Marne - Toitures terrasses', client:'3F Seine et Marne', statut:'visite_rdv', color:'#0284c7', prio:'Moyenne' },
            { date:'2026-03-23', titre:'ONERA Palaiseau - Lot n°4 Bâtiment X-ENSTA', client:'ONERA', statut:'a_preparer', color:$textSec, prio:'Moyenne', budget: 21400000 },
            { date:'2026-03-30', titre:'Réhab 75 rue Léon Frot - 24 lgts sociaux', client:'ELOGIE-SIEMP', statut:'a_preparer', color:$textSec, prio:'Moyenne' },
            { date:'2026-04-14', titre:'Murs de soutènement cimetières - Lot n°1', client:'VILLE de PARIS', statut:'a_preparer', color:$textSec, prio:'Moyenne' },
            { date:'2026-07-01', titre:'Réhab plan climat - Hôtel entreprises Bd Davout', client:'RIVP', statut:'a_preparer', color:$textSec, prio:'Moyenne' }
          ];

          const isEtudesPrix = navEntreprise === 'ezel' && navService === 'etudes_prix';
          const getEvents = () => {
            if (isEtudesPrix) {
              return AO_DEADLINES_REAL.map(ao => {
                const d = new Date(ao.date);
                return { jour: d.getDate(), mois: d.getMonth(), annee: d.getFullYear(), titre: ao.titre, color: ao.color, heure:'12:00', client: ao.client, statut: ao.statut, budget: ao.budget };
              });
            }
            return [{jour:5,titre:'Réunion équipe',color:'#3498db',heure:'09:00'},{jour:10,titre:'Point mensuel',color:$accent,heure:'10:00'},{jour:15,titre:'Revue planning',color:'#9b59b6',heure:'14:00'},{jour:20,titre:'Comité direction',color:'#e67e22',heure:'11:00'},{jour:25,titre:'Clôture mensuelle',color:'#059669',heure:'16:00'}];
          };
          const allEvents = getEvents();
          const eventsThisMonth = allEvents.filter(e => !isEtudesPrix || (e.mois === calMois && e.annee === calAnnee));
          const cells = [];
          for (let i = 0; i < startDay; i++) cells.push({ jour: null });
          for (let d = 1; d <= nbJours; d++) {
            const dayEvents = eventsThisMonth.filter(e => e.jour === d);
            cells.push({ jour: d, events: dayEvents });
          }
          while (cells.length % 7 !== 0) cells.push({ jour: null });

          const isToday = (j) => j === today.getDate() && calMois === today.getMonth() && calAnnee === today.getFullYear();

          const statutColors = { en_attente:'#ea580c', visite_rdv:'#0284c7', a_preparer:'#64748b', en_preparation:'#7f5347' };
          const statutLabels = { en_attente:'En attente réponse', visite_rdv:'Visite rdv', a_preparer:'À Préparer', en_preparation:'En préparation' };

          const upcomingAO = isEtudesPrix ? AO_DEADLINES_REAL.filter(ao => new Date(ao.date) >= today).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,5) : [];
          const fmtM = (v) => !v ? '–' : v>=1000000?(v/1000000).toFixed(1)+'M€':v>=1000?Math.round(v/1000)+'k€':v+'€';

          return (<div style={{display:'flex',flexDirection:'column',gap:16}}>
            {/* Header */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <h2 style={{margin:0,fontSize:'1.2rem',fontWeight:700,color:$text,display:'flex',alignItems:'center',gap:8}}>
                  📅 {isEtudesPrix ? 'Calendrier Deadlines AO' : 'Calendrier — ' + (SERVICES_CONFIG[navEntreprise]?.services.find(s=>s.id===navService)?.label||'Service')}
                </h2>
                <p style={{margin:'4px 0 0',fontSize:'0.85rem',color:$textMut}}>
                  {isEtudesPrix ? 'Dates limites de réponse · Visites de site · Board Monday.com 6470581185' : 'Vue mensuelle des événements du service'}
                </p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                {isEtudesPrix && <span style={{fontSize:'0.75rem',padding:'4px 10px',borderRadius:crmRd,background:'#e0f2fe',color:'#0369a1',fontWeight:600,border:'1px solid #bae6fd'}}>🟢 Monday.com</span>}
                <button onClick={() => { const d = new Date(calAnnee,calMois-1); setCalMois(d.getMonth()); setCalAnnee(d.getFullYear()); }} style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontSize:'0.85rem'}}>◀</button>
                <span style={{fontSize:'0.95rem',fontWeight:700,color:$text,minWidth:140,textAlign:'center'}}>{moisNoms[calMois]} {calAnnee}</span>
                <button onClick={() => { const d = new Date(calAnnee,calMois+1); setCalMois(d.getMonth()); setCalAnnee(d.getFullYear()); }} style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontSize:'0.85rem'}}>▶</button>
                <button onClick={() => { setCalMois(today.getMonth()); setCalAnnee(today.getFullYear()); }} style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontSize:'0.82rem',color:$textSec}}>Aujourd'hui</button>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns: isEtudesPrix ? '1fr 280px' : '1fr',gap:16}}>
              {/* Calendar grid */}
              <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:$bgSub}}>
                  {joursNoms.map(j => (<div key={j} style={{padding:'8px 0',textAlign:'center',fontSize:'0.75rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em'}}>{j}</div>))}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gridAutoRows:'90px'}}>
                  {cells.map((cell,i) => {
                    const todayCell = cell.jour && isToday(cell.jour);
                    return (<div key={i} style={{borderRight:`1px solid ${$border}`,borderBottom:`1px solid ${$border}`,padding:'6px',background: todayCell ? ($accent+'08') : cell.jour ? $bgCard : $bgSub,position:'relative',overflow:'hidden'}}>
                      {cell.jour && (<>
                        <span style={{fontSize:'0.8rem',fontWeight: todayCell ? 800 : 500,color: todayCell ? $accent : $textSec,width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',background: todayCell ? ($accent+'15') : 'transparent'}}>{cell.jour}</span>
                        <div style={{marginTop:2,display:'flex',flexDirection:'column',gap:2}}>
                          {(cell.events||[]).slice(0,2).map((ev,ei) => (<div key={ei} style={{fontSize:'0.67rem',fontWeight:600,color:'#fff',background:ev.color,borderRadius:3,padding:'1px 4px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={ev.titre}>{ev.heure && ev.heure!=='12:00'?ev.heure+' ':''}{ev.titre}</div>))}
                          {(cell.events||[]).length > 2 && <div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600}}>+{cell.events.length-2} autres</div>}
                        </div>
                      </>)}
                    </div>);
                  })}
                </div>
              </div>

              {/* Sidebar AO list — only for etudes_prix */}
              {isEtudesPrix && (<div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                  <h3 style={{margin:'0 0 12px',fontSize:'0.82rem',fontWeight:700,color:$text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Prochaines deadlines</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {upcomingAO.length === 0 && <p style={{fontSize:'0.82rem',color:$textMut,fontStyle:'italic'}}>Aucune deadline à venir</p>}
                    {upcomingAO.map((ao,i) => {
                      const d = new Date(ao.date);
                      const days = Math.ceil((d-today)/(1000*60*60*24));
                      const urgent = days <= 7;
                      return (<div key={i} style={{padding:'10px 12px',background: urgent ? '#fee2e2' : $bgSub,borderRadius:crmRd,border:`1px solid ${urgent ? '#fca5a5' : $border}`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:6}}>
                          <div style={{flex:1}}>
                            <div style={{fontSize:'0.78rem',fontWeight:600,color:$text,lineHeight:1.3}}>{ao.titre}</div>
                            <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>{ao.client}</div>
                          </div>
                          <div style={{textAlign:'right',flexShrink:0}}>
                            <div style={{fontSize:'0.75rem',fontWeight:700,color: urgent ? '#dc2626' : $accent}}>{d.getDate()}/{d.getMonth()+1}</div>
                            <div style={{fontSize:'0.68rem',color: urgent ? '#dc2626' : $textMut}}>{days}j</div>
                          </div>
                        </div>
                        {ao.budget && <div style={{fontSize:'0.7rem',color:'#7c3aed',fontWeight:600,marginTop:4}}>Budget: {fmtM(ao.budget)}</div>}
                        <div style={{marginTop:4}}>
                          <span style={{fontSize:'0.67rem',padding:'1px 6px',borderRadius:10,background:ao.color+'20',color:ao.color,fontWeight:600,border:`1px solid ${ao.color}40`}}>{statutLabels[ao.statut]||ao.statut}</span>
                        </div>
                      </div>);
                    })}
                  </div>
                </div>
                {/* Legend */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'12px 14px'}}>
                  <h3 style={{margin:'0 0 8px',fontSize:'0.78rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em'}}>Légende</h3>
                  {Object.entries(statutColors).map(([k,c]) => (<div key={k} style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                    <span style={{width:10,height:10,borderRadius:2,background:c,flexShrink:0}}></span>
                    <span style={{fontSize:'0.75rem',color:$text}}>{statutLabels[k]}</span>
                  </div>))}
                </div>
              </div>)}
            </div>
          </div>);
}
