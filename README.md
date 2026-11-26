# XID Lab 홈페이지

홍익대학교 Experience Intelligence Design Lab 홈페이지 (https://xidlab.hongik.ac.kr)

## 내용 수정하는 법

멤버·프로젝트·논문은 모두 엑셀 파일 하나 `data/xidlab_data.xlsx`에 있습니다. **시트의 한 줄 = 화면의 한 항목**입니다. 줄을 추가하면 화면에 생기고, 지우면 사라집니다. 순서도 시트 순서를 따릅니다.

1. `data/xidlab_data.xlsx`를 내려받아(파일 클릭 → 다운로드 버튼) 엑셀에서 고치고 저장합니다.
2. 저장소의 `data` 폴더 → **Add file → Upload files** → 파일을 끌어다 놓고 **Commit changes**.
3. 1~2분 뒤 홈페이지를 새로고침하면 반영됩니다.

- 파일 이름(`xidlab_data.xlsx`)과 시트 이름(`members` / `projects` / `publications`), 각 시트의 1행(머리글)은 바꾸지 마세요.
- 엑셀 안의 `사용법` 시트에 칸별 설명이 있습니다.

## 각 표의 칸

**members 시트**

| 칸 | 내용 | 예 |
|---|---|---|
| 과정 | `Ph.D.` 또는 `Master` | Ph.D. |
| 구분 | `Alumni`(졸업) 또는 `Current`(재학) | Current |
| 졸업연도 | 석사 졸업생만 입력 (연도별로 묶임) | 2025 |
| 이름 | | Jang Gahyeon |
| 분야1, 분야2 | 한 줄씩 표시. 비워도 됨 | HCI / UXUI |
| 이메일 | 비우면 표시 안 함 | |
| 사진 | 박사만 표시. `images/members/파일명.jpg` | |

- 박사 졸업생(Alumni)에는 🎓가 자동으로 붙습니다.
- 사진 추가: 깃허브 `images/members/` 폴더에 정사각형 사진을 업로드하고, 사진 칸에 경로를 적습니다. 사진이 없으면 이니셜 원으로 표시됩니다.

**projects 시트**

| 칸 | 내용 |
|---|---|
| 연도 | 묶음 제목이 되는 연도 (최신순 자동 정렬) |
| 기간표시 | 여러 해에 걸친 경우 `2023 - 2024`처럼 입력. 비워도 됨 |
| 분류 | `Service Design / UX Design / Design Research`, `Brand Development`, `Education Projects` 등 |
| 기관 | 굵게 표시되는 첫 줄 |
| 내용 | 둘째 줄. ` / `(앞뒤 공백 포함)로 구분하면 줄바꿈 |

**publications 시트**

| 칸 | 내용 |
|---|---|
| 연도 | 최신순 자동 정렬 |
| 유형 | `Journal Paper`, `Published Conference Papers`, `Book`, `Book Translation` |
| 서지사항 | APA 전체 문장 |
| 굵게표시 | 서지사항 중 굵게 보일 부분(논문 제목). 서지사항 안의 글자와 정확히 같아야 함 |

같은 연도 안에서는 유형별로 모아서 입력하세요 (유형이 바뀔 때마다 태그가 표시됩니다).

## 그 외 수정
- About 소개글: `index.html`
- Contact 정보: `config.js`의 `CONTACT`
- 색·글꼴·간격: `assets/style.css`

## 구조
```
index.html          페이지 틀 + About 글
config.js           연락처
assets/style.css    디자인
assets/app.js       데이터 읽어서 화면 그리기 (수정 불필요)
data/xidlab_data.xlsx  멤버·프로젝트·논문 데이터 (엑셀)
images/             사진 (hero.png, members/)
tools/images.csv    아임웹에서 옮겨올 이미지 목록 (최초 1회용)
```
