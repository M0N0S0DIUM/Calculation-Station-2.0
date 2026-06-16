import os
import re
from pathlib import Path

calculators_dir = Path("calculators")
files = list(calculators_dir.glob("*.tsx"))

print(f"Found {len(files)} calculator files")

for file in files:
    content = file.read_text()
    
    if "useEffect" in content and "onStateChange" in content:
        if "useEffect(() =>" in content and "onStateChange" in content:
            print(f"  {file.name}: Already fixed")
            continue
    
    if "useEffect" not in content:
        content = content.replace(
            'import { useMemo, useState } from "react";',
            'import { useMemo, useState, useEffect } from "react";'
        )
        content = content.replace(
            "import { useMemo, useState } from 'react';",
            "import { useMemo, useState, useEffect } from 'react';"
        )
    
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if 'const shareParams: ShareParams =' in line:
            share_params_lines = [line]
            j = i + 1
            brace_count = line.count('{') - line.count('}')
            while j < len(lines) and brace_count > 0:
                share_params_lines.append(lines[j])
                brace_count += lines[j].count('{') - lines[j].count('}')
                j += 1
            
            if j < len(lines) and 'if (onStateChange) onStateChange(shareParams);' in lines[j]:
                share_params_str = ' '.join(share_params_lines)
                var_names = re.findall(r'(\w+):\s*\w+', share_params_str)
                deps = list(dict.fromkeys(var_names))
                
                dep_array = ', '.join(deps)
                use_effect = f'''  useEffect(() => {{
    if (onStateChange) onStateChange(shareParams);
  }}, [{dep_array}, onStateChange]);'''
                
                new_lines.extend(share_params_lines)
                new_lines.append(use_effect)
                i = j + 1
                continue
        
        new_lines.append(line)
        i += 1
    
    content = '\n'.join(new_lines)
    file.write_text(content)
    print(f"  Fixed: {file.name}")

print("Done!")
