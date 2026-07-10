import os
import re

directory = r'd:/xamp/htdocs/bklohia'

replacements = [
    (r'cagmc-logo\.webp', r'logobk.png')
]

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.html') or file.endswith('.php'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements:
                    new_content = re.sub(old, new, new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"Processed and updated {count} files for logo.")
