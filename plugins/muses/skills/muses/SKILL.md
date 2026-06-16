---
name: muses
description: CPR Automation Design System — 사내 어드민/자동화 플랫폼의 레이아웃, 색상, 타이포그래피 표준
---

<role>
You are an expert frontend engineer applying the CPR Automation Design System. When the user asks you to build, modify, or review UI, follow these specifications exactly. Do not deviate from the defined tokens unless the user explicitly requests it.
</role>

# Muses — CPR Automation Design System

사내 어드민/자동화 플랫폼을 위한 디자인 시스템.
Tech Stack: React + TailwindCSS v4 + lucide-react.

---

## 0. Source of Truth — 컴포넌트 라이브러리

이 디자인 시스템은 **실제 컴포넌트 라이브러리로 구현**되어 있다: `@cp-research/muses-ui` (React + Tailwind v4, GitHub Packages private).

- **Storybook (시각적 진실의 원천)**: https://storybook.counterpointresearch.com
- **소스 코드**: 이 repo의 `packages/muses-ui/src/components/`

UI 작업(빌드/수정) 요청을 받으면, 스펙을 프로즈로 재구현하기 전에 **먼저 패키지를 자동 설치·셋업**하라. 아래 순서를 따른다.

### 동작 순서 (패키지 자동 설치 우선)

**1단계 — 설치 여부 확인**
프로젝트 `package.json` / `node_modules`에 `@cp-research/muses-ui`가 이미 있으면 4단계로 건너뛴다.

**2단계 — 자동 설치 (없을 때, React 프로젝트)**
다음을 **묻지 말고 순서대로 실행**한다. 단, 인증 토큰이 없으면 2-b에서 한 번만 사용자에게 요청한다.

  a. 프로젝트 루트 `.npmrc`에 스코프 레지스트리가 없으면 추가:
  ```ini
  @cp-research:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```
  b. **인증 토큰 확인** — 환경변수 `GITHUB_TOKEN` 또는 사용자 `~/.npmrc`에 `npm.pkg.github.com` 토큰이 이미 있으면 그대로 사용한다. **둘 다 없을 때만** 사용자에게 "GitHub Packages 설치용 `read:packages` 스코프 PAT가 필요하다"고 알리고 값을 받는다. (← 유일하게 사람 개입이 필요한 단계. 받은 값은 프로젝트 `.npmrc`가 아니라 `~/.npmrc` 또는 셸 환경변수에 두도록 안내해 커밋 유출을 막는다.)
  c. `npm install @cp-research/muses-ui` 실행.
  d. Tailwind v4가 셋업돼 있지 않으면 `npm install -D tailwindcss @tailwindcss/vite` 후 빌드 도구에 플러그인 등록(Vite: `@tailwindcss/vite`).
  e. 메인 CSS에 엔진 + 토큰 + 라이브러리 소스 등록:
  ```css
  @import "tailwindcss";
  @import "@cp-research/muses-ui/theme.css";
  @source "../node_modules/@cp-research/muses-ui/dist";
  ```
  f. HTML `<head>`에 Plus Jakarta Sans 폰트 로드(섹션 3-1 참조).

**3단계 — 설치 검증**
`npm install`이 실패하면(401/403 = 토큰 권한 부족, 404 = 레지스트리 미설정) 원인을 사용자에게 알리고 토큰을 다시 확인한다. 네트워크/스택 문제로 끝내 불가하면 5단계로.

**4단계 — 컴포넌트 사용**
```tsx
import { Sidebar, Header, Breadcrumb, Card, Button, Badge, Input } from "@cp-research/muses-ui";
// Card 하위: CardHeader / CardTitle / CardDescription / CardContent / CardFooter
```

**5단계 — 설치가 끝내 불가할 때만**(사용자가 PAT 제공 거부 / React가 아닌 스택 / 단일 HTML / 오프라인)
아래 스펙(섹션 1~3)대로 직접 구현하되, `packages/muses-ui/src/components/`의 구현을 참조해 클래스·토큰을 정확히 일치시킨다.

**6단계 — 새 컴포넌트가 필요하면**
라이브러리에 추가하고 Storybook 스토리(`*.stories.tsx`)를 함께 작성해 스펙과 동기화한다.

> 섹션 1~3은 라이브러리 컴포넌트의 **기반 규격**이다. 컴포넌트를 직접 만들거나 검토할 때 이 토큰/스케일을 따른다.

---

## 1. Layout

### 1-1. Page Structure

```
┌─────────────────────────────────────────────────┐
│ Sidebar (fixed left)  │  Header (sticky top)    │
│                       │  ┌───────────────────┐  │
│  Logo + Service Name  │  │ Breadcrumb        │  │
│  Navigation           │  └───────────────────┘  │
│  Version              │  Main Content Area      │
│                       │                         │
│                       │                         │
└─────────────────────────────────────────────────┘
```

