// === Onglet « supports » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabSupports(__props) {
  const { $accent, $bgCard, $border, $text, $textMut, $textSec, crmRd, filNom, filiales } = __props;
        const SUP_CATS = [{id:'plaquette',label:'Plaquettes',color:'#3b82f6',icon:'◇'},{id:'carte',label:'Cartes de visite',color:'#8b5cf6',icon:'▸'},{id:'signaletique',label:'Signalétique',color:'#f59e0b',icon:'●'},{id:'goodies',label:'Goodies',color:'#10b981',icon:'★'},{id:'template',label:'Templates',color:'#6366f1',icon:'◆'}];
        const supports = [
          {id:'SUP-001',categorie:'plaquette',nom:'Plaquette Group OY 2025',filiale:'Group',format:'A4 tri-volet',quantite:500,statut:'imprime',dateMaj:'2025-01-15',notes:'Version corporate avec toutes filiales'},
          {id:'SUP-002',categorie:'plaquette',nom:'Plaquette Ezel Bâtiment',filiale:'Ezel Bâtiment',format:'A4 bi-volet',quantite:300,statut:'imprime',dateMaj:'2024-11-01',notes:'Focus gros œuvre et rénovation'},
          {id:'SUP-003',categorie:'plaquette',nom:"Plaquette L'Échafaudage",filiale:"L'Échafaudage",format:'A5',quantite:200,statut:'a_mettre_a_jour',dateMaj:'2023-06-01',notes:'Ancienne version, besoin refonte'},
          {id:'SUP-004',categorie:'carte',nom:'Cartes de visite Direction',filiale:'YILMAZ SAS',format:'85x55mm recto-verso',quantite:250,statut:'imprime',dateMaj:'2025-01-10',notes:'Papier 350g mat soft touch'},
          {id:'SUP-005',categorie:'carte',nom:'Cartes de visite commerciaux',filiale:'Ezel Bâtiment',format:'85x55mm recto-verso',quantite:500,statut:'imprime',dateMaj:'2024-09-01',notes:''},
          {id:'SUP-006',categorie:'signaletique',nom:'Habillage véhicules La Roulotte',filiale:'La Roulotte',format:'Covering complet',quantite:15,statut:'en_cours',dateMaj:'2025-02-01',notes:'Nouveau design en production'},
          {id:'SUP-007',categorie:'signaletique',nom:'Panneaux chantier Ezel',filiale:'Ezel Bâtiment',format:'120x80cm Dibond',quantite:20,statut:'imprime',dateMaj:'2024-07-01',notes:''},
          {id:'SUP-008',categorie:'signaletique',nom:'Bâches échafaudages',filiale:"L'Échafaudage",format:'Variable',quantite:10,statut:'imprime',dateMaj:'2024-04-01',notes:'Bâches publicitaires mesh'},
          {id:'SUP-009',categorie:'goodies',nom:'Casques sérigraphiés',filiale:'Group',format:'Casque BTP',quantite:100,statut:'commande',dateMaj:'2025-02-10',notes:'Logo Group OY'},
          {id:'SUP-010',categorie:'template',nom:'Template devis Word',filiale:'Group',format:'.docx',quantite:0,statut:'actif',dateMaj:'2025-01-20',notes:'Modèle harmonisé toutes filiales'},
          {id:'SUP-011',categorie:'template',nom:'Template facture',filiale:'Group',format:'.docx',quantite:0,statut:'actif',dateMaj:'2025-01-20',notes:'Conforme réglementation e-facture'},
          {id:'SUP-012',categorie:'template',nom:'Présentation PPT Group',filiale:'Group',format:'.pptx',quantite:0,statut:'actif',dateMaj:'2024-12-01',notes:'Template McKinsey-style'}
        ];
        const statColors = {imprime:'#059669',actif:'#10b981',en_cours:'#f59e0b',commande:'#3b82f6',a_mettre_a_jour:'#ef4444'};
        const statLabels = {imprime:'Imprimé',actif:'Actif',en_cours:'En production',commande:'Commandé',a_mettre_a_jour:'À mettre à jour'};
        return (
          <div>
            <div style={{marginBottom:16}}><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Supports Commerciaux</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Plaquettes, cartes de visite, signalétique et templates</div></div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16}}>
              {SUP_CATS.map(cat => {
                const n = supports.filter(s=>s.categorie===cat.id).length;
                return <div key={cat.id} style={{background:$bgCard,borderRadius:crmRd,padding:'10px 14px',border:`1px solid ${$border}`,borderTop:'3px solid '+cat.color,textAlign:'center'}}>
                  <div style={{fontSize:'0.72rem',color:cat.color,fontWeight:600}}>{cat.icon} {cat.label}</div>
                  <div style={{fontSize:'1.3rem',fontWeight:800,color:$text,marginTop:4}}>{n}</div>
                </div>;
              })}
            </div>
            {SUP_CATS.map(cat => {
              const catItems = supports.filter(s=>s.categorie===cat.id);
              if(catItems.length===0) return null;
              return <div key={cat.id} style={{marginBottom:16}}>
                <div style={{fontWeight:700, color:cat.color, fontSize:'0.88rem', marginBottom:8}}>{cat.icon} {cat.label}</div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:10}}>
                  {catItems.map(s => (
                    <div key={s.id} style={{background:$bgCard,borderRadius:crmRd,padding:'12px 16px',border:`1px solid ${$border}`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                        <div style={{fontWeight:700,fontSize:'0.85rem',color:$text}}>{s.nom}</div>
                        <span style={{padding:'2px 8px',borderRadius:crmRd,background:(statColors[s.statut]||'#6b7280')+'15',color:statColors[s.statut]||'#6b7280',fontWeight:700,fontSize:'0.68rem',flexShrink:0}}>{statLabels[s.statut]||s.statut}</span>
                      </div>
                      <div style={{fontSize:'0.72rem',color:$accent,marginTop:3}}>{s.filialeId ? filNom(s.filialeId) : s.filiale} — {s.format}</div>
                      {s.quantite > 0 && <div style={{fontSize:'0.72rem',color:$textSec,marginTop:2}}>Quantité: {s.quantite}</div>}
                      {s.notes && <div style={{fontSize:'0.7rem',color:$textMut,marginTop:3,fontStyle:'italic'}}>{s.notes}</div>}
                      <div style={{fontSize:'0.68rem',color:'#d4d0c8',marginTop:4}}>MAJ: {s.dateMaj}</div>
                    </div>
                  ))}
                </div>
              </div>;
            })}
          </div>
        );
}
