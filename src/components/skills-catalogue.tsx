'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { CatalogueSidebar, type CategoryFilter } from './catalogue-sidebar';
import { SkillDocument } from './skill-document';
import { demoSite } from '@/data/demo-site';
import { demoSkills, type DemoSkill } from '@/data/demo-skills';

gsap.registerPlugin(useGSAP, CustomEase);

export function SkillsCatalogue() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [selectedId, setSelectedId] = useState<string>(demoSkills[0].id);
  const [status, setStatus] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const animateNext = useRef(false);
  const resetList = useRef(false);
  const focusDetail = useRef(false);
  const lastDocumentId = useRef(demoSkills[0].id as string);
  const lastMotionId = useRef(demoSkills[0].id as string);
  const skill = demoSkills.find(item => item.id === selectedId) || demoSkills[0];

  const fitTitle = useCallback(() => {
    const title = titleRef.current;
    if (!title) return;
    title.style.fontSize = '';
    const words = [...title.querySelectorAll<HTMLElement>('.title-word')];
    words.forEach(word => { word.style.maxWidth = 'none'; });
    const available = title.clientWidth;
    const widest = Math.max(...words.map(word => word.getBoundingClientRect().width));
    const preferred = Number.parseFloat(getComputedStyle(title).fontSize);
    if (widest > available && available > 0) title.style.fontSize = Math.max(26, preferred * (available - 2) / widest) + 'px';
    words.forEach(word => { word.style.maxWidth = '100%'; });
  }, []);

  const ensureVisible = useCallback(() => {
    const list = listRef.current;
    const row = list?.querySelector<HTMLElement>('.selected');
    if (!list || !row) return;
    const bounds = row.getBoundingClientRect(), viewport = list.getBoundingClientRect();
    if (bounds.top < viewport.top + 5) list.scrollTop += bounds.top - viewport.top - 5;
    else if (bounds.bottom > viewport.bottom - 5) list.scrollTop += bounds.bottom - viewport.bottom + 5;
  }, []);

  const scrollToDocument = useCallback(() => {
    const detail = detailRef.current;
    if (!detail || !matchMedia('(max-width:800px)').matches) return;
    window.scrollTo({ top: window.scrollY + detail.getBoundingClientRect().top, behavior: 'instant' });
    detail.focus({ preventScroll: true });
  }, []);

  useLayoutEffect(() => {
    fitTitle();
    if (lastDocumentId.current !== skill.id) {
      lastDocumentId.current = skill.id;
      if (detailRef.current) detailRef.current.scrollTop = 0;
    }
    if (resetList.current && listRef.current) { listRef.current.scrollTop = 0; resetList.current = false; }
    ensureVisible();
    if (focusDetail.current) { focusDetail.current = false; scrollToDocument(); }
  }, [skill.id, category, fitTitle, ensureVisible, scrollToDocument]);

  // Reproduce only the prototype's 150ms opacity/Y3px transition, with identical ease-out.
  useGSAP(() => {
    if (lastMotionId.current === skill.id) return;
    lastMotionId.current = skill.id;
    if (!animateNext.current) return;
    animateNext.current = false;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = sheetRef.current?.querySelectorAll('.hero, .readme');
      if (!targets) return;
      gsap.fromTo(targets, { opacity: 0.45, y: 3 }, {
        opacity: 1, y: 0, duration: 0.15,
        ease: CustomEase.create('otato-prototype-in', '0,0,0.58,1'),
        clearProps: 'opacity,transform',
      });
    }, sheetRef);
    return () => media.revert();
  }, { scope: sheetRef, dependencies: [skill.id], revertOnUpdate: true });

  useEffect(() => {
    let frame = 0, disposed = false;
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { fitTitle(); ensureVisible(); });
    };
    window.addEventListener('resize', resize);
    void document.fonts.ready.then(() => { if (!disposed) fitTitle(); });
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [fitTitle, ensureVisible]);

  useEffect(() => {
    function fromHash() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const match = demoSkills.find(item => item.id === id);
      if (!match) return;
      animateNext.current = false;
      resetList.current = true;
      setCategory('All'); setSelectedId(match.id);
      setStatus('已打开 ' + match.name);
    }
    // Browser fragments are unavailable to SSR; synchronize once after matching hydration.
    fromHash();
    window.addEventListener('hashchange', fromHash);
    window.addEventListener('popstate', fromHash);
    return () => { window.removeEventListener('hashchange', fromHash); window.removeEventListener('popstate', fromHash); };
  }, []);

  function updateHash(id: string) {
    const hash = '#' + encodeURIComponent(id);
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }

  function select(next: DemoSkill) {
    animateNext.current = next.id !== selectedId;
    setSelectedId(next.id); updateHash(next.id);
    if (next.id === selectedId) { ensureVisible(); scrollToDocument(); }
    else focusDetail.current = true;
    setStatus('已打开 ' + next.name);
  }

  function selectCategory(nextCategory: CategoryFilter) {
    if (nextCategory === category) return;
    const visible = demoSkills.filter(item => nextCategory === 'All' || item.category === nextCategory);
    if (!visible.some(item => item.id === selectedId)) {
      animateNext.current = true;
      setSelectedId(visible[0].id); updateHash(visible[0].id);
    }
    resetList.current = true;
    setCategory(nextCategory);
    setStatus(`${demoSite.categories[nextCategory]}，${visible.length} 个 Skill。`);
  }

  return (
    <>
      <a className="skip" href="#detail">跳至 Skill 说明</a>
      <main className="workspace">
        <CatalogueSidebar category={category} selectedId={selectedId} listRef={listRef} onCategory={selectCategory} onSelect={select} />
        <SkillDocument skill={skill} detailRef={detailRef} sheetRef={sheetRef} titleRef={titleRef} onStatus={setStatus} />
      </main>
      <div id="live" className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</div>
      <noscript><p className="no-script">交互演示需要启用 JavaScript，才可切换演示文档和复制命令。</p></noscript>
    </>
  );
}
