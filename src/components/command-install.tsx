'use client';

import { useEffect, useRef, useState } from 'react';
import { CatalogueIcon } from './catalogue-icon';
import { demoSite } from '@/data/demo-site';
import type { DemoSkill } from '@/data/demo-skills';

type CopyState = 'idle' | 'busy' | 'copied' | 'error';
const copyLabels: Record<CopyState, string> = { idle: '复制命令', busy: '复制中', copied: '已复制', error: '重试复制' };
const accessibleLabels: Record<CopyState, string> = { idle: '复制安装命令', busy: '正在复制安装命令', copied: '安装命令已复制', error: '重试复制安装命令' };
const demoNote = '演示命令 · your-name/skills 尚未接入真实仓库。';

async function writeClipboard(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* Continue with the selection fallback. */ }
  const active = document.activeElement as HTMLElement | null;
  const field = document.createElement('textarea');
  field.value = text; field.readOnly = true;
  field.style.cssText = 'position:fixed;left:-10000px;top:0;opacity:0';
  document.body.appendChild(field); field.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch {}
  field.remove(); active?.focus({ preventScroll: true });
  return ok;
}

export function CommandInstall({ skill, onStatus }: { skill: DemoSkill; onStatus: (message: string) => void }) {
  const [state, setState] = useState<CopyState>('idle');
  const commandRef = useRef<HTMLElement>(null);
  const mounted = useRef(true);
  const copying = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(timer.current); };
  }, []);

  async function copyCommand() {
    if (copying.current) return;
    copying.current = true;
    clearTimeout(timer.current); setState('busy');
    let ok = false;
    try { ok = await writeClipboard(`npx skills add ${demoSite.repository} --skill ${skill.id}`); } catch {}
    if (!mounted.current) return;
    copying.current = false;
    setState(ok ? 'copied' : 'error');
    onStatus(ok ? '安装命令已复制。' : '自动复制未成功，请手动复制已选中的命令，或重试。');
    if (ok) timer.current = setTimeout(() => { if (mounted.current) setState('idle'); }, 2200);
    else if (commandRef.current) {
      const range = document.createRange(); range.selectNodeContents(commandRef.current);
      const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
    }
  }

  return (
    <section className="install-wrap" id="installWrap" aria-labelledby="installTitle">
      <div className="install">
        <h2 className="install-label" id="installTitle"><CatalogueIcon name="terminal" />命令行安装</h2>
        <div className="install-code"><div className="command-line"><span className="prompt-sign" aria-hidden="true">$</span><code className="command" id="command" ref={commandRef}><span className="exe">npx</span>{' skills add '}<span className="repo">{demoSite.repository}</span>{' '}<span className="option">--skill</span>{' '}<span className="argument">{skill.id}</span></code></div></div>
        <div className="copy-key"><button type="button" className="copy" id="copy" data-state={state} aria-label={accessibleLabels[state]} aria-describedby="commandNote" aria-busy={state === 'busy' || undefined} onClick={copyCommand}><CatalogueIcon name={state === 'copied' ? 'check' : 'copy'} /><span className="copy-text">{copyLabels[state]}</span></button></div>
      </div>
      <p className={`command-note${state === 'error' ? ' is-error' : ''}`} id="commandNote">{state === 'error' ? '自动复制未成功，命令已选中。请手动复制，或重试。当前为演示仓库。' : demoNote}</p>
    </section>
  );
}
