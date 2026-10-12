import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type DemoMarkdownProps = {
  markdown: string;
};

function safeDocumentHref(value: string | undefined) {
  const href = value?.trim() ?? "";

  if (/^https?:\/\/[^\s<>]+$/i.test(href) || /^mailto:[^\s<>]+$/i.test(href)) {
    return href;
  }

  return undefined;
}

const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  a: ({ href, title, children }) => {
    const safeHref = safeDocumentHref(href);

    return safeHref ? (
      <a href={safeHref} title={title} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <>{children}</>
    );
  },
  img: ({ alt }) => <>{alt}</>,
  pre: ({ node, children }) => {
    const code = node?.children.find((child) => child.type === "element" && child.tagName === "code");
    let language = "";
    let codeText: string | undefined;

    if (code?.type === "element") {
      const classes = code.properties.className;
      const className = Array.isArray(classes) ? classes.join(" ") : String(classes ?? "");
      language = (/\blanguage-([^\s]+)/.exec(className)?.[1] ?? "")
        .replace(/[^a-zA-Z0-9_+.-]/g, "")
        .slice(0, 24);
      codeText = code.children
        .map((child) => child.type === "text" ? child.value : "")
        .join("")
        .replace(/\n$/, "");
    }

    return (
      <div className={`readme-code${language ? " has-language" : ""}`}>
        {language && <span className="readme-code-label" aria-hidden="true">{language}</span>}
        <pre tabIndex={0} aria-label="代码示例">
          {codeText === undefined ? children : <code>{codeText}</code>}
        </pre>
      </div>
    );
  },
  table: ({ children }) => (
    <div className="readme-table-wrap" role="region" tabIndex={0} aria-label="说明表格">
      <table>{children}</table>
    </div>
  ),
  th: ({ children, style }) => <th scope="col" style={style}>{children}</th>,
};

export function DemoMarkdown({ markdown }: DemoMarkdownProps) {
  const content = markdown.trim();

  return (
    <div className="readme-body">
      {content ? (
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={components}
          urlTransform={(url, key) => key === "href" ? safeDocumentHref(url) : undefined}
        >
          {content}
        </Markdown>
      ) : (
        <p className="readme-empty">这份 Skill 的说明文档尚未添加。</p>
      )}
    </div>
  );
}
