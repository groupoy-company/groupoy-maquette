// === Onglet « guide » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabGuide(__props) {
  const { $accent, $bgCard, $bgSub, $border, $info, $success, $text, $textMut, $textSec, ca, crmRd, filiales, guideSection, niveau, setGuideSection, widgetDescriptions, widgetLabels } = __props;
          const sections = [
            {key:'widgets', label:'📊 Widgets du Tableau de Bord', desc:'Documentation complète des 20 widgets'},
            {key:'centres', label:'📋 Centre de Données', desc:'Saisie des données financières manuelles'},
            {key:'ruches', label:'🐝 Système Ruches', desc:'Modèle de rémunération variable'},
            {key:'structure', label:'🏛️ Organisation du Group', desc:'Holdings, filiales, services partagés'},
            {key:'glossaire', label:'📖 Glossaire BTP', desc:'Termes financiers et métier BTP'}
          ];

          return (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:28}}>
              <div style={{fontSize:'2.5rem'}}>📖</div>
              <div>
                <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Guide & Documentation</h1>
                <div style={{fontSize:'0.98rem', color:$textMut}}>Référentiel complet du Grand Rucher — Group OY</div>
              </div>
            </div>

            {/* Section tabs */}
            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:24}}>
              {sections.map(s => (
                <button key={s.key} onClick={() => setGuideSection(s.key)}
                  style={{padding:'10px 18px', borderRadius:crmRd, fontSize:'0.92rem', fontWeight:700, border: guideSection === s.key ? 'none' : `1px solid ${$border}`, background: guideSection === s.key ? 'linear-gradient(135deg, #FFC107, #ffab00)' : 'white', color: guideSection === s.key ? '#2d2216' : '#6b5d4d', cursor:'pointer', transition:'all 0.2s'}}
                >{s.label}</button>
              ))}
            </div>

            {/* WIDGETS SECTION */}
            {guideSection === 'widgets' && (
              <div>
                <p style={{fontSize:'0.98rem', color:$textSec, marginBottom:20, lineHeight:1.6}}>
                  Le Tableau de Bord du Group comprend <strong>20 widgets</strong> configurables, regroupés par catégorie. Chaque widget peut être activé/désactivé, redimensionné (½ ou pleine largeur) et réordonné via le panneau ⚙️ Widgets.
                </p>
                {['Pilotage', 'Finance', 'BTP / Rentabilité', 'BTP / Sous-traitance', 'BTP / Contrôle de gestion', 'BTP / Performance', 'RH / Finance', 'RH / Productivité', 'RH', 'Commercial', 'Opérationnel', 'Monitoring', 'Organisation', 'Comparaison', 'Répartition', 'Synthèse', 'Tendance', 'Finance / Trésorerie'].filter((cat, i, arr) => arr.indexOf(cat) === i).map(cat => {
                  const widgets = Object.entries(widgetDescriptions).filter(([k, v]) => v.categorie === cat);
                  if (widgets.length === 0) return null;
                  return (
                  <div key={cat} style={{marginBottom:24}}>
                    <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:12, paddingBottom:6, borderBottom:`2px solid ${$border}`}}>{cat}</h3>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(420px, 1fr))', gap:14}}>
                      {widgets.map(([wKey, desc]) => (
                        <div key={wKey} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:18, transition:'box-shadow 0.2s'}}
                          onMouseOver={e => e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)'}
                          onMouseOut={e => e.currentTarget.style.boxShadow='none'}
                        >
                          <div style={{fontWeight:700, fontSize:'0.92rem', color:$text, marginBottom:6}}>{widgetLabels[wKey]}</div>
                          <div style={{fontSize:'0.92rem', color:'#059669', fontWeight:600, marginBottom:8}}>{desc.short}</div>
                          <div style={{fontSize:'0.9rem', color:$textSec, lineHeight:1.55, marginBottom:12}}>{desc.detail}</div>
                          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                            <span style={{padding:'3px 10px', borderRadius:crmRd, background:'#f8f6f1', fontSize:'0.82rem', fontWeight:600, color:$accent}}>📂 {desc.categorie}</span>
                            <span style={{padding:'3px 10px', borderRadius:crmRd, background:$info+'12', fontSize:'0.82rem', fontWeight:600, color:'#2563eb'}}>🔄 {desc.frequence}</span>
                            <span style={{padding:'3px 10px', borderRadius:crmRd, background:$success+'12', fontSize:'0.82rem', fontWeight:600, color:'#059669'}}>📥 {desc.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
            {/* CENTRE DE DONNÉES */}
            {guideSection === 'centres' && (
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:24}}>
                  <h3 style={{fontSize:'1.05rem', fontWeight:700, color:$text, marginBottom:12}}>📋 Centre de Données</h3>
                  <p style={{fontSize:'0.95rem', color:$textSec, lineHeight:1.6, marginBottom:16}}>Le Centre de Données est le module de saisie manuelle des données financières par filiale et par année. Il permet de renseigner les valeurs réelles qui alimentent ensuite tous les widgets du Tableau de Bord.</p>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:16, marginBottom:16}}>
                    <div style={{fontWeight:700, fontSize:'0.98rem', color:$accent, marginBottom:10}}>Indicateurs disponibles (15 par filiale)</div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, fontSize:'0.92rem', color:$textSec}}>
                      {['CA (€)','Sous-traitance (€)','Marge Brute (€)','Frais Internes (€)','Frais Structure (€)','EBE (€)','Amortissements (€)','Résultat Net (€)','Trésorerie (€)','BFR (€)','Masse Salariale (€)','Effectif','Nb Chantiers','Objectif CA (€)','Objectif EBE (€)'].map((ind,i) => (
                        <div key={i} style={{padding:'4px 0'}}>• {ind}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:$info+'12', borderRadius:crmRd, padding:16}}>
                    <div style={{fontWeight:700, fontSize:'0.98rem', color:'#2563eb', marginBottom:8}}>💡 Règles de priorité</div>
                    <p style={{fontSize:'0.92rem', color:$textSec, lineHeight:1.6}}>Les données saisies manuellement dans le Centre de Données sont <strong>toujours prioritaires</strong> sur les valeurs calculées automatiquement. Si un champ est vide, le système utilise les calculs par défaut (ex: sous-traitance = CA × taux %, BFR = CA × 15%). Format : comptable français avec virgule et 2 décimales (1 234 567,00).</p>
                  </div>
                </div>
              </div>
            )}

            {/* SYSTÈME RUCHES */}
            {guideSection === 'ruches' && (
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:24}}>
                  <h3 style={{fontSize:'1.05rem', fontWeight:700, color:$text, marginBottom:12}}>🐝 Le Système Ruches</h3>
                  <p style={{fontSize:'0.95rem', color:$textSec, lineHeight:1.6, marginBottom:16}}>Modèle innovant de rémunération variable basé sur l'analogie de la ruche. Chaque collaborateur est affecté à un niveau (taille de ruche) selon le CA qu'il gère, avec une prime variable indexée sur l'atteinte de l'EBE cible.</p>
                  <div style={{background:$accent+'15', borderRadius:crmRd, padding:16, marginBottom:16}}>
                    <div style={{fontWeight:700, fontSize:'0.98rem', color:$accent, marginBottom:10}}>8 Niveaux de Ruche</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, fontSize:'0.9rem'}}>
                      {[{n:'XXS', ca:'< 500k€'}, {n:'XS', ca:'500k - 1M€'}, {n:'S', ca:'1M - 2M€'}, {n:'M', ca:'2M - 5M€'}, {n:'L', ca:'5M - 10M€'}, {n:'XL', ca:'10M - 20M€'}, {n:'XXL', ca:'20M - 30M€'}, {n:'XXXL', ca:'> 30M€'}].map(r => (
                        <div key={r.n} style={{padding:8, background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, textAlign:'center'}}>
                          <div style={{fontWeight:800, color:$accent}}>{r.n}</div>
                          <div style={{fontSize:'0.82rem', color:$textMut}}>{r.ca}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:$success+'12', borderRadius:crmRd, padding:16}}>
                    <div style={{fontWeight:700, fontSize:'0.98rem', color:'#059669', marginBottom:8}}>Mécanisme de Prime Variable</div>
                    <p style={{fontSize:'0.92rem', color:$textSec, lineHeight:1.6}}>La prime variable est calculée en fonction de l'écart entre l'EBE réalisé et l'EBE cible du niveau. Coefficient multiplicateur de 0 (objectif non atteint) à 1.3 (performance hors norme, +15pts au-dessus de la cible). Le widget "Objectifs EBE vs Réalisé" permet de suivre cette progression en temps réel.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STRUCTURE */}
            {guideSection === 'structure' && (
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:24}}>
                  <h3 style={{fontSize:'1.05rem', fontWeight:700, color:$text, marginBottom:12}}>🏛️ Organisation du Group OY</h3>
                  <div style={{fontSize:'0.95rem', color:$textSec, lineHeight:1.7}}>
                    <p style={{marginBottom:12}}><strong>GROUP OY</strong> est la holding mère qui détient l'ensemble du groupe. Elle supervise deux sous-holdings :</p>
                    <p style={{marginBottom:8, paddingLeft:16}}><strong>🏦 INVEST LOC</strong> — Holding Location : détient La Roulotte (location roulottes & matériel) et L'Échafaudage (location + montage/démontage d'échafaudages).</p>
                    <p style={{marginBottom:8, paddingLeft:16}}><strong>🏛️ INVEST EXE</strong> — Holding Exécution : détient Ezel Bâtiment (entreprise générale de bâtiment) et L'Étanchéité (travaux d'imperméabilisation).</p>
                    <p style={{marginBottom:12}}><strong>🐝 Yilmaz</strong> est la société de services partagés (Finance, RH, IT, Marketing) qui facture ses prestations à hauteur de 3% du CA opérationnel de chaque filiale.</p>
                  </div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:16}}>
                    <div style={{fontWeight:700, fontSize:'0.98rem', color:$accent, marginBottom:8}}>Services par filiale</div>
                    <p style={{fontSize:'0.92rem', color:$textSec, lineHeight:1.6}}>Chaque filiale est organisée en services (Bureau d'Études, Exécution, Affaires, Comptabilité, Administratif, etc.). Chaque service dispose de son propre module Processus & Procédures accessible via la navigation Filiale → Service → Processus.</p>
                  </div>
                </div>
              </div>
            )}

            {/* GLOSSAIRE */}
            {guideSection === 'glossaire' && (
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:24}}>
                <h3 style={{fontSize:'1.05rem', fontWeight:700, color:$text, marginBottom:16}}>📖 Glossaire BTP & Finance</h3>
                <div style={{display:'grid', gridTemplateColumns:'1fr', gap:2}}>
                  {[
                    ['CA', 'Chiffre d\'Affaires — montant total des ventes HT sur la période'],
                    ['Sous-traitance', 'Part du CA sous-traité à des entreprises extérieures. En BTP : 30 à 65% selon l\'activité'],
                    ['Marge Brute', 'CA − Sous-traitance. Mesure la valeur ajoutée propre de l\'entreprise'],
                    ['Frais Internes', 'Charges directes d\'exploitation (main d\'œuvre, matériaux, location matériel)'],
                    ['Frais de Structure', 'Charges indirectes (loyers, assurances, frais généraux). Typiquement ~6% du CA'],
                    ['EBE', 'Excédent Brut d\'Exploitation — Marge Brute − Frais Internes − Frais Structure. Indicateur clé de performance opérationnelle'],
                    ['Amortissements', 'Dotation annuelle pour l\'usure du matériel et équipements. Typiquement 3-5% du CA en BTP'],
                    ['Résultat d\'Exploitation', 'EBE − Amortissements. Résultat de l\'activité courante'],
                    ['Résultat Net', 'Résultat d\'exploitation − Impôts (25%). Profit final de l\'entreprise'],
                    ['BFR', 'Besoin en Fonds de Roulement — décalage entre encaissements et décaissements. Estimation : ~15% du CA en BTP'],
                    ['Trésorerie', 'Liquidités disponibles. Dépend du résultat net, du BFR et des investissements'],
                    ['Masse Salariale', 'Total des rémunérations (fixe + primes + variable). Cible BTP : 20-30% du CA'],
                    ['DSO', 'Days Sales Outstanding — délai moyen de paiement clients (en jours)'],
                    ['DPO', 'Days Payable Outstanding — délai moyen de paiement fournisseurs'],
                    ['DCE', 'Dossier de Consultation des Entreprises — documents d\'un appel d\'offres'],
                    ['CCTP', 'Cahier des Clauses Techniques Particulières — spécifications techniques du marché'],
                    ['DQE', 'Détail Quantitatif Estimatif — chiffrage détaillé des quantités et prix unitaires'],
                    ['OPR', 'Opérations Préalables à la Réception — vérifications avant livraison'],
                    ['DGD', 'Décompte Général Définitif — facture finale d\'un marché public'],
                    ['FNP', 'Factures Non Parvenues — charges engagées non encore facturées'],
                    ['CCA', 'Charges Constatées d\'Avance — charges payées concernant l\'exercice suivant'],
                    ['DUER', 'Document Unique d\'Évaluation des Risques — obligatoire en entreprise']
                  ].map(([terme, def], i) => (
                    <div key={i} style={{display:'flex', gap:12, padding:'10px 0', borderBottom:`1px solid ${$border}`}}>
                      <span style={{fontWeight:700, fontSize:'0.95rem', color:$accent, minWidth:160, flexShrink:0}}>{terme}</span>
                      <span style={{fontSize:'0.92rem', color:$textSec, lineHeight:1.5}}>{def}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          );
}
