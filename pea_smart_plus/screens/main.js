// ─── Router ───
let stk = ['s-splash'];

function go(id) {
  const cur = document.getElementById(stk[stk.length-1]);
  const nxt = document.getElementById(id);
  if (!nxt) return;
  cur.classList.add('off');
  nxt.classList.add('on');
  stk.push(id);
  // Side effects
  if (id === 's-loading') {
    setTimeout(() => go('s-ob1'), 2200);
  }
  if (id === 's-otp') {
    // Format phone: 0930750830 → +6693*****30
    const raw = (document.getElementById('phone-input')||{}).value || '';
    const el = document.getElementById('otp-phone-display');
    if (el && raw.length >= 9) {
      // convert 0XXXXXXXXX → +66XXXXXXXXX, then mask middle
      const intl = '+66' + raw.substring(1); // e.g. +6693075030
      const prefix = intl.substring(0, 5);   // +6693
      const suffix = intl.substring(intl.length - 2); // last 2
      const stars = '*'.repeat(intl.length - 5 - 2);
      el.textContent = prefix + stars + suffix;
    }
    startOtpTimer();
  }
  if (id === 's-thaid-loading') {
    setTimeout(() => {
      const sp = document.getElementById('tld-spin');
      const qr = document.getElementById('tld-qr');
      if(sp) sp.style.display = 'none';
      if(qr) qr.style.display = 'block';
    }, 1800);
  }
  if (id === 's-thaid-splash') {
    setTimeout(() => { document.getElementById('sbar').style.width = '100%'; }, 50);
    setTimeout(() => go('s-thaid-pin'), 2100);
  }
  if (id === 's-thaid-pin') mkPad('tid1-pad', 'tid1-dots', 8, '#1e3080', 's-thaid-home');
  if (id === 's-thaid-home') setTimeout(() => go('s-thaid-consent'), 5000);
  if (id === 's-thaid-confirm-pin') mkPad('tid2-pad', 'tid2-dots', 8, '#1e3080', 's-form');
  if (id === 's-success') document.getElementById('succ-anim').classList.add('bIn');
}

function back() {
  if (stk.length <= 1) return;
  const cur = document.getElementById(stk.pop());
  const prev = document.getElementById(stk[stk.length-1]);
  cur.classList.remove('on'); cur.classList.remove('off');
  prev.classList.remove('off');
  // reset if we go back to thaid loading, reset spinner
  if (stk[stk.length-1] === 's-thaid-loading') {
    const sp = document.getElementById('tld-spin');
    const qr = document.getElementById('tld-qr');
    if(sp) sp.style.display = 'block';
    if(qr) qr.style.display = 'none';
  }
}

