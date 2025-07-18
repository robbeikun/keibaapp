-- ファクターのサンプルデータ投入

INSERT INTO factors (name, description, category, importance, check_points, important_races, featured_horses) VALUES
(
  '手前後肢の踏み込み',
  '馬が走る際の後肢の踏み込みの深さや力強さを評価します。深い踏み込みは推進力の強さを示し、ダート競馬では特に重要な要素です。踏み込みが深い馬は加速力に優れ、直線での伸びが期待できます。',
  '歩様',
  '高',
  ARRAY['踏み込みが深い馬は加速力に優れる', 'ダートでは踏み込みの力強さが重要', '疲労時に踏み込みが浅くなる傾向', '坂路調教で踏み込みの深さを確認'],
  ARRAY['ダート短距離戦', '重馬場のレース', '坂のあるコース'],
  ARRAY['オオイノホシ', 'パワフルランナー']
),
(
  'BPM（心拍数）',
  '馬の心拍数を測定し、興奮状態や体調を把握します。適度な心拍数は良好なコンディションを示し、過度に高い場合は緊張や体調不良の可能性があります。レース前の心拍数の変化にも注目が必要です。',
  '生理指標',
  '中',
  ARRAY['60-80BPMが理想的な範囲', '100BPM以上は過度な興奮状態', 'レース前の心拍数変化に注目', '調教後の回復速度も重要'],
  ARRAY['初出走', '久々の出走', '重要なレース'],
  ARRAY['スピードスター', 'ライトニングボルト']
),
(
  '首の動き',
  '馬の首の振りや安定性を観察します。安定した首の動きはバランスの良い走りを示し、不規則な動きは不調や緊張の表れの可能性があります。リズミカルな首振りは好調の証拠とされています。',
  '歩様',
  '中',
  ARRAY['リズミカルな首振りは好調の証', '首が上がりすぎる馬は力みがち', '首の安定性はバランス感覚を示す', '左右の首振りの均等性も重要'],
  ARRAY['芝のレース', '長距離戦', 'ペースの速いレース'],
  ARRAY['オオイノホシ', 'スピードスター']
),
(
  'ストライド',
  '馬の歩幅の大きさを評価します。大きなストライドは効率的な走りを示し、距離適性や脚質の判断材料となります。コース形状や馬場状態によってもストライドの有効性は変化します。',
  '歩様',
  '高',
  ARRAY['大きなストライドは長距離向き', '小刻みなストライドはスピード型', 'コース形状との相性も重要', '馬場状態でストライドが変化'],
  ARRAY['長距離戦', '直線の長いコース', '良馬場のレース'],
  ARRAY['パワフルランナー', 'オオイノホシ']
),
(
  '前肢の動き',
  '前肢の伸びや着地の仕方を観察します。柔軟で力強い前肢の動きは良好な状態を示し、硬い動きは疲労や不調のサインです。着地音の重さや左右のバランスも重要な判断材料です。',
  '歩様',
  '中',
  ARRAY['柔軟な前肢は好調の証拠', '着地音が重い場合は要注意', '左右のバランスも重要', '前肢の伸びで推進力を判断'],
  ARRAY['芝のレース', 'スピード戦', '軽い馬場'],
  ARRAY['スピードスター', 'ライトニングボルト']
),
(
  '枠順',
  'スタート時の位置を示す枠順は、レース展開に大きな影響を与えます。内枠は距離ロスが少ない反面、包まれるリスクがあり、外枠は自由度が高い反面、距離ロスが生じやすくなります。',
  '戦術',
  '高',
  ARRAY['内枠は距離ロスが少ない', '外枠は自由度が高い', 'コース形状で有利枠が変化', '騎手の腕前で枠順の影響が変わる'],
  ARRAY['短距離戦', '多頭数のレース', 'ペースの速いレース'],
  ARRAY['全馬共通']
),
(
  '馬場状態',
  '馬場の状態（良、稍重、重、不良）は馬の走りに大きく影響します。馬によって得意な馬場状態があり、過去の馬場別成績を確認することで適性を判断できます。',
  '環境',
  '高',
  ARRAY['良馬場はスピード勝負になりやすい', '重馬場はパワーが重要', '馬場別の過去成績を確認', '調教での馬場適性も参考に'],
  ARRAY['雨天時のレース', '馬場状態が変化しやすい時期'],
  ARRAY['全馬共通']
),
(
  '馬体重',
  '馬の体重とその増減は体調の指標となります。適度な増加は成長や充実を示し、大幅な減少は体調不良の可能性があります。馬によって適正体重は異なります。',
  '外観',
  '中',
  ARRAY['適度な増加は成長の証', '大幅な減少は体調不良の可能性', '馬によって適正体重は異なる', '前走からの変化に注目'],
  ARRAY['久々の出走', '成長期の若馬', '長期休養明け'],
  ARRAY['全馬共通']
);
