import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            利用規約
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <p>
                この利用規約（以下，「本規約」といいます。）は，クチコミ仲間（以下，「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
              </p>
              <section>
                <h2 className="mb-2 text-xl font-semibold">第1条（適用）</h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    本規約は，ユーザーと本サービスの運営者（以下，「運営者」といいます。）との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                  </li>
                  <li>
                    運営者は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
                  </li>
                  <li>
                    本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第2条（利用登録）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    本サービスにおいては，ユーザーがGoogle
                    Mapのコントリビュータ情報を入力し，運営者がこれを承認することによって，利用登録が完了するものとします。
                  </li>
                  <li>
                    運営者は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
                    <ul className="ml-5 mt-2 list-inside list-disc">
                      <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                      <li>本規約に違反したことがある者からの申請である場合</li>
                      <li>
                        その他，運営者が利用登録を相当でないと判断した場合
                      </li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第3条（禁止事項）
                </h2>
                <p>
                  ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                </p>
                <ol className="mt-2 list-inside list-decimal space-y-2">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>
                    運営者，本サービスの他のユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
                  </li>
                  <li>運営者のサービスの運営を妨害するおそれのある行為</li>
                  <li>
                    他のユーザーに関する個人情報等を収集または蓄積する行為
                  </li>
                  <li>不正アクセスをし，またはこれを試みる行為</li>
                  <li>他のユーザーに成りすます行為</li>
                  <li>
                    運営者のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
                  </li>
                  <li>
                    運営者，本サービスの他のユーザーまたはその他の第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為
                  </li>
                  <li>
                    以下の表現を含み，または含むと運営者が判断する内容を本サービス上に投稿し，または送信する行為
                    <ul className="ml-5 mt-2 list-inside list-disc">
                      <li>過度に暴力的な表現</li>
                      <li>露骨な性的表現</li>
                      <li>
                        人種，国籍，信条，性別，社会的身分，門地等による差別につながる表現
                      </li>
                      <li>自殺，自傷行為，薬物乱用を誘引または助長する表現</li>
                      <li>
                        その他反社会的な内容を含み他人に不快感を与える表現
                      </li>
                    </ul>
                  </li>
                  <li>本サービスの運営を妨害するおそれのある行為</li>
                  <li>その他，運営者が不適切と判断する行為</li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第4条（本サービスの提供の停止等）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    運営者は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    <ul className="ml-5 mt-2 list-inside list-disc">
                      <li>
                        本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                      </li>
                      <li>
                        地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
                      </li>
                      <li>
                        コンピュータまたは通信回線等が事故により停止した場合
                      </li>
                      <li>
                        その他，運営者が本サービスの提供が困難と判断した場合
                      </li>
                    </ul>
                  </li>
                  <li>
                    運営者は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第5条（利用制限および登録抹消）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    運営者は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
                    <ul className="ml-5 mt-2 list-inside list-disc">
                      <li>本規約のいずれかの条項に違反した場合</li>
                      <li>登録事項に虚偽の事実があることが判明した場合</li>
                      <li>運営者からの連絡に対し，一定期間返答がない場合</li>
                      <li>
                        本サービスについて，最終の利用から一定期間利用がない場合
                      </li>
                      <li>
                        その他，運営者が本サービスの利用を適当でないと判断した場合
                      </li>
                    </ul>
                  </li>
                  <li>
                    運営者は，本条に基づき運営者が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">第6条（退会）</h2>
                <p>
                  ユーザーは，運営者の定める退会手続により，本サービスから退会できるものとします。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第7条（保証の否認および免責事項）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    運営者は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                  </li>
                  <li>
                    運営者は，本サービスに起因してユーザーに生じたあらゆる損害について、運営者の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する運営者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
                  </li>
                  <li>
                    前項ただし書に定める場合であっても，運営者は，運営者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（運営者またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。
                  </li>
                  <li>
                    運営者は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第8条（サービス内容の変更等）
                </h2>
                <p>
                  運営者は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第9条（利用規約の変更）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    運営者は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                    <ul className="ml-5 mt-2 list-inside list-disc">
                      <li>
                        本規約の変更がユーザーの一般の利益に適合するとき。
                      </li>
                      <li>
                        本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                      </li>
                    </ul>
                  </li>
                  <li>
                    運営者はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第10条（個人情報の取扱い）
                </h2>
                <p>
                  運営者は，本サービスの利用によって取得する個人情報については，運営者「プライバシーポリシー」に従い適切に取り扱うものとします。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第12条（通知または連絡）
                </h2>
                <p>
                  ユーザーと運営者との間の通知または連絡は，運営者の定める方法によって行うものとします。運営者は,ユーザーから,運営者が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第13条（権利義務の譲渡の禁止）
                </h2>
                <p>
                  ユーザーは，運営者の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-xl font-semibold">
                  第14条（準拠法・裁判管轄）
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>本規約の解釈にあたっては，日本法を準拠法とします。</li>
                  <li>
                    本サービスに関して紛争が生じた場合には，運営者の本店所在地を管轄する裁判所を専属的合意管轄とします。
                  </li>
                </ol>
              </section>
              <p className="mt-4 text-right">以上</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
