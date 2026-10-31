#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
根据 Locations 将题目自动匹配到 blockId
"""
import json
import re
from pathlib import Path

BASE_DIR = Path('/Users/haoer/Desktop/huawei')

def load_json(fname):
    with open(BASE_DIR / 'scripts' / fname, 'r', encoding='utf-8') as f:
        return json.load(f)

def locate_block(q, unit_index):
    """
    根据 Locations 字段推断目标 blockId
    返回 (blockId, lesson, confidence, notes)
    """
    unit = q['unit']
    loc = q['locations']
    qtype = q['type']
    
    # unit_index 的键是字符串（JSON 转换）
    unit_key = str(unit)
    if unit_key not in unit_index:
        return (None, None, 'no_unit', f'Unit {unit} 不存在')
    
    uidx = unit_index[unit_key]
    blocks = uidx['blocks']
    readings = uidx['readings']
    
    # 默认 Lesson
    target_lesson = None
    lesson_match = re.search(r'Lesson\s+(\d+)', loc, re.IGNORECASE)
    if lesson_match:
        target_lesson = int(lesson_match.group(1))
    
    # Para. 数字
    para_match = re.search(r'Para\.?\s*(\d+)', loc, re.IGNORECASE)
    target_para = int(para_match.group(1)) if para_match else None
    
    # 特殊小节名称（Unit 2/5 等）
    section_patterns = [
        (r'Definition', 'Definition'),
        (r'Advantages\s+and\s+disadvantages', 'Advantages and disadvantages'),
        (r'Advantages', 'Advantages'),
        (r'Limitations', 'Limitations'),
        (r'Principles', 'Principles'),
        (r'Introduction', 'Introduction'),
        (r'Two\s+Unique\s+Advantages', 'Two Unique Advantages'),
    ]
    
    matched_section = None
    for pattern, name in section_patterns:
        if re.search(pattern, loc, re.IGNORECASE):
            matched_section = name
            break
    
    # 句首线索
    sentence_start_match = re.search(r'从\s*[「"](.{5,30}?)[」"]', loc)
    if not sentence_start_match:
        sentence_start_match = re.search(r'以\s*[「"](.{5,30}?)[」"]', loc)
    if not sentence_start_match:
        sentence_start_match = re.search(r'开头的段落', loc)
        if sentence_start_match:
            # 提取前面的引号内容
            before = loc[:sentence_start_match.start()]
            quote = re.search(r'[「"](.{5,40}?)[」"]', before)
            if quote:
                sentence_start_match = quote
    
    sentence_hint = sentence_start_match.group(1) if sentence_start_match and sentence_start_match.lastindex else None
    
    # 匹配策略
    candidates = []
    
    for bid, bdata in blocks.items():
        if bdata['kind'] != 'p':
            continue
        
        b_lesson = bdata.get('lesson')
        b_para_in_lesson = bdata.get('paraInLesson')
        b_global_para = bdata.get('globalParaNum')
        b_text = bdata.get('text', '')
        
        score = 0
        notes = []
        
        # Lesson 匹配
        if target_lesson is not None:
            if b_lesson == target_lesson:
                score += 50
                notes.append(f'Lesson {target_lesson}')
            else:
                continue  # 必须匹配
        
        # Para 匹配（在 Lesson 内）
        if target_para is not None and b_para_in_lesson is not None:
            if b_para_in_lesson == target_para:
                score += 40
                notes.append(f'Para.{target_para} in Lesson')
        
        # 小节名匹配（文本包含小节名）
        if matched_section:
            if matched_section.lower() in b_text.lower()[:100]:
                score += 30
                notes.append(f'含 {matched_section}')
        
        # 句首匹配
        if sentence_hint:
            if sentence_hint in b_text[:150]:
                score += 35
                notes.append(f'句首匹配')
        
        if score > 0:
            candidates.append((bid, b_lesson, score, '; '.join(notes)))
    
    # Practice 题目特殊处理
    if 'Practice' in qtype and 'Fill in the blank' in qtype:
        # 课后巩固，不绑定 blockId
        if not candidates:
            return (None, target_lesson, 'practice_no_block', 'Practice 题放入课后巩固')
    
    if 'Practice' in qtype and 'True or False' in qtype:
        if not candidates:
            return (None, target_lesson, 'practice_no_block', 'Practice 题放入课后巩固')
    
    if not candidates:
        return (None, target_lesson, 'no_match', f'无法定位: {loc}')
    
    # 选择最高分
    candidates.sort(key=lambda x: x[2], reverse=True)
    best = candidates[0]
    
    conf = 'high' if best[2] >= 80 else ('medium' if best[2] >= 50 else 'low')
    
    return (best[0], best[1], conf, best[3])

def main():
    questions = load_json('parsed_exercises.json')
    unit_index = load_json('lessons_index.json')
    
    matched = []
    unmatched = []
    
    for q in questions:
        block_id, lesson, conf, notes = locate_block(q, unit_index)
        
        result = {
            **q,
            'blockId': block_id,
            'targetLesson': lesson,
            'confidence': conf,
            'matchNotes': notes
        }
        
        if block_id or conf in ['practice_no_block']:
            matched.append(result)
        else:
            unmatched.append(result)
    
    # 输出
    output_path = BASE_DIR / 'scripts' / 'matched_questions.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(matched + unmatched, f, ensure_ascii=False, indent=2)
    
    print(f"✓ 已匹配 {len(matched)} 题，待核对 {len(unmatched)} 题")
    print(f"✓ 已写入 {output_path}\n")
    
    # 统计
    by_unit = {}
    for r in matched + unmatched:
        u = r['unit']
        by_unit.setdefault(u, {'matched': 0, 'unmatched': 0})
        if r['blockId'] or r['confidence'] == 'practice_no_block':
            by_unit[u]['matched'] += 1
        else:
            by_unit[u]['unmatched'] += 1
    
    print("各单元匹配情况：")
    for u in sorted(by_unit.keys()):
        m = by_unit[u]['matched']
        um = by_unit[u]['unmatched']
        print(f"  Unit {u}: 已匹配 {m} 题，待核对 {um} 题")
    
    if unmatched:
        print(f"\n待核对题目：")
        for uq in unmatched:
            print(f"  {uq['sourceId']} (Unit {uq['unit']}): {uq['matchNotes']}")

if __name__ == '__main__':
    main()