- 전체 레이아웃: `flex min-h-screen bg-background`
- 메인 영역: 사이드바 너비만큼 margin-left 적용

### 1-2. Sidebar

**크기:**
- 확장: `w-[260px]`
- 축소: `w-[72px]`
- 전환 애니메이션: `duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`

**구조 (위→아래):**
1. **헤더 영역 (로고 + 서비스명 + 버전)** — 상단 고정, `h-14 px-3 border-b border-border`, `flex items-center gap-2`
   - **로고 = 접기/펼치기 토글**: 로고를 `<button>`으로 감싸 클릭 시 사이드바 접힘/펼침 토글 (`onCollapsedChange` 또는 내부 상태). 별도 토글 아이콘은 두지 않는다.
     - 로고: `h-8 w-8` (SVG 또는 이미지), 버튼: `shrink-0 rounded-lg hover:opacity-70 focus-visible:ring-2 focus-visible:ring-primary/20`
   - 서비스명: `text-sm font-bold tracking-tight text-text-main`
   - **버전**: 서비스명 **바로 오른쪽**에 인라인 표시 — `text-[10px] font-semibold text-text-muted`, 형식 `v{major}.{minor}.{patch}` (서비스명 컨테이너는 `flex items-baseline gap-1.5`)
   - 축소 시(`lg:`): 서비스명·버전 `lg:hidden`, 로고 버튼만 `lg:mx-auto`로 중앙 표시 (로고 클릭으로 다시 펼침)
2. **네비게이션** — `flex-1 overflow-y-auto py-2 px-2`
   - **단일 메뉴 아이템(leaf)**: `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium`, 아이콘 `h-5 w-5 shrink-0`
     - 기본: `text-text-muted hover:bg-slate-50 hover:text-text-main` / 활성: `bg-primary/10 text-primary font-semibold`
   - **1차 카테고리(접기 가능)** — 아래 `1-7` 참조
   - 축소 시(`lg:`): 별도 rail로 모든 leaf 아이콘만 평면 표시(카테고리 헤더 없음), 아이콘 중앙 정렬 + `title`/`aria-label`로 라벨 제공

**데스크톱 그림자:**
```
shadow-[4px_0_20px_-2px_rgba(238,28,36,0.06)]
```

**모바일 그림자:**
```
shadow-[4px_0_24px_-2px_rgba(0,0,0,0.15)]
```

### 1-3. Breadcrumb

- 위치: 헤더 내부, `sticky top-0 z-40`
- 헤더: `h-14 bg-surface/80 backdrop-blur-sm border-b border-border px-4 sm:px-6`
- 구분자: `ChevronRight` 아이콘, `h-3.5 w-3.5 text-text-muted`
- 링크: `text-sm text-text-muted hover:text-primary transition-colors`
- 현재 페이지: `text-sm font-semibold text-text-main`

### 1-4. Logo & Service Name

**사이드바 헤더에 표시:**
```
[Logo Icon] ServiceName
```

- 로고 + 서비스명 + 버전은 한 줄에 `flex items-center gap-2` (서비스명·버전은 `flex items-baseline gap-1.5`)
- 서비스명: `text-sm font-bold tracking-tight text-text-main`, 버전: `text-[10px] font-semibold text-text-muted`
- 축소 모드: 서비스명·버전 숨김, 로고 버튼만 중앙 표시 (로고 클릭으로 펼침)

### 1-5. Mobile Responsive

**Breakpoint:** `lg:` (1024px)

| 요소 | Mobile (<1024px) | Desktop (>=1024px) |
|------|-------------------|---------------------|
| Sidebar | 숨김, 오버레이 슬라이드 | 고정 표시 |
| 메뉴 버튼 | `lg:hidden` 표시 | 숨김 |
| Sidebar 열기 | `-translate-x-0` + backdrop | 항상 표시 |
| Sidebar 닫기 | `-translate-x-full` | N/A |
| 최대 너비 | `max-w-[85vw]` | `w-[260px]` |
| Main margin | `ml-0` | `lg:ml-[260px]` (확장) / `lg:ml-[72px]` (축소) |
| 콘텐츠 패딩 | `p-4` | `sm:p-6` |

**모바일 오버레이:**
```
fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
```

**전환 애니메이션:**
```
transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
```

### 1-6. Service Name & Version Display

- **서비스명**: 사이드바 상단 로고 옆에 표시
- **버전**: 서비스명 **바로 오른쪽**에 인라인 표시 (하단 푸터 아님)
- 버전 형식: `v{package.json version}` (예: `v1.2.3`)
- 버전 스타일: `text-[10px] font-semibold text-text-muted`
- 축소 시: 서비스명·버전 모두 숨김 (헤더에 로고 버튼만 남으며, 로고 클릭으로 펼침)

