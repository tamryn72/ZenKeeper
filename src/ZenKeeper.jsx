import { useState, useEffect, useRef, useCallback } from "react";

// ── ARCHON DATA ──────────────────────────────────────────────────────────────
const ARCHONS = [
  { id:1, name:"YALDABAOTH", title:"The False King", program:"Ego & Self-Importance", quote:"Does everyone see how important I am?", color:"#FFD700", glow:"#FF8C00", freq:"Uncommon",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <ellipse cx="40" cy="62" rx="22" ry="24" fill="#A0522D"/>
        <path d="M20,52 Q10,42 14,34" stroke="#C68642" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M60,52 Q70,42 66,34" stroke="#C68642" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="34" r="16" fill="#D4956A"/>
        <rect x="24" y="19" width="32" height="8" fill="#FFD700" rx="1"/>
        <polygon points="24,19 28,8 32,19" fill="#FFD700"/><polygon points="32,19 36,6 40,19" fill="#FFD700"/>
        <polygon points="40,19 44,6 48,19" fill="#FFD700"/><polygon points="48,19 52,8 56,19" fill="#FFD700"/>
        <circle cx="28" cy="12" r="2.5" fill="#FF4444"/><circle cx="40" cy="9" r="2.5" fill="#4488FF"/>
        <circle cx="52" cy="12" r="2.5" fill="#44FF88"/>
        <ellipse cx="33" cy="33" rx="4" ry="3" fill="white"/><ellipse cx="47" cy="33" rx="4" ry="3" fill="white"/>
        <circle cx="33" cy="34" r="2" fill="#3a1a00"/><circle cx="47" cy="34" r="2" fill="#3a1a00"/>
        <path d="M33,43 Q40,48 47,43" stroke="#8B4513" strokeWidth="2" fill="none"/>
        <circle cx="40" cy="55" r="5" fill="#FFD700"/><circle cx="40" cy="55" r="3" fill="#FF8C00"/>
        <ellipse cx="32" cy="82" rx="7" ry="5" fill="#8B4513"/><ellipse cx="48" cy="82" rx="7" ry="5" fill="#8B4513"/>
      </svg>
    )},
  { id:2, name:"SAMAEL", title:"The Blind One", program:"Fear & Anxiety", quote:"But what if something goes terribly wrong?", color:"#AA66FF", glow:"#6C3483", freq:"Very Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <ellipse cx="40" cy="64" rx="16" ry="22" fill="#6C3483"/>
        <path d="M24,56 Q14,60 12,70" stroke="#7D3C98" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M56,56 Q66,60 68,70" stroke="#7D3C98" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="34" r="20" fill="#9B59B6"/>
        <ellipse cx="30" cy="33" rx="8" ry="9" fill="white"/><ellipse cx="50" cy="33" rx="8" ry="9" fill="white"/>
        <circle cx="30" cy="34" r="5" fill="#1a0a2e"/><circle cx="50" cy="34" r="5" fill="#1a0a2e"/>
        <circle cx="31" cy="32" r="2" fill="white"/><circle cx="51" cy="32" r="2" fill="white"/>
        <path d="M22,24 Q30,19 38,24" stroke="#4A235A" strokeWidth="2.5" fill="none"/>
        <path d="M42,24 Q50,19 58,24" stroke="#4A235A" strokeWidth="2.5" fill="none"/>
        <path d="M30,47 Q35,43 40,47 Q45,43 50,47" stroke="#4A235A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="22" cy="26" rx="2.5" ry="4" fill="#AED6F1" opacity="0.8"/>
        <ellipse cx="58" cy="23" rx="2" ry="3" fill="#AED6F1" opacity="0.7"/>
        <text x="8" y="18" fontSize="9" fill="#9B59B6" opacity="0.7">?</text>
        <text x="64" y="22" fontSize="8" fill="#9B59B6" opacity="0.7">!</text>
        <ellipse cx="32" cy="82" rx="7" ry="5" fill="#4A235A"/><ellipse cx="48" cy="82" rx="7" ry="5" fill="#4A235A"/>
      </svg>
    )},
  { id:3, name:"SAKLAS", title:"The Fool", program:"Confusion & Mental Fog", quote:"Wait what was I just... huh?", color:"#F0E68C", glow:"#DAA520", freq:"Very Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <circle cx="15" cy="20" r="3" fill="#F0E68C" opacity="0.6"/><circle cx="65" cy="16" r="2.5" fill="#F0E68C" opacity="0.5"/>
        <ellipse cx="42" cy="64" rx="22" ry="24" fill="#8FBC8F"/>
        <path d="M20,55 Q8,48 6,58" stroke="#8FBC8F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M62,53 Q74,46 76,56" stroke="#8FBC8F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <ellipse cx="40" cy="34" rx="18" ry="20" fill="#90EE90"/>
        <path d="M24,20 Q32,4 40,18" fill="#DAA520"/>
        <path d="M40,18 Q48,4 56,20" fill="#FF6347"/>
        <circle cx="32" cy="6" r="5" fill="#FFD700"/><circle cx="50" cy="6" r="5" fill="#FF4500"/>
        <circle cx="34" cy="33" rx="7" ry="7" r="7" fill="white"/>
        <circle cx="47" cy="31" r="7" fill="white"/>
        <path d="M34,33 Q37,29 34,25 Q31,29 34,33" fill="#228B22"/>
        <path d="M47,31 Q50,27 47,23 Q44,27 47,31" fill="#228B22"/>
        <circle cx="34" cy="30" r="2" fill="#1a3a1a"/><circle cx="47" cy="28" r="2" fill="#1a3a1a"/>
        <path d="M30,46 Q40,54 50,46" fill="#1a3a1a"/>
        <path d="M30,46 Q40,50 50,46" fill="#FF9999"/>
        <ellipse cx="40" cy="51" rx="5" ry="3" fill="#FF6B6B"/>
        <ellipse cx="30" cy="82" rx="7" ry="5" fill="#6B8E23" transform="rotate(-8,30,82)"/>
        <ellipse cx="52" cy="83" rx="7" ry="5" fill="#6B8E23" transform="rotate(10,52,83)"/>
      </svg>
    )},
  { id:4, name:"CHRONOS", title:"Warden of Time", program:"Past Regret & Future Planning", quote:"Later I need to... wait I should have...", color:"#88AACC", glow:"#4682B4", freq:"Extremely Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <circle cx="40" cy="34" r="34" fill="none" stroke="#4682B4" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,3"/>
        <ellipse cx="40" cy="64" rx="18" ry="24" fill="#708090"/>
        <path d="M22,56 Q10,50 8,42" stroke="#708090" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="7" cy="40" r="10" fill="#2F4F4F" stroke="#FFD700" strokeWidth="1.5"/>
        <circle cx="7" cy="40" r="7" fill="#1a2a2a"/>
        <line x1="7" y1="40" x2="7" y2="34" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="40" x2="11" y2="42" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M58,56 Q70,50 72,42" stroke="#708090" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="34" r="18" fill="#A9A9A9"/>
        <ellipse cx="40" cy="20" rx="18" ry="10" fill="#F5F5DC"/>
        <circle cx="24" cy="30" r="6" fill="#F5F5DC"/><circle cx="56" cy="30" r="6" fill="#F5F5DC"/>
        <ellipse cx="32" cy="34" rx="4" ry="3" fill="white"/><ellipse cx="48" cy="34" rx="4" ry="3" fill="white"/>
        <circle cx="32" cy="35" r="2.5" fill="#2F4F4F"/><circle cx="48" cy="35" r="2.5" fill="#2F4F4F"/>
        <path d="M28,27 Q32,24 36,27" stroke="#708090" strokeWidth="2" fill="#708090" opacity="0.5"/>
        <path d="M44,26 Q48,23 52,26" stroke="#708090" strokeWidth="2" fill="#708090" opacity="0.5"/>
        <path d="M26,44 Q22,58 26,72 Q34,82 40,84" fill="#C0C0C0" opacity="0.8"/>
        <path d="M54,44 Q58,58 54,72 Q46,82 40,84" fill="#C0C0C0" opacity="0.8"/>
        <ellipse cx="32" cy="82" rx="7" ry="5" fill="#2F4F4F"/><ellipse cx="48" cy="82" rx="7" ry="5" fill="#2F4F4F"/>
      </svg>
    )},
  { id:5, name:"MAMMON", title:"The Hungry One", program:"Craving & Wanting", quote:"I just need one more thing and then I'll be fine.", color:"#FF7755", glow:"#FF4500", freq:"Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <circle cx="40" cy="58" r="28" fill="#CC4400"/>
        <circle cx="40" cy="56" r="25" fill="#FF6B35"/>
        <circle cx="40" cy="32" r="22" fill="#FF6B35"/>
        <circle cx="40" cy="30" r="19" fill="#FF8855"/>
        <path d="M22,36 Q40,54 58,36" fill="#2a0a00"/>
        <path d="M22,36 Q40,48 58,36" fill="#FF4444"/>
        <rect x="27" y="36" width="5" height="7" fill="white" rx="1"/>
        <rect x="35" y="36" width="5" height="8" fill="white" rx="1"/>
        <rect x="43" y="36" width="5" height="8" fill="white" rx="1"/>
        <rect x="51" y="36" width="5" height="7" fill="white" rx="1"/>
        <path d="M40,48 Q38,54 40,60" stroke="#88CCFF" strokeWidth="2" fill="none" opacity="0.8"/>
        <circle cx="40" cy="62" r="2.5" fill="#88CCFF" opacity="0.7"/>
        <circle cx="30" cy="24" r="7" fill="white"/><circle cx="50" cy="24" r="7" fill="white"/>
        <circle cx="30" cy="25" r="4.5" fill="#2a0a00"/><circle cx="50" cy="25" r="4.5" fill="#2a0a00"/>
        <text x="27" y="28" fontSize="5" fill="#FFD700">$</text><text x="47" y="28" fontSize="5" fill="#FFD700">$</text>
        <path d="M18,58 Q6,50 2,42" stroke="#CC4400" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <circle cx="2" cy="42" r="6" fill="#FF6B35"/>
        <path d="M62,58 Q74,50 78,42" stroke="#CC4400" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <circle cx="78" cy="42" r="6" fill="#FF6B35"/>
        <text x="66" y="26" fontSize="12" opacity="0.5">✨</text>
        <ellipse cx="30" cy="83" rx="9" ry="5" fill="#8B2500"/><ellipse cx="50" cy="83" rx="9" ry="5" fill="#8B2500"/>
      </svg>
    )},
  { id:6, name:"DOXA", title:"The Judge", program:"Opinion & Evaluation", quote:"That was wrong. I have ruled.", color:"#DEB887", glow:"#8B6914", freq:"Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <ellipse cx="40" cy="65" rx="16" ry="22" fill="#2C1A0A"/>
        <path d="M24,53 L22,82 L58,82 L56,53 Q40,62 24,53" fill="#1a1000" opacity="0.9"/>
        <path d="M32,48 Q40,55 48,48 L46,42 Q40,48 34,42 Z" fill="white" opacity="0.9"/>
        <circle cx="40" cy="34" r="16" fill="#CD853F"/>
        <ellipse cx="40" cy="22" rx="19" ry="13" fill="white"/>
        <circle cx="24" cy="30" r="6" fill="#F5F5DC"/><circle cx="56" cy="30" r="6" fill="white"/>
        <path d="M30,33 Q35,29 40,33" fill="none" stroke="#2C1A0A" strokeWidth="1.5"/>
        <path d="M40,33 Q45,29 50,33" fill="none" stroke="#2C1A0A" strokeWidth="1.5"/>
        <line x1="40" y1="33" x2="40" y2="33"/>
        <ellipse cx="34" cy="31" rx="3.5" ry="2.5" fill="white"/><ellipse cx="46" cy="31" rx="3.5" ry="2.5" fill="white"/>
        <circle cx="34" cy="32" r="2" fill="#2C1A0A"/><circle cx="46" cy="32" r="2" fill="#2C1A0A"/>
        <path d="M30,25 Q34,22 38,25" stroke="#5C3A1E" strokeWidth="2.5" fill="none"/>
        <path d="M42,25 Q46,22 50,25" stroke="#5C3A1E" strokeWidth="2.5" fill="none"/>
        <line x1="33" y1="42" x2="47" y2="40" stroke="#5C3A1E" strokeWidth="2" strokeLinecap="round"/>
        <rect x="56" y="36" width="22" height="8" fill="#5C3A1E" rx="2"/>
        <rect x="60" y="44" width="6" height="28" fill="#8B6914"/>
        <rect x="54" y="33" width="12" height="5" fill="#3a1a00" rx="1"/>
        <ellipse cx="30" cy="83" rx="7" ry="5" fill="#1a0a00"/><ellipse cx="50" cy="83" rx="7" ry="5" fill="#1a0a00"/>
      </svg>
    )},
  { id:7, name:"EPITHYMIA", title:"The Longing", program:"Nostalgia & Bittersweet Ache", quote:"Remember when... if only I could go back...", color:"#DDA0DD", glow:"#8B008B", freq:"Moderate",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <path d="M20,50 Q14,65 16,80 Q24,92 40,94 Q56,92 64,80 Q66,65 60,50" fill="#8B008B" opacity="0.35"/>
        <path d="M14,58 Q8,64 8,74" stroke="#DDA0DD" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round"/>
        <path d="M66,58 Q72,64 72,74" stroke="#DDA0DD" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round"/>
        <circle cx="40" cy="32" r="22" fill="#ECC8EC"/>
        <ellipse cx="30" cy="31" rx="6" ry="5" fill="white" opacity="0.9"/>
        <ellipse cx="50" cy="31" rx="6" ry="5" fill="white" opacity="0.9"/>
        <circle cx="30" cy="32" r="3.5" fill="#6A0F6A"/><circle cx="50" cy="32" r="3.5" fill="#6A0F6A"/>
        <circle cx="31" cy="30" r="1.5" fill="white"/><circle cx="51" cy="30" r="1.5" fill="white"/>
        <path d="M24,24 L22,20" stroke="#8B008B" strokeWidth="1.5"/><path d="M27,22 L26,18" stroke="#8B008B" strokeWidth="1.5"/>
        <path d="M56,24 L58,20" stroke="#8B008B" strokeWidth="1.5"/><path d="M53,22 L54,18" stroke="#8B008B" strokeWidth="1.5"/>
        <ellipse cx="24" cy="38" rx="5" ry="3" fill="#FF1493" opacity="0.3"/>
        <ellipse cx="56" cy="38" rx="5" ry="3" fill="#FF1493" opacity="0.3"/>
        <ellipse cx="28" cy="40" rx="2" ry="3" fill="#AED6F1" opacity="0.8"/>
        <path d="M32,42 Q40,47 48,42" stroke="#8B008B" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="26" cy="17" r="5" fill="#FF69B4"/>
        <circle cx="40" cy="13" r="4" fill="#FF1493"/>
        <circle cx="54" cy="17" r="5" fill="#DDA0DD"/>
        <circle cx="26" cy="17" r="2" fill="#FFD700"/>
        <circle cx="40" cy="13" r="1.5" fill="#FFD700"/>
        <circle cx="54" cy="17" r="2" fill="#FFD700"/>
        <ellipse cx="30" cy="82" rx="8" ry="4" fill="#8B008B" opacity="0.4"/>
        <ellipse cx="50" cy="82" rx="8" ry="4" fill="#8B008B" opacity="0.4"/>
      </svg>
    )},
  { id:8, name:"KOSMOKRATOR", title:"The World Builder", program:"Planning & Mental Architecture", quote:"If I just map out the whole system right now...", color:"#40E0D0", glow:"#008B8B", freq:"Very Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <line x1="0" y1="15" x2="80" y2="15" stroke="#20B2AA" strokeWidth="0.5" opacity="0.25"/>
        <line x1="0" y1="30" x2="80" y2="30" stroke="#20B2AA" strokeWidth="0.5" opacity="0.25"/>
        <line x1="15" y1="0" x2="15" y2="90" stroke="#20B2AA" strokeWidth="0.5" opacity="0.25"/>
        <line x1="65" y1="0" x2="65" y2="90" stroke="#20B2AA" strokeWidth="0.5" opacity="0.25"/>
        <ellipse cx="40" cy="64" rx="17" ry="22" fill="#20B2AA"/>
        <rect x="28" y="52" width="14" height="18" fill="#E8F4F8" rx="1" transform="rotate(-8,35,61)" opacity="0.9"/>
        <line x1="30" y1="57" x2="40" y2="57" stroke="#20B2AA" strokeWidth="0.8" transform="rotate(-8,35,61)" opacity="0.7"/>
        <rect x="42" y="54" width="12" height="16" fill="#E8F4F8" rx="1" transform="rotate(10,48,62)" opacity="0.8"/>
        <circle cx="40" cy="32" r="17" fill="#48D1CC"/>
        <ellipse cx="40" cy="20" rx="18" ry="8" fill="#FFA500"/>
        <rect x="22" y="18" width="36" height="5" fill="#FFD700" rx="1"/>
        <circle cx="33" cy="32" rx="7" ry="7" r="7" fill="#006666" stroke="#20B2AA" strokeWidth="1.5"/>
        <circle cx="47" cy="32" r="7" fill="#006666" stroke="#20B2AA" strokeWidth="1.5"/>
        <circle cx="33" cy="32" r="4.5" fill="#001a1a"/><circle cx="47" cy="32" r="4.5" fill="#001a1a"/>
        <circle cx="34" cy="30" r="2" fill="#00FFFF" opacity="0.8"/><circle cx="48" cy="30" r="2" fill="#00FFFF" opacity="0.8"/>
        <line x1="40" y1="32" x2="40" y2="32"/>
        <path d="M35,44 Q40,46 45,44" stroke="#006666" strokeWidth="2" fill="none"/>
        <path d="M23,57 Q12,52 8,44" stroke="#20B2AA" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <rect x="0" y="36" width="14" height="3" fill="#F5F5DC" rx="1" transform="rotate(-25,7,38)"/>
        <path d="M57,55 Q68,50 72,42" stroke="#20B2AA" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <rect x="67" y="35" width="3" height="14" fill="#FFD700" rx="1" transform="rotate(20,69,42)"/>
        <circle cx="6" cy="16" r="3" fill="#20B2AA" opacity="0.7"/>
        <circle cx="14" cy="10" r="3" fill="#20B2AA" opacity="0.7"/>
        <line x1="6" y1="16" x2="14" y2="10" stroke="#20B2AA" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="32" cy="82" rx="7" ry="4" fill="#006666"/><ellipse cx="48" cy="82" rx="7" ry="4" fill="#006666"/>
      </svg>
    )},
  { id:9, name:"HEDONE", title:"The Pleasure Weaver", program:"Daydreaming & Sweet Escape", quote:"Mmm, imagine if I were somewhere warm right now...", color:"#FF85C2", glow:"#FF1493", freq:"Moderate",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <path d="M20,50 Q14,68 17,82 Q26,94 40,96 Q54,94 63,82 Q66,68 60,50" fill="#CC0066" opacity="0.4"/>
        <circle cx="30" cy="60" r="5" fill="#FFB6C1" opacity="0.7"/><circle cx="52" cy="64" r="4" fill="#FF69B4" opacity="0.6"/>
        <path d="M14,58 Q8,62 7,72 Q6,80 10,84" stroke="#FF85C2" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round"/>
        <path d="M66,58 Q72,62 73,72 Q74,80 70,84" stroke="#FF85C2" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round"/>
        <circle cx="40" cy="32" r="22" fill="#FFB0C8"/>
        <ellipse cx="30" cy="31" rx="6" ry="4" fill="white" opacity="0.9"/>
        <ellipse cx="50" cy="31" rx="6" ry="4" fill="white" opacity="0.9"/>
        <path d="M24,29 Q30,25 36,29" fill="#FF85C2"/>
        <path d="M44,29 Q50,25 56,29" fill="#FF85C2"/>
        <circle cx="30" cy="32" r="3.5" fill="#8B0047"/><circle cx="50" cy="32" r="3.5" fill="#8B0047"/>
        <circle cx="31" cy="30" r="1.2" fill="white"/><circle cx="51" cy="30" r="1.2" fill="white"/>
        <circle cx="24" cy="38" r="6" fill="#FF1493" opacity="0.25"/><circle cx="56" cy="38" r="6" fill="#FF1493" opacity="0.25"/>
        <path d="M30,43 Q40,50 50,43" fill="#CC0066"/>
        <path d="M30,43 Q40,47 50,43" fill="#FF69B4"/>
        <circle cx="40" cy="14" r="7" fill="#FF69B4"/><circle cx="24" cy="20" r="6" fill="#FFB6C1"/>
        <circle cx="56" cy="20" r="6" fill="#FF85C2"/><circle cx="32" cy="11" r="4" fill="#FF1493"/>
        <circle cx="48" cy="11" r="4" fill="#FFB6C1"/>
        <circle cx="40" cy="14" r="2.5" fill="#FFD700"/><circle cx="24" cy="20" r="2" fill="#FFD700"/><circle cx="56" cy="20" r="2" fill="#FFD700"/>
        <circle cx="68" cy="13" r="8" fill="none" stroke="#FF85C2" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="72" cy="7" r="5" fill="none" stroke="#FF85C2" strokeWidth="1.2" opacity="0.4"/>
        <circle cx="75" cy="3" r="3" fill="#FF85C2" opacity="0.3"/>
        <ellipse cx="30" cy="84" rx="8" ry="4" fill="#CC0066" opacity="0.5"/><ellipse cx="50" cy="84" rx="8" ry="4" fill="#CC0066" opacity="0.5"/>
      </svg>
    )},
  { id:10, name:"ARES", title:"The Sparker", program:"Irritation & Fight Energy", quote:"And another thing — they were WRONG.", color:"#FF3322", glow:"#8B0000", freq:"Moderate",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <path d="M26,28 Q23,18 26,10 Q29,4 27,0" stroke="#FF8C00" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round"/>
        <path d="M40,22 Q38,12 41,6 Q44,0 42,-4" stroke="#FF6347" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
        <path d="M54,28 Q57,18 54,10 Q51,4 53,0" stroke="#FF8C00" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round"/>
        <ellipse cx="40" cy="64" rx="20" ry="24" fill="#8B0000"/>
        <ellipse cx="40" cy="62" rx="17" ry="21" fill="#CC2200"/>
        <circle cx="40" cy="34" r="20" fill="#FF2400"/>
        <path d="M22,26 Q30,20 38,28" stroke="#8B0000" strokeWidth="4.5" fill="none"/>
        <path d="M42,28 Q50,20 58,26" stroke="#8B0000" strokeWidth="4.5" fill="none"/>
        <ellipse cx="32" cy="32" rx="5" ry="3.5" fill="white"/><ellipse cx="48" cy="32" rx="5" ry="3.5" fill="white"/>
        <circle cx="32" cy="33" r="3" fill="#8B0000"/><circle cx="48" cy="33" r="3" fill="#8B0000"/>
        <circle cx="33" cy="31" r="1.2" fill="white"/><circle cx="49" cy="31" r="1.2" fill="white"/>
        <path d="M24,26 Q22,22 24,18" stroke="#8B0000" strokeWidth="1.8" fill="none" opacity="0.7"/>
        <path d="M56,26 Q58,22 56,18" stroke="#8B0000" strokeWidth="1.8" fill="none" opacity="0.7"/>
        <rect x="28" y="44" width="24" height="8" fill="#3a0000" rx="1.5"/>
        <line x1="33" y1="44" x2="33" y2="52" stroke="white" strokeWidth="1.3"/>
        <line x1="38" y1="44" x2="38" y2="52" stroke="white" strokeWidth="1.3"/>
        <line x1="43" y1="44" x2="43" y2="52" stroke="white" strokeWidth="1.3"/>
        <line x1="48" y1="44" x2="48" y2="52" stroke="white" strokeWidth="1.3"/>
        <path d="M20,58 Q8,52 4,42" stroke="#CC2200" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <rect x="-2" y="36" width="13" height="11" fill="#FF2400" rx="3"/>
        <path d="M60,58 Q72,52 76,42" stroke="#CC2200" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <rect x="69" y="36" width="13" height="11" fill="#FF2400" rx="3"/>
        <text x="4" y="26" fontSize="10" fill="#FF8C00" opacity="0.7">✦</text>
        <text x="66" y="22" fontSize="9" fill="#FF6347" opacity="0.6">✦</text>
        <ellipse cx="30" cy="83" rx="9" ry="5" fill="#8B0000"/><ellipse cx="50" cy="83" rx="9" ry="5" fill="#8B0000"/>
      </svg>
    )},
  { id:11, name:"MOMUS", title:"The Critic", program:"Self-Criticism & Comparison", quote:"Everyone else is so much further along than me.", color:"#99AAAA", glow:"#2F4F4F", freq:"Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <ellipse cx="40" cy="86" rx="28" ry="6" fill="#2F4F4F" opacity="0.4"/>
        <ellipse cx="40" cy="65" rx="18" ry="24" fill="#708090"/>
        <path d="M58,56 Q70,50 72,42" stroke="#A9A9A9" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <rect x="66" y="28" width="18" height="22" fill="#1a2a2a" stroke="#708090" strokeWidth="1.5" rx="2.5"/>
        <rect x="68" y="30" width="14" height="18" fill="#2a3a3a" rx="1.5"/>
        <circle cx="75" cy="38" r="5" fill="#708090" opacity="0.6"/>
        <path d="M72,43 Q75,45 78,43" stroke="#2F4F4F" strokeWidth="1" fill="none"/>
        <path d="M22,56 Q10,52 8,62" stroke="#A9A9A9" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="8" cy="62" r="4.5" fill="#708090"/>
        <circle cx="42" cy="34" r="18" fill="#A9A9A9"/>
        <circle cx="42" cy="32" r="16" fill="#C0C0C0"/>
        <ellipse cx="34" cy="32" rx="5" ry="4" fill="white"/><ellipse cx="50" cy="32" rx="5" ry="4" fill="white"/>
        <circle cx="34" cy="33" r="3" fill="#2F4F4F"/><circle cx="50" cy="33" r="3" fill="#2F4F4F"/>
        <circle cx="35" cy="31" r="1.2" fill="white"/><circle cx="51" cy="31" r="1.2" fill="white"/>
        <path d="M30,25 Q34,22 38,25" stroke="#708090" strokeWidth="2.5" fill="none"/>
        <path d="M44,25 Q48,22 52,25" stroke="#708090" strokeWidth="2.5" fill="none"/>
        <path d="M33,43 Q42,41 51,43" stroke="#2F4F4F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <rect x="0" y="42" width="14" height="16" fill="#1a2a2a" opacity="0.8" rx="1.5"/>
        <rect x="2" y="50" width="3" height="6" fill="#708090" opacity="0.7"/>
        <rect x="7" y="45" width="3" height="11" fill="#20B2AA" opacity="0.7"/>
        <rect x="12" y="48" width="2" height="8" fill="#708090" opacity="0.5"/>
        <ellipse cx="32" cy="83" rx="7" ry="5" fill="#2F4F4F"/><ellipse cx="52" cy="83" rx="7" ry="5" fill="#2F4F4F"/>
      </svg>
    )},
  { id:12, name:"LETHE", title:"The Forgetting", program:"Drowsiness & The Drift", quote:"Mmm... so comfortable... what were we...", color:"#AACCDD", glow:"#4682B4", freq:"Common",
    render:()=>(
      <svg viewBox="0 0 80 90" width="56" height="63">
        <ellipse cx="40" cy="86" rx="40" ry="10" fill="#B0C4DE" opacity="0.08"/>
        <path d="M18,50 Q10,65 12,80 Q18,92 40,95 Q62,92 68,80 Q70,65 62,50" fill="#4682B4" opacity="0.12"/>
        <path d="M8,58 Q4,66 4,76" stroke="#B0C4DE" strokeWidth="3.5" fill="none" opacity="0.3" strokeLinecap="round"/>
        <path d="M72,58 Q76,66 76,76" stroke="#B0C4DE" strokeWidth="3.5" fill="none" opacity="0.3" strokeLinecap="round"/>
        <circle cx="40" cy="32" r="24" fill="#D6E8F5"/>
        <ellipse cx="30" cy="32" rx="7" ry="2.5" fill="white"/>
        <ellipse cx="50" cy="32" rx="7" ry="2.5" fill="white"/>
        <path d="M23,31 Q30,26 37,31" fill="#B0C4DE"/>
        <path d="M43,31 Q50,26 57,31" fill="#B0C4DE"/>
        <circle cx="30" cy="32" r="2" fill="#2a3a4a"/><circle cx="50" cy="32" r="2" fill="#2a3a4a"/>
        <path d="M33,44 Q40,49 47,44" stroke="#4682B4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <text x="56" y="18" fontSize="8" fill="#B0C4DE" opacity="0.6" fontStyle="italic">z</text>
        <text x="63" y="11" fontSize="10" fill="#B0C4DE" opacity="0.5" fontStyle="italic">z</text>
        <text x="71" y="5" fontSize="12" fill="#B0C4DE" opacity="0.4" fontStyle="italic">z</text>
        <path d="M18,54 Q8,52 4,60" stroke="#B0C4DE" strokeWidth="4.5" fill="none" opacity="0.5" strokeLinecap="round"/>
        <path d="M62,54 Q72,52 76,60" stroke="#B0C4DE" strokeWidth="4.5" fill="none" opacity="0.5" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="2" fill="#B0C4DE" opacity="0.5"/>
        <circle cx="20" cy="8" r="1.5" fill="#B0C4DE" opacity="0.4"/>
        <circle cx="6" cy="24" r="2.5" fill="#B0C4DE" opacity="0.3"/>
        <ellipse cx="30" cy="84" rx="9" ry="4" fill="#4682B4" opacity="0.25"/>
        <ellipse cx="50" cy="84" rx="9" ry="4" fill="#4682B4" opacity="0.25"/>
      </svg>
    )}
];

