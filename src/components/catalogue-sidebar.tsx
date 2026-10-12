import Image from 'next/image';
import { CatalogueGlyph } from './catalogue-glyph';
import { demoSite } from '@/data/demo-site';
import { demoSkills, type DemoSkill } from '@/data/demo-skills';
import type { KeyboardEvent, RefObject } from 'react';

export type CategoryFilter = keyof typeof demoSite.categories;

type Props = {
  category: CategoryFilter;
  selectedId: string;
  listRef: RefObject<HTMLUListElement | null>;
  onCategory: (category: CategoryFilter) => void;
  onSelect: (skill: DemoSkill) => void;
};

export function CatalogueSidebar({ category, selectedId, listRef, onCategory, onSelect }: Props) {
  const visible = demoSkills.filter(skill => category === 'All' || skill.category === category);
  function navigate(event: KeyboardEvent<HTMLUListElement>) {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-id]');
    if (!button) return;
    event.preventDefault();
    const current = visible.findIndex(skill => skill.id === button.dataset.id);
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1
      : Math.max(0, Math.min(visible.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)));
    listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${visible[index].id}"]`)?.focus();
  }

  return (
    <section className="catalogue" aria-labelledby="catalogueTitle">
      <div className="identity">
        <Image className="brand-logo" src="/favicon.svg" width={59} height={59} alt="去皮土豆品牌标志" unoptimized />
        <span className="wordmark">oTATo</span><span className="identity-note">skills<br /> collection</span>
      </div>
      <div className="index-caption"><h2 id="catalogueTitle">去皮土豆的技能收藏夹</h2><span className="file-count" id="fileCount">{String(visible.length).padStart(2, '0')} FILES</span></div>
      <div className="filters" id="filters" role="group" aria-label="按类型筛选">
        {(Object.entries(demoSite.categories) as [CategoryFilter, string][]).map(([id, label]) => (
          <button type="button" key={id} className={`filter${category === id ? ' active' : ''}`} data-category={id} aria-pressed={category === id} onClick={() => onCategory(id)}>{label}</button>
        ))}
      </div>
      <ul className="collection" id="collection" aria-label="Skill 列表" ref={listRef} onKeyDown={navigate}>
        {visible.map(skill => (
          <li key={skill.id}><button type="button" className={`skill${selectedId === skill.id ? ' selected' : ''}`} data-id={skill.id} data-kind={skill.category} aria-current={selectedId === skill.id} aria-controls="detail" onClick={() => onSelect(skill)}>
            <span className="skill-no" aria-hidden="true">{skill.index}</span>
            <span className="skill-text"><span className="skill-name">{skill.name}</span><span className="skill-subtitle">{skill.subtitle}</span></span>
            <CatalogueGlyph id={skill.id} /><span className="join top" aria-hidden="true" /><span className="join bottom" aria-hidden="true" />
          </button></li>
        ))}
      </ul>
    </section>
  );
}
