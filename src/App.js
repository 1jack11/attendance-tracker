import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function App() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "第一组",
      expected: 0,
      actual: 0,
      sickLeaves: "",
      otherAbsent: "",
      totalSickLeaves: 0,
      totalOtherAbsent: 0,
    },
    {
      id: 2,
      name: "第二组",
      expected: 0,
      actual: 0,
      sickLeaves: "",
      otherAbsent: "",
      totalSickLeaves: 0,
      totalOtherAbsent: 0,
    },
    {
      id: 3,
      name: "第三组",
      expected: 0,
      actual: 0,
      sickLeaves: "",
      otherAbsent: "",
      totalSickLeaves: 0,
      totalOtherAbsent: 0,
    },
    {
      id: 4,
      name: "第四组",
      expected: 0,
      actual: 0,
      sickLeaves: "",
      otherAbsent: "",
      totalSickLeaves: 0,
      totalOtherAbsent: 0,
    },
  ]);

  const [summary, setSummary] = useState({
    totalExpected: 0,
    totalActual: 0,
    totalSickLeaves: 0,
    totalOtherAbsent: 0,
    allSickLeaves: "",
    allOtherAbsent: "",
  });

  useEffect(() => {
    const total = groups.reduce(
      (acc, group) => ({
        totalExpected: acc.totalExpected + Number(group.expected),
        totalActual: acc.totalActual + Number(group.actual),
        totalSickLeaves:
          acc.totalSickLeaves +
          (group.sickLeaves.trim() ? group.sickLeaves.split("、").length : 0),
        totalOtherAbsent:
          acc.totalOtherAbsent +
          (group.otherAbsent.trim() ? group.otherAbsent.split("、").length : 0),
        allSickLeaves:
          acc.allSickLeaves +
          (group.sickLeaves
            ? (acc.allSickLeaves ? "、" : "") + group.sickLeaves
            : ""),
        allOtherAbsent:
          acc.allOtherAbsent +
          (group.otherAbsent
            ? (acc.allOtherAbsent ? "、" : "") + group.otherAbsent
            : ""),
      }),
      {
        totalExpected: 0,
        totalActual: 0,
        totalSickLeaves: 0,
        totalOtherAbsent: 0,
        allSickLeaves: "",
        allOtherAbsent: "",
      }
    );
    setSummary(total);
  }, [groups]);

  const handleInputChange = (groupId, field, value) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return { ...group, [field]: value };
        }
        return group;
      })
    );
  };

  const getSummaryText = () => {
    const sickLeavesText =
      summary.totalSickLeaves > 0
        ? `${summary.totalSickLeaves}人病假（${summary.allSickLeaves}）`
        : "";
    const otherAbsentText =
      summary.totalOtherAbsent > 0
        ? `${summary.totalOtherAbsent}人其他原因（${summary.allOtherAbsent}）`
        : "";
    const absenceText = [sickLeavesText, otherAbsentText]
      .filter(Boolean)
      .join("，");

    return `班级人员情况：应到${summary.totalExpected}人，实到${summary.totalActual}人，${absenceText}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(getSummaryText())
      .then(() => alert("已复制到剪贴板！"))
      .catch((err) => alert("复制失败，请手动复制"));
  };

  const clearAll = () => {
    if (window.confirm("确定要清空所有数据吗？")) {
      setGroups(
        groups.map((group) => ({
          ...group,
          expected: 0,
          actual: 0,
          sickLeaves: "",
          otherAbsent: "",
          totalSickLeaves: 0,
          totalOtherAbsent: 0,
        }))
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">班级出勤统计系统</h1>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">{group.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  应到人数
                </label>
                <input
                  type="number"
                  value={group.expected}
                  onChange={(e) =>
                    handleInputChange(
                      group.id,
                      "expected",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  实到人数
                </label>
                <input
                  type="number"
                  value={group.actual}
                  onChange={(e) =>
                    handleInputChange(
                      group.id,
                      "actual",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  病假人员（用、分隔）
                </label>
                <input
                  type="text"
                  value={group.sickLeaves}
                  onChange={(e) =>
                    handleInputChange(group.id, "sickLeaves", e.target.value)
                  }
                  placeholder="例：张三、李四"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  其他未到人员（名字后括号注明原因，用、分隔）
                </label>
                <input
                  type="text"
                  value={group.otherAbsent}
                  onChange={(e) =>
                    handleInputChange(group.id, "otherAbsent", e.target.value)
                  }
                  placeholder="例：王五（事假）、赵六（迟到）"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  请在每个人名后用括号注明具体原因
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">班级总结</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">
          {getSummaryText()}
        </p>

        <div className="flex gap-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            复制文本
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            清空数据
          </button>
        </div>
      </div>
    </div>
  );
}