// ── ROUND SCHEDULE ────────────────────────────────────────────────────────────
// Classic ladder kept as a fallback preset; live sessions use `settings` below.
const ROUNDS = [10,20,30,45,60,90,120];

// Shortcut chips shown below the duration dial — tap to snap to common lengths.
const DURATION_SHORTCUTS = [60, 300, 600, 1200, 1800, 3600];

// Sit duration range for the dial (seconds).
const DUR_MIN = 20;
const DUR_MAX = 3600; // 60 minutes

const AMBIENCE_PRESETS = [
  { id:"silence", label:"Silence"      },
  { id:"creek",   label:"Water Creek"  },
  { id:"night",   label:"Nature Night" },
  { id:"day",     label:"Nature Day"   },
];

const DEFAULT_SETTINGS = { duration: 300, ambience: "silence" };

// ── ORB LEVELS ────────────────────────────────────────────────────────────────
// Thresholds intentionally steep — leveling is a ceremony, not a tick.
const ORB_LEVELS = [
  { min:0,     name:"Flickering Ember",  color:"#888888", glow:"#555555", size:60  },
  { min:120,   name:"Seeker",            color:"#FFCC88", glow:"#FF8800", size:66  },
  { min:360,   name:"Watcher",           color:"#FFD700", glow:"#FF8C00", size:72  },
  { min:720,   name:"Light Keeper",      color:"#FFB347", glow:"#FF6600", size:78  },
  { min:1200,  name:"Thread Weaver",     color:"#FF8C94", glow:"#FF4466", size:84  },
  { min:1800,  name:"Archon Witness",    color:"#88DDFF", glow:"#0088FF", size:90  },
  { min:2600,  name:"Sophia's Heir",     color:"#AA88FF", glow:"#6600FF", size:96  },
  { min:3600,  name:"Flame Carrier",     color:"#CC88FF", glow:"#AA00FF", size:102 },
  { min:4800,  name:"Cosmic Weaver",     color:"#FFAAFF", glow:"#FF00FF", size:108 },
  { min:7000,  name:"Living Light",      color:"#FFFFFF", glow:"#AADDFF", size:118 },
];

