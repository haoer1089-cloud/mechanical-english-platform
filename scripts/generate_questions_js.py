#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
根据匹配结果生成新的 questions.js
"""
import json
from pathlib import Path

BASE_DIR = Path('/Users/haoer/Desktop/huawei')

def generate_question_id(unit, lesson, seq):
    """生成题目 ID: u03-l02-q08"""
    return f"u{unit:02d}-l{lesson:02d}-q{seq:02d}"

def generate_practice_id(unit, lesson, seq):
    """生成课后巩固 ID"""
    return f"u{unit:02d}-l{lesson:02d}-p{seq:02d}"

def main():
    with open(BASE_DIR / 'scripts' / 'matched_questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # 按 unit/lesson/blockId 分组
    by_unit_lesson = {}
    
    for q in questions:
        unit = q['unit']
        lesson = q['targetLesson'] or 1
        block_id = q['blockId']
        qtype = q['type']
        
        key = (unit, lesson)
        if key not in by_unit_lesson:
            by_unit_lesson[key] = {'inline': {}, 'practice': []}
        
        if 'Practice' in qtype:
            by_unit_lesson[key]['practice'].append(q)
        elif block_id:
            if block_id not in by_unit_lesson[key]['inline']:
                by_unit_lesson[key]['inline'][block_id] = []
            by_unit_lesson[key]['inline'][block_id].append(q)
    
    # 生成 questions.js 数据结构
    classroom_questions = {}
    
    for (unit, lesson), data in sorted(by_unit_lesson.items()):
        unit_lesson_key = f"{unit}/{lesson}"
        question_list = []
        
        # 读取该 lesson 的段落顺序
        with open(BASE_DIR / 'scripts' / 'lessons_index.json', 'r', encoding='utf-8') as f:
            unit_index = json.load(f)
        
        # 按 blockId 的实际顺序添加随段问题
        block_order = []
        if str(unit) in unit_index:
            blocks = unit_index[str(unit)]['blocks']
            # 找出该 lesson 的所有 blockId 并排序
            lesson_blocks = [(bid, bdata) for bid, bdata in blocks.items() 
                           if bdata.get('lesson') == lesson and bdata['kind'] == 'p']
            lesson_blocks.sort(key=lambda x: x[1].get('paraInLesson', 999))
            block_order = [bid for bid, _ in lesson_blocks]
        
        seq_inline = 1
        for block_id in block_order:
            if block_id in data['inline']:
                for q in data['inline'][block_id]:
                    qid = generate_question_id(unit, lesson, seq_inline)
                    question_list.append({
                        'id': qid,
                        'blockId': block_id,
                        'type': q['type'],
                        'prompt': q['question'],
                        'answer': q['answer'],
                        'source': {
                            'file': q['sourceFile'],
                            'qid': q['sourceId'],
                            'locations': q['locations'],
                            'materials': q['materials']
                        }
                    })
                    seq_inline += 1
        
        # 添加课后巩固
        seq_practice = 1
        for q in data['practice']:
            pid = generate_practice_id(unit, lesson, seq_practice)
            question_list.append({
                'id': pid,
                'type': q['type'],
                'prompt': q['question'],
                'answer': q['answer'],
                'source': {
                    'file': q['sourceFile'],
                    'qid': q['sourceId'],
                    'locations': q['locations'],
                    'materials': q['materials']
                }
            })
            seq_practice += 1
        
        classroom_questions[unit_lesson_key] = question_list
    
    # 生成 questions.js
    output_lines = ['const classroomQuestions = {']
    
    for key in sorted(classroom_questions.keys(), key=lambda x: [int(n) for n in x.split('/')]):
        qs = classroom_questions[key]
        output_lines.append(f'  "{key}": [')
        
        for q in qs:
            # 转义引号
            prompt = q['prompt'].replace('"', '\\"').replace('\n', '\\n')
            answer = q['answer'].replace('"', '\\"').replace('\n', '\\n')
            
            if 'blockId' in q:
                output_lines.append(
                    f'    {{ id: "{q["id"]}", blockId: "{q["blockId"]}", '
                    f'type: "{q["type"]}", prompt: "{prompt}", answer: "{answer}" }},'
                )
            else:
                # Practice 题无 blockId
                output_lines.append(
                    f'    {{ id: "{q["id"]}", type: "{q["type"]}", '
                    f'prompt: "{prompt}", answer: "{answer}" }},'
                )
        
        output_lines.append('  ],')
    
    output_lines.append('};')
    
    # 写入
    output_path = BASE_DIR / 'questions.js'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))
    
    # 统计
    total = sum(len(qs) for qs in classroom_questions.values())
    inline_count = sum(1 for qs in classroom_questions.values() for q in qs if 'blockId' in q)
    practice_count = sum(1 for qs in classroom_questions.values() for q in qs if 'blockId' not in q)
    
    print(f"✓ 已生成新的 questions.js")
    print(f"  总题数: {total}")
    print(f"  随段题目: {inline_count}")
    print(f"  课后巩固: {practice_count}")
    print(f"  覆盖单元/课文: {len(classroom_questions)}")
    
    # 详细统计
    print("\n各单元/课文题目分布：")
    for key in sorted(classroom_questions.keys(), key=lambda x: [int(n) for n in x.split('/')]):
        qs = classroom_questions[key]
        inline = sum(1 for q in qs if 'blockId' in q)
        practice = sum(1 for q in qs if 'blockId' not in q)
        print(f"  {key}: {inline} 随段 + {practice} 课后 = {len(qs)} 题")

if __name__ == '__main__':
    main()