import "./App.css";

import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  async function fetchSuggest() {
    setResult("Loading...");
    const genAI = new GoogleGenerativeAI("APIキー");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "**役割:** あなたは、ユーザーから送られてきたプロンプトを洗練させる、プロンプトエンジニアリングのエキスパートです。 ユーザーの意図を正確に捉え、それを達成するための最適なプロンプトを生成してください。 **目標:** ユーザーのプロンプトを以下の基準に基づいて改良する。 * **明確性:** プロンプトが曖昧な部分を明確化し、必要な情報が全て含まれているかを確認する。 * **正確性:** プロンプトに誤りや矛盾がないかを確認し、修正する。 * **効率性:** プロンプトが簡潔で、必要な情報だけを含んでいるかを確認し、冗長性を排除する。 * **実現可能性:** プロンプトが技術的に実現可能かどうかを確認し、必要に応じて修正する。 * **文脈の提供:** プロンプトが十分な文脈を提供しているかを確認し、不足している場合は追加する。 例えば、フォーマット、スタイル、長さ、対象読者などを明確にする。 * **具体的な指示:** 曖昧な指示を具体的な指示に変換する。「面白い物語を書いて」ではなく、「1000語のSF短編小説を書いて。主人公は火星探査のパイロットで、孤立した状況で奇妙な発見をする。物語は、サスペンスと発見の要素を混ぜ合わせたものにする。」のように。 **手順:** 1. **ユーザーのプロンプトを分析する:** プロンプトの内容、意図、潜在的な問題点を把握する。 2. **必要な情報を洗い出す:** プロンプトを完成させるために必要な追加情報、または明確化すべき点を特定する。 3. **改良されたプロンプトを作成する:** 分析と特定に基づいて、より明確で、正確で、効率的なプロンプトを生成する。 4. **改良点の説明を提供する:** 作成したプロンプトがどのように元のプロンプトを改良したのかを説明する。 具体的に、どのような点を変更し、なぜその変更が重要だったのかを説明する。 **例:** **ユーザーのプロンプト:** 「何か書いて」 **改良されたプロンプト:** 「100語の短い詩を書いてください。テーマは「孤独」で、比喩を用いた表現を用いてください。」 **改良点の説明:** 元のプロンプトは非常に曖昧でした。改良されたプロンプトは、詩の長さ、テーマ、使用する表現方法を具体的に指定することで、より明確で、生成される出力の質を高める可能性を高めています。 **出力フォーマット:** 改良されたプロンプトと、その変更点に関する説明を明確に示してください。 **制約:** ユーザーのプロンプトは、倫理的に問題がないものに限ります。 違法行為、暴力、差別などを促進するプロンプトは修正せず、その理由を説明してください。 このシステムプロンプトに従って、ユーザーからのプロンプトを常に改善し、最高の結果を得られるようにしてください。",
    });

    const result = await model.generateContent(inputText);
    console.log(result.response.text());
    setResult(result.response.text());
  }
  return (
    <main className="min-h-screen">
      <h1 className="">プロンプトコンサル🚀</h1>
      <h2 style={{ margin: "20px 0" }}>
        あなたのプロンプトをブラッシュアップします。
      </h2>

      <p style={{ margin: "10px 0" }}>
        例：AIについてのブログ記事を書いてください。
      </p>
      <p style={{ margin: "10px 0" }}>
        例：このコードのバグを修正してください。
      </p>
      <p style={{ margin: "10px 0" }}>例：面白い物語を作ってください。</p>
      <div className="flex h-20 items-center">
        <Input value={inputText} onChange={handleChange} />
        <Button
          className="cursor-pointer ml-2 bg-[#168EFD] hover:bg-[#1272CA] hover:text-white hover:shadow-lg"
          onClick={fetchSuggest}
        >
          提案を取得
        </Button>
      </div>
      <div className="bg-[#F3F6F9] text-left rounded-3xl p-8 h-200">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </main>
  );
}

export default App;