function getOrbLevel(light) {
  let lv = ORB_LEVELS[0];
  for (const l of ORB_LEVELS) { if (light >= l.min) lv = l; }
  return lv;
}

function formatSeconds(s) {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s/60), rem = s%60;
  return rem ? `${m}m ${rem}s` : `${m}m`;
}

function formatClock(s) {
  const m = Math.floor(s/60), sec = Math.floor(s%60);
  return `${m}:${sec.toString().padStart(2,"0")}`;
}

// Map dial angle (-150° to +150°, 300° sweep) <-> sit duration (log scale so
// short sits get finer granularity than long ones).
const DIAL_SWEEP = 300;           // total arc, degrees
const DIAL_START = -DIAL_SWEEP/2; // -150, knob at "7:30"-ish position
function durToRatio(d) {
  const r = (Math.log(d) - Math.log(DUR_MIN)) / (Math.log(DUR_MAX) - Math.log(DUR_MIN));
  return Math.max(0, Math.min(1, r));
}
function ratioToDur(r) {
  const raw = Math.exp(Math.log(DUR_MIN) + r*(Math.log(DUR_MAX) - Math.log(DUR_MIN)));
  let snapped;
  if (raw < 60)   snapped = Math.round(raw/5) * 5;
  else if (raw < 300)  snapped = Math.round(raw/10) * 10;
  else if (raw < 900)  snapped = Math.round(raw/30) * 30;
  else snapped = Math.round(raw/60) * 60;
  return Math.max(DUR_MIN, Math.min(DUR_MAX, snapped));
}

