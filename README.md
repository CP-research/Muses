# Muses — CPR Automation Design System

사내 어드민/자동화 플랫폼을 위한 디자인 시스템. **Claude Code 스킬 + 실제 컴포넌트 라이브러리 + Storybook**으로 구성된다.

- 📖 **Storybook**: https://storybook.counterpointresearch.com (시각적 진실의 원천)
- 📦 **컴포넌트 라이브러리**: `@cp-research/muses-ui` (`packages/muses-ui/`)
- 🤖 **Claude Code 스킬**: `/muses` (`plugins/muses/`)

## 저장소 구조

```
Muses/
├── plugins/muses/          # Claude Code 플러그인 (디자인 시스템 스킬)
├── packages/muses-ui/      # React + Tailwind v4 컴포넌트 라이브러리 + Storybook
└── .github/workflows/      # Cloudflare Pages 배포 (Storybook)
```

## 컴포넌트 라이브러리

```bash
cd packages/muses-ui
npm install
npm run storybook         # 로컬 개발 (:6006)
npm run build-storybook   # 정적 사이트 빌드 → storybook-static/
npm run build             # npm 라이브러리 빌드 → dist/
```

자세한 사용법은 [`packages/muses-ui/README.md`](packages/muses-ui/README.md) 참조.

## Storybook 배포 (Cloudflare Pages)

`main` 브랜치에 push하면 `.github/workflows/deploy-storybook.yml`이 자동 배포한다.

**필요한 GitHub Actions 시크릿** (Settings → Secrets and variables → Actions):

| 시크릿 | 설명 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | "Cloudflare Pages: Edit" 권한 토큰 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID |

Pages 프로젝트(`muses-storybook`)는 워크플로가 첫 실행 시 없으면 생성한다(기본 URL `https://muses-storybook.pages.dev`).

### 커스텀 도메인 — `storybook.counterpointresearch.com`

첫 배포 후 Cloudflare 대시보드에서 한 번만 연결한다:

1. **Workers & Pages → `muses-storybook` → Custom domains → Set up a custom domain**
2. `storybook.counterpointresearch.com` 입력
3. `counterpointresearch.com`이 Cloudflare DNS에서 관리 중이면 CNAME 레코드가 자동 추가된다.
   외부 DNS면 안내되는 CNAME(`muses-storybook.pages.dev` 대상)을 직접 등록한다.

> 시크릿 없이 배포하려면 Cloudflare 대시보드에서 repo를 연결하고 — Root: `packages/muses-ui`, Build: `npm ci && npm run build-storybook`, Output: `storybook-static` — 로 설정해도 된다.

## 설치

### 1. Marketplace 등록

```bash
/plugin marketplace add CP-research/Muses
```

### 2. Plugin 설치

```bash
/plugin install muses
```

### 3. 사용

프로젝트에서 `/muses` 스킬이 자동으로 활성화됩니다.
UI 구현, 수정, 리뷰 요청 시 디자인 시스템 규격이 적용됩니다.

## 포함 규격

| 영역 | 내용 |
|------|------|
| Layout | 사이드바 (260px/72px), Breadcrumb, 로고+서비스명, 모바일 반응형, 버전 표기 |
| Colors | 8개 시맨틱 토큰, 상태 색상 5종, 인터랙티브 상태, 브랜드 그림자 |
| Typography | Plus Jakarta Sans, 7단계 타입 스케일, 5단계 웨이트 가이드 |

## 기술 전제

- React + TailwindCSS v4
- lucide-react (아이콘)
- CSS Custom Properties 기반 토큰

## 라이선스

Internal use only — CP-research
