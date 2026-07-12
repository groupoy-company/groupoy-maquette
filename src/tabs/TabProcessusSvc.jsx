// === Onglet « processus_svc » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabProcessusSvc(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, crmRd, filialesDynamiques, navEntreprise, navService, processusOuvert, setProcessusOuvert } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const fil = filialesDynamiques.find(f => f.id === parseInt(navEntreprise)) || {nom: navEntreprise, icon: '▪'};
          const svc = navService;
          const processusParService = {
            etudes_prix: {
              titre: "Bureau d'Études de Prix — Ezel Bâtiment",
              couleur: '#007ab5',
              processus: [
                { nom: 'Phase 1 — Veille AO & Sélection', icon: '⌕', duree: 'Continu', couleur: '#3b82f6', etapes: ['Surveillance BOAMP/SPIGAO quotidienne (IDF + CPV 45xxx)', 'Import AO dans le module Veille AO', 'Screening rapide (objet, lot, zone géographique)', 'Analyse go/no-go (compatibilité technique, délai, ressources)', 'Arbitrage Direction si nécessaire (> 500k€ ou stratégique)', 'Passage en Suivi Dossiers si GO'], kpis: ['Nb AO détectés/mois', 'Taux go/no-go', 'Délai screening'], outils: ['Module Veille AO', 'BOAMP API', 'Monday.com board Études'] },
                { nom: 'Phase 2 — Visite & Précisions', icon: '◆', duree: '1–5 jours', couleur: '#0284c7', etapes: ['Planification visite si obligatoire (contact MOA)', 'Confirmation RDV (email auto Monday → MOA)', 'Réalisation visite de chantier', 'Prise de photos + notes terrain', 'Soumission Q&R si besoin (demandes de précisions)', 'Réception réponses MOA + mise à jour dossier', 'Décision : poursuivre ou Visite abandonnée'], kpis: ['% visites planifiées dans les délais', 'Délai Q&R moyen', 'Nb visites problématiques'], outils: ['Module Suivi Dossiers', 'Google Drive — dossier visite', 'Module Calendrier'] },
                { nom: 'Phase 3 — Consultation ST & Préparation', icon: '✱', duree: '5–20 jours', couleur: ACC, etapes: ['Envoi DCE aux sous-traitants sélectionnés (après NDA)', 'Réception et analyse chiffrages ST', 'Établissement DQE (Décomposition Quantitative Estimative)', 'Chiffrage interne + marge', 'Consultation freelance spécialisé si besoin (NDA obligatoire)', 'Validation David (Responsable Bureau d\'Études)', 'Validation Özdogan si montant > 500k€', 'Rédaction mémoire technique', 'Constitution dossier administratif (DC1, DC2, KBIS, attestations)'], kpis: ['Délai moyen préparation', 'Écart budget estimé/offre', '% dossiers complets J-1 deadline', 'Coût préparation < 0,5% montant'], outils: ['Module Suivi Dossiers', 'Google Drive — templates', 'Catalogue ST', 'Yousign (signatures)'] },
                { nom: 'Phase 4 — Dépôt & Soumission', icon: '↥', duree: '1–2 jours', couleur: '#ea580c', etapes: ['Vérification complétude dossier (checklist)', 'Génération fichiers PDF finaux', 'Signature électronique DGE/DQE si requis (Yousign)', 'Dépôt sur plateforme dématérialisée (Achatpublic, AWS, PLACE...)', 'Confirmation réception accusé dépôt', 'Archivage dossier déposé (Google Drive)', 'Mise à jour statut Monday → En attente de Réponse', 'Email auto envoyé à MOA + équipe'], kpis: ['Taux dépôts dans les délais', '% dossiers complets au dépôt', 'Délai moyen J(prépa→dépôt)'], outils: ['Plateformes AO', 'Yousign', 'Google Drive — dossiers déposés', 'Monday.com'] },
                { nom: 'Phase 5 — Attente Réponse & Négociation', icon: '⏳', duree: '15–90 jours', couleur: '#64748b', etapes: ['Suivi date notification marché', 'Relance MOA si silence > 30j', 'Réception résultat (attributaire/non-attributaire)', 'En cas de rejet : demande de rapport de notation si droit', 'En cas de négociation : préparation arguments prix', 'Mise à jour Monday avec résultat', 'Archivage avec retour d\'expérience'], kpis: ['Taux de succès global', 'Taux par type de marché', 'Délai moyen notification', 'Montant moyen marché gagné'], outils: ['Module Suivi Dossiers', 'Monday.com', 'Module Statistiques'] }
              ]
            },
            etudes: {
              titre: "Bureau d'Études",
              processus: [
                { nom: 'Réception & Analyse AO', etapes: ['Réception dossier DCE', 'Vérification conformité pièces', 'Analyse technique du CCTP', 'Chiffrage quantitatif (DQE)', 'Consultation sous-traitants', 'Établissement prix de vente', 'Rédaction mémoire technique', 'Validation direction (si > 500k€)', 'Dépôt offre avant date limite'], kpis: ['Délai moyen de réponse', 'Taux de conformité DCE', 'Précision du chiffrage vs réalisé'], outils: ['Module Veille AO', 'Réponses AO', 'Centre de Données'] },
                { nom: 'Suivi Technique Chantier', etapes: ['Réception plans d\'exécution', 'Vérification conformité normes', 'Validation méthodes', 'Suivi avancement technique', 'Gestion des modifications', 'Réception partielle / OPR', 'Levée des réserves'], kpis: ['Taux de réserves', 'Délai levée réserves'], outils: ['Planning Gantt', 'Module Chantiers'] }
              ]
            },
            execution: {
              titre: 'Exécution / Chantiers',
              processus: [
                { nom: 'Lancement Chantier', etapes: ['Ordre de service reçu', 'Installation de chantier', 'Plan d\'installation validé', 'Affectation chef de chantier', 'Commande matériaux', 'Contrats sous-traitants signés', 'Réunion de lancement', 'Ouverture registre de chantier'], kpis: ['Délai OS → démarrage', 'Budget installation vs prévu'], outils: ['Module Chantiers', 'Planning Gantt'] },
                { nom: 'Suivi d\'Exécution', etapes: ['Pointage journalier main d\'œuvre', 'Suivi consommation matériaux', 'Situations mensuelles', 'Réunions de chantier hebdo', 'Photos d\'avancement', 'Gestion des aléas/imprévus', 'Facturation par situation'], kpis: ['Avancement vs planning', 'Budget consommé vs avancement', 'Marge prévisionnelle à fin'], outils: ['Top 5 Chantiers', 'Alertes', 'Objectifs CA/EBE'] },
                { nom: 'Clôture Chantier', etapes: ['Pré-réception interne', 'OPR (Opérations Préalables à la Réception)', 'PV de réception', 'Levée des réserves', 'DGD (Décompte Général Définitif)', 'Facturation finale + retenue de garantie', 'Retour d\'expérience', 'Archivage dossier'], kpis: ['Délai clôture', 'Écart marge prévue vs réalisée', 'Taux de réserves'], outils: ['Module Chantiers', 'Décomposition Charges'] }
              ]
            },
            affaires: {
              titre: 'Affaires & Appels d\'Offres',
              processus: [
                { nom: 'Veille Commerciale', etapes: ['Surveillance plateformes AO (BOAMP, marchés publics)', 'Identification opportunités', 'Analyse go/no-go', 'Attribution au chargé d\'affaires', 'Suivi délais de réponse'], kpis: ['Nombre AO détectés/mois', 'Taux de réponse', 'Taux de conversion'], outils: ['Module Veille AO', 'Pipeline Commercial'] },
                { nom: 'Négociation & Contractualisation', etapes: ['Analyse du besoin client', 'Visite terrain si nécessaire', 'Élaboration offre commerciale', 'Négociation conditions', 'Signature contrat/marché', 'Transmission au bureau d\'études', 'Planification ressources'], kpis: ['Délai moyen négociation', 'Taux de transformation devis', 'Montant moyen par affaire'], outils: ['Pipeline Commercial', 'Tableau Filiales'] }
              ]
            },
            exploitation: {
              titre: 'Exploitation & Logistique',
              processus: [
                { nom: 'Gestion du Parc', etapes: ['Inventaire matériel', 'Planification des locations', 'Contrôle technique périodique', 'Maintenance préventive', 'Réparations curatives', 'Suivi kilométrique/horométrique', 'Amortissement comptable'], kpis: ['Taux d\'utilisation parc', 'Coût maintenance/CA', 'Âge moyen du parc'], outils: ['KPI Dashboard', 'Centre de Données'] },
                { nom: 'Logistique Chantier', etapes: ['Planification livraisons', 'Préparation matériel', 'Transport et mise en place', 'Suivi sur chantier', 'Retour et contrôle état', 'Facturation location'], kpis: ['Taux de disponibilité', 'Délai livraison moyen'], outils: ['Planning Gantt', 'Calendrier Service'] }
              ]
            },
            commercial: {
              titre: 'Commercial & Location',
              processus: [
                { nom: 'Prospection & Devis', etapes: ['Identification prospects', 'Premier contact', 'Visite / évaluation besoin', 'Établissement devis', 'Relance commerciale', 'Signature bon de commande'], kpis: ['Nombre devis/mois', 'Taux de transformation', 'Panier moyen'], outils: ['Pipeline Commercial', 'CA/Collaborateur'] },
                { nom: 'Suivi Client', etapes: ['Livraison / mise en service', 'Suivi satisfaction', 'Facturation', 'Relance impayés', 'Renouvellement contrat'], kpis: ['Taux satisfaction', 'DSO (délai paiement)', 'Taux de fidélisation'], outils: ['Trésorerie/BFR', 'Alertes'] }
              ]
            },
            comptabilite: {
              titre: 'Comptabilité',
              processus: [
                { nom: 'Cycle Fournisseurs', etapes: ['Réception factures', 'Rapprochement BC/BL/Facture', 'Saisie comptable', 'Circuit de validation', 'Mise en paiement', 'Lettrage', 'Déclaration TVA'], kpis: ['Délai traitement facture', 'Taux d\'erreur saisie', 'DPO (délai paiement fournisseur)'], outils: ['Centre de Données', 'Trésorerie/BFR'] },
                { nom: 'Cycle Clients', etapes: ['Émission situation/facture', 'Envoi client', 'Suivi encaissements', 'Relance impayés (J+30, J+60, J+90)', 'Provision créances douteuses', 'Lettrage'], kpis: ['DSO (délai paiement client)', 'Taux de recouvrement', 'Encours clients'], outils: ['Trésorerie/BFR', 'Alertes'] },
                { nom: 'Clôture Mensuelle', etapes: ['Rapprochement bancaire', 'FNP / CCA', 'Situations de chantier', 'Calcul marge par chantier', 'Reporting filiale', 'Consolidation groupe'], kpis: ['Délai clôture', 'Nombre d\'écritures correctrices'], outils: ['Compte de Résultat', 'Décomposition Charges', 'Masse Salariale'] }
              ]
            },
            administratif: {
              titre: 'Administratif',
              processus: [
                { nom: 'Gestion Administrative', etapes: ['Courrier entrant/sortant', 'Archivage documents', 'Gestion assurances & garanties', 'Déclarations légales', 'Suivi conformité réglementaire', 'Renouvellement certifications'], kpis: ['Délai traitement courrier', 'Taux de conformité'], outils: ['Alertes'] },
                { nom: 'Gestion RH', etapes: ['Recrutement & intégration', 'Gestion paie', 'Suivi absences / congés', 'Formation continue', 'Entretiens annuels', 'DUER / sécurité'], kpis: ['Turnover', 'Taux absentéisme', 'Budget formation/CA'], outils: ['Collaborateurs', 'Masse Salariale', 'Évolution Effectif'] }
              ]
            },
            planification: {
              titre: 'Planification',
              processus: [
                { nom: 'Planification des Travaux', etapes: ['Analyse du planning marché', 'Identification chemin critique', 'Affectation ressources', 'Phasage travaux', 'Suivi avancement', 'Mise à jour planning', 'Alertes retard'], kpis: ['Respect délais', 'Taux d\'occupation ressources', 'Écart planning prévu/réalisé'], outils: ['Planning Gantt', 'Calendrier Service', 'Top 5 Chantiers'] }
              ]
            },
            materiel: {
              titre: 'Parc Matériel',
              processus: [
                { nom: 'Gestion du Matériel', etapes: ['Inventaire & codification', 'Contrôle technique', 'Maintenance préventive planifiée', 'Gestion des pannes', 'Suivi coûts par engin', 'Décision renouvellement / réforme'], kpis: ['Taux de disponibilité', 'Coût/heure par engin', 'Âge moyen parc'], outils: ['Centre de Données', 'Alertes'] }
              ]
            }
          };
          const svcData = processusParService[svc] || { titre: svc, processus: [{ nom: 'Processus standard', etapes: ['Définition à personnaliser'], kpis: ['À définir'], outils: ['Dashboard'] }] };

          return (
          <div>
            {/* ── Processus Header ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:20,overflow:'hidden'}}>
              <div style={{height:3,background:`linear-gradient(90deg,${ACC},${ACC}60)`}}/>
              <div style={{padding:'16px 22px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:10,background:ACC+'15',border:`1px solid ${ACC}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem'}}>{fil.icon||'☰'}</div>
                  <div>
                    <h1 style={{fontSize:'1.05rem',fontWeight:800,letterSpacing:'-0.02em',margin:0,color:$text}}>Processus & Procédures</h1>
                    <div style={{fontSize:'0.78rem',color:$textMut,marginTop:2}}>{fil.nom} · {svcData.titre} · {svcData.processus.length} phases</div>
                  </div>
                </div>
                <span style={{fontSize:'0.68rem',padding:'3px 10px',borderRadius:10,background:ACC+'12',color:ACC,fontWeight:700,border:`1px solid ${ACC}25`}}>Documentation interne</span>
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {svcData.processus.map((proc, pi) => {
                const isOpen = processusOuvert === pi;
                return (
                <div key={pi} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', transition:'box-shadow 0.2s', boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'}}>
                  <div onClick={() => setProcessusOuvert(isOpen ? null : pi)}
                    style={{padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', background: isOpen ? $bgSub : $bgCard, transition:'background 0.15s'}}
                    onMouseOver={e => { if (!isOpen) e.currentTarget.style.background=$bgSub; }}
                    onMouseOut={e => { if (!isOpen) e.currentTarget.style.background=$bgCard; }}
                  >
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <span style={{width:32,height:32,borderRadius:8,background:proc.couleur?proc.couleur+'15':ACC+'15',border:`1px solid ${proc.couleur||ACC}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>{proc.icon||'☰'}</span>
                      <div>
                        <div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{proc.nom}</div>
                        <div style={{fontSize:'0.85rem', color:$textMut}}>{proc.etapes.length} étapes · {proc.kpis.length} KPIs · {(proc.outils || []).length} outils</div>
                      </div>
                    </div>
                    <span style={{fontSize:'1.2rem', color:'#c9b896', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.2s'}}>▾</span>
                  </div>

                  {isOpen && (
                  <div style={{padding:'0 24px 24px'}}>
                    <div style={{marginBottom:20}}>
                      <div style={{fontSize:'0.88rem', fontWeight:700, color:$accent, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12}}>Étapes du processus</div>
                      <div style={{position:'relative', paddingLeft:24}}>
                        <div style={{position:'absolute', left:7, top:4, bottom:4, width:2, background:`linear-gradient(to bottom, ${ACC}, ${ACC}40)`}} />
                        {proc.etapes.map((etape, ei) => (
                          <div key={ei} style={{display:'flex', alignItems:'flex-start', gap:12, marginBottom:10, position:'relative'}}>
                            <div style={{width:16, height:16, borderRadius:'50%', background: ei===0?ACC:ei===proc.etapes.length-1?ACC+'80':$bgCard, border:`2px solid ${ACC}60`, flexShrink:0, marginLeft:-20, marginTop:2, zIndex:1}} />
                            <div style={{fontSize:'0.95rem', color:$text, lineHeight:1.4}}>
                              <span style={{fontWeight:600, color:$textMut, fontSize:'0.82rem', marginRight:8}}>#{ei+1}</span>
                              {etape}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{marginBottom:20}}>
                      <div style={{fontSize:'0.88rem', fontWeight:700, color:$accent, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10}}>Indicateurs de performance (KPIs)</div>
                      <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
                        {proc.kpis.map((kpi, ki) => (
                          <span key={ki} style={{padding:'6px 14px', borderRadius:crmRd, background:$bgSub, border:`1px solid ${$border}`, fontSize:'0.82rem', fontWeight:600, color:$textSec}}>◺ {kpi}</span>
                        ))}
                      </div>
                    </div>

                    {proc.outils && proc.outils.length > 0 && (
                    <div>
                      <div style={{fontSize:'0.88rem', fontWeight:700, color:$accent, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10}}>Widgets & Outils associés</div>
                      <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
                        {proc.outils.map((outil, oi) => (
                          <span key={oi} style={{padding:'6px 14px', borderRadius:crmRd, background:ACC+'10', border:`1px solid ${ACC}25`, fontSize:'0.82rem', fontWeight:600, color:ACC}}>✱ {outil}</span>
                        ))}
                      </div>
                    </div>
                    )}
                  </div>
                  )}
                </div>
                );
              })}
            </div>

            {/* Récapitulatif outils */}
            {(() => {
              const allOutils = [...new Set(svcData.processus.flatMap(p => p.outils || []))];
              if (!allOutils.length) return null;
              return (
                <div style={{marginTop:8,padding:'14px 20px',background:$bgSub,borderRadius:crmRd,border:'1px solid '+$border,display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',flexShrink:0}}>Outils liés</span>
                  {allOutils.map((o,i) => (
                    <span key={i} style={{padding:'3px 10px',borderRadius:crmRd,background:ACC+'10',border:'1px solid '+ACC+'25',fontSize:'0.75rem',fontWeight:600,color:ACC}}>✱ {o}</span>
                  ))}
                </div>
              );
            })()}
          </div>
          );
}
