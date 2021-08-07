## ディレクトリ構成
| directory / file | description |
| --- | --- |
| node_modules |  nodeで動かすパッケージを管理するフォルダ |
| public |  公開フォルダ（納品フォルダ） |
| src | 作業フォルダ（開発フォルダ） |
| package.json | プロジェクト管理ファイル |


## 環境構築
### Webサーバー
ターミナルにて以下コマンドを入力

1. dockerを立ち上げる
```
docker-compose up
```


### 作業環境
ターミナルにて以下コマンドを入力

1. `node_modules`をインストール
### npmの場合
```
npm install
```
### yarnの場合
```
yarn
```

2. gulpを動かす
### npmの場合
```
npx gulp watch
```
### yarnの場合
```
yarn gulp watch
```


## gulpコマンド
- 監視用（ファイル保存時にブラウザオートリロード）
```
(npm|yarn) gulp watch
```
- 納品前（不要ファイルの削除など、全てのファイルをコンパイル）
```
(npm|yarn) gulp build
```
