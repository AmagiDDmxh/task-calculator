import { Tree, Card, Slider, Typography } from "antd";
import "antd/dist/antd.css";
import { useMemo, useState } from "react";
import "./App.css";

const selfScores = [
  {
    title: "Self",
    // key: "0-0",
    selectable: false,
    children: [
      {
        title: "love",
        key: 0,
        isLeaf: true,
      },
      {
        title: "useness",
        key: 1,
        isLeaf: true,
      },
    ],
  },
  {
    title: "Public",
    // key: "1-0",
    selectable: false,
    children: [
      {
        title: "usage",
        key: 2,
        isLeaf: true,
      },
      {
        title: "value",
        key: 3,
        isLeaf: true,
      },
    ],
  },
];

const marks = [
  { marks: { 0: "no", 25: "low", 50: "middle", 75: "high", 100: "love" } },
  { marks: { 0: "no", 50: "unknown", 100: "solve" }, step: 50 },
  {
    marks: { 0: "no", 25: "few", 50: "medium", 75: "lot", 100: "very much" },
  },
  { marks: { 0: "no", 25: "low", 50: "middle", 75: "high", 100: "infinite" } },
];

function App() {
  const [selectedKey, setSelectedKey] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [love, use, usage, value] = scores;
  const totalScore =
    (love * 0.35 + use * 0.65) * 0.5 + (usage * 0.5 + value * 0.5) * 0.5;

  const selectedOption = useMemo(() => marks[selectedKey], [selectedKey]);

  return (
    <div className="App">
      <Card style={{ width: 300 }}>
        <Tree
          onSelect={(keys) => {
            setSelectedKey(keys[0]);
          }}
          defaultSelectedKeys={[0]}
          // defaultCheckedKeys
          treeData={selfScores}
          showLine
          defaultExpandAll
        ></Tree>
      </Card>
      {selectedKey > -1 && (
        <Card style={{ width: 300 }}>
          <Slider
            onChange={(value) => {
              const index = selectedKey;
              setScores([
                ...scores.slice(0, index),
                value,
                ...scores.slice(index),
              ]);
            }}
            value={scores[selectedKey]}
            marks={selectedOption.marks}
            step={selectedOption.step}
            defaultValue={0}
          />
        </Card>
      )}
      <Card style={{ width: 300 }}>
        Final Score: <Typography.Title level={5}>{totalScore}</Typography.Title>
      </Card>
    </div>
  );
}

export default App;
