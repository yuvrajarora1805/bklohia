import os
import re

directory = r'd:/xamp/htdocs/calohia/site/www.cagmc.com'

# We'll rename the folder later, but for now we process the files inside it.

replacements = [
    (r'Goyal Mangal & Company', r'B.K. Lohia & Associates'),
    (r'Goyal Mangal & Co\.', r'B.K. Lohia & Associates'),
    (r'Goyal Mangal &amp; Company', r'B.K. Lohia &amp; Associates'),
    (r'Goyal Mangal &amp; Co\.', r'B.K. Lohia &amp; Associates'),
    (r'CAGMC', r'B.K. Lohia & Associates'),
    (r'CA in Jaipur', r'CA in Kotkapura'),
    (r'Jaipur', r'Kotkapura'),
    (r'Rajasthan', r'Punjab'),
    (r'9785312345', r'9815127006'),
    (r'\+91-97853 12345', r'+91 98151 27006'),
    # Fix the cloudflare emails
    (r'<a href="[^"]*cdn-cgi/l/email-protection[^"]*">.*?<span class="__cf_email__"[^>]*>\[email(?:&#160;|&nbsp;)protected\]</span>\s*</a>', r'<a href="mailto:Bklohiaca@gmail.com"><i class="feather-mail"></i> Bklohiaca@gmail.com</a>'),
    (r'info@cagmc\.com', r'Bklohiaca@gmail.com')
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

print(f"Processed and updated {count} files.")
