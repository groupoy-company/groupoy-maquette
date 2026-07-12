// === Onglet « web » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabWeb(__props) {
  const { $accent, $bgCard, $border, $text, $textMut, $textSec, crmRd, filiales } = __props;
        const sites = [
          {id:'WEB-001',nom:'Site Group OY',url:'www.groupe-oy.fr',type:'Site vitrine',statut:'en_ligne',cms:'WordPress',hebergeur:'OVH',dateCreation:'2024-01-15',dateMaj:'2025-02-01',ssl:true,analytics:true,notes:'Site corporate, présentation filiales'},
          {id:'WEB-002',nom:'Site Ezel Bâtiment',url:'www.ezel-batiment.fr',type:'Site vitrine',statut:'refonte',cms:'WordPress',hebergeur:'OVH',dateCreation:'2022-06-01',dateMaj:'2024-08-01',ssl:true,analytics:true,notes:'Refonte en cours avec Agence Pixel'},
          {id:'WEB-003',nom:"Site L'Échafaudage",url:'www.lechafaudage-alsace.fr',type:'Site vitrine',statut:'en_ligne',cms:'WordPress',hebergeur:'OVH',dateCreation:'2023-03-01',dateMaj:'2024-11-10',ssl:true,analytics:false,notes:'Ajouter Google Analytics'},
          {id:'WEB-004',nom:'Site La Roulotte',url:'www.laroulotte-location.fr',type:'Site catalogue',statut:'en_ligne',cms:'WordPress',hebergeur:'OVH',dateCreation:'2023-09-01',dateMaj:'2025-01-15',ssl:true,analytics:true,notes:'Catalogue produits en ligne'}
        ];
        const gmb = [
          {id:'GMB-001',nom:'YILMAZ SAS',url:'g.co/yilmaz-mutzig',avis:12,note:4.5,statut:'verifie',dateMaj:'2025-02-20'},
          {id:'GMB-002',nom:'Ezel Bâtiment',url:'g.co/ezel-batiment',avis:28,note:4.2,statut:'verifie',dateMaj:'2025-02-18'},
          {id:'GMB-003',nom:"L'Échafaudage",url:'g.co/echafaudage-alsace',avis:8,note:4.0,statut:'verifie',dateMaj:'2025-01-10'},
          {id:'GMB-004',nom:'La Roulotte',url:'g.co/laroulotte-loc',avis:15,note:4.3,statut:'verifie',dateMaj:'2025-02-12'}
        ];
        const reseaux = [
          {id:'RS-001',plateforme:'LinkedIn',compte:'Group OY',abonnes:420,statut:'actif',dernierPost:'2025-02-22',url:'linkedin.com/company/groupe-oy'},
          {id:'RS-002',plateforme:'LinkedIn',compte:'Ezel Bâtiment',abonnes:185,statut:'actif',dernierPost:'2025-02-15',url:'linkedin.com/company/ezel-batiment'},
          {id:'RS-003',plateforme:'Facebook',compte:'La Roulotte Location',abonnes:340,statut:'actif',dernierPost:'2025-02-10',url:'facebook.com/laroulotte'},
          {id:'RS-004',plateforme:'Instagram',compte:'@ezel_batiment',abonnes:95,statut:'en_veille',dernierPost:'2024-11-20',url:'instagram.com/ezel_batiment'}
        ];
        const starsR = (n) => '★'.repeat(Math.floor(n)) + (n%1>=0.5?'½':'') + '☆'.repeat(5-Math.ceil(n));
        return (
          <div>
            <div style={{marginBottom:16}}><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Présence Web</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Sites, Google Business et réseaux sociaux</div></div>
            
            {/* Sites web */}
            <div style={{fontWeight:700, color:$accent, fontSize:'0.9rem', marginBottom:10}}>Sites Internet</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:12, marginBottom:20}}>
              {sites.map(s => {
                const sc = s.statut==='en_ligne'?'#059669':s.statut==='refonte'?'#f59e0b':'#6b7280';
                const sl = s.statut==='en_ligne'?'En ligne':s.statut==='refonte'?'En refonte':'Hors ligne';
                return <div key={s.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'14px 18px',borderTop:'3px solid '+sc}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div style={{fontWeight:700,fontSize:'0.92rem',color:$text}}>{s.nom}</div>
                    <span style={{padding:'2px 8px',borderRadius:crmRd,background:sc+'15',color:sc,fontWeight:700,fontSize:'0.7rem'}}>{sl}</span>
                  </div>
                  <div style={{fontSize:'0.82rem',color:'#3b82f6',marginTop:4}}>{s.url}</div>
                  <div style={{fontSize:'0.72rem',color:$textSec,marginTop:4}}>{s.type} — {s.cms} — {s.hebergeur}</div>
                  <div style={{display:'flex',gap:6,marginTop:8}}>
                    <span style={{padding:'2px 6px',borderRadius:crmRd,background: s.ssl?'#dcfce7':'#fef2f2',color: s.ssl?'#15803d':'#dc2626',fontSize:'0.65rem',fontWeight:600}}>SSL {s.ssl?'✓':'✕'}</span>
                    <span style={{padding:'2px 6px',borderRadius:crmRd,background: s.analytics?'#dcfce7':'#fef2f2',color: s.analytics?'#15803d':'#dc2626',fontSize:'0.65rem',fontWeight:600}}>Analytics {s.analytics?'✓':'✕'}</span>
                  </div>
                  {s.notes && <div style={{fontSize:'0.7rem',color:$textMut,marginTop:6,fontStyle:'italic'}}>{s.notes}</div>}
                </div>;
              })}
            </div>
            
            {/* Google Business */}
            <div style={{fontWeight:700, color:$accent, fontSize:'0.9rem', marginBottom:10}}>Google Business Profile</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:12, marginBottom:20}}>
              {gmb.map(g => (
                <div key={g.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'12px 16px'}}>
                  <div style={{fontWeight:700,fontSize:'0.88rem',color:$text}}>{g.nom}</div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6}}>
                    <span style={{fontSize:'1.1rem',fontWeight:800,color:'#f59e0b'}}>{g.note}</span>
                    <span style={{color:'#f59e0b',fontSize:'0.8rem'}}>{starsR(g.note)}</span>
                    <span style={{fontSize:'0.72rem',color:$textMut}}>({g.avis} avis)</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                    <span style={{padding:'2px 6px',borderRadius:crmRd,background:'#dcfce7',color:'#15803d',fontSize:'0.65rem',fontWeight:600}}>Vérifié ✓</span>
                    <span style={{fontSize:'0.68rem',color:$textMut}}>MAJ: {g.dateMaj}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Réseaux sociaux */}
            <div style={{fontWeight:700, color:$accent, fontSize:'0.9rem', marginBottom:10}}>Réseaux Sociaux</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:12}}>
              {reseaux.map(r => {
                const platColors = {LinkedIn:'#0a66c2',Facebook:'#1877f2',Instagram:'#e4405f',Twitter:'#1da1f2'};
                return <div key={r.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'12px 16px',borderLeft:'3px solid '+(platColors[r.plateforme]||'#6b7280')}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:'0.88rem',color:$text}}>{r.compte}</div>
                      <div style={{fontSize:'0.75rem',color:platColors[r.plateforme]||'#6b5d4d',fontWeight:600}}>{r.plateforme}</div>
                    </div>
                    <span style={{padding:'2px 8px',borderRadius:crmRd,background: r.statut==='actif'?'#dcfce7':'#fef3c7',color: r.statut==='actif'?'#15803d':'#a16207',fontWeight:700,fontSize:'0.7rem'}}>{r.statut==='actif'?'Actif':'En veille'}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:'0.75rem',color:$textSec}}>
                    <span>{r.abonnes} abonnés</span>
                    <span>Dernier post: {r.dernierPost}</span>
                  </div>
                </div>;
              })}
            </div>
          </div>
        );
}
