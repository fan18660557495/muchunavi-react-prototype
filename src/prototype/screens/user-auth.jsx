const MU_T = window.MU_TOKENS;

function MU_Splash() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: MU_T.bg, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 60% at 50% 30%, rgba(245, 228, 230, 0.9), transparent 65%), radial-gradient(ellipse 100% 60% at 30% 90%, rgba(234, 212, 167, 0.3), transparent 60%), linear-gradient(180deg, #F6F2EF 0%, #EFEBE7 100%)' }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <g fill="#A49673" opacity="0.35">
          <circle cx="60" cy="180" r="1" />
          <circle cx="330" cy="120" r="1.2" />
          <circle cx="90" cy="520" r="0.8" />
          <circle cx="300" cy="620" r="1" />
          <circle cx="200" cy="290" r="0.8" />
          <circle cx="360" cy="450" r="1" />
          <circle cx="50" cy="700" r="1" />
        </g>
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 100 }}>
        <img src={(window.__resources && window.__resources.logoImg) || 'assets/muchunavi-logo.png'} alt="muchunavi" style={{ width: 280, height: 'auto', filter: 'drop-shadow(0 4px 18px rgba(164, 150, 115, 0.25))' }} />
        <div style={{ marginTop: 8, fontFamily: MU_T.fontBrand, fontSize: 11, color: MU_T.goldDeep, letterSpacing: '0.5em' }}>GUEST</div>
        <div style={{ marginTop: 18 }}><window.MU_Ornament width={80} /></div>
        <div style={{ marginTop: 12, fontFamily: MU_T.fontSerif, fontSize: 12, color: MU_T.inkMid, letterSpacing: '0.15em' }}>夜の世界へ、静かに没入する</div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ width: 16, height: 16, margin: '0 auto 10px', border: `1.5px solid rgba(164, 150, 115, 0.2)`, borderTopColor: MU_T.gold, borderRadius: '50%', animation: 'spin 1.2s linear infinite' }} />
        <div style={{ fontSize: 10, color: MU_T.inkLow, letterSpacing: '0.3em' }}>LOADING</div>
      </div>
    </div>
  );
}

function MU_Login() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: MU_T.bg, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 55% at 50% 15%, rgba(245, 228, 230, 0.9), transparent 60%), radial-gradient(ellipse 70% 40% at 85% 65%, rgba(234, 212, 167, 0.35), transparent 65%), radial-gradient(ellipse 60% 40% at 15% 80%, rgba(232, 168, 196, 0.2), transparent 60%), linear-gradient(180deg, #F6F2EF 0%, #EFEBE7 100%)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px 28px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
          <img src={(window.__resources && window.__resources.logoImg) || 'assets/muchunavi-logo.png'} alt="muchunavi" style={{ width: 200, height: 'auto', filter: 'drop-shadow(0 3px 12px rgba(164, 150, 115, 0.25))' }} />
          <div style={{ marginTop: 2, fontFamily: MU_T.fontBrand, fontSize: 10, color: MU_T.goldDeep, letterSpacing: '0.4em' }}>GUEST</div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <window.MU_Ornament width={80} />
          <div style={{ marginTop: 12, fontFamily: MU_T.fontSerif, fontSize: 20, color: MU_T.ink, letterSpacing: '0.12em', lineHeight: 1.5 }}>今夜の特別な席を、あなたのために</div>
          <div style={{ marginTop: 8, fontSize: 11, color: MU_T.inkMid, letterSpacing: '0.2em' }}>LOG IN TO UNLOCK</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `0.5px solid ${MU_T.hairlineStrong}`, borderRadius: 20, padding: 22, boxShadow: MU_T.shadowLg }}>
          <button style={{ width: '100%', height: 50, border: 'none', borderRadius: 12, background: '#06C755', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: MU_T.fontSans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 5.66 2 10.2c0 4.07 3.55 7.48 8.35 8.12.33.07.77.22.88.5.1.26.07.67.03.94l-.14.86c-.04.26-.2 1.01.89.55 1.09-.46 5.87-3.46 8.01-5.92C21.52 13.55 22 11.95 22 10.2 22 5.66 17.52 2 12 2z" /></svg>
            LINEでログイン
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0 16px' }}>
            <div style={{ flex: 1, height: 0.5, background: MU_T.hairline }} />
            <span style={{ fontSize: 10, color: MU_T.inkLow, letterSpacing: '0.2em' }}>OR</span>
            <div style={{ flex: 1, height: 0.5, background: MU_T.hairline }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: MU_T.inkMid, marginBottom: 6, letterSpacing: '0.15em' }}>PHONE</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#FFFFFF', borderRadius: 10, padding: '0 14px', height: 44, border: `0.5px solid ${MU_T.hairlineStrong}` }}>
              <span style={{ fontSize: 13, color: MU_T.goldDeep, fontWeight: 500 }}>+81</span>
              <div style={{ width: 1, height: 14, background: MU_T.hairlineStrong }} />
              <span style={{ fontSize: 14, color: MU_T.ink, letterSpacing: '0.05em' }}>90 1234 5678</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: MU_T.inkMid, marginBottom: 6, letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}>
              <span>OTP CODE</span>
              <span style={{ color: MU_T.goldDeep }}>58秒後に再送</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['4', '2', '8', '_', '_', '_'].map((c, i) => (
                <div key={i} style={{ flex: 1, height: 44, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${c !== '_' ? MU_T.goldDeep : MU_T.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 500, color: c === '_' ? MU_T.inkLow : MU_T.ink }}>
                  {c === '_' ? '·' : c}
                </div>
              ))}
            </div>
          </div>

          <button style={{ width: '100%', height: 48, border: 'none', borderRadius: 12, background: MU_T.gradGold, color: '#F6F2EF', fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', boxShadow: MU_T.shadowGold }}>
            ログイン / 会員登録
          </button>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: MU_T.inkMid }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, border: `0.5px solid ${MU_T.goldDeep}`, background: MU_T.rouge, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="#F6F2EF" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
            </div>
            <span>私は20歳以上であり、利用規約とプライバシーポリシーに同意します</span>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: MU_T.inkMid, letterSpacing: '0.1em' }}>
            アカウントをお持ちでないですか？<span style={{ color: MU_T.goldDeep, borderBottom: `0.5px solid ${MU_T.goldDeep}`, paddingBottom: 2 }}>会員特典を見る →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MU_Splash, MU_Login });