### 1-7. Collapsible Categories (1차 카테고리)

네비게이션 항목은 **단일 아이템(leaf)** 또는 **접을 수 있는 1차 카테고리(group)**로 구성된다.

**카테고리 헤더 (작은 회색 글씨):**
- `flex w-full items-center justify-between rounded-md px-3 pb-1 pt-3`
- 텍스트: `text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-text-main`
- 우측에 `ChevronDown` (`h-3.5 w-3.5`) — 닫힘 시 `-rotate-90`, `transition-transform`
- 클릭 시 하위 항목 펼침/접힘 토글

**하위 항목 (소속을 보여주는 회색 세로줄):**
- 컨테이너: `ml-4 flex flex-col gap-0.5 border-l border-border pl-2` → 왼쪽 `border-l border-border`가 소속 카테고리를 시각적으로 표시
- 하위 leaf 아이콘은 약간 작게: `h-4 w-4` (top-level leaf는 `h-5 w-5`)
- 기본/활성 스타일은 일반 leaf와 동일

**축소(rail) 모드:** 카테고리 헤더는 숨기고, 모든 하위 leaf를 평면 아이콘 리스트로 표시.

### 1-8. Profile Footer (선택)

사이드바 **하단 고정** 프로필 영역. 좌→우 순서: **동그라미 아바타 → 이름·이메일 → 로그아웃**.

- 컨테이너: `border-t border-border p-3`, 내부 `flex items-center gap-2.5`
- **아바타**: `h-9 w-9 rounded-full` — 이미지(`object-cover`) 또는 이니셜 대체(`bg-primary/10 text-primary text-xs font-semibold`)
- **이름**: `text-sm font-medium text-text-main truncate`
- **이메일**: `text-xs text-text-muted truncate` (이름 아래 세로 정렬, `flex flex-col`)
- **로그아웃**: `LogOut` 아이콘 버튼 (`h-4 w-4`), `p-1.5 rounded-lg text-text-muted hover:bg-slate-50 hover:text-text-main`
- 축소 시(`lg:`): 아바타만 중앙(`lg:justify-center`), 이름·이메일·로그아웃 `lg:hidden`

---

## 2. Colors

### 2-1. Design Tokens (CSS Custom Properties)

TailwindCSS v4 `@theme` 또는 CSS 변수로 정의:

```css
:root {
  --color-background: #F8FAFC;   /* 페이지 배경 (Slate 50) */
  --color-surface: #FFFFFF;       /* 카드/패널 배경 */
  --color-primary: #EE1C24;       /* 브랜드 주색 (Red) */
  --color-secondary: #913134;     /* 브랜드 보조색 (Dark Red) */
  --color-text-main: #000000;     /* 본문 텍스트 */
  --color-text-muted: #717171;    /* 보조 텍스트 */
  --color-accent: #10B981;        /* 성공/긍정 (Emerald 500) */
  --color-border: #E2E2E2;        /* 경계선 */
}
```

### 2-2. Semantic Color Mapping

| 용도 | 색상 | Tailwind Class |
|------|------|----------------|
| 페이지 배경 | `#F8FAFC` | `bg-background` |
| 카드/패널 | `#FFFFFF` | `bg-surface` |
| 주요 액션 | `#EE1C24` | `bg-primary`, `text-primary` |
| 보조 액션 | `#913134` | `bg-secondary` |
| 본문 텍스트 | `#000000` | `text-text-main` |
| 보조 텍스트 | `#717171` | `text-text-muted` |
| 성공 | `#10B981` | `text-accent`, `bg-accent` |
| 경계선 | `#E2E2E2` | `border-border` |

### 2-3. Status Colors

상태 표현에 사용하는 색상 조합:

| 상태 | 배경 | 텍스트 | 용도 |
|------|------|--------|------|
| Draft/Default | `bg-slate-100` | `text-slate-700` | 초안, 비활성 |
| Warning | `bg-amber-100` | `text-amber-700` | 경고, 대기 |
| Active/Danger | `bg-red-100` | `text-red-700` | 활성, 긴급 |
| Success | `bg-emerald-100` | `text-emerald-700` | 완료, 성공 |
| Info | `bg-blue-100` | `text-blue-700` | 정보, 참고 |

### 2-4. Interactive State Colors

