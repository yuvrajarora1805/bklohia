import os
import json
from bs4 import BeautifulSoup
import re

base_path = 'D:/xamp/htdocs/calohia/site/www.cagmc.com'
index_path = os.path.join(base_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

services = {}

# We are going to extract:
# 1. Start Business -> Business Registration, Licenses
# 2. NGO -> ...
# 3. Trademark -> ...
# 4. Compliances -> Filing & Returns, Audit Assurance, Advisory Consultancy

nav = soup.find('ul', class_='mainmenu')
if nav:
    for li in nav.find_all('li', recursive=False):
        top_title = li.find('a').text.strip() if li.find('a') else 'Unknown'
        if top_title in ['Blog', 'About', 'Contact', 'Unknown']:
            continue
            
        # mega menu check
        mega = li.find('div', class_='rbt-megamenu')
        if mega:
            for ul in mega.find_all('ul'):
                for sub_li in ul.find_all('li'):
                    a = sub_li.find('a')
                    if a:
                        title = a.text.strip()
                        link = a.get('href')
                        if title and link and link != '#':
                            services[title] = {'title': title, 'category': top_title, 'link': link}
                            
        # standard dropdown check
        sub_ul = li.find('ul', class_='submenu')
        if sub_ul:
            for sub_li in sub_ul.find_all('li'):
                a = sub_li.find('a')
                if a:
                    title = a.text.strip()
                    link = a.get('href')
                    if title and link and link != '#':
                        services[title] = {'title': title, 'category': top_title, 'link': link}


# Extract the text content for each service
for key, service in services.items():
    link = service['link']
    # Example link: company-registration-in-jaipur.php/index.html
    # Some links might not have /index.html appended in the nav, we need to check both
    file_path = os.path.join(base_path, link)
    if not os.path.isfile(file_path):
        if os.path.isfile(os.path.join(base_path, link, 'index.html')):
            file_path = os.path.join(base_path, link, 'index.html')
        elif link.endswith('/index.html') and os.path.isfile(os.path.join(base_path, link.replace('/index.html', '.html'))):
            file_path = os.path.join(base_path, link.replace('/index.html', '.html'))
            
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as sf:
                sub_soup = BeautifulSoup(sf, 'html.parser')
                main_area = sub_soup.find('div', class_='col-lg-8') or sub_soup.find('div', class_='rbt-course-details-content')
                if main_area:
                    # Clean up the text
                    # Remove any form sections or CTA sections usually placed inside
                    for form in main_area.find_all('form'):
                        form.decompose()
                        
                    # Extract the first few paragraphs as description
                    paragraphs = main_area.find_all('p')
                    desc = " ".join([p.text.strip() for p in paragraphs[:2]])
                    # Remove multiple spaces/newlines
                    desc = re.sub(r'\s+', ' ', desc).strip()
                    if len(desc) < 10:
                        desc = "Professional chartered accountancy services customized to meet your specific financial and regulatory requirements."
                    service['desc'] = desc
                    
                    # You could also extract full HTML here if you wanted a rich text viewer
                    # service['html'] = str(main_area)
                else:
                    service['desc'] = "Professional chartered accountancy services customized to meet your specific financial and regulatory requirements."
        except Exception as e:
            service['desc'] = "Professional chartered accountancy services customized to meet your specific financial and regulatory requirements."
    else:
        service['desc'] = "Professional chartered accountancy services customized to meet your specific financial and regulatory requirements."

    # Create a nice URL slug
    slug = re.sub(r'[^a-z0-9]+', '-', service['title'].lower()).strip('-')
    service['slug'] = slug

# Convert dict to a list or dict keyed by slug for easy dynamic routing access
final_data = {v['slug']: v for k, v in services.items()}

# Output to JSON
out_path = 'D:/xamp/htdocs/calohia/bklohia_react/src/data/services.json'
with open(out_path, 'w', encoding='utf-8') as out_f:
    json.dump(final_data, out_f, indent=2)

print(f"Successfully extracted {len(final_data)} services to {out_path}")
