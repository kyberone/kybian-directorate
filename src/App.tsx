import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Crosshair, Zap, AlertOctagon, Map, ChevronRight, Lock, Eye, Terminal } from 'lucide-react';
import './App.css';

const bounties = [
  { id: "V-01", name: "DR. ELARA VOSS", status: "WANTED", reward: "2.5M ALPHA", lastSeen: "SECTOR 4" },
  { id: "V-02", name: "COMMANDER KANE", status: "WANTED", reward: "1.8M ALPHA", lastSeen: "SHALLOWS" },
  { id: "V-03", name: "SARGON THAL", status: "TERMINATED", reward: "CLAIMED", lastSeen: "GHOST STATION" },
];

function App() {
  const [isAlert, setIsAlert] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<string | null>(null);
  const [loginActive, setLoginActive] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsAlert(true);
        setTimeout(() => setIsAlert(false), 300);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const moveTarget = () => {
    setTargetPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  };

  return (
    <div className={`directorate-container ${isAlert ? 'red-alert' : ''}`}>
      <div className="scanline-red" />
      
      {/* Sidebar Nav */}
      <aside className="dir-sidebar industrial-panel">
        <div className="dir-logo">
          <Shield size={40} className="dir-red" />
          <h2 className="brutalist">THE<br/>DIRECTORATE</h2>
        </div>
        <nav className="dir-nav">
          <a href="#dead-reckoning" className="nav-item active">
            <Map size={18} />
            <span>DEAD_RECKONING</span>
          </a>
          <a href="#bounty-board" className="nav-item">
            <Target size={18} />
            <span>BOUNTY_BOARD</span>
          </a>
          <a href="#weapon-specs" className="nav-item">
            <Crosshair size={18} />
            <span>X-GLASS_SPECS</span>
          </a>
          <a href="https://kybian.com" className="nav-item hub-relay">
            <Zap size={18} />
            <span>HUB_RELAY</span>
          </a>
        </nav>
        <div className="sys-status">
          <p>STABILITY: OPTIMAL</p>
          <p>PURGE_PHASE: 03</p>
          <button className="login-btn" onClick={() => setLoginActive(!loginActive)}>
            <Lock size={12} /> {loginActive ? 'INQUISITOR_ACTIVE' : 'COMMAND_LOGIN'}
          </button>
        </div>
      </aside>

      <main className="dir-content">
        {/* Header */}
        <header className="dir-header">
          <div className="warning-banner">
             <AlertOctagon size={20} />
             <marquee>UNAUTHORIZED ACCESS IS A CAPITAL CRIME // GLORY TO ORDER // OPERATION: DEAD RECKONING IN PROGRESS // ALL CITIZENS REPORT TO STATIONS</marquee>
          </div>
        </header>

        {/* Hero */}
        <section className="dir-hero industrial-panel">
          <div className="hero-img-wrap">
            <img src="/images/directorate-hero.png" alt="Directorate Fortress" />
          </div>
          <div className="hero-text-overlay">
            <h1 className="brutalist">PROJECT<br/><span className="dir-red">DEAD RECKONING</span></h1>
            <p>ANNEXATION OF THE GREY ZONES IS IN PROGRESS. TOTAL COMPLIANCE IS MANDATORY.</p>
          </div>
        </section>

        <div className="dir-grid">
          {/* Bounty Board */}
          <section id="bounty-board" className="bounty-section industrial-panel">
            <div className="panel-head">
              <h3 className="brutalist">VANGUARD_FIVE_TRACKING</h3>
            </div>
            <div className="bounty-img-wrap" onClick={moveTarget}>
              <img src="/images/directorate-bounty.png" alt="Bounties" />
              <div 
                className="target-reticle" 
                style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
              >
                <Crosshair size={32} className="dir-red" />
              </div>
            </div>
            <div className="bounty-list">
              {bounties.map(b => (
                <div 
                  key={b.id} 
                  className={`bounty-item ${b.status === 'TERMINATED' ? 'dead' : ''} ${selectedBounty === b.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBounty(b.id === selectedBounty ? null : b.id)}
                >
                  <div className="b-info">
                    <span className="b-id">{b.id}</span>
                    <span className="b-name">{b.name}</span>
                  </div>
                  <div className="b-status">
                    <span className="reward">{b.reward}</span>
                    <span className="status-label">{b.status}</span>
                  </div>
                  <AnimatePresence>
                    {selectedBounty === b.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bounty-details"
                      >
                        <p>LAST SEEN: {b.lastSeen}</p>
                        <button className="dir-button-sm">TRACK SIGNAL</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Weapon Specs */}
          <section id="weapon-specs" className="weapon-section industrial-panel">
            <div className="panel-head">
              <h3 className="brutalist">KYBIAN-X ARTIFACTS</h3>
            </div>
            <div className="spec-content">
              <div className="spec-item">
                <span className="label">MODEL:</span>
                <span className="val">DIRECTORATE X-SLICER</span>
              </div>
              <div className="spec-item">
                <span className="label">ISOTOPE:</span>
                <span className="val dir-red">KYBIAN-X [UNSTABLE]</span>
              </div>
              <div className="spec-item">
                <span className="label">OUTPUT:</span>
                <span className="val">14.2 GW (PULSED)</span>
              </div>
              <div className="thermal-graph">
                 <div className="graph-bar" style={{width: '90%'}}></div>
                 <span className="graph-label">THERMAL_THRESHOLD</span>
              </div>
              {loginActive ? (
                <div className="classified-info">
                  <Terminal size={14} /> <span>LOG: ISOTOPE-X BLEEDING DETECTED. CONTAINMENT AT 42%.</span>
                </div>
              ) : (
                <button className="dir-button full-width">ACCESS CLASSIFIED SCHEMATICS</button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

