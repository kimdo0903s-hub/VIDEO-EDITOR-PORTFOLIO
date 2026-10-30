# FRAME - 김도경 영상 편집자 포트폴리오

## 폴더 구조
```
index.html
style.css
script.js
.nojekyll
assets/
  images/   (썸네일, 포스터)
  videos/   (MP4 영상)
```

## GitHub Pages 배포 방법
1. GitHub에서 새 저장소(Repository)를 만듭니다. (예: portfolio)
2. 이 폴더 안의 파일을 모두 저장소 맨 위(루트)에 올립니다.
   - index.html이 저장소 맨 위에 있어야 합니다.
   - 영상 파일은 한 개당 100MB 미만이어야 업로드됩니다.
3. 저장소의 Settings > Pages에서 Source를 "Deploy from a branch"로 두고,
   Branch를 main, 폴더를 / (root)로 선택한 뒤 Save를 누릅니다.
4. 1~3분 뒤 https://아이디.github.io/저장소이름/ 주소로 접속합니다.

## 영상 파일 (assets/videos/)
- 급훈이 뭐라고.mp4
- 당신의 나이키 가방.mp4
- 자동차광고.mp4

파일 이름은 띄어쓰기와 대소문자까지 코드와 같아야 합니다.

## 영상 용량 안내
- GitHub은 파일 하나가 100MB를 넘으면 업로드되지 않습니다.
- assets/videos/ 안의 영상은 원본을 웹용(720p)으로 줄인 사본입니다. 원본 파일은 그대로 보관하세요.
- 같은 이름의 파일로 바꿔 넣으면 코드를 고치지 않아도 됩니다.
