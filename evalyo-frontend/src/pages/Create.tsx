import { useEffect, useState } from "react";
import usePrompt from "../hook/usePrompt";
import { Button, Input, Form, Card, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function Create() {
  let [stepper, setStepper] = useState(0);
  const { response, fetchPrompt, loading } = usePrompt();

  const sendPrompt = async (prompt: string) => {
    await fetchPrompt(prompt);
    setStepper(stepper + 1);
  };

  return (
    <div>
      <h1>Create a Test</h1>
      {stepper === 0 && <Prompt sendPrompt={sendPrompt} loading={loading} />}
      {stepper === 1 && <PersonalizeQuestion questions={response} />}
      {/* {stepper === 2 && (
        <GeneralSettings sendPrompt={sendPrompt} loading={loading} />
      )} */}
    </div>
  );
}

function Prompt({
  sendPrompt,
  loading,
}: {
  sendPrompt: (prompt: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");
  const { TextArea } = Input;

  return (
    <div>
      <TextArea
        rows={4}
        placeholder="Describe the test that you want"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button onClick={() => sendPrompt(text)} loading={loading}>
        Generate Quizz
      </Button>
    </div>
  );
}

function GeneralSettings({ step, next }: { step: number; next: () => void }) {
  const options = [
    { label: "1 day", value: 24 },
    { label: "3 days", value: 72 },
    { label: "1 week", value: 7 * 24 },
  ];

  return (
    <Form>
      <Form.Item label="Prospect Email">
        <Input placeholder="Email" />
      </Form.Item>

      <FormItem label="Prospect first name">
        <Input placeholder="First name" />
      </FormItem>

      <FormItem label="Prospect first name">
        <Input placeholder="First name" />
      </FormItem>

      <Form.Item label="Link expiration">
        <Radio.Group
          block
          options={options}
          defaultValue={24}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>

      <Form.Item label="Enable vidéo">
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Enable border">
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary">Send Quizz</Button>
      </Form.Item>
    </Form>
  );
}

function PersonalizeQuestion({ questions }: { questions: any }) {
  console.log("get questions", questions);
  return (
    <>
      {questions.map((question, index) => (
        <Card>
          <Form.Item label="Question">
            <Input placeholder="Question" value={question.question} />
          </Form.Item>

          <ul>
            {question.responses.map((element, index) => (
              <FormItem label={"Réponse" + index + 1}>
                <Input key={index} value={element}></Input>;
              </FormItem>
            ))}
          </ul>
        </Card>
      ))}
      <Button>Next</Button>
    </>
  );
}
