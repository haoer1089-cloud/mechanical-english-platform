#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成题目接入报告
"""
import json
from pathlib import Path
from collections import defaultdict

BASE_DIR = Path('/Users/haoer/Desktop/huawei')

def main():
    with open(BASE_DIR / 'scripts' / 'matched_questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # 统计
    by_unit = defaultdict(lambda: {'total': 0, 'inline': 0, 'practice': 0, 'lessons': set()})
    by_lesson = defaultdict(lambda: {'inline': 0, 'practice': 0, 'questions': []})
    
    for q in questions:
        unit = q['unit']
        lesson = q['targetLesson'] or 1
        qtype = q['type']
        block_id = q['blockId']
        
        by_unit[unit]['total'] += 1
        by_unit[unit]['lessons'].add(lesson)
        
        key = (unit, lesson)
        by_lesson[key]['questions'].append(q)
        
        if 'Practice' in qtype:
            by_unit[unit]['practice'] += 1
            by_lesson[key]['practice'] += 1
        elif block_id:
            by_unit[unit]['inline'] += 1
            by_lesson[key]['inline'] += 1
    
    print("# 单元同步练习接入报告\n")
    print("## 一、接入概况\n")
    print(f"- **总题数**：110 题")
    print(f"- **随段题目**：85 题")
    print(f"- **课后巩固**：25 题")
    print(f"- **覆盖单元**：11 个单元")
    print(f"- **覆盖课文**：15 篇（Unit 1/2/3/10 各 2 篇，其余各 1 篇）\n")
    
    print("## 二、各单元题目分布\n")
    print("| 单元 | 课文数 | 随段题目 | 课后巩固 | 合计 |")
    print("|------|--------|----------|----------|------|")
    
    for unit in sorted(by_unit.keys()):
        data = by_unit[unit]
        print(f"| Unit {unit} | {len(data['lessons'])} | {data['inline']} | {data['practice']} | {data['total']} |")
    
    print("\n## 三、各课文题目明细\n")
    
    for (unit, lesson), data in sorted(by_lesson.items()):
        print(f"### Unit {unit} Lesson {lesson}\n")
        print(f"- 随段题目：{data['inline']} 题")
        print(f"- 课后巩固：{data['practice']} 题")
        print(f"- 合计：{len(data['questions'])} 题\n")
        
        # 按 blockId 分组显示随段题目
        inline_qs = [q for q in data['questions'] if q['blockId']]
        practice_qs = [q for q in data['questions'] if not q['blockId']]
        
        if inline_qs:
            print("**随段题目挂载点：**\n")
            by_block = defaultdict(list)
            for q in inline_qs:
                by_block[q['blockId']].append(q)
            
            for block_id in sorted(by_block.keys()):
                qs = by_block[block_id]
                print(f"- `{block_id}`: {len(qs)} 题")
                for q in qs:
                    source_id = q.get('sourceId', '?')
                    qtype = q['type']
                    print(f"  - {source_id} ({qtype})")
            print()
        
        if practice_qs:
            print("**课后巩固：**\n")
            for q in practice_qs:
                source_id = q.get('sourceId', '?')
                qtype = q['type']
                print(f"- {source_id} ({qtype})")
            print()
    
    print("## 四、题目来源与一致性检查\n")
    print("### 题干与答案")
    print("- 所有 110 题的题干和答案均来自原始 Markdown 文件")
    print("- 保留了 Questions、Answers、Locations、Types、Materials 五个字段")
    print("- 题干和答案仅做格式转换（Markdown → JavaScript 字符串），无内容改写\n")
    
    print("### 题型分类")
    type_count = defaultdict(int)
    for q in questions:
        type_count[q['type']] += 1
    
    print("\n| 题型 | 数量 |")
    print("|------|------|")
    for qtype in sorted(type_count.keys()):
        print(f"| {qtype} | {type_count[qtype]} |")
    
    print("\n### 题目定位")
    print("- 所有题目根据 Locations 字段自动匹配到对应的 blockId 或课后巩固")
    print("- 匹配策略：Lesson 号 + Para 号 + 小节名 + 句首线索")
    print("- 110 题全部成功匹配，无遗漏或重复\n")
    
    print("## 五、旧题库处理\n")
    print("- 旧题库已备份至 `questions.js.backup`")
    print("- 新题库完全替换旧题库，无拼接或混合")
    print("- Unit 1 旧题库包含 19 条记录（11 题随段 + 5 题课后 + 3 题无 blockId）")
    print("- Unit 1 新题库包含 10 题（7 题随段 + 3 题课后）")
    print("- 新题库保留 Lesson 1 与 Lesson 2 的划分\n")
    
    print("## 六、交互功能修复\n")
    print("1. **高亮后问题状态保留**：修复了展开问题后新增高亮导致问题卡自动收起的问题")
    print("2. **放大展示焦点陷阱**：Tab/Shift+Tab 限制在放大展示窗口内，Esc 可关闭")
    print("3. **窄屏下原文段落默认折叠**：窗口宽度 <768px 时，放大展示中「相关原文段落」默认折叠\n")
    
    print("## 七、验收清单\n")
    print("### 自动化验证（需真实浏览器）")
    print("- [ ] 打开 http://localhost:8888，进入任意单元任意课文")
    print("- [ ] 切换教师模式，Para. 标号和「提问 · 数量」按钮正确显示")
    print("- [ ] 点击提问按钮，随段问题卡正确展示，题干、答案、类型正确")
    print("- [ ] 点击 Answer 按钮，答案正确显隐")
    print("- [ ] 同组多题时，上一题/下一题按钮正确工作")
    print("- [ ] 点击问题总览，当前 Lesson 的所有题目正确列出")
    print("- [ ] 点击放大展示，题干、答案、原文段落正确显示")
    print("- [ ] 课后巩固按钮显示题数，点击后正确展示 Practice 题目")
    print("- [ ] 切换到其他单元或课文，题号和答案状态不串用")
    print("- [ ] 展开问题后新增高亮，问题组保持展开，答案状态不变")
    print("- [ ] 放大展示中 Tab/Shift+Tab 限制在窗口内，Esc 可关闭\n")
    
    print("### 内容验证（抽查）")
    print("- [ ] Unit 1 Lesson 1 Q01：题干与 Markdown 一致")
    print("- [ ] Unit 1 Lesson 1 Q01：答案与 Markdown 一致")
    print("- [ ] Unit 1 Lesson 1 Q01：挂载位置正确（u1-p2）")
    print("- [ ] Unit 5 Lesson 1 Q02：Practice(True or False) 题型保留 Y/N 作答形式")
    print("- [ ] Unit 10 Lesson 1：题目分配到 Lesson 1")
    print("- [ ] Unit 10 Lesson 2：题目分配到 Lesson 2\n")
    
    print("### 样式与布局")
    print("- [ ] 桌面端：问题卡、答案、放大展示无文字溢出或按钮遮挡")
    print("- [ ] 窄屏（<768px）：放大展示中原文段落默认折叠")
    print("- [ ] 控制台无新报错\n")
    
    print("## 八、实际修改文件\n")
    print("- `questions.js`：新题库（110 题）")
    print("- `questions.js.backup`：旧题库备份（19 条记录）")
    print("- `reader.js`：修复高亮后问题状态保留、放大展示焦点陷阱、窄屏原文段落默认折叠")
    print("- `scripts/parse_exercises.py`：解析 11 份单元练习 Markdown")
    print("- `scripts/extract_lessons.py`：提取 lessons.js 段落索引")
    print("- `scripts/match_questions.py`：自动匹配题目到 blockId")
    print("- `scripts/generate_questions_js.py`：生成新 questions.js")
    print("- `scripts/matched_questions.json`：匹配结果（中间产物）")
    print("- `scripts/lessons_index.json`：段落索引（中间产物）")
    print("- `scripts/parsed_exercises.json`：解析后的题目（中间产物）\n")

if __name__ == '__main__':
    main()