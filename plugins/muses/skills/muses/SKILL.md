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
     - 로고: `h-8 w-8` (SVG 또는 이미지), 버튼: `shrink-0 rounded-lg hover:opacity-70 focus-visible:ring-2 focus-visible:ring-primary-200`
   - 서비스명: `text-sm font-bold tracking-tight text-text-main`
   - **버전**: 서비스명 **바로 오른쪽**에 인라인 표시 — `text-[10px] font-semibold text-text-muted`, 형식 `v{major}.{minor}.{patch}` (서비스명 컨테이너는 `flex items-baseline gap-1.5`)
   - 축소 시(`lg:`): 서비스명·버전 `lg:hidden`, 로고 버튼만 `lg:mx-auto`로 중앙 표시 (로고 클릭으로 다시 펼침)
2. **네비게이션** — `flex-1 overflow-y-auto py-2 px-2`
   - **단일 메뉴 아이템(leaf)**: `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium`, 아이콘 `h-5 w-5 shrink-0`
     - 기본: `text-text-muted hover:bg-grey-50 hover:text-text-main` / 활성: `bg-primary-50 text-primary-700 font-semibold`
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
- **아바타**: `h-9 w-9 rounded-full` — 이미지(`object-cover`) 또는 이니셜 대체(`bg-primary-50 text-primary-700 text-xs font-semibold`)
- **이름**: `text-sm font-medium text-text-main truncate`
- **이메일**: `text-xs text-text-muted truncate` (이름 아래 세로 정렬, `flex flex-col`)
- **로그아웃**: `LogOut` 아이콘 버튼 (`h-4 w-4`), `p-1.5 rounded-lg text-text-muted hover:bg-grey-50 hover:text-text-main`
- 축소 시(`lg:`): 아바타만 중앙(`lg:justify-center`), 이름·이메일·로그아웃 `lg:hidden`

---

## 2. Colors

> **철칙 — shade는 미리 정의된 것만 쓴다.**
> 색이 더 밝거나 어두워야 하면 **스케일에서 가장 가까운 단계를 고른다.**
> `bg-primary/10`, `hover:bg-primary/90` 같은 **opacity 변형이나 `lighten()`/`darken()`으로 즉석에서 shade를 만들지 않는다.**
> 그렇게 하면 미묘하게 다른 빨강이 수십 개 생기고 컬러 시스템이 무의미해진다.
> (예외: `bg-black/40` 같은 **오버레이/백드롭**은 투명도 자체가 목적이므로 허용.)

### 2-1. Color Scales (Source of Truth)

모든 색은 **50 → 900의 10단계 고정 스케일**로 정의된다. 정의 위치: `packages/muses-ui/src/styles/theme.css` (Tailwind v4 `@theme`).
각 스케일은 base(앵커)를 먼저 잡고, 양 끝(50/900)을 정한 뒤, 700/300 → 800/600/400/200 순으로 채워 만들었다.

| 스케일 | 용도 | 앵커 |
|--------|------|------|
| `grey` | 텍스트·배경·패널·경계선 — UI의 대부분 | `grey-500` `#717171` |
| `primary` | 브랜드 레드. 주요 액션, 활성 내비 | `primary-500` `#EE1C24` |
| `secondary` | 저채도 브랜드 레드. 보조 브랜드 강조 | `secondary-700` `#913134` |
| `success` | 성공/완료 | `success-500` `#10B981` |
| `warning` | 경고/대기 | `warning-500` `#F59F0A` |
| `danger` | 파괴적 액션/에러 | `danger-500` `#CC1934` |
| `info` | 정보/참고 | `info-500` `#3F84F3` |

```
grey       50 #FAFAFA · 100 #F5F5F5 · 200 #E2E2E2 · 300 #D1D1D1 · 400 #A6A6A6
           500 #717171 · 600 #595959 · 700 #424242 · 800 #2B2B2B · 900 #1A1A1A
primary    50 #FEF0F1 · 100 #FDDDDE · 200 #FBBCBE · 300 #F79195 · 400 #F3595E
           500 #EE1C24 · 600 #D31219 · 700 #AA131A · 800 #81131B · 900 #5E1218
secondary  50 #FAF0F0 · 100 #F5E0E1 · 200 #ECC6C7 · 300 #DF9FA2 · 400 #C85F63
           500 #B63E42 · 600 #A3383C · 700 #913134 · 800 #71282A · 900 #562021
success    50 #EEFCF7 · 100 #D3F8EC · 200 #A5F3D9 · 300 #63EEBF · 400 #1CE9A4
           500 #10B981 · 600 #0D9B6E · 700 #0B7F5C · 800 #0A6149 · 900 #084938
warning    50 #FEFAEB · 100 #FDF1CE · 200 #FCDF9C · 300 #F9C762 · 400 #F6B131
           500 #F59F0A · 600 #D37E09 · 700 #A85E0B · 800 #83450B · 900 #65320B
danger     50 #FDECEF · 100 #FCD9DF · 200 #F8B9C3 · 300 #F28898 · 400 #E93F59
           500 #CC1934 · 600 #B11630 · 700 #90142A · 800 #6E1224 · 900 #51101E
info       50 #F0F6FE · 100 #DDEBFD · 200 #BBD7FB · 300 #8BB9F8 · 400 #669FF5
           500 #3F84F3 · 600 #1963EB · 700 #154CC1 · 800 #163B92 · 900 #152D6F
```

