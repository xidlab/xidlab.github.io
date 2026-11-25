/* =========================================================
   XID Lab 사이트 설정
   비개발자도 이 파일의 따옴표 안 내용만 바꾸면 됩니다.
   ========================================================= */
window.XID_CONFIG = {

  /* 구글 시트 ID
     - 비워두면: 저장소의 data/*.csv 파일을 읽습니다.
     - 채우면:  구글 시트의 내용을 읽습니다. (시트 수정 → 새로고침하면 바로 반영)
     시트 주소 https://docs.google.com/spreadsheets/d/【여기 부분】/edit 을 붙여넣으세요.
     시트는 공유 설정을 "링크가 있는 모든 사용자 - 뷰어"로 해야 합니다.
     탭 이름은 members / projects / publications 그대로 두세요. */
  SHEET_ID: "",

  /* Contact 섹션 */
  CONTACT: [
    { label: "Lab",     value: "Experience Intelligence Design Lab (XID Lab)<br>Hongik University" },
    { label: "Address", value: "94 Wausan-ro, Mapo-gu, Seoul, Korea" },
    { label: "Email",   value: "" }
  ]
};
