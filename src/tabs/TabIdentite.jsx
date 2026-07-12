// === Onglet « identite » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabIdentite(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, crmRd } = __props;
        const filiales = [
          {id:'groupe',nom:'Group OY',couleur1:'#8B6F47',couleur2:'#6d563a',couleur3:'#F8DC00',typo:'Montserrat',tagline:'Construire ensemble, bâtir l\'avenir'},
          {id:'yilmaz',nom:'YILMAZ SAS',couleur1:'#2d2216',couleur2:'#8B6F47',couleur3:'#d4c5a9',typo:'Montserrat',tagline:'Holding & services aux filiales'},
          {id:'ezel',nom:'Ezel Bâtiment',couleur1:'#007ab5',couleur2:'#3b82f6',couleur3:'#93c5fd',typo:'Inter',tagline:'Construction, rénovation, gros œuvre'},
          {id:'echafaudage',nom:"L'Échafaudage",couleur1:'#92400e',couleur2:'#f59e0b',couleur3:'#fde68a',typo:'Inter',tagline:'Location & montage échafaudages'},
          {id:'roulotte',nom:'La Roulotte',couleur1:'#064e3b',couleur2:'#10b981',couleur3:'#a7f3d0',typo:'Inter',tagline:'Location WC mobiles & barrières'}
        ];
        return (
          <div>
            <div style={{marginBottom:16}}><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Identité Visuelle</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Charte graphique du Group OY et ses filiales</div></div>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {filiales.map(f => (
                <div key={f.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                  <div style={{padding:'16px 20px',background:`linear-gradient(135deg, ${f.couleur1}, ${f.couleur2})`,color:'white'}}>
                    <div style={{fontWeight:800,fontSize:'1.1rem'}}>{f.nom}</div>
                    <div style={{fontSize:'0.78rem',opacity:0.8,marginTop:2}}>{f.tagline}</div>
                  </div>
                  <div style={{padding:'14px 20px'}}>
                    <div style={{display:'flex',gap:20,flexWrap:'wrap',alignItems:'center'}}>
                      <div>
                        <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:600,marginBottom:4}}>PALETTE</div>
                        <div style={{display:'flex',gap:6}}>
                          {[f.couleur1,f.couleur2,f.couleur3].map((c,i) => (
                            <div key={i} style={{textAlign:'center'}}>
                              <div style={{width:40,height:40,borderRadius:crmRd,background:c,border:`1px solid ${$borderAlt}`}}/>
                              <div style={{fontSize:'0.6rem',color:$textMut,marginTop:2}}>{c}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:600,marginBottom:4}}>TYPOGRAPHIE</div>
                        <div style={{fontSize:'1.1rem',fontWeight:700,color:$text,fontFamily:f.typo}}>{f.typo}</div>
                        <div style={{fontSize:'0.78rem',color:$textSec,fontFamily:f.typo}}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                        <div style={{fontSize:'0.78rem',color:$textSec,fontFamily:f.typo}}>abcdefghijklmnopqrstuvwxyz 0123456789</div>
                      </div>
                      <div>
                        <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:600,marginBottom:4}}>MONOGRAMME</div>
                        <div style={{width:48,height:48,borderRadius:crmRd,background:`linear-gradient(135deg, ${f.couleur1}, ${f.couleur2})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,fontSize:'1.1rem',letterSpacing:'-0.5px'}}>{f.nom.split(' ').map(w=>w[0]).join('').slice(0,3).toUpperCase()}</div>
                      </div>
                    </div>
                    <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                      {['Logo principal','Logo blanc','Favicon','Bandeau email','Signature email'].map(d => (
                        <span key={d} style={{padding:'4px 10px',borderRadius:crmRd,background:$bgSub,border:`1px solid ${$border}`,fontSize:'0.72rem',color:$accent,fontWeight:600}}>◇ {d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
}
