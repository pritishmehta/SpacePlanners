import subprocess
import re

try:
    # get list of commits
    result = subprocess.run(['git', 'log', '--format=%H'], capture_output=True, text=True)
    commits = result.stdout.strip().split('\n')
    
    for c in commits:
        res = subprocess.run(['git', 'show', f'{c}:index.html'], capture_output=True, text=True, errors='ignore')
        if 'class="stats-ribbon"' in res.stdout or 'id="statsRibbon"' in res.stdout:
            print(f"Found in commit {c}")
            # print surrounding lines
            lines = res.stdout.split('\n')
            for i, line in enumerate(lines):
                if 'class="stats-ribbon"' in line or 'id="statsRibbon"' in line:
                    start = max(0, i-10)
                    end = min(len(lines), i+30)
                    print('\n'.join(lines[start:end]))
                    break
            break
except Exception as e:
    print(e)
