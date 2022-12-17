データをインポートして、操作し、保存する一連の流れにおいてステートを Recoil にて管理したい。
stores/dataset.ts の Recoil ファイルと一緒に ER 図と説明を参照してもらえると理解しやすいとおもいます。

![opendatatool_archi](https://user-images.githubusercontent.com/18475563/192418980-c3496839-b972-47f7-8201-305f73623bc4.png)

# Entity 説明

- **dataset**  
  インポートしたデータセットを単位として保持する AtomFamily。今後複数のデータセットを扱う可能性があるので、AtomFamily をつかって複数管理できるようにしています。uid は https://www.npmjs.com/package/uuid などを使って自動採番。
- **datasetUidList**  
  dataset をリスト管理できるように uid の配列を保持する Atom。Recoil は AtomFamily をリスト取得できないので、uid のリストを保持する設計にしています。
- **datasetItem**  
  インポートしたデータセットの各項目（名称や住所など）を単位として保持する AtomFamily。親である dataset の uid と、item(自身)の uid でデータを扱えるようにしています。
- **datasetItemUidList**  
  datasetItem をリスト管理できるように uid の配列を保持する AtomFamily。dataset を親として取得できるようにしています。
- **datasetSingleData**  
  インポートしたデータセットの各セルのデータを単位として保持する AtomFamily。祖先である dataset の uid と、親である datasetItem の uid と、singleData(自身)の uid でデータを扱えるようにしています。
- **datasetSingleDataUidList**  
  datasetSingleData をリスト管理できるように uid を保持する AtomFamily。祖先である dataset の uid と、親である datasetItem の uid を用いて取得できるようにしています。

# 設計意図

操作対象となるデータを個別に扱えるように、atomFamily を用いています。
例えば、一つのセルのデータを操作したいときには

```
const [singleData, setSingleData] = useRecoilState(
  datasetSingleDataAtom(
    {
      datasetUid: 'hoge',
      itemUid: 'hoge',
      singleDataUid: 'hoge'
    }
  )
)
```

という風にすれば値の取得と、更新ができるので比較的シンプルとおもっています。

# 実装における注意点
datasetSingleData と datasetSingleDataUidList のように、個別データとデータのリストを別の Atom として管理しているため、データインポート時や、データの追加などをするときには、リストと個別データの両方の atom を更新するのを忘れないようにする必要があります。
