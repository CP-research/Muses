// Generates public/llms-full.txt by inlining the canonical design-system spec
// (SKILL.md) and the component-library README, so an LLM can read the whole
// system in one fetch. Run automatically before `build-storybook`.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, ".."); // packages/muses-ui
const repoRoot = resolve(here, "../../.."); // repo root

/** Drop a leading YAML frontmatter block so the body reads cleanly. */
function stripFrontmatter(md) {
  return md.startsWith("---")
    ? md.replace(/^---\n[\s\S]*?\n---\n/, "")
    : md;
}

const skill = stripFrontmatter(
  readFileSync(
    resolve(repoRoot, "plugins/muses/skills/muses/SKILL.md"),
    "utf8",
  ),
);
const readme = readFileSync(resolve(pkgRoot, "README.md"), "utf8");

const out = `# Muses — CPR Automation Design System (full)

> 빌드 시 자동 생성. 디자인 시스템 전체 규격과 컴포넌트 라이브러리 사용법을 LLM이 한 번에 읽도록 합친 파일이다.
> 진실의 원천(편집은 여기서): https://github.com/CP-research/Muses
> 인덱스: https://storybook.counterpointresearch.com/llms.txt · 라이브: https://storybook.counterpointresearch.com

---

# Part 1 — 디자인 시스템 규격 (SKILL.md)

${skill.trim()}

---

# Part 2 — 컴포넌트 라이브러리 (@cp-research/muses-ui)

${readme.trim()}
`;

const dest = resolve(pkgRoot, "public/llms-full.txt");
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, out);
console.log(`Generated ${dest} (${out.length} chars)`);