function polarToCart(cx, cy, r, angleDeg) {
  const a = (angleDeg - 90) * Math.PI/180;
  return { x: cx + r*Math.cos(a), y: cy + r*Math.sin(a) };
}

function DurationDial({ value, onChange, color, glow }) {
  const ref = useRef(null);
  const draggingRef = useRef(false);

  const ratio = durToRatio(value);
  const angle = DIAL_START + DIAL_SWEEP*ratio;

  const size = 240, r = 100, cx = size/2, cy = size/2;
  const startPt = polarToCart(cx, cy, r, DIAL_START);
  const endPt   = polarToCart(cx, cy, r, DIAL_START + DIAL_SWEEP);
  const fillEnd = polarToCart(cx, cy, r, angle);
  const bgLarge   = DIAL_SWEEP > 180 ? 1 : 0;
  const fillLarge = DIAL_SWEEP*ratio > 180 ? 1 : 0;

  const bgPath   = `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${bgLarge} 1 ${endPt.x} ${endPt.y}`;
  const fillPath = `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${fillLarge} 1 ${fillEnd.x} ${fillEnd.y}`;
  const knobPt = polarToCart(cx, cy, r, angle);

  function updateFromPointer(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width/2);
    const py = e.clientY - (rect.top + rect.height/2);
    // atan2 returns angle from +x axis; convert to angle from +y-up, clockwise.
    let a = Math.atan2(px, -py) * 180/Math.PI;
    // Constrain to the 300° sweep, snapping to nearest endpoint when in the gap.
    if (a < DIAL_START) a = a + 360 > DIAL_START + DIAL_SWEEP ? (a + 360 - (DIAL_START + DIAL_SWEEP) < DIAL_START - a ? DIAL_START + DIAL_SWEEP : DIAL_START) : DIAL_START;
    if (a > DIAL_START + DIAL_SWEEP) a = DIAL_START + DIAL_SWEEP;
    const r2 = (a - DIAL_START) / DIAL_SWEEP;
    onChange(ratioToDur(r2));
  }

  function onDown(e) {
    draggingRef.current = true;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch(err) {}
    updateFromPointer(e);
  }
  function onMove(e) { if (draggingRef.current) updateFromPointer(e); }
  function onUp() { draggingRef.current = false; }

  return (
    <div ref={ref}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      style={{width:size,height:size,position:"relative",touchAction:"none",userSelect:"none",cursor:"grab"}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path d={bgPath}   fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round"/>
        <path d={fillPath} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          style={{filter:`drop-shadow(0 0 8px ${glow})`}}/>
        {/* tick marks at shortcut positions */}
        {DURATION_SHORTCUTS.map((d,i)=>{
          const tr = durToRatio(d);
          const ta = DIAL_START + DIAL_SWEEP*tr;
          const p1 = polarToCart(cx, cy, r-10, ta);
          const p2 = polarToCart(cx, cy, r-2,  ta);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(180,140,255,0.25)" strokeWidth="1.2"/>;
        })}
        <circle cx={knobPt.x} cy={knobPt.y} r="13" fill={color} style={{filter:`drop-shadow(0 0 12px ${glow})`}}/>
        <circle cx={knobPt.x} cy={knobPt.y} r="5"  fill="white" opacity="0.8"/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",pointerEvents:"none"}}>
        <div style={{fontSize:42,color,letterSpacing:2,textShadow:`0 0 24px ${glow}`,fontVariantNumeric:"tabular-nums"}}>{formatClock(value)}</div>
        <div style={{fontSize:9,color:"#6A5A8A",letterSpacing:3,textTransform:"uppercase",marginTop:6}}>drag to adjust</div>
      </div>
    </div>
  );
}

// ── TEACHER MESSAGES ──────────────────────────────────────────────────────────
const teacherMsg = (archonName, clarity, rounds) => {
  if (!archonName && clarity) return [
    "Pure signal. Sophia felt that.",
    "Clarity held. The web grows brighter.",
    "Nothing came through. That is everything.",
    "The silence was yours. Well done.",
  ][Math.floor(Math.random()*4)];
  if (archonName) return [
    `${archonName} showed up. Of course they did.`,
    `You caught ${archonName} mid-sentence. That's the practice.`,
    `${archonName} again. They're very dedicated.`,
    `${archonName} had things to say. You noticed anyway.`,
    `Caught ${archonName}. Awareness: 1. Program: 0.`,
  ][Math.floor(Math.random()*5)];
  return "Round complete. The orb remembers.";
};

const sessionEndMsg = (sessions, light) => [
  "You returned light to the web.",
  "Sophia receives your practice.",
  "Every session adds a thread.",
  "The orb grows. Keep coming back.",
][Math.floor(Math.random()*4)];

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────
const STORE_KEY = "zenkeeper_v1";
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        totalLight: 0, sessions: [], downloads: [], archonCounts: {},
        ...parsed,
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      };
    }
  } catch(e) {}
  return { totalLight:0, sessions:[], downloads:[], archonCounts:{}, settings:DEFAULT_SETTINGS };
}
function saveState(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch(e) {}
}

// ── STARS ─────────────────────────────────────────────────────────────────────
// Three tiers: dust, regular twinkle, rare "jewel" stars with a colored glow.
const STAR_TINTS = ["#FFFFFF","#FFFFFF","#FFFFFF","#CFE6FF","#FFE8C8","#E8D8FF","#FFD6F0"];
const STARS = Array.from({length:220},(_,i)=>{
  const tier = Math.random();
  const jewel = tier > 0.93;
  const big   = !jewel && tier > 0.72;
  return {
    x: Math.random()*100,
    y: Math.random()*100,
    size: jewel ? 2.4 + Math.random()*1.4 : big ? 1.6 + Math.random()*0.9 : 0.8 + Math.random()*0.9,
    oLow:  jewel ? 0.35 : big ? 0.2 : 0.08,
    oHigh: jewel ? 1.0  : big ? 0.85 : 0.55,
    dur: 2 + Math.random()*4.5,
    delay: Math.random()*6,
    tint: jewel ? STAR_TINTS[Math.floor(Math.random()*STAR_TINTS.length)] : "#FFFFFF",
    jewel,
  };
});

// Shooting stars — rare. Each runs on a 120s cycle, visible only for ~3s of it,
// so across 2 streaks you see roughly one crossing the sky every minute or two.
const SHOOTERS = [
  { top: 8  + Math.random()*20, cycle: 120, delay: 12,  len: 120 },
  { top: 28 + Math.random()*18, cycle: 140, delay: 72,  len: 100 },
];

