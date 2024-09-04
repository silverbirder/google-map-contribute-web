import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            プライバシーポリシー
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <p>
                クチコミ仲間（以下，「当サービス」といいます。）は，本ウェブサイト上で提供するサービスにおける，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
              </p>

              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第1条（個人情報の定義）
                </h2>
                <p>
                  「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報を指します。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第2条（個人情報の収集）
                </h2>
                <p>
                  当サービスは，ユーザーがGoogle
                  Mapsのコントリビュータ情報を入力する際に，以下の情報を取得する場合があります：
                </p>
                <ul className="ml-4 mt-2 list-inside list-disc">
                  <li>Google Mapsコントリビュータ ID</li>
                  <li>Google Mapsコントリビュータ ページURL</li>
                </ul>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第3条（個人情報の利用目的）
                </h2>
                <p>
                  当サービスが個人情報を収集・利用する目的は，以下のとおりです。
                </p>
                <ul className="ml-4 mt-2 list-inside list-disc">
                  <li>当サービスの提供・運営のため</li>
                  <li>ユーザー間の共通点を分析し，マッチングを行うため</li>
                  <li>
                    ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                  </li>
                  <li>
                    利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
                  </li>
                  <li>
                    ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
                  </li>
                  <li>上記の利用目的に付随する目的</li>
                </ul>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第4条（個人情報の第三者提供）
                </h2>
                <p>
                  当サービスは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
                </p>
                <ol className="ml-4 mt-2 list-inside list-decimal">
                  <li>
                    人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
                  </li>
                  <li>
                    公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき
                  </li>
                  <li>
                    国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第5条（個人情報の保護）
                </h2>
                <p>
                  当サービスは，ユーザーの個人情報の漏洩，滅失，毀損の防止，その他の個人情報の安全管理のために必要かつ適切な措置を講じます。個人情報の取扱いの全部または一部を委託する場合は，委託先との間で個人情報の保護に関する契約を締結するなど，委託先に対する必要かつ適切な監督を行います。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第6条（ユーザーの権利）
                </h2>
                <p>
                  ユーザーは，当サービスに対して，自己の個人情報の開示を請求することができます。また，個人情報の訂正，追加，削除，利用停止を請求することができます。これらの請求を行う場合は，第9条に記載のお問い合わせ窓口までご連絡ください。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第7条（Cookie等の使用）
                </h2>
                <p>
                  当サービスは，ユーザーの利便性向上のため，Cookie等を使用することがあります。これらの技術の使用により個人を特定できる情報の収集を行うことはありません。ユーザーはブラウザの設定によりCookie等の使用を拒否することができますが，その場合一部のサービス機能が利用できなくなる可能性があります。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第8条（プライバシーポリシーの変更）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
                  </li>
                  <li>
                    当サービスが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第9条（お問い合わせ窓口）
                </h2>
                <p>
                  本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
                </p>
                <p className="mt-2">Eメールアドレス：silverbirder@gmail.com</p>
              </section>
              <p className="text-right">以上</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
