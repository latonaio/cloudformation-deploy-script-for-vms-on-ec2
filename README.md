# cloudformation-deploy-script-for-vms-on-ec2
cloudformation-deploy-script-for-vms-on-ec2 は、cloudformation によってAWS上にEC2インスタンスを自動立ち上げするための、cli commands を成形するマイクロサービスです。

## 引数
```
environment・・・リソース作成環境
profile・・・aws プロファイル
stackTemplatePath・・・スタックテンプレートファイルが置いていあるパス
parameterTarget・・・インスタンスの設定ファイル
targetStackTemplate・・・対象のスタックテンプレートファイル名
```

## 実行
```
make deploy \
    environment={environment} \
    profile={profile} \
    region={region} \
    stackTemplatePath={stackTemplatePath} \
    parameterTarget={parameterTarget} \
    targetStackTemplate={targetStackTemplate}
```