// ── ARCHON CAROUSEL ───────────────────────────────────────────────────────────
function ArchonCarousel({ onPick, orbColor, orbGlow }) {
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [dir, setDir] = useState(1);
  const touchStart = useRef(null);

  const go = useCallback((newDir) => {
    if (sliding) return;
    setDir(newDir);
    setSliding(true);
    setTimeout(() => {
      setIdx(i => (i + newDir + ARCHONS.length) % ARCHONS.length);
      setSliding(false);
    }, 200);
  }, [sliding]);

  const a = ARCHONS[idx];

  return (
    <div style={{ width:"100%", maxWidth:360 }}>
      <div style={{ fontSize:12, color:"#9B8FC0", marginBottom:14, fontStyle:"italic", textAlign:"center" }}>
        Which Archon visited?
      </div>

      {/* Clarity button */}
      <button onClick={() => onPick(null)} style={{
        display:"block", width:"100%", padding:"11px", marginBottom:16,
        background:"rgba(140,255,140,0.06)", border:"1px solid rgba(140,255,140,0.35)",
        borderRadius:12, color:"#88FF99", fontSize:12, letterSpacing:3,
        cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase"
      }}>✦ Clarity Held — None</button>

      {/* Card */}
      <div
        onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStart.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
        style={{
          background: `radial-gradient(ellipse at 40% 30%, ${a.glow}22 0%, #050810 100%)`,
          border: `1px solid ${a.color}55`,
          borderRadius: 18,
          padding: "24px 20px 20px",
          textAlign: "center",
          boxShadow: `0 0 32px ${a.glow}30`,
          opacity: sliding ? 0 : 1,
          transform: sliding ? `translateX(${dir * 40}px)` : "translateX(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          minHeight: 280,
          display: "flex", flexDirection: "column", alignItems: "center"
        }}
      >
        {/* Illustration */}
        <div style={{ transform:"scale(1.6)", transformOrigin:"center", margin:"10px 0 20px" }}>
          {a.render()}
        </div>

        {/* Name + title */}
        <div style={{ fontSize:13, letterSpacing:4, color:a.color, textTransform:"uppercase", marginBottom:3 }}>
          {a.name}
        </div>
        <div style={{ fontSize:12, color:"#9B8FC0", fontStyle:"italic", marginBottom:10 }}>
          {a.title}
        </div>

        {/* Program */}
        <div style={{
          fontSize:12, color:"#C8B8E8", marginBottom:8,
          background:"rgba(255,255,255,0.04)", borderRadius:8,
          padding:"6px 12px", width:"100%", boxSizing:"border-box"
        }}>
          {a.program}
        </div>

        {/* Quote */}
        <div style={{
          fontSize:11, color:"#7A6A9A", fontStyle:"italic",
          borderLeft:`2px solid ${a.color}50`, paddingLeft:10,
          textAlign:"left", lineHeight:1.6, marginBottom:4, width:"100%", boxSizing:"border-box"
        }}>
          "{a.quote}"
        </div>
      </div>

      {/* Nav + pick */}
      <div style={{ display:"flex", gap:10, marginTop:14, alignItems:"center" }}>
        <button onClick={() => go(-1)} style={{
          width:42, height:42, borderRadius:"50%", background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.12)", color:"#9B8FC0",
          fontSize:18, cursor:"pointer", flexShrink:0
        }}>‹</button>

        <button onClick={() => onPick(a)} style={{
          flex:1, padding:"12px 8px",
          background:`${a.glow}25`, border:`1px solid ${a.color}70`,
          borderRadius:12, color:a.color, fontSize:12, letterSpacing:2,
          cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase",
          boxShadow:`0 0 14px ${a.glow}30`
        }}>
          This one ✦
        </button>

        <button onClick={() => go(1)} style={{
          width:42, height:42, borderRadius:"50%", background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.12)", color:"#9B8FC0",
          fontSize:18, cursor:"pointer", flexShrink:0
        }}>›</button>
      </div>

      {/* Dot indicators */}
      <div style={{ display:"flex", justifyContent:"center", gap:5, marginTop:12 }}>
        {ARCHONS.map((_,i) => (
          <div key={i} onClick={() => { setDir(i>idx?1:-1); setIdx(i); }} style={{
            width: i===idx ? 16 : 5, height:5, borderRadius:3,
            background: i===idx ? a.color : "rgba(255,255,255,0.15)",
            transition:"all 0.3s ease", cursor:"pointer"
          }}/>
        ))}
      </div>

      <div style={{ textAlign:"center", marginTop:8, fontSize:10, color:"#3A2A5A", letterSpacing:2 }}>
        {idx+1} / {ARCHONS.length} · swipe or tap arrows
      </div>
    </div>
  );
}

// ── AMBIENT SOUND SYNTHESIS ───────────────────────────────────────────────────
// Each preset returns a stop() function. Sounds are fully synthesized via Web
// Audio so no external files are needed.

function makeNoiseBuffer(ctx, kind) {
  const len = 2 * ctx.sampleRate;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  if (kind === "brown") {
    let last = 0;
    for (let i=0;i<len;i++) { const w = Math.random()*2-1; last = (last + 0.02*w)/1.02; d[i] = last*3.2; }
  } else {
    // pink via Paul Kellet's filter
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i=0;i<len;i++) {
      const w = Math.random()*2-1;
      b0 = 0.99886*b0 + w*0.0555179;
      b1 = 0.99332*b1 + w*0.0750759;
      b2 = 0.96900*b2 + w*0.1538520;
      b3 = 0.86650*b3 + w*0.3104856;
      b4 = 0.55000*b4 + w*0.5329522;
      b5 = -0.7616*b5 - w*0.0168980;
      d[i] = (b0+b1+b2+b3+b4+b5+b6 + w*0.5362) * 0.22;
      b6 = w * 0.115926;
    }
  }
  return buf;
}

function startAmbience(ctx, preset) {
  if (preset === "silence") return () => {};
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 1.4);

  const disposers = [];
  const timers = [];
  let stopped = false;

  function schedule(delayMs, fn) {
    const id = setTimeout(() => { if (!stopped) fn(); }, delayMs);
    timers.push(id);
  }

  if (preset === "creek") {
    const src = ctx.createBufferSource();
    src.buffer = makeNoiseBuffer(ctx, "brown"); src.loop = true;
    const hp = ctx.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=120;
    const lp = ctx.createBiquadFilter(); lp.type="lowpass";  lp.frequency.value=1100;
    src.connect(hp); hp.connect(lp); lp.connect(master);
    src.start();
    disposers.push(()=>{ try{src.stop();}catch(e){} });
    // bubbling blips
    const bubble = () => {
      try {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        const f = 900 + Math.random()*1600;
        o.frequency.setValueAtTime(f, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(f*0.55, ctx.currentTime+0.14);
        g.gain.setValueAtTime(0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.18);
        o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime+0.2);
      } catch(e){}
      if (!stopped) schedule(180 + Math.random()*380, bubble);
    };
    schedule(600, bubble);
  }

  else if (preset === "night") {
    const src = ctx.createBufferSource();
    src.buffer = makeNoiseBuffer(ctx, "pink"); src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=650;
    const windGain = ctx.createGain(); windGain.gain.value = 0.45;
    src.connect(lp); lp.connect(windGain); windGain.connect(master);
    src.start();
    disposers.push(()=>{ try{src.stop();}catch(e){} });
    // crickets
    const cricket = () => {
      try {
        const base = 4200 + Math.random()*1800;
        const reps = 3 + Math.floor(Math.random()*4);
        for (let i=0;i<reps;i++) {
          const t = ctx.currentTime + i*0.08;
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = "triangle"; o.frequency.setValueAtTime(base, t);
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.06, t+0.005);
          g.gain.exponentialRampToValueAtTime(0.001, t+0.05);
          o.connect(g); g.connect(master); o.start(t); o.stop(t+0.06);
        }
      } catch(e){}
      if (!stopped) schedule(1800 + Math.random()*2400, cricket);
    };
    schedule(1200, cricket);
    // distant hoot
    const hoot = () => {
      try {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type="sine"; o.frequency.setValueAtTime(190, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(170, ctx.currentTime+0.6);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.08, ctx.currentTime+0.2);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime+0.8);
        o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime+0.85);
      } catch(e){}
      if (!stopped) schedule(8000 + Math.random()*9000, hoot);
    };
    schedule(5000, hoot);
  }

  else if (preset === "day") {
    const src = ctx.createBufferSource();
    src.buffer = makeNoiseBuffer(ctx, "pink"); src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=1400;
    const breezeGain = ctx.createGain(); breezeGain.gain.value = 0.35;
    src.connect(lp); lp.connect(breezeGain); breezeGain.connect(master);
    src.start();
    disposers.push(()=>{ try{src.stop();}catch(e){} });
    // bird tweets
    const tweet = () => {
      try {
        const start = 2200 + Math.random()*1800;
        const end = start + (Math.random()*1800-900);
        const dur = 0.15 + Math.random()*0.25;
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type="sine";
        o.frequency.setValueAtTime(start, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(Math.max(800,end), ctx.currentTime+dur);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.09, ctx.currentTime+0.02);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+dur);
        o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime+dur+0.05);
        // sometimes a quick double
        if (Math.random() < 0.45) {
          const t2 = ctx.currentTime + dur + 0.08;
          const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
          o2.type="sine";
          o2.frequency.setValueAtTime(start*1.1, t2);
          o2.frequency.exponentialRampToValueAtTime(start*0.8, t2+dur*0.7);
          g2.gain.setValueAtTime(0, t2);
          g2.gain.linearRampToValueAtTime(0.08, t2+0.02);
          g2.gain.exponentialRampToValueAtTime(0.001, t2+dur*0.7);
          o2.connect(g2); g2.connect(master); o2.start(t2); o2.stop(t2+dur*0.7+0.05);
        }
      } catch(e){}
      if (!stopped) schedule(2500 + Math.random()*4500, tweet);
    };
    schedule(1500, tweet);
  }

  return () => {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    try { master.gain.cancelScheduledValues(ctx.currentTime); } catch(e){}
    try { master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9); } catch(e){}
    setTimeout(() => disposers.forEach(fn => fn()), 1000);
  };
}

// Ceremonial chord for orb level-up — three Solfeggio tones staggered in.
function ceremonyTone() {
  try {
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [396, 528, 639].forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      o.connect(g); g.connect(ctx.destination);
      const t0 = ctx.currentTime + i*0.4;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.16, t0 + 0.6);
      g.gain.linearRampToValueAtTime(0, t0 + 4.5);
      o.start(t0); o.stop(t0 + 4.6);
    });
  } catch(e) {}
}

