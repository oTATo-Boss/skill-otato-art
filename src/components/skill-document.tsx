import { CatalogueGlyph } from './catalogue-glyph';
import { CatalogueIcon } from './catalogue-icon';
import { DemoMarkdown } from './demo-markdown';
import { CommandInstall } from './command-install';
import { demoSite } from '@/data/demo-site';
import type { DemoSkill } from '@/data/demo-skills';
import type { RefObject } from 'react';

type Props = {
  skill: DemoSkill;
  detailRef: RefObject<HTMLElement | null>;
  sheetRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  onStatus: (message: string) => void;
};

export function SkillDocument({ skill, detailRef, sheetRef, titleRef, onStatus }: Props) {
  return (
    <article className="document" id="detail" tabIndex={-1} aria-label={`${skill.name} — Skill 说明`} ref={detailRef}>
      <div className="sheet" id="sheet" ref={sheetRef}>
        <div className="doc-meta" data-kind={skill.category}>
          <div className="doc-meta-left"><CatalogueGlyph id={skill.id} /><span className="doc-number">{skill.index}</span><span aria-hidden="true">/</span><span className="category-dot" aria-hidden="true" /><span className="category-name">{demoSite.categories[skill.category]}</span></div>
          <div className="doc-path"><CatalogueIcon name="file" /><span className="doc-path-text"><span className="path-parent">{skill.id} / </span>README.md</span></div>
        </div>
        <header className="hero" id="hero">
          <h1 id="skillTitle" aria-label={skill.name} ref={titleRef}><span className="title-word">{skill.display[0]}</span><span className="title-word print">{skill.display[1]}</span></h1>
          <p className="purpose">{skill.purpose}</p><p className="summary">{skill.summary}</p>
          <dl className="deliverables"><dt>能力概览</dt><dd>{skill.capabilities.map(item => <span className="deliverable" key={item}>{item}</span>)}</dd></dl>
        </header>
        <CommandInstall skill={skill} key={skill.id} onStatus={onStatus} />
        <section className="readme" id="readme" aria-labelledby="readmeTitle">
          <div className="readme-heading"><h2 id="readmeTitle" className="readme-filename"><CatalogueIcon name="file" /> README.md</h2><p className="readme-status">演示文档 · 正式内容待接入</p></div>
          <DemoMarkdown markdown={skill.readme} />
        </section>
      </div>
    </article>
  );
}
