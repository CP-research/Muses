# Muses — CPR Automation Design System

사내 어드민/자동화 플랫폼을 위한 Claude Code 디자인 시스템 스킬.

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
