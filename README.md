# XID Lab 홈페이지

홍익대학교 Experience Intelligence Design Lab 홈페이지 (https://xidlab.hongik.ac.kr)

## 내용 수정하는 법

멤버·프로젝트·논문은 **표(CSV 또는 구글 시트) 한 줄 = 화면의 한 항목**입니다. 줄을 추가하면 화면에 생기고, 지우면 사라집니다. 순서도 표의 순서를 따릅니다.

### 방법 1. 구글 시트 (권장)
1. `config.js`의 `SHEET_ID`에 구글 시트 ID가 들어 있으면 이 방식으로 동작합니다.
2. 시트를 고친 뒤 홈페이지를 새로고침하면 바로 반영됩니다 (구글 캐시로 1~5분 걸릴 수 있음).
3. 탭 이름 `members` / `projects` / `publications`와 첫 줄(머리글)은 바꾸지 마세요.

### 방법 2. 저장소의 CSV 파일
1. 깃허브에서 `data/` 폴더의 CSV 파일을 열고 연필 아이콘(Edit)으로 수정하거나, 엑셀에서 편집한 CSV를 업로드합니다.
2. 엑셀에서 저장할 때는 **CSV UTF-8** 형식으로 저장해야 한글·특수문자가 깨지지 않습니다.
3. Commit 후 1~2분 뒤 사이트에 반영됩니다.

## 각 표의 칸

**members**

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

**projects**

| 칸 | 내용 |
|---|---|
| 연도 | 묶음 제목이 되는 연도 (최신순 자동 정렬) |
| 기간표시 | 여러 해에 걸친 경우 `2023 - 2024`처럼 입력. 비워도 됨 |
| 분류 | `Service Design / UX Design / Design Research`, `Brand Development`, `Education Projects` 등 |
| 기관 | 굵게 표시되는 첫 줄 |
| 내용 | 둘째 줄. ` / `(앞뒤 공백 포함)로 구분하면 줄바꿈 |

**publications**

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
config.js           구글 시트 ID, 연락처
assets/style.css    디자인
assets/app.js       데이터 읽어서 화면 그리기 (수정 불필요)
data/*.csv          멤버·프로젝트·논문 데이터
images/             사진 (hero.png, members/)
tools/images.csv    아임웹에서 옮겨올 이미지 목록 (최초 1회용)
```
