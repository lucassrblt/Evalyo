import { Button } from "antd";

export default function Questions({ question }) {
  return (
    <div>
      <h1>{question.content}</h1>
      <ul>
        {question.answers.map((answer: string, index: number) => (
          <Button key={index}>{answer.content}</Button>
        ))}
      </ul>
    </div>
  );
}
