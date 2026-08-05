// === Onglet « conformite » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabConformite(__props) {
  const { $bgCard, $border, $text, $textMut, $textSec, chantiers, crmRd, empNom, filNom, filiales, filterByFiliale } = __props;
        const CONF_CATS = [{id:'duerp',label:'DUERP',color:'#ef4444',icon:'▲'},{id:'registre',label:'Registres obligatoires',color:'#3b82f6',icon:'◇'},{id:'certification',label:'Certifications',color:'#10b981',icon:'★'},{id:'prevention',label:'Plans de prévention',color:'#f59e0b',icon:'●'},{id:'controle',label:'Contrôles réglementaires',color:'#8b5cf6',icon:'◆'}];
        const items = [
          {id:'CONF-001',categorie:'duerp',titre:'DUERP YILMAZ SAS',filialeId:'yilmaz',filiale:'YILMAZ SAS',dateMAJ:'2025-12-01',prochaine:'2026-12-01',statut:'a_jour',responsableId:'EMP001',notes:'Mis à jour suite nouveau risque chimique amiante'},
          {id:'CONF-002',categorie:'duerp',titre:'DUERP Ezel Bâtiment',filialeId:3,filiale:'Ezel Bâtiment',dateMAJ:'2025-06-15',prochaine:'2026-06-15',statut:'a_jour',responsableId:'EMP005',notes:'Inclut risques chantiers en cours'},
          {id:'CONF-003',categorie:'duerp',titre:"DUERP L'Échafaudage",filialeId:2,filiale:"L'Échafaudage",dateMAJ:'2024-03-01',prochaine:'2025-03-01',statut:'urgent',responsableId:'EMP012',notes:'RENOUVELLEMENT EN RETARD ! À traiter en urgence.'},
          {id:'CONF-004',categorie:'duerp',titre:'DUERP La Roulotte',filialeId:1,filiale:'La Roulotte',dateMAJ:'2025-10-01',prochaine:'2026-10-01',statut:'a_jour',responsableId:'EMP004',notes:'Risques routiers et manutention'},
          {id:'CONF-005',categorie:'registre',titre:'Registre du personnel',filialeId:'all',filiale:'Toutes filiales',dateMAJ:'2026-02-20',prochaine:'',statut:'a_jour',responsableId:'EMP014',notes:'Tenu sur Sage Paie — mis à jour automatiquement'},
          {id:'CONF-006',categorie:'registre',titre:'Registre des dangers graves et imminents',filialeId:3,filiale:'Ezel Bâtiment',dateMAJ:'2025-11-10',prochaine:'',statut:'a_jour',responsableId:'EMP005',notes:'Dernier signalement : novembre 2025'},
          {id:'CONF-007',categorie:'certification',titre:'Qualibat 2112 — Maçonnerie béton armé',filialeId:3,filiale:'Ezel Bâtiment',dateMAJ:'2024-01-15',prochaine:'2028-01-15',statut:'a_jour',responsableId:'EMP001',notes:'Technicité confirmée. Renouvelé 4 ans.'},
          {id:'CONF-008',categorie:'certification',titre:'Qualibat 1512 — Échafaudages fixes',filialeId:2,filiale:"L'Échafaudage",dateMAJ:'2023-06-01',prochaine:'2027-06-01',statut:'a_jour',responsableId:'EMP006',notes:''},
          {id:'CONF-009',categorie:'certification',titre:'RGE — Reconnu Garant Environnement',filialeId:3,filiale:'Ezel Bâtiment',dateMAJ:'2024-09-01',prochaine:'2025-09-01',statut:'urgent',responsableId:'EMP001',notes:'Renouvellement URGENT — expiration septembre 2025'},
          {id:'CONF-010',categorie:'prevention',titre:'PdP chantier Résidence Colmar',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH001',dateMAJ:'2025-06-15',prochaine:'',statut:'a_jour',responsableId:'EMP005',notes:'Plan de prévention signé avec sous-traitants'},
          {id:'CONF-011',categorie:'prevention',titre:'PdP chantier Rénovation Strasbourg',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH003',dateMAJ:'2025-09-15',prochaine:'',statut:'a_jour',responsableId:'EMP005',notes:'Inclut protocole amiante sous-section 4'},
          {id:'CONF-012',categorie:'controle',titre:'Contrôle électrique locaux Mutzig',filialeId:'yilmaz',filiale:'YILMAZ SAS',dateMAJ:'2025-05-20',prochaine:'2026-05-20',statut:'a_jour',responsableId:'EMP003',notes:'APAVE — RAS, conformité validée'},
          {id:'CONF-013',categorie:'controle',titre:'Vérification générale périodique grue',filialeId:3,filiale:'Ezel Bâtiment',dateMAJ:'2025-10-01',prochaine:'2026-04-01',statut:'a_jour',responsableId:'EMP005',notes:'SOCOTEC — VGP semestrielle obligatoire'},
          {id:'CONF-014',categorie:'controle',titre:'Contrôle échafaudages — parc matériel',filialeId:2,filiale:"L'Échafaudage",dateMAJ:'2025-11-15',prochaine:'2026-05-15',statut:'a_jour',responsableId:'EMP006',notes:'LAYHER France — vérification annuelle'}
        ];
        const filteredItems = filterByFiliale(items);
        const urgents = filteredItems.filter(i => i.statut === 'urgent' || (i.prochaine && new Date(i.prochaine) < new Date(Date.now()+60*24*3600*1000) && new Date(i.prochaine) > new Date()));
        const expires = filteredItems.filter(i => i.prochaine && new Date(i.prochaine) < new Date());
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Conformité BTP</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Obligations réglementaires et certifications</div></div>
            </div>
            {(urgents.length > 0 || expires.length > 0) && (
              <div style={{marginBottom:14, padding:'12px 16px', borderRadius:crmRd, background: expires.length>0?'rgba(239,68,68,0.10)':'rgba(212,160,48,0.12)', borderLeft:'3px solid '+(expires.length>0?'#dc2626':'#d97706')}}>
                <div style={{fontWeight:700, color: expires.length>0?'#991b1b':'#92400e', fontSize:'0.88rem'}}>
                  {expires.length > 0 ? '▲ '+expires.length+' document(s) expiré(s)' : ''} {urgents.length > 0 ? '● '+urgents.length+' échéance(s) dans 60 jours' : ''}
                </div>
                <div style={{fontSize:'0.78rem', color:$textSec, marginTop:4}}>
                  {[...expires,...urgents].map(i => i.titre).join(', ')}
                </div>
              </div>
            )}
            <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16}}>
              {CONF_CATS.map(cat => {
                const n = filteredItems.filter(i=>i.categorie===cat.id).length;
                const nOk = filteredItems.filter(i=>i.categorie===cat.id&&i.statut==='a_jour').length;
                return <div key={cat.id} style={{background:$bgCard,borderRadius:crmRd,padding:'12px 14px',border:`1px solid ${$border}`,borderTop:'3px solid '+cat.color}}>
                  <div style={{fontSize:'0.7rem',color:cat.color,fontWeight:600}}>{cat.icon} {cat.label}</div>
                  <div style={{fontSize:'1.3rem',fontWeight:800,color:$text,marginTop:4}}>{nOk}/{n}</div>
                  <div style={{fontSize:'0.68rem',color: nOk===n?'#059669':'#f59e0b'}}>{nOk===n?'Tout à jour':'Attention requise'}</div>
                </div>;
              })}
            </div>
            {CONF_CATS.map(cat => {
              const catItems = filteredItems.filter(i=>i.categorie===cat.id);
              if(catItems.length===0) return null;
              return <div key={cat.id} style={{marginBottom:16}}>
                <div style={{fontWeight:700, color:cat.color, fontSize:'0.88rem', marginBottom:8}}>{cat.icon} {cat.label}</div>
                <div style={{display:'flex', flexDirection:'column', gap:6}}>
                  {catItems.map(item => {
                    const isUrgent = item.statut === 'urgent' || (item.prochaine && new Date(item.prochaine) < new Date(Date.now()+60*24*3600*1000));
                    const isExpired = item.prochaine && new Date(item.prochaine) < new Date();
                    return <div key={item.id} style={{background: isExpired?'rgba(239,68,68,0.10)':isUrgent?'rgba(212,160,48,0.12)':$bgCard,borderRadius:crmRd,padding:'10px 16px',border:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:'0.85rem',color:$text}}>{item.titre}</div>
                        <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>{item.filialeId === 'all' ? 'Toutes filiales' : filNom(item.filialeId)} — Resp: {item.responsableId ? empNom(item.responsableId) : '—'} {item.notes ? '— '+item.notes : ''}</div>
                      </div>
                      <div style={{textAlign:'right',flexShrink:0}}>
                        <span style={{padding:'2px 8px',borderRadius:crmRd,background: isExpired?'rgba(239,68,68,0.22)':isUrgent?'rgba(212,160,48,0.18)':'rgba(34,197,94,0.14)',color: isExpired?'#dc2626':isUrgent?'#a16207':'#15803d',fontWeight:700,fontSize:'0.72rem'}}>{isExpired?'Expiré':isUrgent?'Bientôt':'À jour'}</span>
                        {item.prochaine && <div style={{fontSize:'0.68rem',color:$textMut,marginTop:3}}>Éch: {item.prochaine}</div>}
                        <div style={{fontSize:'0.68rem',color:$textSec}}>MAJ: {item.dateMAJ}</div>
                      </div>
                    </div>;
                  })}
                </div>
              </div>;
            })}
          </div>
        );
}
