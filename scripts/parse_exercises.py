#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
解析 11 个单元同步练习 Markdown，提取题目结构化数据
"""
import re
import json
from pathlib import Path

BASE_DIR = Path('/Users/haoer/Desktop/huawei')
EXERCISE_DIR = BASE_DIR / '单元同步练习'

UNIT_FILES = [
    'Unit 01 Metals and Engineering Materials 同步练习.md',
    'Unit 02 Powder Metallurgy 同步练习.md',
    'Unit 03 Casting 同步练习.md',
    'Unit 04 Forging 同步练习.md',
    'Unit 05 Heat Treatment 同步练习.md',
    'Unit 06 Welding 同步练习.md',
    'Unit 07 Antifriction Bearings 同步练习.md',
    'Unit 08 Screws Fasteners and Joints 同步练习.md',
    'Unit 09 Cams 同步练习.md',
    'Unit 10 Machining 同步练习.md',
    'Unit 11 Electrical Discharge Machining 同步练习.md',
]

def parse_unit_exercises(filepath):
    """解析一个单元的练习文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取单元号
    unit_match = re.search(r'Unit (\d+)', filepath.stem)
    unit_num = int(unit_match.group(1)) if unit_match else 0
    
    # 按 ## Q 分割题目
    questions = []
    q_blocks = re.split(r'\n## (Q\d+)', content)
    
    for i in range(1, len(q_blocks), 2):
        q_id = q_blocks[i]
        q_content = q_blocks[i + 1]
        
        # 提取字段
        questions_match = re.search(r'\*\*Questions:\*\*\s*(.+?)(?=\n\*\*|\Z)', q_content, re.DOTALL)
        answers_match = re.search(r'\*\*Answers:\*\*\s*(.+?)(?=\n\*\*|\Z)', q_content, re.DOTALL)
        locations_match = re.search(r'\*\*Locations:\*\*\s*(.+?)(?=\n\*\*|\Z)', q_content, re.DOTALL)
        types_match = re.search(r'\*\*Types:\*\*\s*(.+?)(?=\n\*\*|\Z)', q_content, re.DOTALL)
        materials_match = re.search(r'\*\*Materials:\*\*\s*(.+?)(?=\n\*\*|\Z)', q_content, re.DOTALL)
        
        q_data = {
            'sourceFile': filepath.name,
            'sourceId': q_id,
            'unit': unit_num,
            'question': questions_match.group(1).strip() if questions_match else '',
            'answer': answers_match.group(1).strip() if answers_match else '',
            'locations': locations_match.group(1).strip() if locations_match else '',
            'type': types_match.group(1).strip() if types_match else '',
            'materials': materials_match.group(1).strip() if materials_match else '',
        }
        questions.append(q_data)
    
    return questions

def main():
    all_questions = []
    
    for fname in UNIT_FILES:
        fpath = EXERCISE_DIR / fname
        if fpath.exists():
            unit_qs = parse_unit_exercises(fpath)
            all_questions.extend(unit_qs)
            print(f"✓ {fname}: {len(unit_qs)} 题")
    
    print(f"\n总计 {len(all_questions)} 题")
    
    # 输出 JSON
    output_path = BASE_DIR / 'scripts' / 'parsed_exercises.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    
    print(f"✓ 已写入 {output_path}")

if __name__ == '__main__':
    main()