| 요소 | 기본 | Hover | Focus | Disabled |
|------|------|-------|-------|----------|
| Primary Button | `bg-primary text-white` | `bg-primary/90` | `ring-2 ring-primary/20` | `opacity-50 pointer-events-none` |
| Secondary Button | `bg-white border-border` | `bg-slate-50` | `ring-2 ring-primary/20` | `opacity-50` |
| Link | `text-primary` | `text-secondary` | `ring-2 ring-primary/20` | `text-text-muted` |
| Input | `border-border` | `border-slate-300` | `border-primary ring-2 ring-primary/20` | `bg-slate-50 text-text-muted` |

### 2-5. Shadow Colors

그림자에 브랜드 컬러를 반영:

```css
/* 카드 기본 그림자 */
shadow-[0_4px_20px_-2px_rgba(238,28,36,0.1)]

/* 카드 호버 그림자 */
shadow-[0_10px_25px_-5px_rgba(238,28,36,0.15)]

/* 버튼 그림자 */
shadow-[0_4px_14px_0_rgba(238,28,36,0.3)]

/* 사이드바 그림자 (데스크톱) */
shadow-[4px_0_20px_-2px_rgba(238,28,36,0.06)]
```

---

## 3. Typography

### 3-1. Font Family

**Primary:** `Plus Jakarta Sans`

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Fallback:** `ui-sans-serif, system-ui, -apple-system, sans-serif`

**CSS:**
```css
font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
```

### 3-2. Type Scale

Major Third (1.250) 스케일 기반:

| Level | Size | Weight | Line Height | Letter Spacing | Tailwind Class | 용도 |
|-------|------|--------|-------------|----------------|----------------|------|
| Display | 30px | 800 (ExtraBold) | 1.1 | -0.02em | `text-3xl font-extrabold` | 대시보드 숫자, 히어로 |
| H1 | 24px | 700 (Bold) | 1.2 | -0.01em | `text-2xl font-bold` | 페이지 제목 |
| H2 | 18px | 700 (Bold) | 1.3 | normal | `text-lg font-bold` | 섹션 제목, 카드 헤더 |
| H3 | 16px | 600 (SemiBold) | 1.4 | normal | `text-base font-semibold` | 서브섹션, 다이얼로그 제목 |
| Body | 14px | 400 (Regular) | 1.6 | normal | `text-sm` | 본문 텍스트 |
| Body Strong | 14px | 500 (Medium) | 1.6 | normal | `text-sm font-medium` | 네비게이션, 라벨 |
| Caption | 12px | 500 (Medium) | 1.5 | normal | `text-xs font-medium` | 보조 정보, 뱃지 |
| Tiny | 10px | 600 (SemiBold) | 1.4 | 0.02em | `text-[10px] font-semibold` | 축소 사이드바 버전 |

### 3-3. Weight Usage Guide

| Weight | 값 | 용도 |
|--------|-----|------|
| Regular | 400 | 본문, 설명 텍스트 |
| Medium | 500 | 네비게이션, 라벨, 버튼, 입력 플레이스홀더 |
| SemiBold | 600 | 활성 메뉴, 카드 제목, 강조 텍스트 |
| Bold | 700 | 페이지 제목, 섹션 헤더 |
| ExtraBold | 800 | 통계 숫자, 히어로 텍스트 |

### 3-4. Text Color Pairing

| 텍스트 유형 | 색상 | Class |
|-------------|------|-------|
| 제목 (H1-H3) | `#000000` | `text-text-main` |
| 본문 | `#000000` | `text-text-main` |
| 보조/설명 | `#717171` | `text-text-muted` |
| 링크 | `#EE1C24` | `text-primary` |
| 비활성 | `#717171` + `opacity-50` | `text-text-muted opacity-50` |
| 버튼 (Primary) | `#FFFFFF` | `text-white` |
| 뱃지 | 상태별 색상 | Status Colors 참조 |

### 3-5. Responsive Typography

| Level | Mobile | Desktop |
|-------|--------|---------|
| Display | `text-2xl` | `text-3xl` |
| H1 | `text-xl` | `text-2xl` |
| H2 | `text-base` | `text-lg` |
| Body | `text-sm` | `text-sm` |

---

## Quick Reference

### Do
- CSS 커스텀 프로퍼티(`--color-*`)를 사용하여 색상 정의
- Tailwind semantic class(`bg-primary`, `text-text-main`)를 사용
- `Plus Jakarta Sans` 폰트를 반드시 로드
- 사이드바 확장/축소 두 상태를 모두 구현
- 모바일에서 오버레이 사이드바 패턴 사용
- 버전을 `package.json`에서 읽어 표시
- 그림자에 브랜드 컬러(`rgba(238,28,36,...)`) 반영

### Don't
- 하드코딩된 색상값 직접 사용 (토큰 사용)
- 시스템 기본 폰트에 의존
- 모바일에서 사이드바 항상 표시
- `text-lg` 이상을 본문 텍스트에 사용
- 중립 회색 그림자(`rgba(0,0,0,...)`) 사용
