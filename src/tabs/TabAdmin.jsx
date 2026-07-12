// === Onglet « admin » — extrait de App.jsx (modularisation, forme simple) ===
import { DEFAULT_PERMISSIONS, NIVEAUX_ACCES, NIVEAUX_HIERARCHIQUES, ROLES, SERVICES } from '../data/constants.js';

export default function TabAdmin(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, adminTab, canEdit, canView, configOnglets, crmRd, currentUser, editUserData, editUserId, employes, filiales, filialesDynamiques, isSuperAdmin, niveau, ordreOnglets, setAdminTab, setCurrentUser, setEditUserData, setEditUserId, setFilialesDynamiques, setUsers, users } = __props;
  return (
          <>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 style={{fontSize:'1.3rem', fontWeight:700, color:$text, display:'flex', alignItems:'center', gap:8, color:"#8B6F47"}}>✱ Administration</h2>
              <div style={{display:'flex', gap:8}}>
                <button onClick={() => setAdminTab('users')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${adminTab==='users' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>◉ Utilisateurs</button>
                <button onClick={() => setAdminTab('roles')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${adminTab==='roles' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🔑 Rôles & Permissions</button>
                <button onClick={() => setAdminTab('structure')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${adminTab==='structure' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>◆ Structure</button>
                <button onClick={() => setAdminTab('logs')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${adminTab==='logs' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>☰ Connexions</button>
                {isSuperAdmin() && <button onClick={async () => { if (window.confirm('▲ Réinitialiser TOUTES les données aux valeurs par défaut ? Cette action est irréversible.')) { try { if (window.storage) { const keys = await window.storage.list('ruches_'); if (keys && keys.keys) { for (const k of keys.keys) { await window.storage.delete(k); } } } } catch(e) {} window.location.reload(); }}} className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-all">🗑️ Reset données</button>}
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, marginBottom:24}}>
              <div className="bg-white rounded-xl shadow p-4 border-l-4 border-red-500"><div style={{fontSize:'0.82rem', color:$textMut}}>◆ Super Admin</div><div className="text-2xl font-bold text-red-600">{users.filter(u => u.role==='SUPER_ADMIN').length}</div></div>
              <div className="bg-white rounded-xl shadow p-4 border-l-4 border-amber-500"><div style={{fontSize:'0.82rem', color:$textMut}}>◆ Admin</div><div className="text-2xl font-bold text-amber-600">{users.filter(u => u.role==='ADMIN').length}</div></div>
              <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500"><div style={{fontSize:'0.82rem', color:$textMut}}>◇ Manager</div><div className="text-2xl font-bold text-blue-600">{users.filter(u => u.role==='MANAGER').length}</div></div>
              <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500"><div style={{fontSize:'0.82rem', color:$textMut}}>○ Utilisateur</div><div style={{fontSize:'1.3rem', fontWeight:700, color:'#059669'}}>{users.filter(u => u.role==='USER').length}</div></div>
            </div>
            {/* Tab: Utilisateurs */}
            {adminTab === 'users' && (
              <>
                <div className="flex justify-end mb-3">
                  {canEdit('admin') && (
                    <button onClick={() => { const newId = 'USR' + String(users.length + 1).padStart(3,'0'); const newUser = {id: newId, login: '', password: 'password', prenom: '', nom: '', role: 'USER', employeId: null, permissions: {...DEFAULT_PERMISSIONS.USER}, actif: true, derniereConnexion: null}; setUsers(prev => [...prev, newUser]); setEditUserId(newId); setEditUserData({...newUser}); }} className="bg-gradient-to-r from-[#8B6F47] to-[#6d563a] text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Nouvel utilisateur</button>
                  )}
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}>
                    <thead><tr style={{background:"#8B6F47", color:"#fdd835"}}><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Utilisateur</th><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Login</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Rôle</th><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Collaborateur lié</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Actif</th><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Dernière connexion</th>{canEdit('admin') && <th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Actions</th>}</tr></thead>
                    <tbody>
                      {users.map((u, idx) => {
                        const emp = u.employeId ? employes.find(e => e.id === u.employeId) : null;
                        const isEditing = editUserId === u.id;
                        const ed = isEditing ? editUserData : u;
                        const canEditThisUser = canEdit('admin') && (isSuperAdmin() || (u.role !== 'SUPER_ADMIN'));
                        return (
                          <tr key={u.id} className={`${idx%2===0?'':'bg-gray-50'} ${isEditing?'bg-amber-50':''}`}>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`}}>{isEditing ? (<div className="flex gap-1"><input className="border rounded px-1 py-0.5 text-xs w-20" value={ed.prenom} onChange={e => setEditUserData({...ed, prenom: e.target.value})} placeholder="Prénom" /><input className="border rounded px-1 py-0.5 text-xs w-24" value={ed.nom} onChange={e => setEditUserData({...ed, nom: e.target.value})} placeholder="Nom" /></div>) : <span style={{fontWeight:600}}>{u.prenom} {u.nom}</span>}</td>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`}}>{isEditing ? <input className="border rounded px-1 py-0.5 text-xs w-28" value={ed.login} onChange={e => setEditUserData({...ed, login: e.target.value})} /> : <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{u.login}</span>}</td>
                            <td style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>{isEditing ? (<select className="border rounded px-1 py-0.5 text-xs" value={ed.role} onChange={e => { const newRole = e.target.value; setEditUserData({...ed, role: newRole, permissions: {...DEFAULT_PERMISSIONS[newRole]}}); }}>{isSuperAdmin() && <option value="SUPER_ADMIN">◆ Super Admin</option>}<option value="ADMIN">◆ Admin</option><option value="MANAGER">◇ Manager</option><option value="USER">○ Utilisateur</option></select>) : <span style={{color: ROLES[u.role].color, fontWeight:700, fontSize:'0.85rem'}}>{ROLES[u.role].icon} {ROLES[u.role].label}</span>}</td>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`, fontSize:'0.82rem'}}>{isEditing ? (<select className="border rounded px-1 py-0.5 text-xs" value={ed.employeId||''} onChange={e => setEditUserData({...ed, employeId: e.target.value || null})}><option value="">— Aucun —</option>{employes.map(emp => <option key={emp.id} value={emp.id}>{emp.prenom} {emp.nom}</option>)}</select>) : emp ? `${emp.prenom} ${emp.nom}` : <span style={{color:'#c5b9a8'}}>-</span>}</td>
                            <td style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>{isEditing ? <input type="checkbox" checked={ed.actif} onChange={e => setEditUserData({...ed, actif: e.target.checked})} /> : <span className={u.actif ? 'text-green-600' : 'text-red-500'}>{u.actif ? '✓' : '✕'}</span>}</td>
                            <td className="p-3 border text-xs text-gray-500">{u.derniereConnexion ? new Date(u.derniereConnexion).toLocaleString('fr-FR') : '-'}</td>
                            {canEdit('admin') && (<td style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>{canEditThisUser && (isEditing ? (<div className="flex gap-1 justify-center"><button onClick={() => { setUsers(prev => prev.map(x => x.id === ed.id ? {...ed} : x)); if (currentUser.id === ed.id) setCurrentUser({...ed}); setEditUserId(null); setEditUserData(null); }} className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">💾</button><button onClick={() => { setEditUserId(null); setEditUserData(null); }} className="bg-gray-300 px-2 py-1 rounded text-xs font-bold">✕</button></div>) : (<div className="flex gap-1 justify-center"><button onClick={() => { setEditUserId(u.id); setEditUserData({...u}); }} style={{background:$bgSub, color:$accent, padding:'4px 8px', borderRadius:crmRd, fontSize:'0.82rem', fontWeight:700, border:'none', cursor:'pointer'}}>✎</button><button onClick={() => { const resetPwd = 'reset' + Math.floor(Math.random()*9000+1000); setUsers(prev => prev.map(x => x.id === u.id ? {...x, password: resetPwd} : x)); alert(`Mot de passe de ${u.prenom} réinitialisé à : ${resetPwd}`); }} style={{background:$bgSub, color:$accent, padding:'4px 8px', borderRadius:crmRd, fontSize:'0.82rem', fontWeight:700, border:'none', cursor:'pointer'}}>🔑</button></div>))}</td>)}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {/* Tab: Permissions détaillées */}
            {adminTab === 'roles' && (
              <div style={{display:'flex', flexDirection:'column', gap:24}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <div style={{padding:'16px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`}}><h3 style={{fontSize:'1rem', fontWeight:700, color:$text}}>◉ Attribution des rôles par utilisateur</h3><p style={{fontSize:'0.82rem', color:$textMut, marginTop:4}}>Définissez le niveau hiérarchique, le service et le niveau d'accès pour chaque utilisateur</p></div>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}>
                    <thead><tr style={{background:"#8B6F47", color:"#fdd835"}}><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Utilisateur</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Identifiant</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Mot de passe</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Niveau hiérarchique</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Service</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Niveau d'accès</th></tr></thead>
                    <tbody>
                      {users.map((u, idx) => {
                        const canEditThis = canEdit('admin') && (isSuperAdmin() || u.role !== 'SUPER_ADMIN');
                        const nh = NIVEAUX_HIERARCHIQUES.find(n => n.id === (u.niveauHierarchique || 'EMPLOYE'));
                        const sv = SERVICES.find(s => s.id === (u.service || 'OPERATIONS'));
                        const na = NIVEAUX_ACCES.find(a => a.id === (u.niveauAcces || u.role || 'LECTEUR'));
                        return (
                          <tr key={u.id} className={idx%2===0?'':'bg-gray-50'}>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`}}><div style={{fontWeight:600}}>{u.prenom} {u.nom}</div></td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{u.login}</span></td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{u.password}</span></td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}>{canEditThis ? (<select className="text-xs border-2 border-amber-200 rounded-lg px-2 py-1.5 bg-amber-50 font-semibold w-full" value={u.niveauHierarchique || 'EMPLOYE'} onChange={e => { setUsers(prev => prev.map(x => x.id === u.id ? {...x, niveauHierarchique: e.target.value} : x)); }}>{NIVEAUX_HIERARCHIQUES.map(n => <option key={n.id} value={n.id}>{n.icon} {n.label}</option>)}</select>) : <span style={{fontSize:'0.82rem', fontWeight:600}}>{nh?.icon} {nh?.label}</span>}</td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}>{canEditThis ? (<select className="text-xs border-2 border-blue-200 rounded-lg px-2 py-1.5 bg-blue-50 font-semibold w-full" value={u.service || 'OPERATIONS'} onChange={e => { setUsers(prev => prev.map(x => x.id === u.id ? {...x, service: e.target.value} : x)); }}>{SERVICES.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}</select>) : <span style={{fontSize:'0.82rem', fontWeight:600}}>{sv?.icon} {sv?.label}</span>}</td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}>{canEditThis ? (<select className="text-xs border-2 border-red-200 rounded-lg px-2 py-1.5 bg-red-50 font-semibold w-full" value={u.niveauAcces || u.role || 'LECTEUR'} onChange={e => { const newAcces = e.target.value; const newRole = newAcces === 'LECTEUR' ? 'USER' : newAcces; const newPerms = newAcces === 'SUPER_ADMIN' ? {...DEFAULT_PERMISSIONS.SUPER_ADMIN} : newAcces === 'ADMIN' ? {...DEFAULT_PERMISSIONS.ADMIN} : newAcces === 'MANAGER' ? {...DEFAULT_PERMISSIONS.MANAGER} : {...DEFAULT_PERMISSIONS.USER}; const updated = {...u, niveauAcces: newAcces, role: newRole, permissions: newPerms}; setUsers(prev => prev.map(x => x.id === u.id ? updated : x)); if (currentUser.id === u.id) setCurrentUser(updated); }}>{NIVEAUX_ACCES.map(a => <option key={a.id} value={a.id}>{a.icon} {a.label}</option>)}</select>) : <span style={{fontSize:'0.82rem', fontWeight:600}}>{na?.icon} {na?.label}</span>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <div style={{padding:'16px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`}}><h3 style={{fontSize:'1rem', fontWeight:700, color:$text}}>🔑 Permissions détaillées par module</h3><p style={{fontSize:'0.82rem', color:$textMut, marginTop:4}}>Personnalisez manuellement les permissions de chaque utilisateur sur chaque module</p></div>
                  <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem', minWidth:'800px'}}>
                    <thead><tr style={{background:"#8B6F47", color:"#fdd835"}}><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Utilisateur</th><th className="p-2 text-center border text-xs">Rôle</th>{ordreOnglets.map(oid => <th key={oid} className="p-2 text-center border text-xs">{configOnglets[oid]?.label?.split(' ')[0] || oid}</th>)}</tr></thead>
                    <tbody>
                      {users.map((u, idx) => {
                        const canEditThisUser = canEdit('admin') && (isSuperAdmin() || u.role !== 'SUPER_ADMIN');
                        return (
                          <tr key={u.id} className={idx%2===0?'':'bg-gray-50'}>
                            <td className="p-3 border font-semibold text-sm">{u.prenom} {u.nom}</td>
                            <td style={{padding:'8px 12px', borderBottom:`1px solid ${$border}`, textAlign:'center'}}><span style={{color: ROLES[u.role]?.color, fontWeight:700, fontSize:'0.8rem'}}>{ROLES[u.role]?.icon} {ROLES[u.role]?.label}</span></td>
                            {ordreOnglets.map(oid => {
                              const perm = u.permissions[oid] || 'hidden';
                              const permColor = perm === 'write' ? 'bg-green-100 text-green-800' : perm === 'read' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
                              const permLabel = perm === 'write' ? '✎' : perm === 'read' ? '👁️' : '🚫';
                              return (
                                <td key={oid} className="p-1 border text-center">
                                  {canEditThisUser ? (<select className={`text-xs rounded px-1 py-0.5 font-bold border-0 cursor-pointer ${permColor}`} value={perm} onChange={e => { const newPerm = e.target.value; const updatedUser = {...u, permissions: {...u.permissions, [oid]: newPerm}}; setUsers(prev => prev.map(x => x.id === u.id ? updatedUser : x)); if (currentUser.id === u.id) setCurrentUser(updatedUser); }}><option value="write">✎ Écriture</option><option value="read">👁️ Lecture</option><option value="hidden">🚫 Caché</option></select>) : <span className={`text-xs rounded px-2 py-0.5 font-bold ${permColor}`}>{permLabel}</span>}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                  <div className="p-4 bg-gray-50 text-xs text-gray-500 flex gap-4"><span style={{display:'flex', alignItems:'center', gap:4}}><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">✎</span> Lecture + Modification</span><span style={{display:'flex', alignItems:'center', gap:4}}><span style={{background:$bgSub, color:$textSec, padding:'2px 8px', borderRadius:crmRd, fontWeight:700}}>👁️</span> Lecture seule</span><span style={{display:'flex', alignItems:'center', gap:4}}><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">🚫</span> Caché</span></div>
                </div>
                <div className="bg-white rounded-xl shadow-lg border p-5"><h3 className="text-lg font-bold text-gray-700 mb-3">📖 Référentiel des niveaux d'accès</h3><div className="grid md:grid-cols-4 gap-3">{NIVEAUX_ACCES.map(a => (<div key={a.id} className="p-3 rounded-lg border-2 border-gray-100 bg-gray-50"><div className="font-bold text-sm">{a.icon} {a.label}</div><div style={{fontSize:'0.82rem', color:$textSec, marginTop:4}}>{a.desc}</div></div>))}</div></div>
              </div>
            )}
            {/* Tab: Structure filiales */}
            {adminTab === 'structure' && isSuperAdmin() && (
              <div style={{display:'flex', flexDirection:'column', gap:24}}>
                <h3 style={{fontSize:'1rem', fontWeight:700, color:$text}}>◆ Rattachement des filiales aux holdings</h3>
                <p style={{fontSize:'0.92rem', color:$textMut}}>Modifiez la holding de rattachement de chaque filiale opérationnelle.</p>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}>
                    <thead><tr style={{background:$bgSub}}><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Filiale<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Activité<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Holding actuelle<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Changer<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></tr></thead>
                    <tbody>
                      {filialesDynamiques.filter(f => f.holding !== 'GROUP OY').map(f => (
                        <tr key={f.id} className="border-t hover:bg-gray-50">
                          <td style={{padding:'12px 16px', fontWeight:600, color:$text}}>{f.icon} {f.nom}</td>
                          <td className="p-3 text-gray-600">{f.activite}</td>
                          <td style={{padding:'12px 14px'}}><span style={{background:$bgSub, color:$textSec, padding:'4px 8px', borderRadius:crmRd, fontSize:'0.82rem', fontWeight:600}}>{f.holding}</span></td>
                          <td style={{padding:'12px 14px'}}><select value={f.holding} onChange={e => setFilialesDynamiques(prev => prev.map(x => x.id === f.id ? {...x, holding: e.target.value} : x))} className="border-2 border-amber-300 rounded px-2 py-1 text-sm bg-amber-50 font-semibold">{filialesDynamiques.filter(h => h.holding === 'GROUP OY').map(h => (<option key={h.id} value={h.nom}>{h.icon} {h.nom}</option>))}</select></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="text-lg font-bold text-gray-700 mt-6">🏦 Holdings</h3>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}>
                    <thead><tr style={{background:$bgSub}}><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Holding<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Description<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',textAlign:'left', padding:'12px 14px', fontWeight:600}}>Filiales rattachées<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></tr></thead>
                    <tbody>
                      {filialesDynamiques.filter(f => f.holding === 'GROUP OY').map(h => (
                        <tr key={h.id} className="border-t hover:bg-gray-50">
                          <td style={{padding:'12px 16px', fontWeight:600, color:$text}}>{h.icon} {h.nom}</td>
                          <td className="p-3 text-gray-600">{h.activite}</td>
                          <td style={{padding:'12px 14px'}}>{filialesDynamiques.filter(f => f.holding === h.nom).map(f => <span key={f.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-1 mb-1">{f.icon} {f.nom}</span>)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Tab: Logs connexions */}
            {adminTab === 'logs' && (
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}>
                  <thead><tr style={{background:"#8B6F47", color:"#fdd835"}}><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Utilisateur</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Rôle</th><th style={{padding:'12px 14px', textAlign:'left', borderBottom:`1px solid ${$border}`}}>Dernière connexion</th><th style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>Statut</th></tr></thead>
                  <tbody>
                    {users.sort((a,b) => { if (!a.derniereConnexion && !b.derniereConnexion) return 0; if (!a.derniereConnexion) return 1; if (!b.derniereConnexion) return -1; return new Date(b.derniereConnexion) - new Date(a.derniereConnexion); }).map((u, idx) => (
                      <tr key={u.id} className={idx%2===0?'':'bg-gray-50'}>
                        <td className="p-3 border font-semibold">{u.prenom} {u.nom}</td>
                        <td style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}><span style={{color: ROLES[u.role].color, fontSize:'0.85rem', fontWeight:700}}>{ROLES[u.role].icon} {ROLES[u.role].label}</span></td>
                        <td className="p-3 border text-sm">{u.derniereConnexion ? new Date(u.derniereConnexion).toLocaleString('fr-FR') : <span style={{color:'#c5b9a8'}}>Jamais connecté</span>}</td>
                        <td style={{padding:'12px 14px', textAlign:'center', borderBottom:`1px solid ${$border}`}}>{u.actif ? <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">Actif</span> : <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-bold">Désactivé</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
  );
}
