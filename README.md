# yfding personal website

这是一个适合 GitHub Pages 托管的个人简介网页。页面内容主要维护在 `data/profile.json`，样式在 `assets/styles.css`，渲染逻辑在 `assets/app.js`。

## 本地预览

```bash
python3 -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 后期维护

- 修改个人介绍、论文、项目、荣誉：编辑 `data/profile.json`
- 替换顶部学校背景图：替换 `public/images/campus.jpg`
- 替换简历 PDF：替换 `public/resume-yifan-ding.pdf`
- 修改视觉样式：编辑 `assets/styles.css`

## 发布到 GitHub Pages

1. 新建一个 GitHub 仓库，建议名称使用 `yfding.github.io` 或 `profile`
2. 把本目录文件提交并推送到仓库
3. 在仓库 `Settings -> Pages` 中选择从 `main` 分支根目录发布
4. 如果仓库名是 `yfding.github.io`，网址会是 `https://yfding.github.io/`

## 图片来源

顶部背景图来自上海工程技术大学英文官网页面素材，后续可以替换为你自己拍摄或授权更明确的校园照片。