**주의 — `danger` ≠ `primary`.** 브랜드 주색이 레드이므로, 파괴적 액션 색은 의도적으로 **더 깊은 크림슨**(`#CC1934`)으로 분리했다. 그래도 완전히 다른 색은 아니므로 **파괴적 액션에는 색만으로 의미를 전달하지 말고 라벨/아이콘을 함께** 쓴다.

**주의 — grey는 순중립(H0/S0)이다.** 기존 배경 `#F8FAFC`(쿨 슬레이트)와 `#717171`/`#E2E2E2`(순중립)가 섞여 있던 것을 순중립으로 통일했다. 새 UI에서 `slate-*`, `zinc-*` 등 Tailwind 기본 회색을 쓰지 말고 `grey-*`를 쓴다.

**주의 — 본문 텍스트는 순검정이 아니다.** `#000000` → `grey-900 #1A1A1A`. 순검정은 부자연스럽게 보인다.

### 2-2. Semantic Aliases

스케일 위에 얹은 축약 별칭. 제품 코드는 대체로 이쪽을 쓰고, 특정 shade가 필요할 때만 `bg-primary-600`처럼 스케일 단계를 직접 쓴다.

| 용도 | 별칭 | 매핑 | 값 |
|------|------|------|-----|
| 페이지 배경 | `bg-background` | `grey-50` | `#FAFAFA` |
| 카드/패널 | `bg-surface` | white | `#FFFFFF` |
| 주요 액션 | `bg-primary`, `text-primary` | `primary-500` | `#EE1C24` |
| 보조 브랜드 | `bg-secondary` | `secondary-700` | `#913134` |
| 본문 텍스트 | `text-text-main` | `grey-900` | `#1A1A1A` |
| 보조 텍스트 | `text-text-muted` | `grey-500` | `#717171` |
| 성공 | `text-accent`, `bg-accent` | `success-500` | `#10B981` |
| 경계선 | `border-border` | `grey-200` | `#E2E2E2` |

### 2-3. Status Colors

패턴: **`bg-{scale}-100` + `text-{scale}-800`** (대비 6.5:1 이상 보장).

| 상태 | 배경 | 텍스트 | 용도 |
|------|------|--------|------|
| Draft/Default | `bg-grey-100` | `text-grey-800` | 초안, 비활성 |
| Warning | `bg-warning-100` | `text-warning-800` | 경고, 대기 |
| Danger | `bg-danger-100` | `text-danger-800` | 파괴적 액션, 에러 |
| Success | `bg-success-100` | `text-success-800` | 완료, 성공 |
| Info | `bg-info-100` | `text-info-800` | 정보, 참고 |

### 2-4. Interactive State Colors

| 요소 | 기본 | Hover | Focus | Disabled |
|------|------|-------|-------|----------|
| Primary Button | `bg-primary text-white` | `bg-primary-600` | `ring-2 ring-primary-200` | `opacity-50 pointer-events-none` |
| Secondary Button | `bg-surface border-border` | `bg-grey-50` | `ring-2 ring-primary-200` | `opacity-50` |
| Link | `text-primary` | `text-primary-700` | `ring-2 ring-primary-200` | `text-text-muted` |
| Input | `border-border` | `border-grey-300` | `border-primary ring-2 ring-primary-200` | `bg-grey-50 text-text-muted` |
| Nav item | `text-text-muted` | `bg-grey-50 text-text-main` | `ring-2 ring-primary-200` | — |
| Nav item (active) | `bg-primary-50 text-primary-700 font-semibold` | — | `ring-2 ring-primary-200` | — |

**흰 텍스트를 얹을 때의 최소 단계** (대비 4.5:1): `primary-600`, `secondary-500`, `danger-500`, `success-700`, `warning-700`, `info-600`.
`success-500`/`warning-500` 위에 흰 글씨를 올리면 대비가 3:1 미만이므로 쓰지 않는다.

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

---

## 참고 리소스 (llms.txt)

이 스킬의 외부 리소스. 더 깊은 컨텍스트가 필요하면 아래를 가져와 참조한다.

### 인덱스 / 전체본
- [llms.txt (인덱스)](https://storybook.counterpointresearch.com/llms.txt): 디자인 시스템 리소스 큐레이션 링크
- [llms-full.txt (전체본)](https://storybook.counterpointresearch.com/llms-full.txt): 이 규격(SKILL.md) + 라이브러리 README를 합친 단일 파일

### Docs
- [디자인 시스템 규격 (SKILL.md, raw)](https://raw.githubusercontent.com/CP-research/Muses/main/plugins/muses/skills/muses/SKILL.md): 진실의 원천
- [컴포넌트 라이브러리 README](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/README.md): 설치·셋업
- [Live Storybook](https://storybook.counterpointresearch.com): 시각 레퍼런스
- [npm 패키지 (GitHub Packages)](https://github.com/orgs/CP-research/packages/npm/package/muses-ui): `@cp-research/muses-ui`

### Components (source)
- [Sidebar](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Sidebar/Sidebar.tsx): 로고-클릭 접기, 인라인 버전, 접이식 카테고리, 프로필 푸터
- [Header / Breadcrumb](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Header/Header.tsx)
- [Button](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Button/Button.tsx)
- [Badge](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Badge/Badge.tsx)
- [Input](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Input/Input.tsx)
- [Card](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/components/Card/Card.tsx)
- [Design tokens (theme.css)](https://raw.githubusercontent.com/CP-research/Muses/main/packages/muses-ui/src/styles/theme.css)
