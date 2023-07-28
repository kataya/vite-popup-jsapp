# vite-popup-jsapp

フロントエンドのビルドツール、Vite（ヴィート）を使ってArcGIS Maps SDK for JavaScript で、「[はじめてのWeb マッピングアプリケーション開発:最新化&ポップアップの設定編その2](https://community.esri.com/t5/arcgis-%E9%96%8B%E7%99%BA%E8%80%85%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3-documents/%E3%81%AF%E3%81%98%E3%82%81%E3%81%A6%E3%81%AEweb-%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E9%96%8B%E7%99%BA-%E6%9C%80%E6%96%B0%E5%8C%96-amp-%E3%83%9D%E3%83%83%E3%83%97%E3%82%A2%E3%83%83%E3%83%97%E3%81%AE%E8%A8%AD%E5%AE%9A%E7%B7%A8%E3%81%9D%E3%81%AE2/ta-p/1127926)」 のアプリケーションを、試験的に移植してみたものです。

上記のアプリとの相違点は、次の通りです。
- 令和5年の公示地価に対応
- 都道府県の切り替え機能を追加
- 空間検索の対象とする市区町村をリストから選択できるように変更
- ポップアップで表示する属性を10年間に変更

各種ライブラリは、次を使っています。
- ArcGIS Maps SDK for JavaScript 4.27.6
- Calcite-components 1.4.3
- Chart.js 4.3.0
- Vite 4.2.0
  
なお、Vite を使ったArcGIS Maps SDK for JavaScript でのアプリケーションの構築を自分で行ってみたい方は、[vite js app](https://github.com/kataya/vite-jsapp) に記載してある手順をご参照ください。

このページでは、vite でビルドしたWeb マッピングアプリケーション を[ReactをGitHub Pagesにデプロイしよう〜Vite編〜](https://qiita.com/tat_mae084/items/4051c61926dc8165e80b) 等を参照しながらgithub-pages に配置して、[Vite 地価公示情報表示 Web マッピングアプリケーション](https://kataya.github.io/vite-popup-jsapp/) からアプリケーションを確認できるようになっています。  
  
## GitHub Pages へデプロイするまでの手順
### Visual Studio Code での操作

既存のプロジェクトで、gh-pages をインストールします。
>npm install gh-pages --save-dev

次に**vite.config.js** ファイルを開いて、[ReactをGitHub Pagesにデプロイしよう〜Vite編〜](https://qiita.com/tat_mae084/items/4051c61926dc8165e80b) で書いている設定と同じにします。  

```
export default defineConfig({
    base: process.env.GITHUB_PAGES 
        ? "/vite-popup-jsapp/"
        : "./" ,
    plugins: [
    ～省略～
```

**package.json** ファイルを開いて、homepage を加えます。
```
  "homepage": "https://kataya.github.io/vite-popup-jsapp/"
```
deploy 用のコマンドを加えます。
```

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
```

**.gitignoere** ファイルを開いて、dist, dist-ssr をコメントアウト、public を追加します。
```
# dist
# dist-ssr
public
```

Visual Studio Code のターミナルから、
npm run deploy を実行し、Published された事を確認できたら、GitHUb リポジトリから操作します。

### GitHub リポジトリからの操作

リポジトリ の [Settings] タブにアクセスし、左ペインの [Pages] を選択します。

Build and deployment の項目にある、**Branch** を [gh-pages] - [/(root)] に設定して、Save で保存します。

[Actions] タブにアクセスし、**pages build and deployment** の状態を確認します。

✓ になっていれば deploy は成功していますので、"homepage" に設定したURL にアクセスして、動作を確認します。  