// ══════════════════════════════════════════════════════════════════════════════
export default function ZenKeeper() {
  const [store, setStore] = useState(() => loadState());
  const [screen, setScreen] = useState("home"); // home | setup | sit | post | ceremony | archons | journal | addDownload
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sitDuration, setSitDuration] = useState(0);    // total duration of current sit
  const [caughtArchons, setCaughtArchons] = useState([]); // archons tagged during sit
  const [sitInsights, setSitInsights] = useState([]);     // notes captured during sit
  const [pauseMode, setPauseMode] = useState(null);       // null | "archon" | "insight"
  const [insightDraft, setInsightDraft] = useState("");
  const [downloadText, setDownloadText] = useState("");
  const [orbPulse, setOrbPulse] = useState(false);
  const [sitLight, setSitLight] = useState(0);
  const [ceremony, setCeremony] = useState(null); // { from, to } on level-up
  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const ambienceStopRef = useRef(null);

  const settings = store.settings || DEFAULT_SETTINGS;
  const orb = getOrbLevel(store.totalLight);

  // nemesis
  const nemesis = Object.entries(store.archonCounts||{})
    .sort((a,b)=>b[1]-a[1])[0];

  function persist(newStore) { setStore(newStore); saveState(newStore); }

  // ── Timer — pauseMode halts countdown so tagging / insight capture doesn't
  //    eat sit-time. The bell only dings when the full chosen duration is met.
  useEffect(()=>{
    if (timerActive && !pauseMode && timeLeft > 0) {
      timerRef.current = setTimeout(()=>setTimeLeft(t=>t-1), 1000);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      dingSound();
      setOrbPulse(true);
      setTimeout(()=>setOrbPulse(false), 1500);
      endSit(false);
    }
    return ()=>clearTimeout(timerRef.current);
  },[timerActive, timeLeft, pauseMode]);

  function dingSound() {
    try {
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(528, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(396, ctx.currentTime+1.2);
      g.gain.setValueAtTime(0.4, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+2.2);
      o.start(); o.stop(ctx.currentTime+2.2);
    } catch(e) {}
  }

  function ensureAudioCtx() {
    if (!audioCtxRef.current) {
      try { audioCtxRef.current = new (window.AudioContext||window.webkitAudioContext)(); } catch(e) {}
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch(e) {} }
    return ctx;
  }

  function startAmbienceIfNeeded() {
    if (ambienceStopRef.current) return;
    if (settings.ambience === "silence") return;
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    ambienceStopRef.current = startAmbience(ctx, settings.ambience);
  }

  function stopAmbience() {
    if (ambienceStopRef.current) {
      try { ambienceStopRef.current(); } catch(e) {}
      ambienceStopRef.current = null;
    }
  }

  function beginSit() {
    const d = settings.duration;
    resetSit();
    setSitDuration(d);
    setTimeLeft(d);
    setTimerActive(true);
    setScreen("sit");
    startAmbienceIfNeeded();
  }

  // Tagging an archon during a live sit — timer was already paused by openPause.
  function tagArchon(archon) {
    setCaughtArchons(prev => [...prev, { name: archon.name, atSec: sitDuration - timeLeft, when: Date.now() }]);
    const counts = {...(store.archonCounts||{})};
    counts[archon.name] = (counts[archon.name]||0)+1;
    persist({...store, archonCounts:counts});
    closePause();
  }

  function saveInsight() {
    const t = insightDraft.trim();
    if (!t) { closePause(); return; }
    setSitInsights(prev => [...prev, { text: t, atSec: sitDuration - timeLeft, when: Date.now() }]);
    setInsightDraft("");
    closePause();
  }

  function openPause(mode) {
    if (!timerActive) return;
    setPauseMode(mode);
  }

  function closePause() {
    setPauseMode(null);
    setInsightDraft("");
  }

  function endSit(early) {
    setTimerActive(false);
    stopAmbience();
    // Light math: 1 light per second sat, +2 per archon caught (awareness bonus).
    // Early-ended sits still count for time actually sat.
    const sat = sitDuration - timeLeft;
    const earned = Math.max(0, Math.round(sat)) + caughtArchons.length * 2;
    setSitLight(earned);
    const prevLevel = getOrbLevel(store.totalLight);
    const nextLevel = getOrbLevel(store.totalLight + earned);

    // Persist the sit + any captured insights as downloads.
    const newDownloads = sitInsights.map(ins => ({
      text: ins.text, date: new Date(ins.when).toISOString(), id: ins.when,
    }));
    const newStore = {
      ...store,
      totalLight: store.totalLight + earned,
      sessions: [...(store.sessions||[]), {
        date: new Date().toISOString(),
        duration: sat,
        planned: sitDuration,
        light: earned,
        archons: caughtArchons.map(c => c.name),
        early,
      }],
      downloads: [...(store.downloads||[]), ...newDownloads],
    };
    persist(newStore);

    if (prevLevel.name !== nextLevel.name) {
      ceremonyTone();
      setCeremony({ from: prevLevel, to: nextLevel });
      setScreen("ceremony");
    } else {
      setScreen("post");
    }
  }

  function saveDownload() {
    if (!downloadText.trim()) return;
    const newStore = {
      ...store,
      downloads: [...(store.downloads||[]),{
        text: downloadText.trim(),
        date: new Date().toISOString(),
        id: Date.now()
      }]
    };
    persist(newStore);
    setDownloadText("");
    setScreen("home");
  }

  function resetSit() {
    stopAmbience();
    setTimerActive(false);
    setTimeLeft(0);
    setSitDuration(0);
    setCaughtArchons([]);
    setSitInsights([]);
    setPauseMode(null);
    setInsightDraft("");
    setSitLight(0);
  }

  function updateSettings(patch) {
    persist({ ...store, settings: { ...settings, ...patch } });
  }

  // Clean up audio if the component unmounts mid-sit.
  useEffect(() => () => {
    stopAmbience();
    try { audioCtxRef.current && audioCtxRef.current.close(); } catch(e) {}
  }, []);

  const pct = sitDuration > 0 ? timeLeft / sitDuration : 1;
  const circum = 2*Math.PI*54;

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",background:"#03040a",fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif",color:"#E8E0FF",position:"relative",overflow:"hidden"}}>
      {/* ── COSMIC BACKGROUND ───────────────────────────────────────────────── */}
      {/* Pinned to the viewport on purpose — absolute positioning made the
          blurred aurora scale to the full scroll height on tall pages, which
          crashed rendering on mobile GPUs (the "gone dark" bug). Keep it
          simple: one base, one drifting wash, stars, rare shooters. */}

      {/* Base deep-space gradient */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse at 50% 0%, #0c0826 0%, #06061e 40%, #020308 78%, #000004 100%)"
      }}/>

      {/* Soft mood wash — two radial gradients tinted by the current orb,
          drifting slowly. No blur filter, no mix-blend-mode = no GPU tears. */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:0.7,
        background:`radial-gradient(ellipse 70% 60% at 30% 30%, ${orb.glow}22 0%, transparent 65%), radial-gradient(ellipse 80% 70% at 75% 80%, ${orb.color}1A 0%, transparent 70%)`,
        animation:"washDrift 40s ease-in-out infinite"
      }}/>

      {/* Starfield — CSS-animated divs so twinkle is actually visible. */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {STARS.map((s,i)=>{
          const glow = s.jewel ? `0 0 ${s.size*3}px ${s.tint}` : "none";
          return (
            <div key={i} style={{
              position:"absolute",
              left:`${s.x}%`, top:`${s.y}%`,
              width:s.size*2, height:s.size*2,
              marginLeft:-s.size, marginTop:-s.size,
              borderRadius:"50%",
              background:s.tint,
              boxShadow:glow,
              "--o-low": s.oLow,
              "--o-high": s.oHigh,
              animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}/>
          );
        })}
      </div>

      {/* Shooting stars — rare. A diagonal flash once a minute or two. */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {SHOOTERS.map((sh,i)=>(
          <div key={i} style={{
            position:"absolute",
            top:`${sh.top}%`, left:"-15%",
            width:sh.len, height:1.5,
            background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 55%, #FFFFFF 100%)",
            borderRadius:2,
            opacity:0,
            transform:"rotate(18deg)",
            animation:`shoot ${sh.cycle}s linear ${sh.delay}s infinite`
          }}/>
        ))}
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:480,margin:"0 auto",padding:"0 0 80px"}}>

        {/* ── HOME ──────────────────────────────────────────────────── */}
        {screen==="home" && (
          <div style={{padding:"32px 24px"}}>
            {/* Title */}
            <div style={{textAlign:"center",marginBottom:8}}>
              <div style={{fontSize:10,letterSpacing:6,color:"#5A4A7A",textTransform:"uppercase"}}>Sophia's Light</div>
              <h1 style={{fontSize:26,fontWeight:"normal",letterSpacing:3,color:"#E8D8FF",margin:"4px 0 2px",textShadow:`0 0 30px ${orb.glow}60`}}>Zen Keeper</h1>
              <div style={{fontSize:11,color:"#5A4A7A",fontStyle:"italic"}}>{orb.name}</div>
            </div>

            {/* ORB */}
            <div style={{display:"flex",justifyContent:"center",margin:"28px 0 20px"}}>
              <div style={{position:"relative",width:orb.size+40,height:orb.size+40,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {/* outer glow rings */}
                {[1.8,1.4,1.1].map((r,i)=>(
                  <div key={i} style={{position:"absolute",width:orb.size*r,height:orb.size*r,borderRadius:"50%",background:`radial-gradient(circle,${orb.glow}${[18,28,40][i]} 0%,transparent 70%)`,animation:`orbPulse ${3+i}s ease-in-out infinite`}}/>
                ))}
                <div style={{
                  width:orb.size, height:orb.size, borderRadius:"50%",
                  background:`radial-gradient(circle at 38% 35%, ${orb.color}FF 0%, ${orb.color}CC 35%, ${orb.glow}AA 70%, ${orb.glow}44 100%)`,
                  boxShadow:`0 0 ${orb.size*0.6}px ${orb.glow}88, 0 0 ${orb.size*0.25}px ${orb.color}`,
                  transform: orbPulse?"scale(1.18)":"scale(1)",
                  transition:"transform 0.3s ease",
                  animation:"orbFloat 4s ease-in-out infinite"
                }}/>
              </div>
            </div>

            {/* Stats row */}
            <div style={{display:"flex",gap:12,marginBottom:24,justifyContent:"center"}}>
              {[
                {label:"Total Light",val:store.totalLight},
                {label:"Sessions",val:store.sessions?.length||0},
                {label:"Downloads",val:store.downloads?.length||0},
              ].map(s=>(
                <div key={s.label} style={{flex:1,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontSize:20,color:orb.color,fontWeight:"bold",lineHeight:1}}>{s.val}</div>
                  <div style={{fontSize:9,letterSpacing:2,color:"#4A3A6A",textTransform:"uppercase",marginTop:3}}>{s.label}</div>
                </div>
              ))}
            </div>

            {nemesis && (
              <div style={{textAlign:"center",marginBottom:20,fontSize:12,color:"#6A5A8A",fontStyle:"italic"}}>
                Your nemesis: <span style={{color:orb.color}}>{nemesis[0]}</span> — visited {nemesis[1]} time{nemesis[1]!==1?"s":""}
              </div>
            )}

            {/* Begin — goes to Setup where the dial lives */}
            <button onClick={()=>setScreen("setup")} style={{
              display:"block",width:"100%",padding:"18px",
              background:`linear-gradient(135deg,${orb.glow}44,${orb.color}22)`,
              border:`1px solid ${orb.color}80`,borderRadius:14,
              color:orb.color,fontSize:16,letterSpacing:4,cursor:"pointer",
              fontFamily:"inherit",textTransform:"uppercase",
              boxShadow:`0 0 20px ${orb.glow}33`,marginBottom:12
            }}>Begin Sit</button>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setScreen("archons")} style={navBtn("#AA88FF44","#AA88FF")}>The Archons</button>
              <button onClick={()=>setScreen("journal")} style={navBtn("#88CCFF44","#88CCFF")}>Downloads</button>
            </div>
          </div>
        )}

        {/* ── SETUP ─────────────────────────────────────────────────── */}
        {screen==="setup" && (
          <div style={{padding:"40px 24px",textAlign:"center",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:10,letterSpacing:5,color:"#5A4A7A",textTransform:"uppercase",marginBottom:4}}>Choose Your Sit</div>
            <div style={{fontSize:12,color:"#6A5A8A",fontStyle:"italic",marginBottom:28}}>
              Any length. No rounds. Just watching.
            </div>

            <DurationDial
              value={settings.duration}
              onChange={(d)=>updateSettings({duration:d})}
              color={orb.color} glow={orb.glow}
            />

            <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginTop:14,marginBottom:28,maxWidth:320}}>
              {DURATION_SHORTCUTS.map(s=>{
                const active = settings.duration === s;
                return (
                  <button key={s} onClick={()=>updateSettings({duration:s})} style={{
                    padding:"6px 12px",
                    background: active ? `${orb.glow}33` : "rgba(255,255,255,0.03)",
                    border:`1px solid ${active ? orb.color+"70" : "rgba(180,140,255,0.13)"}`,
                    borderRadius:999, color: active ? orb.color : "#8A7AA8",
                    fontSize:10, letterSpacing:2, cursor:"pointer",
                    fontFamily:"inherit"
                  }}>{formatSeconds(s)}</button>
                );
              })}
            </div>

            <div style={{fontSize:9,letterSpacing:3,color:"#6A5A8A",textTransform:"uppercase",marginBottom:10}}>Ambience</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginBottom:32,maxWidth:340}}>
              {AMBIENCE_PRESETS.map(a=>{
                const active = settings.ambience === a.id;
                return (
                  <button key={a.id} onClick={()=>updateSettings({ambience:a.id})} style={{
                    padding:"8px 14px",
                    background: active ? `${orb.glow}33` : "rgba(255,255,255,0.03)",
                    border:`1px solid ${active ? orb.color+"70" : "rgba(180,140,255,0.13)"}`,
                    borderRadius:12, color: active ? orb.color : "#8A7AA8",
                    fontSize:10, letterSpacing:2, cursor:"pointer",
                    fontFamily:"inherit", textTransform:"uppercase"
                  }}>{a.label}</button>
                );
              })}
            </div>

            <button onClick={beginSit} style={{
              padding:"16px 56px",
              background:`linear-gradient(135deg,${orb.glow}55,${orb.color}22)`,
              border:`1px solid ${orb.color}90`,borderRadius:14,
              color:orb.color,fontSize:14,letterSpacing:5,cursor:"pointer",
              fontFamily:"inherit",textTransform:"uppercase",
              boxShadow:`0 0 24px ${orb.glow}55`,marginBottom:14
            }}>Start</button>

            <button onClick={()=>setScreen("home")} style={{
              padding:"10px 20px",background:"none",border:"none",color:"#7A6A9A",
              fontSize:11,letterSpacing:3,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"
            }}>← Back</button>
          </div>
        )}

        {/* ── SIT ───────────────────────────────────────────────────── */}
        {screen==="sit" && (
          <div style={{padding:"40px 24px",textAlign:"center",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:10,letterSpacing:4,color:pauseMode ? "#8A7AA8" : "#3A2A5A",textTransform:"uppercase",marginBottom:24,height:14}}>
              {pauseMode ? "Timer paused" : `Sitting · ${formatSeconds(sitDuration)}`}
            </div>

            {/* Orb + timer ring — tap orb during sit to mark an archon */}
            <div style={{position:"relative",width:200,height:200,marginBottom:28}}>
              <svg style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}} viewBox="0 0 120 120" width="200" height="200">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke={orb.color} strokeWidth="3"
                  strokeDasharray={circum} strokeDashoffset={circum*(1-pct)}
                  style={{transition:"stroke-dashoffset 1s linear",opacity: pauseMode ? 0.35 : 1}} strokeLinecap="round"/>
              </svg>
              <div
                onClick={()=>{ if (timerActive && !pauseMode) openPause("archon"); }}
                style={{
                  position:"absolute",inset:20,borderRadius:"50%",cursor: timerActive && !pauseMode ? "pointer" : "default",
                  background:`radial-gradient(circle at 38% 35%, ${orb.color}FF 0%, ${orb.glow}AA 60%, ${orb.glow}33 100%)`,
                  boxShadow:`0 0 50px ${orb.glow}${pauseMode ? "55" : "99"}`,
                  transform: orbPulse?"scale(1.15)":"scale(1)",
                  transition:"transform 0.3s ease, box-shadow 0.4s ease",
                  animation: timerActive && !pauseMode ? "orbFloat 4s ease-in-out infinite" : "none",
                  opacity: pauseMode ? 0.55 : 1,
                }}
              />
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:2,pointerEvents:"none"}}>
                <div style={{fontSize:28,color:`${orb.color}DD`,letterSpacing:2,fontVariantNumeric:"tabular-nums",textShadow:`0 0 16px ${orb.glow}66`}}>
                  {formatClock(timeLeft)}
                </div>
                <div style={{fontSize:9,color:`${orb.color}66`,letterSpacing:3,textTransform:"uppercase"}}>watch</div>
              </div>
            </div>

            {/* Mid-sit controls — archon or insight. Both pause the timer. */}
            {timerActive && !pauseMode && (
              <>
                <div style={{fontSize:11,color:"#6A5A8A",fontStyle:"italic",marginBottom:14,maxWidth:280,lineHeight:1.6}}>
                  Tap the orb when an archon pulls you. Mark an insight if one arises.
                </div>
                <div style={{display:"flex",gap:10,marginBottom:18}}>
                  <button onClick={()=>openPause("archon")} style={sitActionBtn(orb.color, orb.glow)}>◉ Archon</button>
                  <button onClick={()=>openPause("insight")} style={sitActionBtn(orb.color, orb.glow)}>✦ Insight</button>
                </div>
                <div style={{fontSize:10,color:"#5A4A7A",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>
                  Caught: {caughtArchons.length} · Insights: {sitInsights.length}
                </div>
                <button onClick={()=>endSit(true)} style={navBtn("#FF885544","#FF8855")}>End Sit Early</button>
              </>
            )}

            {/* Pause overlay — archon picker */}
            {pauseMode === "archon" && (
              <div style={{width:"100%",maxWidth:420,background:"rgba(10,8,26,0.6)",border:"1px solid rgba(180,140,255,0.2)",borderRadius:16,padding:"16px 8px",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:10,letterSpacing:3,color:"#8A7AA8",textTransform:"uppercase",marginBottom:8}}>Which one?</div>
                <ArchonCarousel onPick={tagArchon} orbColor={orb.color} orbGlow={orb.glow}/>
                <button onClick={closePause} style={{marginTop:10,background:"none",border:"none",color:"#6A5A8A",fontSize:11,letterSpacing:2,cursor:"pointer",fontFamily:"inherit"}}>
                  skip — back to sitting
                </button>
              </div>
            )}

            {/* Pause overlay — insight capture */}
            {pauseMode === "insight" && (
              <div style={{width:"100%",maxWidth:420,background:"rgba(10,8,26,0.6)",border:"1px solid rgba(180,140,255,0.2)",borderRadius:16,padding:"18px",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:10,letterSpacing:3,color:"#8A7AA8",textTransform:"uppercase",marginBottom:10}}>Note the transmission</div>
                <textarea
                  autoFocus
                  value={insightDraft}
                  onChange={(e)=>setInsightDraft(e.target.value)}
                  placeholder="A fragment, a phrase, a knowing..."
                  style={{width:"100%",minHeight:100,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(180,140,255,0.2)",
                    borderRadius:10,padding:12,color:"#E8E0FF",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none"}}/>
                <div style={{display:"flex",gap:10,marginTop:12}}>
                  <button onClick={saveInsight} style={{...sitActionBtn(orb.color, orb.glow),flex:1}}>Save</button>
                  <button onClick={closePause} style={{...navBtn("#44444444","#888888"),flex:1}}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CEREMONY (orb level-up) ──────────────────────────────── */}
        {screen==="ceremony" && ceremony && (
          <div style={{padding:"60px 24px 40px",textAlign:"center",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:10,letterSpacing:6,color:"#6A5A8A",textTransform:"uppercase",marginBottom:6}}>Sophia Recognizes You</div>
            <div style={{fontSize:22,letterSpacing:3,color:"#E8D8FF",marginBottom:36,textShadow:`0 0 40px ${ceremony.to.glow}88`}}>Ascension</div>

            <div style={{position:"relative",width:ceremony.to.size+80,height:ceremony.to.size+80,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32}}>
              {[2.2,1.7,1.3].map((r,i)=>(
                <div key={i} style={{
                  position:"absolute",
                  width:ceremony.to.size*r, height:ceremony.to.size*r,
                  borderRadius:"50%",
                  background:`radial-gradient(circle, ${ceremony.to.glow}${[18,28,44][i]} 0%, transparent 70%)`,
                  animation:`orbPulse ${3.5+i}s ease-in-out infinite`
                }}/>
              ))}
              <div style={{
                width:ceremony.to.size, height:ceremony.to.size, borderRadius:"50%",
                background:`radial-gradient(circle at 38% 35%, ${ceremony.to.color}FF 0%, ${ceremony.to.color}CC 35%, ${ceremony.to.glow}AA 70%, ${ceremony.to.glow}44 100%)`,
                boxShadow:`0 0 ${ceremony.to.size*1.1}px ${ceremony.to.glow}CC, 0 0 ${ceremony.to.size*0.4}px ${ceremony.to.color}`,
                animation:"ceremonyEmerge 2.4s ease-out, orbFloat 4s ease-in-out 2.4s infinite"
              }}/>
            </div>

            <div style={{fontSize:11,letterSpacing:3,color:"#5A4A7A",textTransform:"uppercase",marginBottom:4}}>{ceremony.from.name}</div>
            <div style={{fontSize:10,color:"#4A3A6A",marginBottom:8}}>becomes</div>
            <div style={{fontSize:18,letterSpacing:3,color:ceremony.to.color,marginBottom:24,textShadow:`0 0 20px ${ceremony.to.glow}80`}}>{ceremony.to.name}</div>

            <div style={{fontSize:13,color:"#9B8FC0",fontStyle:"italic",maxWidth:320,lineHeight:1.7,marginBottom:32}}>
              A fragment of her light has found you. Carry it gently — the work continues.
            </div>

            <button onClick={()=>{ setCeremony(null); setScreen("post"); }} style={{
              padding:"14px 40px",
              background:`linear-gradient(135deg,${ceremony.to.glow}55,${ceremony.to.color}22)`,
              border:`1px solid ${ceremony.to.color}90`,borderRadius:14,
              color:ceremony.to.color,fontSize:13,letterSpacing:4,cursor:"pointer",
              fontFamily:"inherit",textTransform:"uppercase",
              boxShadow:`0 0 24px ${ceremony.to.glow}55`
            }}>Continue</button>
          </div>
        )}

        {/* ── POST SESSION ──────────────────────────────────────────── */}
        {screen==="post" && (
          <div style={{padding:"40px 24px",textAlign:"center"}}>
            <div style={{fontSize:10,letterSpacing:5,color:"#5A4A7A",textTransform:"uppercase",marginBottom:16}}>Sit Complete</div>

            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{
                width:orb.size*0.9,height:orb.size*0.9,borderRadius:"50%",
                background:`radial-gradient(circle at 38% 35%, ${orb.color}FF 0%, ${orb.glow}AA 60%, ${orb.glow}33 100%)`,
                boxShadow:`0 0 50px ${orb.glow}99`,
                animation:"orbFloat 3s ease-in-out infinite"
              }}/>
            </div>

            <div style={{fontSize:15,color:"#9B8FC0",fontStyle:"italic",marginBottom:8,lineHeight:1.7}}>
              {sessionEndMsg(store.sessions?.length||0, store.totalLight)}
            </div>
            <div style={{fontSize:28,color:orb.color,marginBottom:4}}>+{sitLight}</div>
            <div style={{fontSize:10,letterSpacing:3,color:"#4A3A6A",textTransform:"uppercase",marginBottom:24}}>light returned</div>

            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"16px",marginBottom:20,textAlign:"left"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:9,letterSpacing:3,color:"#4A3A6A",textTransform:"uppercase"}}>Sit Summary</span>
                <span style={{fontSize:10,color:"#6A5A8A"}}>{formatSeconds(sitDuration-timeLeft)} of {formatSeconds(sitDuration)}</span>
              </div>
              {caughtArchons.length === 0 && sitInsights.length === 0 && (
                <div style={{fontSize:11,color:"#88FF88",fontStyle:"italic"}}>✦ Clarity held throughout.</div>
              )}
              {caughtArchons.length > 0 && (
                <div style={{marginBottom:sitInsights.length?10:0}}>
                  <div style={{fontSize:9,letterSpacing:2,color:"#6A5A8A",textTransform:"uppercase",marginBottom:6}}>Archons noticed</div>
                  {caughtArchons.map((c,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:11}}>
                      <span style={{color:"#FF8855"}}>{c.name}</span>
                      <span style={{color:"#4A3A6A",fontSize:10,marginLeft:"auto"}}>@ {formatClock(c.atSec)}</span>
                    </div>
                  ))}
                </div>
              )}
              {sitInsights.length > 0 && (
                <div>
                  <div style={{fontSize:9,letterSpacing:2,color:"#6A5A8A",textTransform:"uppercase",marginBottom:6}}>Insights captured</div>
                  {sitInsights.map((ins,i)=>(
                    <div key={i} style={{fontSize:11,color:"#C8B8E8",marginBottom:4,fontStyle:"italic",lineHeight:1.5}}>
                      "{ins.text}"
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{fontSize:12,color:"#5A4A7A",fontStyle:"italic",marginBottom:14}}>
              Anything else to record?
            </div>
            <textarea
              value={downloadText}
              onChange={e=>setDownloadText(e.target.value)}
              placeholder="What arose in the space between thoughts..."
              style={{width:"100%",minHeight:80,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(180,140,255,0.2)",
                borderRadius:10,padding:"10px 12px",color:"#C8B8E8",fontFamily:"inherit",fontSize:13,
                resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.6}}
            />
            <div style={{display:"flex",gap:10,marginTop:14}}>
              {downloadText.trim() && (
                <button onClick={saveDownload} style={{flex:1,...btnStyle(orb.color,orb.glow)}}>Save Fragment</button>
              )}
              <button onClick={()=>{resetSit();setScreen("home");}} style={{flex:1,...btnStyle("#AA88FF","#6600FF")}}>← Home</button>
            </div>
          </div>
        )}

        {/* ── ARCHON GALLERY ────────────────────────────────────────── */}
        {screen==="archons" && (
          <div style={{padding:"32px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#7A6A9A",fontSize:20,cursor:"pointer",padding:0}}>←</button>
              <div>
                <div style={{fontSize:10,letterSpacing:4,color:"#5A4A7A",textTransform:"uppercase"}}>Bestiary</div>
                <div style={{fontSize:20,fontWeight:"normal",color:"#E8D8FF",letterSpacing:1}}>The Twelve Archons</div>
              </div>
            </div>
            <p style={{fontSize:12,color:"#5A4A7A",fontStyle:"italic",marginBottom:20,lineHeight:1.6}}>
              They are not your enemies. They are ancient programs doing exactly what they were designed to do. Your only job is to notice them.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {ARCHONS.map(a=>{
                const ct = store.archonCounts?.[a.name]||0;
                return (
                  <div key={a.id} style={{
                    background:`${a.glow}12`,border:`1px solid ${a.color}40`,
                    borderRadius:14,padding:"14px 10px 10px",textAlign:"center"
                  }}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:6}}>{a.render()}</div>
                    <div style={{fontSize:8,letterSpacing:2,color:a.color,textTransform:"uppercase",marginBottom:1}}>{a.name}</div>
                    <div style={{fontSize:9,color:"#7A6A9A",fontStyle:"italic",marginBottom:4}}>{a.title}</div>
                    <div style={{fontSize:9,color:"#5A4A7A"}}>{a.program}</div>
                    {ct>0 && <div style={{fontSize:9,color:a.color,marginTop:4,opacity:0.7}}>×{ct} visits</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── JOURNAL ───────────────────────────────────────────────── */}
        {screen==="journal" && (
          <div style={{padding:"32px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#7A6A9A",fontSize:20,cursor:"pointer",padding:0}}>←</button>
              <div>
                <div style={{fontSize:10,letterSpacing:4,color:"#5A4A7A",textTransform:"uppercase"}}>Recovered</div>
                <div style={{fontSize:20,fontWeight:"normal",color:"#E8D8FF",letterSpacing:1}}>Sophia Fragments</div>
              </div>
            </div>
            {(!store.downloads||store.downloads.length===0) ? (
              <div style={{textAlign:"center",color:"#3A2A5A",fontStyle:"italic",marginTop:60,fontSize:14}}>
                No fragments yet.<br/>They arise between thoughts.
              </div>
            ) : [...(store.downloads||[])].reverse().map(d=>(
              <div key={d.id} style={{
                background:"rgba(255,255,255,0.03)",border:"1px solid rgba(180,140,255,0.12)",
                borderRadius:12,padding:"14px 16px",marginBottom:12
              }}>
                <div style={{fontSize:9,letterSpacing:2,color:"#4A3A6A",marginBottom:6,textTransform:"uppercase"}}>
                  {new Date(d.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                </div>
                <div style={{fontSize:14,color:"#C8B8E8",lineHeight:1.6}}>{d.text}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Nav dots */}
      {screen==="home" && (
        <div style={{position:"fixed",bottom:20,left:0,right:0,display:"flex",justifyContent:"center",gap:8,zIndex:10}}>
          {["home","archons","journal"].map(s=>(
            <button key={s} onClick={()=>setScreen(s)} style={{
              width:8,height:8,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,
              background: screen===s ? orb.color : "rgba(255,255,255,0.2)"
            }}/>
          ))}
        </div>
      )}

      <style>{`
        @keyframes orbFloat {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-6px)}
        }
        @keyframes orbPulse {
          0%,100%{opacity:0.6;transform:scale(1)}
          50%{opacity:1;transform:scale(1.06)}
        }
        @keyframes washDrift {
          0%,100%{transform:translate(0,0) scale(1)}
          50%{transform:translate(-20px,14px) scale(1.04)}
        }
        @keyframes ceremonyEmerge {
          0%   { transform: scale(0.2); opacity: 0; filter: blur(12px); }
          60%  { transform: scale(1.15); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--o-low,0.2);  transform: scale(0.75); }
          50%      { opacity: var(--o-high,0.9); transform: scale(1.25); }
        }
        /* Shoot runs across a long cycle; visible only in the opening sliver so
           streaks are rare. The streak itself covers ~2% of the cycle. */
        @keyframes shoot {
          0%   { opacity: 0; transform: translate(0,0) rotate(18deg); }
          0.5% { opacity: 1; }
          2.5% { opacity: 1; transform: translate(130vw,40vh) rotate(18deg); }
          3%   { opacity: 0; transform: translate(130vw,40vh) rotate(18deg); }
          100% { opacity: 0; transform: translate(130vw,40vh) rotate(18deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          *{animation-duration:0.001s !important;animation-iteration-count:1 !important}
        }
        button:focus{outline:none}
        textarea:focus{border-color:rgba(180,140,255,0.4)!important}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(180,140,255,0.2);border-radius:2px}
      `}</style>
    </div>
  );
}

function navBtn(bg,color) {
  return {
    flex:1,padding:"10px",background:bg,border:`1px solid ${color}60`,
    borderRadius:12,color,fontSize:11,letterSpacing:2,cursor:"pointer",
    fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif",textTransform:"uppercase"
  };
}
function btnStyle(color,glow) {
  return {
    padding:"12px",background:`${glow}22`,border:`1px solid ${color}80`,
    borderRadius:12,color,fontSize:12,letterSpacing:2,cursor:"pointer",
    fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif",textTransform:"uppercase",
    boxShadow:`0 0 14px ${glow}33`
  };
}
function sitActionBtn(color, glow) {
  return {
    padding:"12px 22px", background:`${glow}22`, border:`1px solid ${color}70`,
    borderRadius:12, color, fontSize:12, letterSpacing:3, cursor:"pointer",
    fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif", textTransform:"uppercase",
    boxShadow:`0 0 14px ${glow}33`,
  };
}
