# キュレーションマップ自動生成システム
作成中。以下の内容は変更される可能性があります。
## 構成
本システムは以下のリポジトリで構成されています。
- [CurationmapStarter](https://github.com/JotaroAbe/CurationmapStarter)
    - システムの起動に用いる
    - Dockerを使用 
- [CurationmapViewer](https://github.com/JotaroAbe/CurationmapViewer)
    - キュレーションマップのビューワ
    - Webアプリケーション
- [CurationmapFactory](https://github.com/JotaroAbe/CurationmapFactory)
    - キュレーションマップのデータを収集
- [CurationmapDataStructure](https://github.com/JotaroAbe/CurationmapDataStructure)
    - キュレーションマップのデータ構造を定義

本システムを利用するためには、[CurationmapStarter](https://github.com/JotaroAbe/CurationmapStarter)を参照してください。
## キュレーションマップとは
各観点に分割されたまとめ文書の断片と詳細文章をノードとし、まとめ文書の分割された個々の観点からその観点に対する詳細文章に対してリンクを持ったネットワーク構造を図示したものです。まとめ文書から詳細文書へとわかりやすく提示することによって、利用者がよりそのクエリの内容を理解しやすいようにすることを目指しています。
## 入出力
あるクエリを与えると、それに対応するキュレーションマップを出力します。クエリを検索エンジンに入力したときの出力をマッピングしたものが最終的な出力となります。[CurationmapViewer](https://github.com/JotaroAbe/CurationmapViewer)を用いて、生成されたキュレーションマップを可視化します。
## スクリーンショット
準備中......
