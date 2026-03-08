import codecs

with codecs.open(r'c:\Users\priti\SpacePlanners\index_backup.html', 'r', encoding='utf-16le', errors='ignore') as f:
    text = f.read()

with open(r'c:\Users\priti\SpacePlanners\index_backup_utf8.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("Converted")