// ─── ThaID-style pad (8 dots) ───
function mkPad(padId, dotsId, n, activeColor, nextId) {
  const pad = document.getElementById(padId);
  const dotParent = document.getElementById(dotsId);
  if (!pad) return;
  pad.innerHTML = '';
  const dots = dotParent ? dotParent.querySelectorAll('.tdot') : [];
  let pin = '';
  const keys = [1,2,3,4,5,6,7,8,9,'',0,'del'];
  keys.forEach(k => {
    const el = document.createElement('div');
    el.className = 'pk';
    if (k === 'del') {
      el.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="13" y2="14"/><line x1="13" y1="9" x2="18" y2="14"/></svg>`;
      el.onclick = () => { if(pin.length>0){pin=pin.slice(0,-1); updTDots(dots,pin.length,activeColor);} };
    } else if (k==='') {
      el.style.cursor='default';
    } else {
      el.textContent = k;
      el.onclick = () => {
        if(pin.length < n){
          pin += k; updTDots(dots,pin.length,activeColor);
          if(pin.length===n) setTimeout(()=>go(nextId),320);
        }
      };
    }
    pad.appendChild(el);
  });
}

function updTDots(dots, filled, color) {
  dots.forEach((d,i) => {
    if(i<filled){d.classList.add('f');d.style.background=color;d.style.borderColor=color;}
    else{d.classList.remove('f');d.style.background='';d.style.borderColor='#9CA3AF';}
  });
}

// ─── PEA PIN pad (6 dots) ───
let p1='', p2='';
function mkPeaPad(padId, dotPfx, n, cb) {
  const pad = document.getElementById(padId);
  if (!pad) return;
  pad.innerHTML = '';
  let pin = '';
  const keys = [1,2,3,4,5,6,7,8,9,'',0,'del'];
  keys.forEach(k => {
    const el = document.createElement('div');
    el.className = 'pk';
    if(k==='del'){
      el.innerHTML=`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="13" y2="14"/><line x1="13" y1="9" x2="18" y2="14"/></svg>`;
      el.onclick=()=>{if(pin.length>0){pin=pin.slice(0,-1);updPeaDots(dotPfx,n,pin.length);}};
    } else if(k===''){
      el.style.cursor='default';
    } else {
      el.textContent=k;
      el.onclick=()=>{
        if(pin.length<n){
          pin+=k; updPeaDots(dotPfx,n,pin.length);
          if(pin.length===n) setTimeout(()=>cb(pin),350);
        }
      };
    }
    pad.appendChild(el);
  });
}
function updPeaDots(pfx, n, filled) {
  for(let i=0;i<n;i++){
    const d=document.getElementById(pfx+i);
    if(!d)continue;
    if(i<filled){d.classList.add('f');}else{d.classList.remove('f');}
  }
}

// ─── ID format ───
function fmtID(inp){
  let v=inp.value.replace(/[^0-9]/g,'').substring(0,13);
  let p=[];
  if(v.length>0)p.push(v.substring(0,1));
  if(v.length>1)p.push(v.substring(1,5));
  if(v.length>5)p.push(v.substring(5,10));
  if(v.length>10)p.push(v.substring(10,12));
  if(v.length>12)p.push(v.substring(12,13));
  inp.value=p.join('-');
}

// ─── Phone input ───
function onPhoneInput(inp) {
  const v = inp.value.replace(/[^0-9]/g,'').substring(0,10);
  inp.value = v;
  const lbl = document.getElementById('phone-label');
  const btn = document.getElementById('phone-btn');
  if (v.length > 0 && lbl) lbl.style.display = 'block';
  else if (lbl) lbl.style.display = 'none';
  if (btn) btn.disabled = v.length < 9;
  // show filled border
  if (v.length > 0) inp.style.borderColor = 'var(--pp)';
  else inp.style.borderColor = '#E0E0EE';
}

// ─── OTP input ───
function otpInput(idx, inp) {
  const v = inp.value.replace(/[^0-9]/g,'');
  inp.value = v ? v[0] : '';
  if (inp.value) {
    inp.classList.add('filled');
    if (idx < 5) document.getElementById('otp'+(idx+1)).focus();
    else {
      // all filled → go to s1
      const allFilled = [0,1,2,3,4,5].every(i => document.getElementById('otp'+i).value);
      if (allFilled) setTimeout(() => go('s1'), 400);
    }
  } else {
    inp.classList.remove('filled');
  }
}

// ─── OTP Timer ───
let otpInterval;
function startOtpTimer() {
  clearInterval(otpInterval);
  let secs = 179;
  const el = document.getElementById('otp-timer');
  if (!el) return;
  otpInterval = setInterval(() => {
    const m = Math.floor(secs/60);
    const s = secs%60;
    el.textContent = m+':'+(s<10?'0':'')+s;
    if (secs-- <= 0) { clearInterval(otpInterval); el.textContent='0:00'; }
  }, 1000);
}

// ─── Same address ───
function toggleSame(){
  const cb=document.getElementById('same-cb');
  const tick=document.getElementById('same-tick');
  const btn=document.getElementById('addr2-btn');
  const on=cb.classList.toggle('ck');
  tick.style.display=on?'block':'none';
  if(on){
    document.getElementById('c-no').value='77/1';
    document.getElementById('c-road').value='ดินแดง';
    document.getElementById('c-dist').innerHTML='<span style="color:#333;">บ้านกล้วย/เมืองสุโขทัย/สุโขทัย</span><span style="color:#AAA;">›</span>';
    btn.disabled=false;
  } else {
    document.getElementById('c-no').value='';
    document.getElementById('c-road').value='';
    document.getElementById('c-dist').innerHTML='<span style="color:#AAA;">ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์</span><span style="color:#AAA;">›</span>';
    btn.disabled=true;
  }
}

// ─── Init PEA pads ───
window.addEventListener('load', () => {
  mkPeaPad('pad1', 'd1-', 6, (pin) => { p1=pin; go('s-pin2'); });
  mkPeaPad('pad2', 'd2-', 6, (pin) => { p2=pin; go('s-home'); });
  // Auto splash → loading
  setTimeout(() => go('s-loading'), 2000);
});