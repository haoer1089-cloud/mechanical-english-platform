#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 lessons.js 提取所有段落 blockId 和文本，建立段落索引
"""
import json
import re
from pathlib import Path

BASE_DIR = Path('/Users/haoer/Desktop/huawei')
LESSONS_JS = BASE_DIR / 'lessons.js'

def main():
    with open(LESSONS_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取 const lessons = [...];
    match = re.search(r'const lessons\s*=\s*(\[.+\]);?\s*$', content, re.DOTALL)
    if not match:
        print("❌ 无法解析 lessons.js")
        return
    
    lessons = json.loads(match.group(1))
    
    # 建立索引
    unit_index = {}
    
    for unit_data in lessons:
        unit_id = unit_data['unit']
        blocks = unit_data.get('blocks', [])
        readings = unit_data.get('readings', [])
        
        # 段落索引：{blockId: {text, kind, paraNum, lesson}}
        block_map = {}
        
        # 全局段落顺序
        global_para_num = 0
        
        for block in blocks:
            if block['kind'] == 'p':
                global_para_num += 1
                block_map[block['id']] = {
                    'text': block['text'],
                    'kind': block['kind'],
                    'globalParaNum': global_para_num,
                    'lesson': None  # 稍后填写
                }
            else:
                block_map[block['id']] = {
                    'text': block['text'],
                    'kind': block['kind'],
                    'globalParaNum': None,
                    'lesson': None
                }
        
        # 确定每个 block 属于哪个 lesson
        for reading in readings:
            lesson_id = reading['id']
            lesson_blocks = reading.get('blocks', [])
            para_in_lesson = 0
            
            for lb in lesson_blocks:
                bid = lb['id']
                if bid in block_map:
                    block_map[bid]['lesson'] = lesson_id
                    if lb['kind'] == 'p':
                        para_in_lesson += 1
                        block_map[bid]['paraInLesson'] = para_in_lesson
        
        unit_index[unit_id] = {
            'blocks': block_map,
            'readings': [{'id': r['id'], 'title': r['title']} for r in readings]
        }
    
    # 输出
    output_path = BASE_DIR / 'scripts' / 'lessons_index.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(unit_index, f, ensure_ascii=False, indent=2)
    
    print(f"✓ 已提取 {len(lessons)} 个单元的段落索引")
    for uid in sorted(unit_index.keys()):
        paras = [b for b in unit_index[uid]['blocks'].values() if b['kind'] == 'p']
        print(f"  Unit {uid}: {len(paras)} 个段落")
    
    print(f"✓ 已写入 {output_path}")

if __name__ == '__main__':
    main()